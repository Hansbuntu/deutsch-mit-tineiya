import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import type { Drill, DrillKind } from '../data/types';
import { shouldIgnoreShortcut } from '../lib/keys';
import { shuffle } from '../lib/text';

const COPY: Record<DrillKind, { eyebrow: string; title: string }> = {
  conjugation: { eyebrow: 'Conjugation', title: 'Pick the right verb form' },
  'separable-position': { eyebrow: 'Separable verbs', title: 'Complete the sentence' },
  article: { eyebrow: 'Articles', title: 'Der, die or das?' },
  'word-order': { eyebrow: 'Word order', title: 'Which order is correct?' },
  meaning: { eyebrow: 'Meaning', title: 'What does it mean?' },
};

export function DrillPanel({ drill, onAnswer }: { drill: Drill; onAnswer: (correct: boolean) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [options, setOptions] = useState(drill.options);
  // After a miss, the learner answers again until they get it; only the first try counts toward progress.
  const [isRetry, setIsRetry] = useState(false);

  const select = (optionId: string) => {
    if (selectedId) return;
    setSelectedId(optionId);
    if (!isRetry) onAnswer(optionId === drill.correctOptionId);
  };

  const tryAgain = () => {
    setOptions((current) => shuffle(current));
    setSelectedId(null);
    setIsRetry(true);
  };

  const answeredCorrectly = selectedId === drill.correctOptionId;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (shouldIgnoreShortcut(event)) return;
      if (selectedId) {
        if (!answeredCorrectly && event.key === 'Enter') {
          event.preventDefault();
          tryAgain();
        }
        return;
      }
      const n = Number(event.key);
      if (Number.isInteger(n) && n >= 1 && n <= options.length) select(options[n - 1].id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, options, isRetry]);

  const labelFor = (id: string | null) => drill.options.find((o) => o.id === id)?.label;
  const correctLabel = labelFor(drill.correctOptionId) ?? drill.correctOptionId;
  const isFillInBlank = drill.kind !== 'word-order' && drill.kind !== 'meaning';
  const copy = COPY[drill.kind];

  return (
    <section className="panel rise-2" aria-label="Practice">
      <header className="panel-head">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h3 className="panel-title">{copy.title}</h3>
      </header>

      {isFillInBlank ? (
        <p className="prompt-line" lang="de">
          {drill.promptParts[0]}
          {/* once answered, the blank always settles on the correct form so the sentence reads right */}
          <span className="blank">{selectedId ? correctLabel : ' '}</span>
          {drill.promptParts[1]}
        </p>
      ) : (
        <p className="prompt-line is-instruction">{drill.promptParts[0]}</p>
      )}

      <div className="option-list" role="group" aria-label="Answers">
        {options.map((option, i) => {
          const isSelected = selectedId === option.id;
          const isCorrect = option.id === drill.correctOptionId;
          const answered = selectedId !== null;
          const state = answered ? (isCorrect ? ' correct' : isSelected ? ' incorrect' : ' dim') : '';
          return (
            <button
              key={option.id}
              type="button"
              className={`option${state}`}
              disabled={answered}
              onClick={() => select(option.id)}
            >
              <span className="option-key">{i + 1}</span>
              <span className="option-label" lang={drill.kind === 'meaning' ? 'en' : 'de'}>
                {option.label}
              </span>
              {answered && isCorrect && <Icon name="check" className="option-state" />}
              {answered && isSelected && !isCorrect && <Icon name="x" className="option-state" />}
            </button>
          );
        })}
      </div>

      {selectedId ? (
        <>
          <div className={`feedback ${answeredCorrectly ? 'ok' : 'bad'}`} role="status">
            <Icon name={answeredCorrectly ? 'check' : 'x'} />
            <span>
              {answeredCorrectly ? (
                isRetry ? (
                  'Corrected — now you’ve got it.'
                ) : (
                  'Richtig — well done.'
                )
              ) : (
                <>
                  Not quite — it's <strong lang="de">“{correctLabel}”</strong>.
                </>
              )}
            </span>
          </div>
          {!answeredCorrectly && (
            <div className="retry-row">
              <button type="button" className="btn btn-primary" onClick={tryAgain}>
                <Icon name="refresh" />
                Try again
              </button>
              <span className="hint kbd-hint">
                or press <span className="kbd">Enter</span>
              </span>
            </div>
          )}
        </>
      ) : (
        <p className="hint kbd-hint" style={{ marginTop: 16 }}>
          {isRetry ? 'Your turn again — ' : ''}Press <span className="kbd">1</span>–
          <span className="kbd">{options.length}</span> to answer
        </p>
      )}

      {drill.note && <p className="panel-note">{drill.note}</p>}
    </section>
  );
}
