import { allCards } from '../data/cards';
import { topicById } from '../data/topics';
import type { Card } from '../data/types';

// Chronological order the learner actually encountered these topics in
// (notebook verbs first, then the TikTok scripts one per week). Only
// topics in this list participate in "you've seen this before" — the
// generic grammar/vocab decks and the A1 sentence bank are intentionally
// excluded since they're meant to stand alone.
const TRACKED_TOPIC_ORDER = ['trennbare-verben', 'mein-tag', 'mein-zuhause', 'ueber-mich', 'mein-leben'];

function normalizeKey(card: Card): string {
  const raw = card.type === 'verb' ? card.infinitive : card.type === 'sentence' ? card.de : card.word;
  return raw.trim().toLowerCase();
}

export interface SeenBefore {
  topicName: string;
}

/**
 * If this card's word/sentence already appeared in an earlier tracked
 * topic, return where — so the UI can show "you've seen this before"
 * instead of treating every topic as a sealed vocabulary set.
 */
export function seenBeforeInfo(card: Card): SeenBefore | null {
  const myTopicId = card.topicIds.find((t) => TRACKED_TOPIC_ORDER.includes(t));
  if (!myTopicId) return null;
  const myIndex = TRACKED_TOPIC_ORDER.indexOf(myTopicId);
  if (myIndex <= 0) return null;

  const key = normalizeKey(card);
  for (let i = 0; i < myIndex; i++) {
    const earlierTopicId = TRACKED_TOPIC_ORDER[i];
    const seenEarlier = allCards.some(
      (c) => c.id !== card.id && c.topicIds.includes(earlierTopicId) && normalizeKey(c) === key,
    );
    if (seenEarlier) {
      return { topicName: topicById(earlierTopicId)?.name ?? earlierTopicId };
    }
  }
  return null;
}
