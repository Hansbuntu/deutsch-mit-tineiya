import type { SentenceCard } from './types';
import { topicById } from './topics';

// Two more lines from each TikTok script, chosen for the grammar and everyday
// phrasing worth saying out loud, on top of its three core sentences — so
// each script has five sentences to speak. The German must stay word-for-word
// what's in passages.ts. Ids carry the line's position in the script.
const LINES: [topicId: string, line: number, de: string, en: string][] = [
  ['mein-tag', 6, 'Ich wasche mein Gesicht und putze meine Zähne.', 'I wash my face and brush my teeth.'],
  ['mein-tag', 15, 'Am Abend gehe ich nach Hause.', 'In the evening I go home.'],
  [
    'mein-zuhause',
    4,
    'In meinem Zimmer habe ich ein Bett, einen Tisch und einen Stuhl.',
    'In my room I have a bed, a table and a chair.',
  ],
  ['mein-zuhause', 9, 'Neben meinem Tisch ist mein Bett.', 'Next to my table is my bed.'],
  ['ueber-mich', 2, 'Ich komme aus Ghana und wohne in Ghana.', 'I come from Ghana and live in Ghana.'],
  ['ueber-mich', 5, 'Ich mache Kunst, weil ich mich gern ausdrücke.', 'I make art because I like expressing myself.'],
  ['mein-leben', 2, 'Jeden Tag mache ich verschiedene Dinge.', 'Every day I do different things.'],
  [
    'mein-leben',
    10,
    'In meiner Freizeit höre ich Musik und schaue YouTube-Videos.',
    'In my free time I listen to music and watch YouTube videos.',
  ],
];

export const passageSentences: SentenceCard[] = LINES.map(([topicId, line, de, en]) => ({
  id: `passage-${topicId}-${line}`,
  type: 'sentence',
  partOfSpeech: 'phrase',
  topicIds: [topicId],
  source: 'tiktok',
  image: { kind: 'icon', icon: topicById(topicId)?.icon ?? 'category-communication' },
  de,
  en,
}));
