import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Flashcard, type FlashcardHide } from '../components/Flashcard';
import { DrillPanel } from '../components/DrillPanel';
import { topics, topicById, TOPIC_GROUP_LABELS } from '../data/topics';
import { cardsForTopic } from '../data/cards';
import { passageForTopic } from '../data/passages';
import { useProgress } from '../lib/progress';
import { generateDrillForCard } from '../lib/drills';
import { shuffle } from '../lib/text';
import { shouldIgnoreShortcut } from '../lib/keys';
import { setLastTopicId } from '../lib/lastTopic';
import { hasSpeaking } from '../lib/speaking';
import type { VerbCard, DrillKind } from '../data/types';

/** What the card keeps back while each kind of drill is unanswered — whatever would give the answer away. */
const HIDE_FOR_DRILL: Record<DrillKind, FlashcardHide> = {
  meaning: 'meaning',
  article: 'article',
  conjugation: 'example',
  'separable-position': 'example',
  'word-order': 'sentence',
};

export function Session() {
  const { topicId = '' } = useParams();
  const topic = topicById(topicId);
  const { markSeen, markAnswer, notebookPagesDigitized, recordFor, topicProgress, logActivity } = useProgress();

  // Shuffled, but cards not done yet come first — reopening a topic carries on where you stopped.
  const deckFor = (id: string) => {
    const deck = shuffle(cardsForTopic(id));
    return [...deck.filter((c) => !recordFor(c.id)), ...deck.filter((c) => recordFor(c.id))];
  };

  const [cards, setCards] = useState(() => deckFor(topicId));
  const [index, setIndex] = useState(0);
  const deckTopic = useRef(topicId);

  useEffect(() => {
    if (topicById(topicId)) setLastTopicId(topicId);
    // Only re-deal when switching topics — re-dealing on first render would mark an unseen card as seen.
    if (deckTopic.current === topicId) return;
    deckTopic.current = topicId;
    setCards(deckFor(topicId));
    setIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  const currentCard = cards[index];
  // Whether the drill for the current card has been answered (its answer stays hidden on the card until then).
  const [answered, setAnswered] = useState(false);
  useEffect(() => setAnswered(false), [currentCard?.id]);

  // Moving past the first card counts as a flashcard session (opening a topic alone doesn't).
  const loggedSession = useRef(false);
  useEffect(() => {
    if (index > 0 && !loggedSession.current) {
      loggedSession.current = true;
      logActivity('flashcards');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (currentCard) markSeen(currentCard.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard?.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (shouldIgnoreShortcut(event)) return;
      if (event.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, cards.length));
      if (event.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cards.length]);

  const seenVerbsSoFar = useMemo(
    () => cards.slice(0, index).filter((c): c is VerbCard => c.type === 'verb'),
    [cards, index],
  );

  const drill = useMemo(
    () => (currentCard ? generateDrillForCard(currentCard, seenVerbsSoFar) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCard?.id],
  );

  if (!topic || cards.length === 0) {
    return (
      <div className="surface empty">
        <p>{topic ? 'There are no cards for this topic yet.' : "That topic doesn't exist."}</p>
        <Link to="/" className="btn" style={{ marginTop: 16 }}>
          Back to topics
        </Link>
      </div>
    );
  }

  const finished = index >= cards.length;
  const progress = topicProgress(topicId);
  const relatedTopics = topics.filter((t) => t.group === topic.group);
  const passage = passageForTopic(topicId);
  const hasSpeakingPractice = hasSpeaking(topicId);
  const restart = () => {
    setCards(shuffle(cardsForTopic(topicId)));
    setIndex(0);
  };

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <Icon name="chevron-right" />
        <span>{TOPIC_GROUP_LABELS[topic.group]}</span>
      </nav>

      <header className="page-head">
        <div className="page-head-copy">
          <h1 className="title-xl">{topic.name}</h1>
          <p className="muted">
            {cards.length} cards{topic.tagline ? ` · ${topic.tagline}` : ''}
            {progress.finished ? (
              <span className="head-status is-finished">
                <Icon name="check" />
                Finished · {progress.learned} learned
              </span>
            ) : progress.done > 0 ? (
              <span className="head-status">
                {progress.done} of {progress.total} done{progress.learned > 0 ? ` · ${progress.learned} learned` : ''}
              </span>
            ) : null}
          </p>
        </div>
        {(passage || hasSpeakingPractice) && (
          <div className="page-head-actions">
            {passage && (
              <Link to={`/thema/${topicId}/passage`} className="btn btn-sm">
                <Icon name="book-open" />
                Read passage
              </Link>
            )}
            {hasSpeakingPractice && (
              <Link to={`/thema/${topicId}/sprechen`} className="btn btn-sm">
                <Icon name="mic" />
                Practice speaking
              </Link>
            )}
          </div>
        )}
      </header>

      {relatedTopics.length > 1 && (
        <div className="chip-row session-chips" role="navigation" aria-label="Related topics">
          {relatedTopics.map((t) => (
            <Link
              key={t.id}
              to={`/thema/${t.id}`}
              className={`chip${t.id === topicId ? ' active' : ''}`}
              aria-current={t.id === topicId ? 'page' : undefined}
            >
              {t.name}
            </Link>
          ))}
        </div>
      )}

      {finished ? (
        <div className="surface done rise">
          <div className="done-icon">
            <Icon name="trophy" />
          </div>
          <h2 className="title-lg">Schön gemacht!</h2>
          <p>
            {topic.name} is finished — you’ve worked through all {cards.length} cards
            {progress.learned > 0 ? ` and learned ${progress.learned}` : ''}. Go again to lock them in: drill answers
            you get right twice count as learned.
          </p>
          <div className="done-actions">
            <button type="button" className="btn" onClick={restart}>
              <Icon name="refresh" />
              Go again
            </button>
            <Link to="/" className="btn btn-primary">
              Back to topics
              <Icon name="arrow-right" />
            </Link>
          </div>
        </div>
      ) : (
        <div className={`session-grid${drill ? ' has-drill' : ''}`}>
          <div className="session-main">
            <div className="session-progress">
              <div className="meter meter-sage">
                <span style={{ width: `${((index + 1) / cards.length) * 100}%` }} />
              </div>
              <span className="session-count">
                <strong>{index + 1}</strong> / {cards.length}
              </span>
            </div>

            <Flashcard
              key={currentCard.id}
              card={currentCard}
              hide={drill && !answered ? HIDE_FOR_DRILL[drill.kind] : undefined}
            />
          </div>

          <div className="card-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
            >
              <Icon name="arrow-left" />
              Back
            </button>
            <span className="hint">
              <span className="kbd">←</span>
              <span className="kbd">→</span>
              to move
            </span>
            {/* Until the drill is answered, moving on is a skip — say so, and keep it secondary. */}
            <button
              type="button"
              className={`btn ${drill && !answered ? 'btn-ghost' : 'btn-primary'}`}
              onClick={() => setIndex((i) => i + 1)}
            >
              {drill && !answered ? 'Skip question' : index === cards.length - 1 ? 'Finish' : 'Next'}
              <Icon name="arrow-right" />
            </button>
          </div>

          <aside className="session-drill">
            {drill ? (
              <DrillPanel
                key={drill.id}
                drill={drill}
                onAnswer={(correct) => {
                  markAnswer(currentCard.id, correct);
                  logActivity('flashcards');
                  setAnswered(true);
                }}
              />
            ) : (
              <div className="panel panel-quiet rise-2">
                <span className="panel-quiet-icon">
                  <Icon name="lightbulb" />
                </span>
                <div>
                  <h3>Just look and listen</h3>
                  <p>
                    There's no drill for this card — take in the picture, say the word out loud, and move on when you're
                    ready.
                  </p>
                </div>
              </div>
            )}
          </aside>

          {/* Phones only: with a drill, the card's example moves here and appears once it's answered,
              so nothing above the drill grows while you read the feedback. */}
          {drill && answered && currentCard.type !== 'sentence' && currentCard.example && (
            <div className="session-example example rise">
              <p className="example-de" lang="de">
                {currentCard.example.de}
              </p>
              <p className="example-en">{currentCard.example.en}</p>
            </div>
          )}

          {topic.group === 'notebook' && (
            <aside className="session-info">
              <div className="panel panel-quiet rise-3">
                <span className="panel-quiet-icon">
                  <Icon name="notebook" />
                </span>
                <div>
                  <h3>From your notebook</h3>
                  <p>
                    All {notebookPagesDigitized} separable verbs from your handwritten cards — each with its own
                    picture, example sentence and full conjugation.
                  </p>
                </div>
              </div>
            </aside>
          )}
        </div>
      )}
    </>
  );
}
