import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { allCards, cardsForTopic } from '../data/cards';

/** How far through one topic the learner is. */
export interface TopicProgress {
  total: number;
  /** Cards worked through at least once — looked at in a session, answered, or spoken. */
  done: number;
  /** Cards answered correctly twice (see LEARNED_THRESHOLD). */
  learned: number;
  /** Every card worked through. */
  finished: boolean;
}

const KNOWN_IDS = new Set(allCards.map((c) => c.id));

const STORAGE_KEY = 'deutsch-mit-tineiya:progress:v1';

export interface CardProgress {
  seenCount: number;
  correctCount: number;
  lastSeenISO: string;
  learned: boolean;
  // Review schedule (a light Leitner system). Optional so older saved progress still loads.
  /** 0 = just seen or just missed; each first-try correct answer moves it up a box. */
  box?: number;
  /** yyyy-mm-dd the card is next due for review. */
  dueISO?: string;
  /** Result of the most recent graded answer — missed cards review first. */
  lastCorrect?: boolean;
  /** How many times it was answered wrong. */
  lapses?: number;
}

/** The ways of practising the app tracks, so recommendations can spot a skill left untouched. */
export type ActivityKind = 'flashcards' | 'speaking' | 'listening' | 'writing' | 'reading' | 'review';

export interface ActivityRecord {
  count: number;
  /** yyyy-mm-dd of the last time. */
  lastISO: string;
}

interface ProgressState {
  version: 1;
  firstUseISO: string;
  activeDates: string[]; // unique yyyy-mm-dd
  cards: Record<string, CardProgress>;
  /** Optional so progress saved before activity tracking still loads. */
  activity?: Partial<Record<ActivityKind, ActivityRecord>>;
}

/** Local calendar date as yyyy-mm-dd ("today" should mean the learner's today, not UTC's). */
function toISODate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function todayISO() {
  return toISODate(new Date());
}

function addDaysISO(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

/** Days until the next review after a first-try correct answer, by box (box 1 → 1 day, box 2 → 3 days, …). */
const REVIEW_INTERVALS = [0, 1, 3, 7, 14, 30, 60];
const MAX_BOX = REVIEW_INTERVALS.length - 1;

/**
 * Cards that used to share an id with a frequency-list word (so one record
 * counted for both) and were given their own id. Progress saved before the
 * split is copied to the new id, so neither card loses its history.
 */
const SPLIT_IDS: Record<string, string> = {
  arbeit: 'arbeit-alltag',
  kochen: 'kochen-meintag',
  schlafen: 'schlafen-meintag',
  schreiben: 'schreiben-uebermich',
  reisen: 'reisen-uebermich',
  verstehen: 'verstehen-uebermich',
};

function migrate(state: ProgressState): ProgressState {
  const cards = { ...state.cards };
  for (const [sharedId, newId] of Object.entries(SPLIT_IDS)) {
    if (cards[sharedId] && !cards[newId]) cards[newId] = { ...cards[sharedId] };
  }
  return { ...state, cards };
}

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ProgressState;
      if (parsed.version === 1) return migrate(parsed);
    }
  } catch {
    // ignore corrupt/blocked storage, fall through to a fresh state
  }
  return { version: 1, firstUseISO: todayISO(), activeDates: [], cards: {} };
}

interface ProgressContextValue {
  daysActive: number;
  totalCardsSeen: number;
  totalCardsLearned: number;
  notebookPagesDigitized: number;
  frequencyListLearned: number;
  /** Frequency-list words worked through at least once (seen, answered or spoken). */
  frequencyListPractised: number;
  isLearned: (cardId: string) => boolean;
  /** The saved record for a card, if it has been studied. */
  recordFor: (cardId: string) => CardProgress | undefined;
  topicProgress: (topicId: string) => TopicProgress;
  /** Card ids due for review today — missed cards first, then the longest overdue. */
  reviewQueue: string[];
  /** The next day something comes due after today, if nothing is due now. */
  nextReview: { dateISO: string; count: number } | null;
  markSeen: (cardId: string) => void;
  markAnswer: (cardId: string, correct: boolean) => void;
  /** When each kind of practice was last done (empty until it has been). */
  activity: Partial<Record<ActivityKind, ActivityRecord>>;
  logActivity: (kind: ActivityKind) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

const LEARNED_THRESHOLD = 2; // correct drill answers before a card counts as "learned"

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(loadState);

