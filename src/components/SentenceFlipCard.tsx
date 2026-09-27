import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { SoundButton } from './SoundButton';
import type { CefrLevel } from '../data/types';
import type { PracticeDirection, Sentence } from '../lib/practice';
import { shouldIgnoreShortcut } from '../lib/keys';

export function SentenceFlipCard({
  sentence,
  topicLabel,
  level,
  direction,
}: {
  sentence: Sentence;
  topicLabel: string;
  level: CefrLevel;
  direction: PracticeDirection;
}) {
  const [revealed, setRevealed] = useState(false);

  // A new prompt (different sentence, or the direction flipped) should
  // always start hidden again — don't let a stale reveal carry over.
  useEffect(() => {
    setRevealed(false);
  }, [sentence.de, direction]);

  useEffect(() => {
    if (revealed) return;
    const onKey = (event: KeyboardEvent) => {
      if (shouldIgnoreShortcut(event)) return;
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        setRevealed(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [revealed]);

  const headline = direction === 'en-to-de' ? sentence.en : sentence.de;
  const sub = direction === 'en-to-de' ? sentence.de : sentence.en;
  // Only ever offer audio for the German text, and only once it's actually
  // on screen — never let the sound button give away an unrevealed answer.
  const headlineIsGerman = direction === 'de-to-en';

  return (
    <article className="surface gen-card rise">
      <div className="gen-tags">
        <span className="tag tag-mono tag-gold">{level}</span>
        <span className="tag">{topicLabel}</span>
        <span className="gen-task" style={{ marginLeft: 'auto' }}>
          {headlineIsGerman ? 'What does it mean?' : 'How do you say it in German?'}
        </span>
      </div>

      <div className="gen-prompt-row">
        <p className="gen-prompt" lang={headlineIsGerman ? 'de' : 'en'}>
          {headline}
        </p>
        {headlineIsGerman && <SoundButton text={sentence.de} label={sentence.de} />}
      </div>

      {revealed ? (
        <div className="answer">
          <div className="answer-text">
            <span className="answer-label">{headlineIsGerman ? 'English' : 'German'}</span>
            <p lang={headlineIsGerman ? 'en' : 'de'}>{sub}</p>
          </div>
          {!headlineIsGerman && <SoundButton text={sentence.de} label={sentence.de} />}
        </div>
      ) : (
        <button type="button" className="reveal" onClick={() => setRevealed(true)}>
          <Icon name="eye" />
          Think it through, then reveal
          <span className="kbd kbd-hint">Space</span>
        </button>
      )}
    </article>
  );
}
