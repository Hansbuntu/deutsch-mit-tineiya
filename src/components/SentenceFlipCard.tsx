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
  const headline = direction === 'en-to-de' ? sentence.en : sentence.de;
  const sub = direction === 'en-to-de' ? sentence.de : sentence.en;

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
        <SoundButton text={sentence.de} label={sentence.de} />
      </div>
      <p className="sentence-en" style={{ marginTop: 8 }}>
        {sub}
      </p>
    </div>
  );
}