  useEffect(() => {
    const today = todayISO();
    setState((s) => (s.activeDates.includes(today) ? s : { ...s, activeDates: [...s.activeDates, today] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable (private browsing, quota) — progress just won't persist
    }
  }, [state]);

  const value = useMemo<ProgressContextValue>(() => {
    const records = Object.values(state.cards);
    const learnedIds = new Set(Object.entries(state.cards).filter(([, r]) => r.learned).map(([id]) => id));
    const frequencyIds = new Set(allCards.filter((c) => c.source === 'frequency-list').map((c) => c.id));

    const today = todayISO();
    const scheduled = Object.entries(state.cards).filter(
      (entry): entry is [string, CardProgress & { dueISO: string }] => !!entry[1].dueISO && KNOWN_IDS.has(entry[0]),
    );
    const reviewQueue = scheduled
      .filter(([, r]) => r.dueISO <= today)
      .sort(([, a], [, b]) => {
        const missedA = a.lastCorrect === false ? 0 : 1;
        const missedB = b.lastCorrect === false ? 0 : 1;
        return missedA - missedB || a.dueISO.localeCompare(b.dueISO) || (a.box ?? 0) - (b.box ?? 0);
      })
      .map(([id]) => id);
    const upcoming = scheduled.map(([, r]) => r.dueISO).filter((d) => d > today).sort();
    const nextReview =
      reviewQueue.length === 0 && upcoming.length > 0
        ? { dateISO: upcoming[0], count: upcoming.filter((d) => d === upcoming[0]).length }
        : null;

    return {
      daysActive: state.activeDates.length,
      totalCardsSeen: records.length,
      totalCardsLearned: learnedIds.size,
      notebookPagesDigitized: allCards.filter((c) => c.source === 'notebook').length,
      frequencyListLearned: [...learnedIds].filter((id) => frequencyIds.has(id)).length,
      frequencyListPractised: Object.keys(state.cards).filter((id) => frequencyIds.has(id)).length,
      isLearned: (cardId: string) => state.cards[cardId]?.learned ?? false,
      recordFor: (cardId: string) => state.cards[cardId],
      topicProgress: (topicId: string) => {
        const cards = cardsForTopic(topicId);
        const done = cards.filter((c) => state.cards[c.id]).length;
        const learned = cards.filter((c) => state.cards[c.id]?.learned).length;
        return { total: cards.length, done, learned, finished: cards.length > 0 && done === cards.length };
      },
      reviewQueue,
      nextReview,
      activity: state.activity ?? {},
      logActivity: (kind: ActivityKind) =>
        setState((s) => {
          const prev = s.activity?.[kind];
          return {
            ...s,
            activity: { ...s.activity, [kind]: { count: (prev?.count ?? 0) + 1, lastISO: todayISO() } },
          };
        }),
      markSeen: (cardId: string) =>
        setState((s) => {
          const prev = s.cards[cardId];
          return {
            ...s,
            cards: {
              ...s.cards,
              [cardId]: {
                seenCount: (prev?.seenCount ?? 0) + 1,
                correctCount: prev?.correctCount ?? 0,
                lastSeenISO: todayISO(),
                learned: prev?.learned ?? false,
                // First sighting schedules a first review for tomorrow; later sightings leave the schedule alone.
                box: prev?.box ?? 0,
                dueISO: prev?.dueISO ?? addDaysISO(1),
                lastCorrect: prev?.lastCorrect,
                lapses: prev?.lapses,
              },
            },
          };
        }),
      markAnswer: (cardId: string, correct: boolean) =>
        setState((s) => {
          const prev = s.cards[cardId] ?? { seenCount: 0, correctCount: 0, lastSeenISO: todayISO(), learned: false };
          const correctCount = prev.correctCount + (correct ? 1 : 0);
          // Right: move up a box and wait longer. Wrong: back to box 0, due again today.
          const box = correct ? Math.min((prev.box ?? 0) + 1, MAX_BOX) : 0;
          return {
            ...s,
            cards: {
              ...s.cards,
              [cardId]: {
                ...prev,
                correctCount,
                lastSeenISO: todayISO(),
                learned: prev.learned || correctCount >= LEARNED_THRESHOLD,
                box,
                dueISO: addDaysISO(correct ? REVIEW_INTERVALS[box] : 0),
                lastCorrect: correct,
                lapses: (prev.lapses ?? 0) + (correct ? 0 : 1),
              },
            },
          };
        }),
    };
  }, [state]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider');
  return ctx;
}
