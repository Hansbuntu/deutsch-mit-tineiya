import { useState } from 'react';
import type { Drill, DrillKind } from '../data/types';

const titleByKind: Record<DrillKind, string> = {
  conjugation: 'Conjugation',
  'separable-position': 'Word order',
  article: 'Der, die, or das?',
  'word-order': 'Word order',
};

export function DrillPanel({ drill, onAnswer }: { drill: Drill; onAnswer: (correct: boolean) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    if (selectedId) return;
    setSelectedId(optionId);
    onAnswer(optionId === drill.correctOptionId);
  };

  const answeredCorrectly = selectedId === drill.correctOptionId;
  const correctLabel = drill.options.find((o) => o.id === drill.correctOptionId)?.label ?? drill.correctOptionId;
  const isFillInBlank = drill.kind !== 'word-order';

  return (
    <div className="side-card">
      <div className="stack-label">sentence pattern</div>
      <h3>{titleByKind[drill.kind]}</h3>
      {isFillInBlank ? (
        <p className="pattern-line">
          {drill.promptParts[0]}
          <span className="blank">{selectedId ?? '____'}</span>
          {drill.promptParts[1]}
        </p>
      ) : (
        <p className="pattern-line">{drill.promptParts[0]}</p>
      )}
      <div className="options">
        {drill.options.map((option) => {
          const isSelected = selectedId === option.id;
          const isCorrectOption = option.id === drill.correctOptionId;
          const showState = selectedId !== null && (isSelected || isCorrectOption);
          const cls = showState ? (isCorrectOption ? 'option correct' : 'option incorrect') : 'option';
          return (
            <button key={option.id} type="button" className={cls} disabled={selectedId !== null} onClick={() => handleSelect(option.id)}>
              {option.label}
            </button>
          );
        })}
      </div>
      {selectedId && (
        <p className={`drill-feedback${answeredCorrectly ? '' : ' incorrect'}`}>
          {answeredCorrectly ? 'Correct!' : `Not quite — it's "${correctLabel}".`}
        </p>
      )}
      {drill.note && <p className="note" style={{ marginTop: 14 }}>{drill.note}</p>}
    </div>
  );
}
