import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { SoundButton } from '../components/SoundButton';
import { topicById } from '../data/topics';
import { useProgress } from '../lib/progress';
import { speakingItemsFor, SPEAK_ROUND, type SpeakItem } from '../lib/speaking';
import {
  startListening,
  speechRecognitionSupported,
  textSimilarity,
  SPOKEN_MATCH_THRESHOLD,
  type ListenSession,
} from '../lib/voice';
import { shouldIgnoreShortcut } from '../lib/keys';

type Phase = 'prompt' | 'listening' | 'checking' | 'result' | 'error';

const ERROR_MESSAGES: Record<string, string> = {
  'not-allowed': "Microphone access is blocked — allow it in your browser's site settings to practise speaking.",
  'audio-capture': 'No microphone was found on this device.',
  network: 'A network error interrupted speech recognition — check your connection and try again.',
};

export function SpeakSession() {
  const { topicId = '' } = useParams();
  const topic = topicById(topicId);
  const { markAnswer, isLearned } = useProgress();
  const supported = useMemo(speechRecognitionSupported, []);

  const [items, setItems] = useState<SpeakItem[]>(() => speakingItemsFor(topicId, isLearned));
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('prompt');
  const [transcript, setTranscript] = useState('');
  const [correct, setCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [liveText, setLiveText] = useState('');
  // After a miss the learner says it again until it's right; only the first try counts toward progress.
  const [isRetry, setIsRetry] = useState(false);
  const session = useRef<ListenSession | null>(null);

  const stopListening = () => {
    session.current?.cancel();
    session.current = null;
  };

  // Never leave the mic running after leaving the page.
  useEffect(() => stopListening, []);

  useEffect(() => {
    stopListening();
    setItems(speakingItemsFor(topicId, isLearned));
    setIndex(0);
    setPhase('prompt');
    setTranscript('');
    setErrorMessage('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  const item = items[index];
  const finished = index >= items.length;
  // Word topics are practised in rounds; "Go again" deals the next one.
  const isRound = items.length === SPEAK_ROUND && items.every((i) => i.card.type !== 'sentence');

  const reset = () => {
    stopListening();
    setLiveText('');
    setPhase('prompt');
    setTranscript('');
    setErrorMessage('');
  };

  const goTo = (next: number) => {
    setIndex(next);
    setIsRetry(false);
    reset();
  };

  const tryAgain = () => {
    setIsRetry(true);
    reset();
  };

  const handleListen = async () => {
    stopListening();
    setLiveText('');
    setPhase('listening');
    const current = startListening({ onTranscript: setLiveText });
    session.current = current;
    const result = await current.result;
    if (session.current !== current) return; // cancelled, or the card changed
    session.current = null;

    if (result.status === 'result') {
      const isCorrect = textSimilarity(result.transcript, item.sentence.de) >= SPOKEN_MATCH_THRESHOLD;
      setTranscript(result.transcript);
      setCorrect(isCorrect);
      setPhase('result');
      if (!isRetry) markAnswer(item.card.id, isCorrect);
    } else if (result.status === 'no-match') {
      setErrorMessage("Didn't catch that — try again, a little closer to the mic.");
      setPhase('error');
    } else if (result.status !== 'cancelled') {
      setErrorMessage(ERROR_MESSAGES[result.status === 'error' ? result.error : ''] ?? 'Something went wrong — try again.');
      setPhase('error');
    }
  };

  const handleDone = () => {
    setPhase('checking');
    session.current?.done();
  };

  const handleCancel = () => {
    stopListening();
    setLiveText('');
    setPhase('prompt');
  };

  const missed = phase === 'result' && supported && !correct;

  // Enter or Space finishes the answer while listening; Enter retries after a miss.
  useEffect(() => {
    if (phase !== 'listening' && !missed) return;
    const onKey = (event: KeyboardEvent) => {
      if (shouldIgnoreShortcut(event)) return;
      if (phase === 'listening' && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        handleDone();
      } else if (missed && event.key === 'Enter') {
        event.preventDefault();
        tryAgain();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, missed]);

  if (!topic || items.length === 0) {
    return (
      <div className="surface empty">
        <p>{topic ? "There's no speaking practice for this topic yet." : "That topic doesn't exist."}</p>
        <Link to={topic ? `/thema/${topicId}` : '/'} className="btn" style={{ marginTop: 16 }}>
          {topic ? 'Back to cards' : 'Back to topics'}
        </Link>
      </div>
    );
  }

  return (
    <div className="speak">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <Icon name="chevron-right" />
        <Link to={`/thema/${topicId}`}>{topic.name}</Link>
        <Icon name="chevron-right" />
        <span>Speaking</span>
      </nav>

      <header className="reader-head rise">
        <span className="eyebrow no-rule">Speaking practice</span>
        <h1 className="title-xl">{topic.name}</h1>
        <p className="muted">Read the English, then say it in German.</p>
      </header>

      {!supported && (
        <div className="notice">
          <Icon name="info" />
          <span>
            Voice input isn't available in this browser — try Chrome or Edge. You can still reveal each sentence and
            check yourself against the audio.
          </span>
        </div>
      )}

      {finished ? (
        <div className="surface done rise">
          <div className="done-icon">
            <Icon name="trophy" />
          </div>
          <h2 className="title-lg">Gut gesprochen!</h2>
          <p>
            {isRound
              ? `That's a round of ${items.length} sentences from ${topic.name}. Go again for ${SPEAK_ROUND} more — words you haven't learned yet come first.`
              : `That's all ${items.length} sentences from ${topic.name}. Run through them again, or head back to the cards.`}
          </p>
          <div className="done-actions">
            <button
              type="button"
              className="btn"
              onClick={() => {
                if (isRound) setItems(speakingItemsFor(topicId, isLearned));
                goTo(0);
              }}
            >
              <Icon name="refresh" />
              {isRound ? 'Next round' : 'Again'}
            </button>
            <Link to={`/thema/${topicId}`} className="btn btn-primary">
              Back to cards
              <Icon name="arrow-right" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="surface speak-card rise-2" key={`${item.card.id}-${index}`}>
          <div className="session-progress" style={{ width: '100%' }}>
            <div className="meter meter-sage">
              <span style={{ width: `${((index + 1) / items.length) * 100}%` }} />
            </div>
            <span className="session-count">
              <strong>{index + 1}</strong> / {items.length}
            </span>
          </div>

          <span className="eyebrow no-rule">Say this in German</span>
          <p className="speak-prompt">{item.sentence.en}</p>

          {phase === 'prompt' && supported && (
            <>
              <div className="mic-stage">
                <button type="button" className="mic-btn" onClick={handleListen} aria-label="Start speaking">
                  <Icon name="mic" />
                </button>
              </div>
              <p className="mic-caption">
                {isRetry ? 'Now say it again — correctly this time' : 'Tap the microphone, speak, then tap Done'}
              </p>
            </>
          )}

          {(phase === 'listening' || phase === 'checking') && (
            <>
              <div className="mic-stage">
                {phase === 'listening' && (
                  <>
                    <span className="mic-ring" />
                    <span className="mic-ring" />
                    <span className="mic-ring" />
                  </>
                )}
                <button
                  type="button"
                  className="mic-btn listening"
                  onClick={handleDone}
                  disabled={phase === 'checking'}
                  aria-label="Done speaking"
                >
                  <Icon name="check" />
                </button>
              </div>
              <p className={`live-transcript${liveText ? '' : ' is-empty'}`} lang="de" aria-live="polite">
                {liveText || 'Listening… say the sentence'}
              </p>
              {phase === 'listening' ? (
                <div className="listen-actions">
                  <button type="button" className="btn btn-primary" onClick={handleDone}>
                    <Icon name="check" />
                    Done
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="mic-caption">Checking…</p>
              )}
            </>
          )}

          {phase === 'prompt' && !supported && (
            <button type="button" className="btn btn-lg" onClick={() => setPhase('result')}>
              <Icon name="eye" />
              Reveal the sentence
            </button>
          )}

          {phase === 'error' && (
            <>
              <p className="inline-error" role="alert">
                <Icon name="info" />
                {errorMessage}
              </p>
              <button type="button" className="btn btn-primary" onClick={handleListen}>
                <Icon name="mic" />
                Try again
              </button>
            </>
          )}

          {phase === 'result' && (
            <div className={`result ${supported ? (correct ? 'ok' : 'bad') : 'neutral'}`} role="status">
              {supported && (
                <p className="result-status">
                  <Icon name={correct ? 'check' : 'x'} />
                  {correct
                    ? isRetry
                      ? 'Corrected — well said!'
                      : 'Richtig — well said!'
                    : "Not quite. Here's the sentence — listen, then try again:"}
                </p>
              )}
              <div className="result-answer">
                <p lang="de">{item.sentence.de}</p>
                <SoundButton text={item.sentence.de} label={item.sentence.de} />
              </div>
              {supported && !correct && (
                <p className="transcript">
                  I heard: <em lang="de">“{transcript}”</em>
                </p>
              )}
            </div>
          )}

          <div className="speak-foot">
            <button type="button" className="btn btn-ghost" onClick={() => goTo(Math.max(0, index - 1))} disabled={index === 0}>
              <Icon name="arrow-left" />
              Back
            </button>
            {missed ? (
              <div className="retry-actions">
                <button type="button" className="btn btn-ghost" onClick={() => goTo(index + 1)}>
                  Skip
                </button>
                <button type="button" className="btn btn-primary" onClick={tryAgain}>
                  <Icon name="refresh" />
                  Try again
                </button>
              </div>
            ) : phase === 'result' ? (
              <button type="button" className="btn btn-primary" onClick={() => goTo(index + 1)}>
                {index === items.length - 1 ? 'Finish' : 'Next'}
                <Icon name="arrow-right" />
              </button>
            ) : (
              <button type="button" className="btn btn-ghost" onClick={() => goTo(index + 1)}>
                Skip
                <Icon name="arrow-right" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
