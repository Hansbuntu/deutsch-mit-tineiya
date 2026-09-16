import { useEffect, useState } from 'react';
import { SceneIcon } from './SceneIcon';
import { SoundButton } from './SoundButton';
import type { IconName } from '../data/types';
import type { PracticeDirection, Sentence } from '../lib/practice';

export function SentenceFlipCard({
  sentence,
  icon,
  topicLabel,
  direction,
  index,
  total,
}: {
  sentence: Sentence;
  icon: IconName;
  topicLabel: string;
  direction: PracticeDirection;
  index: number;
  total: number;
}) {
  const [revealed, setRevealed] = useState(false);

  // A new prompt (different sentence, or the direction flipped) should
  // always start hidden again — don't let a stale reveal carry over.
  useEffect(() => {
    setRevealed(false);
  }, [sentence.de, direction]);

  const headline = direction === 'en-to-de' ? sentence.en : sentence.de;
  const sub = direction === 'en-to-de' ? sentence.de : sentence.en;
  // Only ever offer audio for the German text, and only once it's actually
  // on screen — never let the sound button give away an unrevealed answer.
  const headlineIsGerman = direction === 'de-to-en';

  return (
    <div className="card">
      <div className="scene">
        <SceneIcon name={icon} />
      </div>

      <div className="word-row" style={{ marginBottom: 8 }}>
        <span className="source-tag">{topicLabel}</span>
        <span className="generated-card-index" style={{ marginLeft: 'auto' }}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="word-row" style={{ alignItems: 'flex-start' }}>
        <p className="core-sentence-text" style={{ margin: 0 }}>
          {headline}
        </p>
        {headlineIsGerman && <SoundButton text={sentence.de} label={sentence.de} />}
      </div>

      {revealed ? (
        <div className="word-row" style={{ marginTop: 10, alignItems: 'flex-start' }}>
          <p className="sentence-en" style={{ margin: 0 }}>
            {sub}
          </p>
          {!headlineIsGerman && <SoundButton text={sentence.de} label={sentence.de} />}
        </div>
      ) : (
        <button type="button" className="reveal-btn" onClick={() => setRevealed(true)}>
          ▶ Reveal translation
        </button>
      )}
    </div>
  );
}
