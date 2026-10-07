// Offline support: registers the service worker (src/service-worker.js,
// built to dist/sw.js) and lets the learner save every pronunciation clip
// ahead of time. Production builds only — in dev there is no sw.js.

/** Must match AUDIO_CACHE in src/service-worker.js. */
const AUDIO_CACHE = 'audio-v1';
const CONCURRENCY = 6;

export function offlineSupported(): boolean {
  return import.meta.env.PROD && 'serviceWorker' in navigator && 'caches' in window;
}

export function registerServiceWorker() {
  if (!offlineSupported()) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then(watchForUpdates)
      .catch(() => {
        // No offline mode this visit — the app works exactly the same online.
      });
  });
}

// --- updates: a new deploy installs a new worker, which waits until the app reloads ---

let waitingWorker: ServiceWorker | null = null;
const updateListeners = new Set<() => void>();

function watchForUpdates(registration: ServiceWorkerRegistration) {
  // The very first install has no older version to replace — nothing to announce.
  const isUpdate = () => navigator.serviceWorker.controller !== null;

  // Waiting already as the app opens: this page came from the network (pages are network
  // first), so it is the new version — let the new worker take over quietly. Offline, the page
  // came from the old worker's cache, so the old one stays until next time.
  if (registration.waiting && isUpdate() && navigator.onLine) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }

  registration.addEventListener('updatefound', () => {
    const worker = registration.installing;
    worker?.addEventListener('statechange', () => {
      if (worker.state === 'installed' && isUpdate()) {
        waitingWorker = worker;
        updateListeners.forEach((listener) => listener());
      }
    });
  });

  // An installed app is resumed rather than reopened, so check for a new version each time it comes back.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') registration.update().catch(() => {});
  });
}

/** Called when a new version has downloaded while the app is open. Returns an unsubscribe. */
export function onUpdateReady(listener: () => void): () => void {
  updateListeners.add(listener);
  if (waitingWorker) listener();
  return () => {
    updateListeners.delete(listener);
  };
}

/** Switch to the downloaded version and reload into it. */
export function applyUpdate() {
  if (!waitingWorker) return window.location.reload();
  navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), { once: true });
  waitingWorker.postMessage({ type: 'SKIP_WAITING' });
}

const clipUrl = (file: string) => new URL(`audio/${file}`, document.baseURI).href;

async function clipList(): Promise<string[]> {
  const response = await fetch(new URL('audio-manifest.json', document.baseURI).href, { cache: 'no-cache' });
  if (!response.ok) throw new Error('No audio manifest');
  return response.json() as Promise<string[]>;
}

export interface AudioStatus {
  saved: number;
  total: number;
}

/** How many of the app's clips are already saved on this device. */
export async function audioStatus(): Promise<AudioStatus | null> {
  if (!offlineSupported()) return null;
  try {
    const [files, cache] = await Promise.all([clipList(), caches.open(AUDIO_CACHE)]);
    const savedUrls = new Set((await cache.keys()).map((r) => r.url));
    return { saved: files.filter((f) => savedUrls.has(clipUrl(f))).length, total: files.length };
  } catch {
    return null;
  }
}

/** Download every clip that isn't saved yet. Resolves with the final status; stops early if `signal` aborts. */
export async function saveAllAudio(onProgress: (status: AudioStatus) => void, signal?: AbortSignal): Promise<AudioStatus> {
  const [files, cache] = await Promise.all([clipList(), caches.open(AUDIO_CACHE)]);
  const savedUrls = new Set((await cache.keys()).map((r) => r.url));
  const missing = files.filter((f) => !savedUrls.has(clipUrl(f)));
  let saved = files.length - missing.length;
  onProgress({ saved, total: files.length });

  let next = 0;
  const worker = async () => {
    while (next < missing.length && !signal?.aborted) {
      const url = clipUrl(missing[next++]);
      try {
        const response = await fetch(url, { signal });
        if (response.ok) {
          await cache.put(url, response);
          saved++;
          onProgress({ saved, total: files.length });
        }
      } catch {
        if (signal?.aborted) return;
        // one failed clip (flaky connection) shouldn't stop the rest; it'll download when played
      }
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return { saved, total: files.length };
}
