// Speech input via the browser's built-in SpeechRecognition — free, no
// backend, no API key. Support is inconsistent (solid in Chrome/Edge,
// absent in Firefox, patchy in Safari), so every caller must check
// `speechRecognitionSupported()` and degrade gracefully when it's false.

function ctor(): typeof window.SpeechRecognition | undefined {
  if (typeof window === 'undefined') return undefined;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition;
}

export function speechRecognitionSupported(): boolean {
  return !!ctor();
}

export type ListenResult =
  | { status: 'result'; transcript: string }
  | { status: 'no-match' }
  | { status: 'error'; error: string }
  | { status: 'not-supported' };

/** Listen once and resolve with what was heard (or why not). Never rejects. */
export function listenOnce(): Promise<ListenResult> {
  const Ctor = ctor();
  if (!Ctor) return Promise.resolve({ status: 'not-supported' });

  return new Promise((resolve) => {
    const recognition = new Ctor();
    recognition.lang = 'de-DE';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let settled = false;
    const finish = (result: ListenResult) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? '';
      finish(transcript.trim() ? { status: 'result', transcript } : { status: 'no-match' });
    };
    recognition.onnomatch = () => finish({ status: 'no-match' });
    recognition.onerror = (event) => finish({ status: 'error', error: event.error });
    recognition.onend = () => finish({ status: 'no-match' });

    try {
      recognition.start();
    } catch (err) {
      finish({ status: 'error', error: String(err) });
    }
  });
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"„“‚‘]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const d: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));
  for (let i = 0; i < rows; i++) d[i][0] = i;
  for (let j = 0; j < cols; j++) d[0][j] = j;
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    }
  }
  return d[rows - 1][cols - 1];
}

/** 0..1 similarity between two strings (1 = identical after normalizing). */
export function textSimilarity(a: string, b: string): number {
  const na = normalizeText(a);
  const nb = normalizeText(b);
  if (na === nb) return 1;
  const maxLen = Math.max(na.length, nb.length, 1);
  return 1 - levenshtein(na, nb) / maxLen;
}

export const SPOKEN_MATCH_THRESHOLD = 0.82;
