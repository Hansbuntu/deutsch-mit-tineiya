import { useState } from 'react';
import { SceneIcon } from './SceneIcon';
import { SoundButton } from './SoundButton';
import type { Card } from '../data/types';
import { promptAndAnswer, wordDiff, isCloseEnough, type PracticeDirection } from '../lib/practice';
import { listenOnce, speechRecognitionSupported } from '../lib/voice';
import { speakableText } from '../lib/text';

function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
      <path d="M12 18v4" />
      <path d="M8 22h8" />
    </svg>
  );
}

export function TypeCheckCard({
  card,
  direction,
  index,
  total,
  onGraded,
}: {
  card: Card;
  direction: PracticeDirection;
  index: number;
  total: number;
  onGraded?: (correct: boolean) => void;
}) {
  const { prompt, answer } = promptAndAnswer(card, direction);
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [listening, setListening] = useState(false);
  const micSupported = speechRecognitionSupported();

  const diff = checked ? wordDiff(answer, value) : null;
  const correct = checked ? isCloseEnough(answer, value) : false;

  const check = (finalValue: string) => {
    if (!finalValue.trim()) return;
    setChecked(true);
    onGraded?.(isCloseEnough(answer, finalValue));
  };

  const handleMic = async () => {
    setListening(true);
    const result = await listenOnce();
    setListening(false);
    if (result.status === 'result') {
      setValue(result.transcript);
      check(result.transcript);
    }
  };

  return (
    <div className="card">
      <div className="scene">{card.image.kind === 'icon' ? <SceneIcon name={card.image.icon} /> : null}</div>

      <div className="word-row" style={{ marginBottom: 8 }}>
        <span className="source-tag">{direction === 'en-to-de' ? 'EN → DE' : 'DE → EN'}</span>
        <span className="generated-card-index" style={{ marginLeft: 'auto' }}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <p className="core-sentence-text" style={{ marginBottom: 18 }}>
        {prompt}
      </p>

      {!checked ? (
        <div className="type-input-row">
          <input
            type="text"
            className="type-input"
            placeholder={direction === 'en-to-de' ? 'Type or speak the German answer…' : 'Type or speak the English answer…'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && check(value)}
          />
          {micSupported && (
            <button
              type="button"
              className={`mic-inline${listening ? ' listening' : ''}`}
              onClick={handleMic}
              aria-label="Speak your answer"
            >
              <MicIcon />
            </button>
          )}
          <button type="button" className="btn btn-primary" onClick={() => check(value)}>
            Check
          </button>
        </div>
      ) : (
        <div className={`diff-row${correct ? ' correct' : ' incorrect'}`}>
          <p className="drill-feedback" style={{ marginTop: 0 }}>
            {correct ? 'Correct!' : 'Not quite — here\'s the breakdown:'}
          </p>
          <p className="diff-line">
            <span className="note" style={{ border: 'none', padding: 0 }}>
              expected:{' '}
            </span>
            {diff!.expected.map((t, i) => (
              <span key={i} className={`diff-token ${t.matched ? 'matched' : 'unmatched'}`}>
                {t.text}{' '}
              </span>
            ))}
          </p>
          {value.trim() && (
            <p className="diff-line">
              <span className="note" style={{ border: 'none', padding: 0 }}>
                you wrote:{' '}
              </span>
              {diff!.typed.map((t, i) => (
                <span key={i} className={`diff-token ${t.matched ? 'matched' : 'unmatched'}`}>
                  {t.text}{' '}
                </span>
              ))}
            </p>
          )}
          <div className="word-row" style={{ marginTop: 10, marginBottom: 0 }}>
            <SoundButton text={speakableText(card)} label={speakableText(card)} />
          </div>
        </div>
      )}
    </div>
  );
}
