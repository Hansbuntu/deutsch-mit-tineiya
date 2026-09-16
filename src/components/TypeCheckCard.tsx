import { useState } from 'react';
import { SoundButton } from './SoundButton';
import { wordDiff, isCloseEnough, type PracticeDirection, type Sentence } from '../lib/practice';
import { listenOnce, speechRecognitionSupported } from '../lib/voice';

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
  sentence,
  topicLabel,
  direction,
  onGraded,
}: {
  sentence: Sentence;
  topicLabel: string;
  direction: PracticeDirection;
  onGraded?: (correct: boolean) => void;
}) {
  const prompt = direction === 'en-to-de' ? sentence.en : sentence.de;
  const answer = direction === 'en-to-de' ? sentence.de : sentence.en;
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
      <div className="word-row" style={{ marginBottom: 8 }}>
        <span className="source-tag">{topicLabel}</span>
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
            <SoundButton text={sentence.de} label={sentence.de} />
          </div>
        </div>
      )}
    </div>
  );
}
