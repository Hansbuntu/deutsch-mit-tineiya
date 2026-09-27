import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { SoundButton } from '../components/SoundButton';
import { cardsForTopic } from '../data/cards';
import { topicById } from '../data/topics';
import type { SentenceCard } from '../data/types';
import { useProgress } from '../lib/progress';
import { listenOnce, speechRecognitionSupported, textSimilarity, SPOKEN_MATCH_THRESHOLD } from '../lib/voice';
import { shuffle } from '../lib/text';

type Phase = 'prompt' | 'listening' | 'result' | 'error';

const ERROR_MESSAGES: Record<string, string> = {
  'not-allowed': "Microphone access is blocked — allow it in your browser's site settings to practise speaking.",
  'audio-capture': 'No microphone was found on this device.',
  network: 'A network error interrupted speech recognition — check your connection and try again.',
};

const sentenceCardsFor = (topicId: string) =>
  shuffle(cardsForTopic(topicId).filter((c): c is SentenceCard => c.type === 'sentence'));

export function SpeakSession() {
  const { topicId = '' } = useParams();
  const topic = topicById(topicId);
  const { markAnswer } = useProgress();
  const supported = useMemo(speechRecognitionSupported, []);

  const [cards, setCards] = useState<SentenceCard[]>(() => sentenceCardsFor(topicId));
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('prompt');
  const [transcript, setTranscript] = useState('');
  const [correct, setCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setCards(sentenceCardsFor(topicId));
    setIndex(0);
    setPhase('prompt');
    setTranscript('');
    setErrorMessage('');
  }, [topicId]);

  const card = cards[index];
  const finished = index >= cards.length;

  const reset = () => {
    setPhase('prompt');
    setTranscript('');
    setErrorMessage('');
  };

  const goTo = (next: number) => {
    setIndex(next);
    reset();
  };

  const handleListen = async () => {
    setPhase('listening');
    const result = await listenOnce();
    if (result.status === 'result') {
      const isCorrect = textSimilarity(result.transcript, card.de) >= SPOKEN_MATCH_THRESHOLD;
      setTranscript(result.transcript);
      setCorrect(isCorrect);
      setPhase('result');
      markAnswer(card.id, isCorrect);
    } else if (result.status === 'no-match') {
      setErrorMessage("Didn't catch that — try again, a little closer to the mic.");
      setPhase('error');
    } else {
      setErrorMessage(ERROR_MESSAGES[result.status === 'error' ? result.error : ''] ?? 'Something went wrong — try again.');
      setPhase('error');
    }
  };

  if (!topic || cards.length === 0) {
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
            That's all {cards.length} sentences from {topic.name}. Run through them again, or head back to the cards.
          </p>
          <div className="done-actions">
            <button type="button" className="btn" onClick={() => goTo(0)}>
              <Icon name="refresh" />
              Again
            </button>
            <Link to={`/thema/${topicId}`} className="btn btn-primary">
              Back to cards
              <Icon name="arrow-right" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="surface speak-card rise-2" key={card.id}>
          <div className="session-progress" style={{ width: '100%' }}>
            <div className="meter meter-sage">
              <span style={{ width: `${((index + 1) / cards.length) * 100}%` }} />
            </div>
            <span className="session-count">
              <strong>{index + 1}</strong> / {cards.length}
            </span>
          </div>

          <span className="eyebrow no-rule">Say this in German</span>
          <p className="speak-prompt">{card.en}</p>

          {phase === 'prompt' && supported && (
            <>
              <div className="mic-stage">
                <button type="button" className="mic-btn" onClick={handleListen} aria-label="Start speaking">
                  <Icon name="mic" />
                </button>
              </div>
              <p className="mic-caption">Tap the microphone and speak</p>
            </>
          )}

          {phase === 'listening' && (
            <>
              <div className="mic-stage" aria-live="polite">
                <span className="mic-ring" />
                <span className="mic-ring" />
                <span className="mic-ring" />
                <button type="button" className="mic-btn listening" disabled aria-label="Listening">
                  <Icon name="mic" />
                </button>
              </div>
              <p className="mic-caption">Listening…</p>
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
                  {correct ? 'Richtig — well said!' : "Not quite. Here's the sentence:"}
                </p>
              )}
              <div className="result-answer">
                <p lang="de">{card.de}</p>
                <SoundButton text={card.de} label={card.de} />
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
            {phase === 'result' ? (
              <button type="button" className="btn btn-primary" onClick={() => goTo(index + 1)}>
                {index === cards.length - 1 ? 'Finish' : 'Next'}
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
