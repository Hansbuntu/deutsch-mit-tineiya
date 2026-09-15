import type { Card } from '../data/types';

export function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** The single string a card's sound button speaks — shared with scripts/generate-audio.mjs
 * so pre-generated audio filenames and runtime lookups always agree. */
export function speakableText(card: Card): string {
  if (card.type === 'verb') return card.infinitive;
  if (card.type === 'sentence') return card.de;
  return card.word;
}

/**
 * Deterministic short hash (FNV-1a, 32-bit) of a card's spoken text, used as
 * the pre-generated audio filename. Pure JS, no crypto API — must stay
 * byte-identical between the browser (lib/speech.ts) and the Node build
 * script (scripts/generate-audio.mjs).
 */
export function audioKeyForText(text: string): string {
  const normalized = text.trim().toLowerCase();
  let hash = 0x811c9dc5;
  for (let i = 0; i < normalized.length; i++) {
    hash ^= normalized.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/** Split `sentence` around the first whole-word match of `word` (case-insensitive). */
export function splitOnWord(sentence: string, word: string): [string, string] | null {
  const re = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'i');
  const match = re.exec(sentence);
  if (!match) return null;
  return [sentence.slice(0, match.index), sentence.slice(match.index + match[0].length)];
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
