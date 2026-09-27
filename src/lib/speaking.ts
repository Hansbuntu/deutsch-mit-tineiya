import { cardsForTopic } from '../data/cards';
import { passageForTopic } from '../data/passages';
import type { Card } from '../data/types';
import { sentenceOf, type Sentence } from './practice';
import { shuffle } from './text';

/** Sentences per round when a topic has more than that (e.g. the Top 1000 list). */
export const SPEAK_ROUND = 20;

export interface SpeakItem {
  card: Card;
  sentence: Sentence;
}

/**
 * What a topic's speaking practice asks you to say:
 * - topics made of whole sentences (TikTok scripts, A1 sentences) use those —
 *   a script in script order, the rest shuffled;
 * - word topics (verbs, nouns, the Top 1000 list, …) use their example sentences,
 *   words not learned yet first, in rounds of SPEAK_ROUND.
 */
export function speakingItemsFor(topicId: string, isLearned: (cardId: string) => boolean): SpeakItem[] {
  const cards = cardsForTopic(topicId);
  const sentenceCards = cards.filter((c) => c.type === 'sentence');

  if (sentenceCards.length > 0) {
    const items = sentenceCards.map((card) => ({ card, sentence: sentenceOf(card)! }));
    const passage = passageForTopic(topicId);
    if (!passage) return shuffle(items);
    const text = passage.paragraphs.join(' ');
    // Core sentences reworded from the script (not found verbatim) go after the script's own lines.
    const position = (item: SpeakItem) => {
      const at = text.indexOf(item.sentence.de);
      return at === -1 ? Number.MAX_SAFE_INTEGER : at;
    };
    return [...items].sort((a, b) => position(a) - position(b));
  }

  const withExamples = shuffle(
    cards.flatMap((card) => {
      const sentence = sentenceOf(card);
      return sentence ? [{ card, sentence }] : [];
    }),
  );
  const notLearned = withExamples.filter((item) => !isLearned(item.card.id));
  const learned = withExamples.filter((item) => isLearned(item.card.id));
  return [...notLearned, ...learned].slice(0, SPEAK_ROUND);
}

/** Whether a topic has anything to say out loud — whole sentences or example sentences. */
export function hasSpeaking(topicId: string): boolean {
  return cardsForTopic(topicId).some((card) => sentenceOf(card));
}
