import type { Drill } from './types';

// Hand-authored "which sentence has correct word order?" recognition
// drills for the grammar points that actually show up in each TikTok
// script (verb-second order, dative case, weil-clauses, indirect
// questions). Keyed by the core-sentence card they attach to — looked up
// in lib/drills.ts before the generic per-card-type drill logic runs.
export const grammarDrillsByCardId: Record<string, Drill> = {
  'core-meintag-1': {
    id: 'word-order-meintag',
    kind: 'word-order',
    cardId: 'core-meintag-1',
    promptParts: ['Which sentence has correct word order?', ''],
    options: [
      { id: 'a', label: 'Um sieben Uhr stehe ich auf.' },
      { id: 'b', label: 'Um sieben Uhr ich stehe auf.' },
      { id: 'c', label: 'Ich um sieben Uhr stehe auf.' },
    ],
    correctOptionId: 'a',
    note: 'German main clauses are verb-second: whatever comes first — subject or a time expression — the conjugated verb is always element #2.',
  },
  'core-zuhause-2': {
    id: 'word-order-zuhause',
    kind: 'word-order',
    cardId: 'core-zuhause-2',
    promptParts: ['Which sentence has correct word order?', ''],
    options: [
      { id: 'a', label: 'In meinem Zimmer habe ich ein Bett.' },
      { id: 'b', label: 'In mein Zimmer habe ich ein Bett.' },
      { id: 'c', label: 'In meinen Zimmer habe ich ein Bett.' },
    ],
    correctOptionId: 'a',
    note: '"in" + a fixed location takes the dative case: mein → meinem.',
  },
  'core-uebermich-2': {
    id: 'word-order-uebermich',
    kind: 'word-order',
    cardId: 'core-uebermich-2',
    promptParts: ['Which sentence has correct word order?', ''],
    options: [
      { id: 'a', label: 'Ich lerne Deutsch, weil ich die Sprache interessant finde.' },
      { id: 'b', label: 'Ich lerne Deutsch, weil ich finde die Sprache interessant.' },
      { id: 'c', label: 'Ich lerne Deutsch, weil finde ich die Sprache interessant.' },
    ],
    correctOptionId: 'a',
    note: '"weil" sends the conjugated verb to the very end of its clause.',
  },
  'core-meinleben-2': {
    id: 'word-order-meinleben',
    kind: 'word-order',
    cardId: 'core-meinleben-2',
    promptParts: ['Which sentence has correct word order?', ''],
    options: [
      { id: 'a', label: 'Ich weiß noch nicht, wie mein Leben in der Zukunft aussieht.' },
      { id: 'b', label: 'Ich weiß noch nicht, wie sieht mein Leben in der Zukunft aus.' },
      { id: 'c', label: 'Ich weiß noch nicht, wie mein Leben aussieht in der Zukunft.' },
    ],
    correctOptionId: 'a',
    note: 'An embedded question ("wie...") pushes the verb to the end, same as a weil-clause — including separable verbs like aussehen, which stay joined.',
  },
};
