import type { Card } from './types';
import { verbs } from './verbs';
import { curatedCards } from './nouns';
import { frequencyWords } from './frequencyWords';
import { tiktokVocab } from './tiktokVocab';
import { coreSentences } from './coreSentences';
import { a1Sentences } from './a1Sentences';

export const allCards: Card[] = [
  ...verbs,
  ...curatedCards,
  ...frequencyWords,
  ...tiktokVocab,
  ...coreSentences,
  ...a1Sentences,
];

export const cardById = (id: string): Card | undefined => allCards.find((c) => c.id === id);

export const cardsForTopic = (topicId: string): Card[] => allCards.filter((c) => c.topicIds.includes(topicId));

export const FREQUENCY_LIST_TARGET = 1000;
