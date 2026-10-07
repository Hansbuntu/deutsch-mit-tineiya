// Tineiya's own TikTok scripts, added in the app (Script editor) rather than in code.
// They're saved in this browser (and in Progress → Backup), and turned into the same
// pieces a built-in script has: a topic, a passage, sentence cards and word cards.
// installUserScripts() adds them to the content lists at startup, before anything
// else reads those lists — so every screen treats them like built-in content.
//
// The four scripts built into the app can be edited too. An edit is saved the same
// way, under the built-in topic's id, and applied on top of the original: its
// pictured word cards, studio audio and grammar drills stay; the passage, title
// and picture change; sentences taken out lose their card; new sentences get one.

import { allCards } from './cards';
import { passages } from './passages';
import { topics } from './topics';
import type { Article, Card, IconName, NounCard, Passage, SentenceCard, Topic, VocabCard } from './types';

export const USER_SCRIPTS_KEY = 'deutsch-mit-tineiya:my-scripts';

export interface ScriptWord {
  word: string;
  article: Article | '';
  english: string;
}

export interface UserScript {
  id: string;
  title: string;
  icon: IconName;
  /** The German script; paragraphs are separated by a blank line. */
  text: string;
  /** English for each sentence, keyed by the German sentence (so editing one line keeps the rest). */
  translations: Record<string, string>;
  words: ScriptWord[];
  createdAt: string;
  updatedAt: string;
}

/** Icons offered in the editor — the same illustration set the built-in topics use. */
export const SCRIPT_ICONS: IconName[] = [
  'sun',
  'house',
  'category-person',
  'category-color',
  'category-music',
  'category-family',
  'category-food',
  'category-place',
  'category-work',
  'category-nature',
  'category-emotion',
  'coffee-cup',
];

export function loadUserScripts(): UserScript[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(USER_SCRIPTS_KEY) ?? '[]');
    return Array.isArray(parsed) ? (parsed as UserScript[]) : [];
  } catch {
    return [];
  }
}

export function saveUserScripts(scripts: UserScript[]) {
  localStorage.setItem(USER_SCRIPTS_KEY, JSON.stringify(scripts));
}

interface BuiltInScript {
  topic: Topic;
  passage: Passage;
  sentenceCards: SentenceCard[];
}

// The built-in scripts as shipped — captured when this module loads, before any edit is applied.
const BUILT_IN = new Map<string, BuiltInScript>(
  passages.flatMap((passage) => {
    const topic = topics.find((t) => t.id === passage.topicId && t.group === 'tiktok');
    if (!topic) return [];
    const sentenceCards = allCards.filter(
      (c): c is SentenceCard => c.type === 'sentence' && c.topicIds.includes(topic.id),
    );
    return [[topic.id, { topic: { ...topic }, passage: { ...passage, paragraphs: [...passage.paragraphs] }, sentenceCards }]];
  }),
);

export const isBuiltInScript = (topicId: string) => BUILT_IN.has(topicId);

/** A built-in script in editor form, as shipped (English filled in for the sentences that have a card). */
export function originalScript(topicId: string): UserScript | undefined {
  const original = BUILT_IN.get(topicId);
  if (!original) return undefined;
  const text = original.passage.paragraphs.join('\n\n');
  const english = new Map(original.sentenceCards.map((c) => [c.de, c.en]));
  const translations = Object.fromEntries(
    splitScript(text)
      .flat()
      .flatMap((de) => (english.has(de) ? [[de, english.get(de)!]] : [])),
  );
  return {
    id: topicId,
    title: original.topic.name,
    icon: original.topic.icon,
    text,
    translations,
    words: [],
    createdAt: '',
    updatedAt: '',
  };
}

/** Paragraphs (split on blank lines), each split into sentences (after . ! ? …). */
export function splitScript(text: string): string[][] {
  return text
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((paragraph) =>
      paragraph
        .replace(/\s+/g, ' ')
        .trim()
        .split(/(?<=[.!?…])\s+(?=\S)/)
        .map((s) => s.trim())
        .filter(Boolean),
    )
    .filter((sentences) => sentences.length > 0);
}

