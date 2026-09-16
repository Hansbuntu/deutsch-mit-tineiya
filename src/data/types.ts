// Core data model for Deutsch mit Tineiya.
// Kept intentionally extensible: new card types, drill kinds, and topics
// can be added without touching the screens that consume them.

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'number'
  | 'phrase'
  | 'conjunction'
  | 'other';

export type Article = 'der' | 'die' | 'das';

export interface ExampleSentence {
  de: string;
  en: string;
}

/** Where a card's image comes from. `photo` is unused today but kept so a
 * future pass can swap in real photos per word without a schema change. */
export type CardImage =
  | { kind: 'icon'; icon: IconName }
  | { kind: 'photo'; src: string; alt: string };

export type CardSource = 'notebook' | 'curated' | 'frequency-list' | 'tiktok' | 'a1-bank';

/** CEFR level. Not stored per-card — derived (see lib/level.ts) from
 * existing signals (frequencyRank, source) so there's nothing to keep in
 * sync as content grows. Only A1/A2 are ever produced today, matching the
 * app's actual content; the wider union is here so B1+ content can slot in
 * later without a schema change. */
export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

interface CardBase {
  id: string;
  topicIds: string[];
  partOfSpeech: PartOfSpeech;
  image: CardImage;
  example?: ExampleSentence;
  note?: string;
  /** Rank within the frequency word list, when this card belongs to it. */
  frequencyRank?: number;
  source: CardSource;
}

export interface NounCard extends CardBase {
  type: 'noun';
  partOfSpeech: 'noun';
  word: string;
  article: Article;
  plural?: string;
  translation: string;
}

export interface ConjugationSet {
  ich: string;
  du: string;
  erSieEs: string;
  wir: string;
  ihr: string;
  sieSie: string;
}

export interface VerbCard extends CardBase {
  type: 'verb';
  partOfSpeech: 'verb';
  infinitive: string;
  translation: string;
  separable: boolean;
  /** Separable prefix, e.g. "auf" in "aufstehen" — used to highlight it in example sentences. */
  prefix?: string;
  conjugation: ConjugationSet;
  stemChanging?: boolean;
  stemChangeNote?: string;
}

/** Catch-all for adjectives, adverbs, numbers, phrases, etc. */
export interface VocabCard extends CardBase {
  type: 'vocab';
  word: string;
  translation: string;
}

/**
 * A full sentence to memorize as a unit — a "core sentence" pulled from a
 * TikTok passage, or an entry in the generic A1 sentence bank. Rendered
 * differently from single-word cards (no giant headword).
 */
export interface SentenceCard extends CardBase {
  type: 'sentence';
  partOfSpeech: 'phrase';
  de: string;
  en: string;
  /** Substring of `de` to highlight — the grammar point this sentence demonstrates. */
  emphasis?: string;
}

export type Card = NounCard | VerbCard | VocabCard | SentenceCard;

/** A full passage (a TikTok script) kept as continuous text for reading/memorization,
 * separate from the flashcards extracted from it. */
export interface Passage {
  id: string;
  topicId: string;
  title: string;
  paragraphs: string[];
}

export type TopicGroup = 'notebook' | 'tiktok' | 'grammar' | 'a1-sentences';

export interface Topic {
  id: string;
  name: string;
  tagline?: string;
  featured?: boolean;
  group: TopicGroup;
}

// ---------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------

export type DrillKind = 'conjugation' | 'separable-position' | 'article' | 'word-order';

export interface DrillOption {
  id: string;
  label: string;
}

export interface Drill {
  id: string;
  kind: DrillKind;
  cardId: string;
  /**
   * Sentence split around the blank: [textBeforeBlank, textAfterBlank].
   * For 'word-order' drills there's no blank — promptParts[0] holds the
   * instruction text instead and promptParts[1] is empty; options hold
   * full sentence variants rather than single words.
   */
  promptParts: [string, string];
  options: DrillOption[];
  correctOptionId: string;
  note?: string;
}

// ---------------------------------------------------------------------
// Icons — a fixed registry name, resolved to SVG markup in components/icons.
// Bulk vocab cards reuse a small set of category icons rather than unique
// art per word; hand-curated cards get a dedicated icon.
// ---------------------------------------------------------------------

export type IconName =
  // dedicated (separable verbs)
  | 'alarm-clock'
  | 'sunrise'
  | 'clapperboard'
  | 'phone-call'
  | 'shopping-bag'
  | 'door-exit'
  | 'walk-together'
  | 'puzzle'
  | 'door-closed'
  | 'window-open'
  | 'train'
  | 'bus-enter'
  | 'bus-exit'
  | 'return-arrow'
  | 'trend-down'
  // dedicated (curated nouns/topics)
  | 'newspaper'
  | 'coffee-cup'
  | 'croissant'
  | 'clock'
  | 'house'
  | 'book'
  | 'table'
  | 'key'
  | 'bag'
  | 'bed'
  | 'car'
  | 'phone'
  | 'money'
  | 'calendar'
  | 'sun'
  | 'menu'
  | 'bill'
  // category fallbacks (bulk frequency-word pool)
  | 'category-person'
  | 'category-family'
  | 'category-food'
  | 'category-drink'
  | 'category-home'
  | 'category-time'
  | 'category-travel'
  | 'category-nature'
  | 'category-weather'
  | 'category-body'
  | 'category-clothing'
  | 'category-work'
  | 'category-communication'
  | 'category-question'
  | 'category-number'
  | 'category-animal'
  | 'category-money'
  | 'category-emotion'
  | 'category-color'
  | 'category-place'
  | 'category-action'
  | 'category-object'
  | 'category-quality'
  | 'category-music';
