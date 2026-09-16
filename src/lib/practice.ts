import type { Card } from '../data/types';
import { normalizeText, textSimilarity } from './voice';

export type PracticeDirection = 'en-to-de' | 'de-to-en';

export interface Sentence {
  de: string;
  en: string;
}

/**
 * The full German/English sentence pair for a card, if it has one —
 * SentenceCards trivially do; a Noun/Verb/Vocab card counts only if it
 * carries a hand-written `example` (the bare word + translation don't
 * count as a "sentence"). Cards without either (most of the bulk
 * frequency-word pool) return null and should be excluded anywhere a full
 * sentence is required, e.g. the practice generator.
 */
export function sentenceOf(card: Card): Sentence | null {
  if (card.type === 'sentence') return { de: card.de, en: card.en };
  if (card.example) return { de: card.example.de, en: card.example.en };
  return null;
}

/** The prompt shown and the answer expected, given a practice direction — always a full sentence. */
export function promptAndAnswer(card: Card, direction: PracticeDirection): { prompt: string; answer: string } | null {
  const sentence = sentenceOf(card);
  if (!sentence) return null;
  return direction === 'en-to-de' ? { prompt: sentence.en, answer: sentence.de } : { prompt: sentence.de, answer: sentence.en };
}

export const TYPE_MATCH_THRESHOLD = 0.9;

export interface DiffToken {
  text: string;
  matched: boolean;
}

export interface WordDiff {
  expected: DiffToken[];
  typed: DiffToken[];
  /** Every expected word was said/typed, and nothing extra — a strict word-for-word match. */
  exact: boolean;
}

/**
 * Word-level diff between the expected answer and what the learner typed
 * or said, via longest-common-subsequence over normalized word tokens —
 * shows which words landed, which were missed, and what was said instead,
 * independent of the (more lenient) overall correct/incorrect verdict.
 */
export function wordDiff(expectedRaw: string, typedRaw: string): WordDiff {
  const expectedDisplay = expectedRaw.trim().split(/\s+/).filter(Boolean);
  const typedDisplay = typedRaw.trim().split(/\s+/).filter(Boolean);
  const expectedNorm = expectedDisplay.map((w) => normalizeText(w));
  const typedNorm = typedDisplay.map((w) => normalizeText(w));

  const n = expectedNorm.length;
  const m = typedNorm.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = expectedNorm[i] === typedNorm[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const expectedMatched = new Array<boolean>(n).fill(false);
  const typedMatched = new Array<boolean>(m).fill(false);
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (expectedNorm[i] === typedNorm[j]) {
      expectedMatched[i] = true;
      typedMatched[j] = true;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }

  return {
    expected: expectedDisplay.map((text, idx) => ({ text, matched: expectedMatched[idx] })),
    typed: typedDisplay.map((text, idx) => ({ text, matched: typedMatched[idx] })),
    exact: expectedMatched.every(Boolean) && typedMatched.every(Boolean),
  };
}

/** Overall verdict for a typed/spoken answer — lenient (small typos/omissions still pass). */
export function isCloseEnough(expected: string, actual: string, threshold = TYPE_MATCH_THRESHOLD): boolean {
  return textSimilarity(expected, actual) >= threshold;
}
