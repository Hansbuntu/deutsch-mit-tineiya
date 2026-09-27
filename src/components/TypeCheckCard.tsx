import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { SoundButton } from './SoundButton';
import type { CefrLevel } from '../data/types';
import { wordDiff, isCloseEnough, type PracticeDirection, type Sentence } from '../lib/practice';
import { startListening, speechRecognitionSupported, type ListenSession } from '../lib/voice';
import { shouldIgnoreShortcut } from '../lib/keys';

export function TypeCheckCard({
  sentence,
  topicLabel,
  level,
  direction,
  onGraded,
  audioText,
}: {
  sentence: Sentence;
  topicLabel: string;
  level: CefrLevel;
  direction: PracticeDirection;
  onGraded?: (correct: boolean) => void;
  /** What the sound button plays, when it differs from the German answer (e.g. "Tisch" for "der Tisch"). */
  audioText?: string;
}) {
  const toGerman = direction === 'en-to-de';
  const prompt = toGerman ? sentence.en : sentence.de;
  const answer = toGerman ? sentence.de : sentence.en;
  const answerLang = toGerman ? 'de' : 'en';
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [listening, setListening] = useState(false);
  const micSupported = speechRecognitionSupported();

  const diff = checked ? wordDiff(answer, value, answerLang) : null;
  const correct = checked ? isCloseEnough(answer, value, answerLang) : false;

  // After a miss the learner answers again until it's right; only the first try counts toward progress.
  const [isRetry, setIsRetry] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const check = (finalValue: string) => {
    if (!finalValue.trim()) return;
    setChecked(true);
    if (!isRetry) onGraded?.(isCloseEnough(answer, finalValue, answerLang));
  };

  const tryAgain = () => {
    setValue('');
    setChecked(false);
    setIsRetry(true);
  };

  useEffect(() => {
    if (isRetry && !checked) inputRef.current?.focus();
  }, [isRetry, checked]);

  // Enter retries after a miss (same key that submitted the answer).
  const missed = checked && !correct;
  useEffect(() => {
    if (!missed) return;
    const onKey = (event: KeyboardEvent) => {
      if (shouldIgnoreShortcut(event) || event.key !== 'Enter') return;
      event.preventDefault();
      tryAgain();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [missed]);

  const session = useRef<ListenSession | null>(null);

  // Release the mic if the card goes away mid-answer.
  useEffect(() => () => session.current?.cancel(), []);

  const handleMic = async () => {
    // Second tap while listening = "I'm done": stop the mic and grade it.
    if (session.current) {
      session.current.done();
      return;
    }
    setListening(true);
    setValue('');
    const current = startListening({ lang: toGerman ? 'de-DE' : 'en-US', onTranscript: setValue });
    session.current = current;
    const result = await current.result;
    session.current = null;
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
        {!toGerman && <SoundButton text={audioText ?? sentence.de} label={sentence.de} />}
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
            ref={inputRef}
            type="text"
            className="type-input"
            lang={toGerman ? 'de' : 'en'}
            readOnly={listening}
            placeholder={
              listening
                ? 'Listening… tap ✓ when you’re done'
                : isRetry
                  ? 'Now write it again, correctly…'
                  : toGerman
                  ? 'Type or speak your German…'
                  : 'Type or speak your English…'
            }
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
              aria-label={listening ? 'Done speaking' : 'Speak your answer'}
              title={listening ? 'Done speaking' : 'Speak your answer'}
            >
              <Icon name={listening ? 'check' : 'mic'} />
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={!value.trim() || listening}>
            Check
          </button>
        </form>
      ) : (
        <div className={`diff ${correct ? 'ok' : 'bad'}`} role="status">
          <p className="diff-head">
            <Icon name={correct ? 'check' : 'x'} />
            {correct
              ? isRetry
                ? 'Corrected — now you’ve got it.'
                : 'Richtig — that works.'
              : "Not quite — here's the breakdown"}
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
            <SoundButton text={audioText ?? sentence.de} label={sentence.de} />
            {!correct && (
              <button type="button" className="btn btn-primary" onClick={tryAgain}>
                <Icon name="refresh" />
                Try again
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
