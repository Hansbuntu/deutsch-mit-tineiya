import { useState } from 'react';
import { Icon } from './Icon';
import { SoundButton } from './SoundButton';
import type { CefrLevel } from '../data/types';
import { wordDiff, isCloseEnough, type PracticeDirection, type Sentence } from '../lib/practice';
import { listenOnce, speechRecognitionSupported } from '../lib/voice';

export function TypeCheckCard({
  sentence,
  topicLabel,
  level,
  direction,
  onGraded,
}: {
  sentence: Sentence;
  topicLabel: string;
  level: CefrLevel;
  direction: PracticeDirection;
  onGraded?: (correct: boolean) => void;
}) {
  const toGerman = direction === 'en-to-de';
  const prompt = toGerman ? sentence.en : sentence.de;
  const answer = toGerman ? sentence.de : sentence.en;
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
    <article className="surface gen-card rise">
      <div className="gen-tags">
        <span className="tag tag-mono tag-gold">{level}</span>
        <span className="tag">{topicLabel}</span>
        <span className="gen-task" style={{ marginLeft: 'auto' }}>
          {toGerman ? 'Write it in German' : 'Write it in English'}
        </span>
      </div>

      <div className="gen-prompt-row">
        <p className="gen-prompt" lang={toGerman ? 'en' : 'de'}>
          {prompt}
        </p>
        {!toGerman && <SoundButton text={sentence.de} label={sentence.de} />}
      </div>

      {!checked ? (
        <form
          className="type-row"
          onSubmit={(e) => {
            e.preventDefault();
            check(value);
          }}
        >
          <input
            type="text"
            className="type-input"
            lang={toGerman ? 'de' : 'en'}
            placeholder={toGerman ? 'Type or speak your German…' : 'Type or speak your English…'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Your answer"
          />
          {micSupported && (
            <button
              type="button"
              className={`mic-inline${listening ? ' listening' : ''}`}
              onClick={handleMic}
              aria-label={listening ? 'Listening' : 'Speak your answer'}
            >
              <Icon name="mic" />
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={!value.trim()}>
            Check
          </button>
        </form>
      ) : (
        <div className={`diff ${correct ? 'ok' : 'bad'}`} role="status">
          <p className="diff-head">
            <Icon name={correct ? 'check' : 'x'} />
            {correct ? 'Richtig — that works.' : "Not quite — here's the breakdown"}
          </p>
          <div className="diff-line">
            <span className="diff-key">Answer</span>
            <span className="diff-words" lang={toGerman ? 'de' : 'en'}>
              {diff!.expected.map((t, i) => (
                <span key={i} className={`tok ${t.matched ? 'ok' : 'miss'}`}>
                  {t.text}
                </span>
              ))}
            </span>
          </div>
          <div className="diff-line">
            <span className="diff-key">You wrote</span>
            <span className="diff-words">
              {diff!.typed.map((t, i) => (
                <span key={i} className={`tok ${t.matched ? 'ok' : 'miss'}`}>
                  {t.text}
                </span>
              ))}
            </span>
          </div>
          <div className="diff-foot">
            <SoundButton text={sentence.de} label={sentence.de} />
          </div>
        </div>
      )}
    </article>
  );
}
