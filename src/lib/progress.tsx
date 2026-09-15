import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { allCards } from '../data/cards';

const STORAGE_KEY = 'deutsch-mit-milan:progress:v1';

export interface CardProgress {
  seenCount: number;
  correctCount: number;
  lastSeenISO: string;
  learned: boolean;
}

interface ProgressState {
  version: 1;
  firstUseISO: string;
  activeDates: string[]; // unique yyyy-mm-dd
  cards: Record<string, CardProgress>;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ProgressState;
      if (parsed.version === 1) return parsed;
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
  isLearned: (cardId: string) => boolean;
  markSeen: (cardId: string) => void;
  markAnswer: (cardId: string, correct: boolean) => void;
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

    return {
      daysActive: state.activeDates.length,
      totalCardsSeen: records.length,
      totalCardsLearned: learnedIds.size,
      notebookPagesDigitized: allCards.filter((c) => c.source === 'notebook').length,
      frequencyListLearned: [...learnedIds].filter((id) => frequencyIds.has(id)).length,
      isLearned: (cardId: string) => state.cards[cardId]?.learned ?? false,
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
              },
            },
          };
        }),
      markAnswer: (cardId: string, correct: boolean) =>
        setState((s) => {
          const prev = s.cards[cardId] ?? { seenCount: 0, correctCount: 0, lastSeenISO: todayISO(), learned: false };
          const correctCount = prev.correctCount + (correct ? 1 : 0);
          return {
            ...s,
            cards: {
              ...s.cards,
              [cardId]: {
                ...prev,
                correctCount,
                lastSeenISO: todayISO(),
                learned: prev.learned || correctCount >= LEARNED_THRESHOLD,
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
