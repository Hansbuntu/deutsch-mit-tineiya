import type { Article, Card, Drill, DrillOption, NounCard, VerbCard, VocabCard } from '../data/types';
import { allCards } from '../data/cards';
import { verbs as allVerbs } from '../data/verbs';
import { grammarDrillsByCardId } from '../data/grammarDrills';
import { escapeRegExp, splitOnWord, shuffle } from './text';

function toOptions(labels: string[]): DrillOption[] {
  return labels.map((label) => ({ id: label, label }));
}

/** Fill-in-the-blank on the conjugated verb form, e.g. "Der Film ___ um 8 Uhr an." */
function buildConjugationDrill(card: VerbCard): Drill | null {
  if (!card.example) return null;
  const entries = Object.entries(card.conjugation) as [string, string][];
  const uniqueValues = [...new Set(entries.map(([, v]) => v))];

  const correctValue = uniqueValues.find((v) => new RegExp(`\\b${escapeRegExp(v)}\\b`, 'i').test(card.example!.de));
  if (!correctValue) return null;

  const split = splitOnWord(card.example.de, correctValue);
  if (!split) return null;

  const distractors = shuffle(uniqueValues.filter((v) => v !== correctValue)).slice(0, 2);
  if (distractors.length < 2) return null;

  return {
    id: `conj-${card.id}`,
    kind: 'conjugation',
    cardId: card.id,
    promptParts: split,
    options: shuffle([correctValue, ...distractors]).map((label) => ({ id: label, label })),
    correctOptionId: correctValue,
    note: card.stemChangeNote,
  };
}

/** Fill-in-the-blank on the separable prefix at the end of the sentence. */
function buildSeparablePositionDrill(card: VerbCard, prefixPool: string[]): Drill | null {
  if (!card.example || !card.separable || !card.prefix) return null;
  const split = splitOnWord(card.example.de, card.prefix);
  if (!split) return null;

  const otherPrefixes = shuffle([...new Set(prefixPool)].filter((p) => p !== card.prefix)).slice(0, 2);
  if (otherPrefixes.length < 2) return null;

  return {
    id: `sep-${card.id}`,
    kind: 'separable-position',
    cardId: card.id,
    promptParts: split,
    options: shuffle([card.prefix, ...otherPrefixes]).map((label) => ({ id: label, label })),
    correctOptionId: card.prefix,
    note: 'The separable prefix goes at the end of the sentence.',
  };
}

/** Fill-in-the-blank on the article, in a neutral nominative carrier sentence. */
function buildArticleDrill(card: NounCard): Drill {
  const others = (['der', 'die', 'das'] as Article[]).filter((a) => a !== card.article);
  return {
    id: `art-${card.id}`,
    kind: 'article',
    cardId: card.id,
    promptParts: ['', ` ${card.word} ist hier.`],
    options: toOptions(shuffle([card.article, ...others])),
    correctOptionId: card.article,
  };
}

const vocabCards = allCards.filter((c): c is VocabCard => c.type === 'vocab');

/**
 * "What does „schon“ mean?" — for words with no grammar to drill (adverbs,
 * adjectives, pronouns, …), so studying them can count toward "learned".
 * Wrong options are meanings of other words of the same kind.
 */
function buildMeaningDrill(card: VocabCard): Drill | null {
  const others = vocabCards.filter((c) => c.id !== card.id && c.translation !== card.translation);
  const sameKind = others.filter((c) => c.partOfSpeech === card.partOfSpeech);
  const pool = [...new Set((sameKind.length >= 2 ? sameKind : others).map((c) => c.translation))];
  const distractors = shuffle(pool).slice(0, 2);
  if (distractors.length < 2) return null;
  return {
    id: `meaning-${card.id}`,
    kind: 'meaning',
    cardId: card.id,
    promptParts: [`What does „${card.word}“ mean?`, ''],
    options: toOptions(shuffle([card.translation, ...distractors])),
    correctOptionId: card.translation,
  };
}

/**
 * Build a recognition drill for a card, preferring distractors drawn from
 * verbs already seen earlier in the current session (falls back to the
 * full verb set when the session hasn't seen enough yet).
 */
export function generateDrillForCard(card: Card, sessionSeenVerbs: VerbCard[]): Drill | null {
  const handAuthored = grammarDrillsByCardId[card.id];
  if (handAuthored) return handAuthored;
  if (card.type === 'verb') {
    const prefixSource = sessionSeenVerbs.length >= 3 ? sessionSeenVerbs : allVerbs;
    const prefixPool = prefixSource.filter((v) => v.separable && v.prefix).map((v) => v.prefix!);
    // alternate between the two drill kinds so both get practiced
    const preferSeparable = Math.random() < 0.5;
    const separable = card.separable ? buildSeparablePositionDrill(card, prefixPool) : null;
    const conjugation = buildConjugationDrill(card);
    if (preferSeparable && separable) return separable;
    return conjugation ?? separable;
  }
  if (card.type === 'noun') {
    return buildArticleDrill(card);
  }
  if (card.type === 'vocab') {
    return buildMeaningDrill(card);
  }
  return null;
}