/** Short, stable hash so a sentence keeps its card id (and its progress) across edits. */
function hash(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 0x01000193);
  return (h >>> 0).toString(36);
}

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function newScriptId(title: string): string {
  return `my-${slug(title).slice(0, 24) || 'script'}-${Date.now().toString(36)}`;
}

/** Everything the app needs for one script. */
export function buildFromScript(script: UserScript): { topic: Topic; passage: Passage; cards: Card[] } {
  const paragraphs = splitScript(script.text);
  const image = { kind: 'icon' as const, icon: script.icon };
  const topic: Topic = {
    id: script.id,
    name: script.title,
    tagline: 'your TikTok script',
    group: 'tiktok',
    icon: script.icon,
    custom: true,
  };
  const passage: Passage = {
    id: script.id,
    topicId: script.id,
    title: script.title,
    paragraphs: paragraphs.map((sentences) => sentences.join(' ')),
  };
  const seen = new Set<string>();
  const sentenceCards: SentenceCard[] = paragraphs.flat().flatMap((de) => {
    const en = script.translations[de]?.trim();
    if (!en || seen.has(de)) return []; // a sentence needs its English to be practised
    seen.add(de);
    return [
      {
        id: `${script.id}-s-${hash(de)}`,
        type: 'sentence',
        partOfSpeech: 'phrase',
        topicIds: [script.id],
        source: 'tiktok',
        image,
        de,
        en,
      },
    ];
  });
  const wordCards: (NounCard | VocabCard)[] = script.words
    .filter((w) => w.word.trim() && w.english.trim())
    .map((w) => {
      const base = {
        id: `${script.id}-w-${slug(w.word)}`,
        topicIds: [script.id],
        source: 'tiktok' as const,
        image,
        word: w.word.trim(),
        translation: w.english.trim(),
      };
      return w.article
        ? { ...base, type: 'noun' as const, partOfSpeech: 'noun' as const, article: w.article }
        : { ...base, type: 'vocab' as const, partOfSpeech: 'other' as const };
    });
  return { topic, passage, cards: [...wordCards, ...sentenceCards] };
}

/** Apply an edit of a built-in script on top of the original. */
function applyToBuiltIn(script: UserScript, original: BuiltInScript) {
  const { passage, cards } = buildFromScript(script);
  const topicAt = topics.findIndex((t) => t.id === script.id);
  if (topicAt !== -1) topics[topicAt] = { ...topics[topicAt], name: script.title, icon: script.icon };
  const passageAt = passages.findIndex((p) => p.topicId === script.id);
  if (passageAt !== -1) passages[passageAt] = { ...passages[passageAt], title: script.title, paragraphs: passage.paragraphs };

  const sentencesNow = new Set(passage.paragraphs.flatMap((p) => splitScript(p).flat()));
  const originalText = original.passage.paragraphs.join(' ');
  for (const card of original.sentenceCards) {
    const at = allCards.findIndex((c) => c.id === card.id);
    if (at === -1) continue;
    // A sentence from the script that's been taken out (or reworded) goes; core sentences
    // that were never verbatim in the script stay.
    if (originalText.includes(card.de) && !sentencesNow.has(card.de)) {
      allCards.splice(at, 1);
      continue;
    }
    const en = script.translations[card.de]?.trim();
    if (en && en !== card.en) allCards[at] = { ...card, en };
  }
  const hasCard = new Set(original.sentenceCards.map((c) => c.de));
  allCards.push(...cards.filter((c) => !(c.type === 'sentence' && hasCard.has(c.de))));
}

/** Add the saved scripts to the content lists. Runs once, before the app renders. */
export function installUserScripts() {
  for (const script of loadUserScripts().sort((a, b) => a.createdAt.localeCompare(b.createdAt))) {
    try {
      const original = BUILT_IN.get(script.id);
      if (original) {
        applyToBuiltIn(script, original);
        continue;
      }
      const { topic, passage, cards } = buildFromScript(script);
      topics.push(topic);
      passages.push(passage);
      allCards.push(...cards);
    } catch {
      // one malformed script shouldn't stop the app from starting
    }
  }
}
