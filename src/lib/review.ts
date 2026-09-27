import type { Card } from '../data/types';
import { speakableText } from './text';
import type { Sentence } from './practice';

/** Cards per review round — enough to be worthwhile, short enough for a coffee break. */
export const REVIEW_BATCH = 20;

export interface ReviewItem {
  /** English cue shown first. */
  prompt: string;
  /** German the learner should come up with — nouns include their article. */
  answer: string;
  /** What the sound button plays (the pre-generated clip's text). */
  audioText: string;
  kind: 'word' | 'sentence';
  /** An example sentence shown after revealing a word, for context. */
  example?: Sentence;
}

/**
 * What a review asks for each card: whole sentences are recalled as
 * sentences; words are recalled as words (nouns with der/die/das, since the
 * article is half of knowing a German noun).
 */
export function reviewItemFor(card: Card): ReviewItem {
  const audioText = speakableText(card);
  switch (card.type) {
    case 'sentence':
      return { prompt: card.en, answer: card.de, audioText, kind: 'sentence' };
    case 'noun':
      return { prompt: card.translation, answer: `${card.article} ${card.word}`, audioText, kind: 'word', example: card.example };
    case 'verb':
      return { prompt: card.translation, answer: card.infinitive, audioText, kind: 'word', example: card.example };
    default:
      return { prompt: card.translation, answer: card.word, audioText, kind: 'word', example: card.example };
  }
}

/** "today", "tomorrow", "in 3 days", or a short date further out. */
export function relativeDay(dateISO: string): string {
  const [y, m, d] = dateISO.split('-').map(Number);
  const target = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((target.getTime() - today.getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days < 7) return `in ${days} days`;
  return target.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
