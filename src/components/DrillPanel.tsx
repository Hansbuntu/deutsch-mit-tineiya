import { useState } from 'react';
import type { Drill, DrillKind } from '../data/types';

const titleByKind: Record<DrillKind, string> = {
  conjugation: 'Konjugation',
  'separable-position': 'Satzstellung',
  article: 'Der, die oder das?',
};

export function DrillPanel({ drill, onAnswer }: { drill: Drill; onAnswer: (correct: boolean) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    if (selectedId) return;
    setSelectedId(optionId);
    onAnswer(optionId === drill.correctOptionId);
  };

  const answeredCorrectly = selectedId === drill.correctOptionId;

  return (
    <div className="side-card">
      <div className="stack-label">satzmuster</div>
      <h3>{titleByKind[drill.kind]}</h3>
      <p className="pattern-line">
        {drill.promptParts[0]}
        <span className="blank">{selectedId ?? '____'}</span>
        {drill.promptParts[1]}
      </p>
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
          {answeredCorrectly ? 'Richtig!' : `Nicht ganz — richtig ist "${drill.correctOptionId}".`}
        </p>
      )}
      {drill.note && <p className="note" style={{ marginTop: 14 }}>{drill.note}</p>}
    </div>
  );
}
