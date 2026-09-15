import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Masthead } from '../components/Masthead';
import { SceneIcon } from '../components/SceneIcon';
import { SoundButton } from '../components/SoundButton';
import { cardsForTopic } from '../data/cards';
import { topicById } from '../data/topics';
import type { SentenceCard } from '../data/types';
import { useProgress } from '../lib/progress';
import { listenOnce, speechRecognitionSupported, textSimilarity, SPOKEN_MATCH_THRESHOLD } from '../lib/voice';
import { shuffle } from '../lib/text';

type Phase = 'prompt' | 'listening' | 'result' | 'error';

function MicIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
      <path d="M12 18v4" />
      <path d="M8 22h8" />
    </svg>
  );
}

const ERROR_MESSAGES: Record<string, string> = {
  'not-allowed': "Microphone access was blocked — allow it in your browser's site settings to use speaking practice.",
  'audio-capture': 'No microphone was found on this device.',
  network: 'A network error interrupted speech recognition — check your connection and try again.',
};

export function SpeakSession() {
  const { topicId = '' } = useParams();
  const topic = topicById(topicId);
  const { markAnswer } = useProgress();
  const supported = useMemo(speechRecognitionSupported, []);

  const [cards, setCards] = useState<SentenceCard[]>(() =>
    shuffle(cardsForTopic(topicId).filter((c): c is SentenceCard => c.type === 'sentence')),
  );
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('prompt');
  const [transcript, setTranscript] = useState('');
  const [correct, setCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setCards(shuffle(cardsForTopic(topicId).filter((c): c is SentenceCard => c.type === 'sentence')));
    setIndex(0);
    setPhase('prompt');
    setTranscript('');
    setErrorMessage('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  const card = cards[index];
  const finished = index >= cards.length;

  const reset = () => {
    setPhase('prompt');
    setTranscript('');
    setErrorMessage('');
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

  if (!topic) {
    return (
      <div className="page">
        <Masthead />
        <p className="empty-state">That topic doesn't exist.</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="page">
        <Masthead />
        <p className="empty-state">There's no speaking practice for this topic yet.</p>
        <Link to={`/thema/${topicId}`} className="btn" style={{ marginTop: 16 }}>
          Back to cards
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Masthead />
      <div className="stack-label">speaking practice</div>
      <h2 className="screen-title">{topic.name}</h2>

      {!supported && (
        <div className="side-card" style={{ marginBottom: 24 }}>
          <p className="note">
            Voice input isn't supported in this browser — try Chrome or Edge. You can still read the sentences below and
            check yourself against the audio.
          </p>
        </div>
      )}

      {finished ? (
        <div className="card session-done">
          <h2>Done — {cards.length} sentences from {topic.name}.</h2>
          <p>Practice again, or head back to the cards.</p>
          <div className="card-nav" style={{ justifyContent: 'center' }}>
            <button type="button" className="btn" onClick={() => { setIndex(0); reset(); }}>
              Again
            </button>
            <Link to={`/thema/${topicId}`} className="btn btn-primary">
              Back to cards
            </Link>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="scene">
            {card.image.kind === 'icon' ? <SceneIcon name={card.image.icon} /> : null}
          </div>

          <div className="stack-label">say this in German</div>
          <p className="core-sentence-text" style={{ marginBottom: 22 }}>
            {card.en}
          </p>

          {phase === 'prompt' && supported && (
            <button type="button" className="mic-button" onClick={handleListen}>
              <MicIcon />
              <span>Press to speak</span>
            </button>
          )}

          {phase === 'prompt' && !supported && (
            <button type="button" className="btn" onClick={() => setPhase('result')}>
              Reveal the sentence
            </button>
          )}

          {phase === 'listening' && (
            <div className="mic-button listening">
              <MicIcon />
              <span>Listening…</span>
            </div>
          )}

          {phase === 'error' && (
            <>
              <p className="drill-feedback incorrect">{errorMessage}</p>
              <button type="button" className="btn btn-primary" onClick={handleListen}>
                Try again
              </button>
            </>
          )}

          {phase === 'result' && (
            <div className={`speak-result${supported ? (correct ? ' correct' : ' incorrect') : ''}`}>
              {supported && <p className="drill-feedback">{correct ? 'Correct!' : "Not quite what I heard:"}</p>}
              {supported && !correct && <p className="transcript-line">You said: "{transcript}"</p>}
              <div className="word-row" style={{ marginTop: supported ? 10 : 0 }}>
                <p className="pattern-line" style={{ margin: 0 }}>
                  {card.de}
                </p>
                <SoundButton text={card.de} label={card.de} />
              </div>
            </div>
          )}

          <div className="progress-row" style={{ marginTop: 22 }}>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${((index + 1) / cards.length) * 100}%` }} />
            </div>
            <div className="progress-label">
              Card {index + 1} of {cards.length}
            </div>
          </div>

          <div className="card-nav">
            <button
              type="button"
              className="btn"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
            >
              Back
            </button>
            {phase === 'result' ? (
              <button type="button" className="btn btn-primary" onClick={() => { setIndex((i) => i + 1); reset(); }}>
                Next
              </button>
            ) : (
              <button type="button" className="btn" onClick={() => { setIndex((i) => i + 1); reset(); }}>
                Skip
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
