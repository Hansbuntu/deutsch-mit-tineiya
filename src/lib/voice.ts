// Speech input via the browser's built-in SpeechRecognition — free, no
// backend, no API key. Support is inconsistent (solid in Chrome/Edge,
// absent in Firefox, patchy in Safari), so every caller must check
// `speechRecognitionSupported()` and degrade gracefully when it's false.

import { spellOutNumbers, type NumberLang } from './numbers';

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
  | { status: 'cancelled' }
  | { status: 'error'; error: string }
  | { status: 'not-supported' };

export interface ListenSession {
  /** Resolves once listening has stopped — never rejects. */
  result: Promise<ListenResult>;
  /** The speaker is finished: stop the mic now and grade what was heard. */
  done: () => void;
  /** Stop the mic and throw away whatever was heard. */
  cancel: () => void;
}

/** Hard ceiling so a forgotten session can't keep the mic open. */
const MAX_LISTEN_MS = 30_000;

/**
 * Joins the recognizer's result chunks into one transcript. Android Chrome in
 * continuous mode sometimes repeats earlier chunks cumulatively ("Ich", "Ich
 * bin", "Ich bin müde"), so a chunk that already contains the text so far
 * replaces it instead of being appended.
 */
function joinChunks(chunks: string[]): string {
  let text = '';
  for (const raw of chunks) {
    const chunk = raw.trim();
    if (!chunk) continue;
    const t = normalizeText(text);
    const c = normalizeText(chunk);
    if (!text || c.startsWith(t)) text = chunk;
    else if (!t.endsWith(c)) text = `${text} ${chunk}`;
  }
  return text;
}

/**
 * Start listening and keep the mic open until the caller says the speaker is
 * `done()` (or cancels, or the browser gives up on its own). The mic is only
 * in use for the life of one session — permission stays granted, but nothing
 * is recorded between sessions. `onTranscript` receives live text as it's heard.
 */
export function startListening({
  lang = 'de-DE',
  onTranscript,
}: { lang?: string; onTranscript?: (text: string) => void } = {}): ListenSession {
  const Ctor = ctor();
  if (!Ctor) return { result: Promise.resolve({ status: 'not-supported' }), done: () => {}, cancel: () => {} };

  const numberLang: NumberLang = lang.startsWith('de') ? 'de' : 'en';
  const recognition = new Ctor();
  recognition.lang = lang;
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  let transcript = '';
  let cancelled = false;
  let settled = false;
  let resolve!: (result: ListenResult) => void;
  const result = new Promise<ListenResult>((r) => (resolve = r));

  const timer = window.setTimeout(() => recognition.stop(), MAX_LISTEN_MS);
  const finish = (value: ListenResult) => {
    if (settled) return;
    settled = true;
    window.clearTimeout(timer);
    resolve(value);
  };

  recognition.onresult = (event) => {
    const chunks: string[] = [];
    for (let i = 0; i < event.results.length; i++) chunks.push(event.results[i][0]?.transcript ?? '');
    // Show numbers the way they were said ("sieben Uhr"), not as the recognizer's digits ("7:00").
    transcript = spellOutNumbers(joinChunks(chunks), numberLang);
    onTranscript?.(transcript);
  };
  recognition.onerror = (event) => {
    // "aborted" is our own cancel(); "no-speech" just means silence — let onend report it.
    if (event.error === 'aborted' || event.error === 'no-speech') return;
    finish({ status: 'error', error: event.error });
  };
  // Fires after stop()/abort() once the final results are in — the mic is released by now.
  recognition.onend = () => {
    if (cancelled) finish({ status: 'cancelled' });
    else finish(transcript.trim() ? { status: 'result', transcript } : { status: 'no-match' });
  };

  try {
    recognition.start();
  } catch (err) {
    finish({ status: 'error', error: String(err) });
  }

  return {
    result,
    done: () => recognition.stop(),
    cancel: () => {
      cancelled = true;
      recognition.abort();
    },
  };
}

/**
 * Canonical form for comparing answers: numbers spelled out as words (so
 * "7:00", "7 Uhr" and "sieben Uhr" are the same), lower case, no punctuation.
 * In English "o'clock" is dropped, so "at 7" and "at seven o'clock" match.
 */
export function normalizeText(text: string, lang: NumberLang = 'de'): string {
  let normalized = spellOutNumbers(text, lang)
    .toLowerCase()
    .replace(/[.,!?;:'"„“‚‘’]/g, '')
    .replace(/-/g, ' ');
  if (lang === 'en') normalized = normalized.replace(/\boclock\b/g, '');
  return normalized.replace(/\s+/g, ' ').trim();
}

function levenshtein(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const d: number[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
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
export function textSimilarity(a: string, b: string, lang: NumberLang = 'de'): number {
  const na = normalizeText(a, lang);
  const nb = normalizeText(b, lang);
  if (na === nb) return 1;
  const maxLen = Math.max(na.length, nb.length, 1);
  return 1 - levenshtein(na, nb) / maxLen;
}

export const SPOKEN_MATCH_THRESHOLD = 0.82;
