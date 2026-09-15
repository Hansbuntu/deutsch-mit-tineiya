import type { Card } from './types';
import { verbs } from './verbs';
import { curatedCards } from './nouns';
import { frequencyWords } from './frequencyWords';

export const allCards: Card[] = [...verbs, ...curatedCards, ...frequencyWords];

export const cardById = (id: string): Card | undefined => allCards.find((c) => c.id === id);

export const cardsForTopic = (topicId: string): Card[] => allCards.filter((c) => c.topicIds.includes(topicId));

export const FREQUENCY_LIST_TARGET = 1000;
