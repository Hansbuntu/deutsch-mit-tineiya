// Service worker — lets the app open, and play pronunciation audio, without
// a connection once it has been visited (handy on the train).
//
// This file is a template: at build time vite.config.ts fills in the list of
// built files and a version, and writes the result to dist/sw.js. It only
// runs in production builds (see main.tsx).
//
// - Pages: network first, so a new deploy shows up straight away; the saved
//   copy is used only when offline.
// - App code/styles: cache first (their filenames change whenever they do).
// - Audio: saved the first time each clip plays, or all at once from the
//   Progress page. Clips are named by a hash of their text, so a saved clip
//   never goes stale and survives app updates.
// - Google Fonts: served from cache, refreshed in the background.

const VERSION = '__VERSION__';
const PRECACHE = JSON.parse('__PRECACHE__');

const APP_CACHE = `app-${VERSION}`;
const AUDIO_CACHE = 'audio-v1';
const FONT_CACHE = 'fonts-v1';

const scoped = (path) => new URL(path, self.registration.scope).href;

// Some servers send Vary: Origin, and the browser's module requests carry an Origin header the
// saved copies didn't — without ignoreVary those lookups miss and the app can't start offline.
const MATCH = { ignoreVary: true };

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(APP_CACHE).then((cache) => cache.addAll(PRECACHE.map(scoped))));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('app-') && k !== APP_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    if (request.mode === 'navigate') event.respondWith(networkFirstPage(request));
    else if (url.pathname.includes('/audio/')) event.respondWith(audio(request, url));
    else event.respondWith(cacheFirst(request));
    return;
  }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(request, FONT_CACHE));
  }
});

async function networkFirstPage(request) {
  const cache = await caches.open(APP_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(scoped('index.html'), response.clone());
    return response;
  } catch {
    return (await cache.match(scoped('index.html'), MATCH)) ?? Response.error();
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request, MATCH);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) (await caches.open(APP_CACHE)).put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, MATCH);
  const refresh = fetch(request)
    .then((response) => {
      if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached ?? Response.error());
  return cached ?? refresh;
}

async function audio(request, url) {
  const cache = await caches.open(AUDIO_CACHE);
  // Match on the URL alone — media requests carry a Range header that would never match.
  let response = await cache.match(url.href, MATCH);
  if (!response) {
    try {
      response = await fetch(url.href);
    } catch {
      return Response.error(); // offline and not saved: the app falls back to the device's own voice
    }
    if (!response.ok) return response;
    await cache.put(url.href, response.clone());
  }
  return withRange(request, response);
}

/** Answer a media Range request (Safari insists on it) from a full cached response. */
async function withRange(request, response) {
  const range = request.headers.get('range');
  const match = range && /bytes=(\d*)-(\d*)/.exec(range);
  if (!match) return response;
  const blob = await response.blob();
  const start = match[1] ? Number(match[1]) : 0;
  const end = match[2] ? Math.min(Number(match[2]), blob.size - 1) : blob.size - 1;
  return new Response(blob.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': response.headers.get('Content-Type') ?? 'audio/mpeg',
      'Content-Range': `bytes ${start}-${end}/${blob.size}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes',
    },
  });
}
