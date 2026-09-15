// Pronunciation: the primary path is a pre-generated MP3 (see
// scripts/generate-audio.mjs) — a real neural German voice baked into the
// deploy at build time, so every visitor hears the same quality regardless
// of what's installed on their machine. The browser's speechSynthesis is
// only a fallback, for text that has no pre-generated clip (e.g. a new card
// added without re-running the audio script).
//
// getVoices() returns an empty list on the very first call in most browsers
// (the list loads asynchronously) — calling it synchronously, like a naive
// implementation would, silently falls back to the browser's default voice
// (usually English) even though `lang` is set to 'de-DE'. That produces
// German text read with English phoneme rules, which is why it can sound
// "wrong" rather than simply low-quality. We wait for the real voice list
// before ever speaking.

import { audioKeyForText } from './text';

/** Play the pre-generated clip for `text`, falling back to speechSynthesis if it's missing. */
export function playPronunciation(text: string) {
  const src = `${import.meta.env.BASE_URL}audio/${audioKeyForText(text)}.mp3`;
  let fellBack = false;
  const fallback = () => {
    if (fellBack) return;
    fellBack = true;
    speakGerman(text);
  };
  const audio = new Audio(src);
  audio.addEventListener('error', fallback, { once: true });
  audio.play().catch(fallback);
}

let voicesPromise: Promise<SpeechSynthesisVoice[]> | null = null;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!voicesPromise) {
    voicesPromise = new Promise((resolve) => {
      const existing = window.speechSynthesis.getVoices();
      if (existing.length > 0) {
        resolve(existing);
        return;
      }
      const onVoicesChanged = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
          resolve(voices);
        }
      };
      window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
      // Safari and some mobile browsers never reliably fire voiceschanged —
      // fall back to whatever's loaded after a short wait rather than hang forever.
      setTimeout(() => resolve(window.speechSynthesis.getVoices()), 1000);
    });
  }
  return voicesPromise;
}

// Names of known higher-quality German voices, checked in order. Browsers
// expose these (for free, no API key) when the OS or browser ships them:
// Chrome/ChromeOS bundle "Google Deutsch" (a natural-sounding network
// voice), Edge bundles Microsoft's neural voices, Windows/macOS add their
// own system voices once the German language pack is installed.
const PREFERRED_GERMAN_VOICE_NAMES = [
  'Google Deutsch',
  'Microsoft Katja',
  'Microsoft Conrad',
  'Microsoft Amala',
  'Microsoft Klaus',
  'Anna',
  'Petra',
  'Markus',
  'Helena',
  'Viktor',
];

function pickGermanVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const germanVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('de'));
  if (germanVoices.length === 0) return undefined;

  for (const name of PREFERRED_GERMAN_VOICE_NAMES) {
    const match = germanVoices.find((v) => v.name.includes(name));
    if (match) return match;
  }

  // Prefer de-DE over de-AT/de-CH, and a non-local (often higher-quality
  // network/cloud) voice over a bundled offline one, as a last resort.
  const deDE = germanVoices.filter((v) => v.lang.toLowerCase() === 'de-de');
  const pool = deDE.length > 0 ? deDE : germanVoices;
  return pool.find((v) => !v.localService) ?? pool[0];
}

export async function speakGerman(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const voices = await loadVoices();
  const voice = pickGermanVoice(voices);

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voice?.lang ?? 'de-DE';
  if (voice) utterance.voice = voice;
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/** Whether a German voice is actually available on this device/browser. */
export async function hasGermanVoice(): Promise<boolean> {
  if (!speechSupported()) return false;
  const voices = await loadVoices();
  return voices.some((v) => v.lang.toLowerCase().startsWith('de'));
}
