import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Seg } from '../components/Seg';
import { SoundButton } from '../components/SoundButton';
import { TypeCheckCard } from '../components/TypeCheckCard';
import { cardById } from '../data/cards';
import { topicById } from '../data/topics';
import type { CefrLevel } from '../data/types';
import { cardLevel } from '../lib/level';
import { useProgress, type CardProgress } from '../lib/progress';
import { REVIEW_BATCH, relativeDay, reviewItemFor, type ReviewItem } from '../lib/review';
import { shouldIgnoreShortcut } from '../lib/keys';
import { HeroBackdrop } from '../components/HeroBackdrop';

type Mode = 'flip' | 'type';

interface UndoSnapshot {
  id: string;
  record: CardProgress | undefined;
  batch: string[];
  tally: { right: number; missed: number };
  pos: number;
  knew: boolean;
}

const MODE_KEY = 'deutsch-mit-tineiya:review-mode';

function savedMode(): Mode {
  try {
    return localStorage.getItem(MODE_KEY) === 'type' ? 'type' : 'flip';
  } catch {
    return 'flip';
  }
}

/** Flip review: recall it in your head, reveal, then say honestly whether you knew it. */
function ReviewFlipCard({
  item,
  level,
  topicLabel,
  missedLastTime,
  onGrade,
}: {
  item: ReviewItem;
  level: CefrLevel;
  topicLabel: string;
  missedLastTime: boolean;
  onGrade: (correct: boolean) => void;
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (shouldIgnoreShortcut(event)) return;
      if (!revealed && (event.key === ' ' || event.key === 'Enter')) {
        event.preventDefault();
        setRevealed(true);
      } else if (revealed && event.key === '1') onGrade(false);
      else if (revealed && event.key === '2') onGrade(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [revealed, onGrade]);

  return (
    <article className="surface gen-card rise">
      <div className="gen-tags">
        <span className="tag tag-mono tag-gold">{level}</span>
        <span className="tag">{topicLabel}</span>
        {missedLastTime && <span className="tag tag-terra">Missed last time</span>}
        <span className="gen-task" style={{ marginLeft: 'auto' }}>
          {item.kind === 'word' ? 'What’s the German word?' : 'How do you say it in German?'}
        </span>
      </div>

      <div className="gen-prompt-row">
        <p className="gen-prompt" lang="en">
          {item.prompt}
        </p>
      </div>

      {revealed ? (
        <>
          <div className="answer">
            <div className="answer-text">
              <span className="answer-label">German</span>
              <p lang="de">{item.answer}</p>
            </div>
            <SoundButton text={item.audioText} label={item.answer} />
          </div>
          {item.example && (
            <p className="review-example">
              <span lang="de">{item.example.de}</span>
              <span>{item.example.en}</span>
            </p>
          )}
          <div className="grade-row">
            <button type="button" className="btn btn-lg grade-btn" onClick={() => onGrade(false)}>
              <Icon name="x" />
              Didn’t know it
              <span className="kbd kbd-hint">1</span>
            </button>
            <button type="button" className="btn btn-primary btn-lg grade-btn" onClick={() => onGrade(true)}>
              <Icon name="check" />
              Knew it
              <span className="kbd kbd-hint">2</span>
            </button>
          </div>
        </>
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

export function Review() {
  const { reviewQueue, nextReview, markAnswer, recordFor, logActivity, restoreRecord } = useProgress();
  const [mode, setMode] = useState<Mode>(savedMode);
  // The round is a snapshot: grading changes the live queue, but the round in progress shouldn't shift under you.
  const [batch, setBatch] = useState<string[]>(() => reviewQueue.slice(0, REVIEW_BATCH));
  const [firstPassCount, setFirstPassCount] = useState(batch.length);
  const [pos, setPos] = useState(0);
  const [graded, setGraded] = useState(false);
  const [tally, setTally] = useState({ right: 0, missed: 0 });
  // The last Flip grade, so a mis-tap can be taken back: the card's record and the round as they were.
  const [undo, setUndo] = useState<UndoSnapshot | null>(null);

  const changeMode = (next: Mode) => {
    setMode(next);
    setUndo(null);
    try {
      localStorage.setItem(MODE_KEY, next);
    } catch {
      // not saved — fine
    }
  };

  const takeBack = () => {
    if (!undo) return;
    restoreRecord(undo.id, undo.record);
    setBatch(undo.batch);
    setTally(undo.tally);
    setPos(undo.pos);
    setGraded(false);
    setUndo(null);
  };

  // U takes back the last Flip grade.
  useEffect(() => {
    if (!undo) return;
    const onKey = (event: KeyboardEvent) => {
      if (shouldIgnoreShortcut(event) || event.key.toLowerCase() !== 'u') return;
      takeBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const undoBar = undo && (
    <div className="undo-bar" role="status">
      <span>
        Marked <strong>{undo.knew ? 'Knew it' : 'Didn’t know it'}</strong>
      </span>
      <button type="button" className="btn btn-sm btn-ghost" onClick={takeBack}>
        <Icon name="arrow-left" />
        Undo
        <span className="kbd kbd-hint">U</span>
      </button>
    </div>
  );

  const startRound = () => {
    setUndo(null);
    const next = reviewQueue.slice(0, REVIEW_BATCH);
    setBatch(next);
    setFirstPassCount(next.length);
    setPos(0);
    setGraded(false);
    setTally({ right: 0, missed: 0 });
  };

  const id = batch[pos];
  const card = id ? cardById(id) : undefined;
  const isSecondPass = pos >= firstPassCount;

  const advance = () => {
    setPos((p) => p + 1);
    setGraded(false);
  };

  const grade = (correct: boolean) => {
    if (!id) return;
    if (!isSecondPass) {
      markAnswer(id, correct);
      logActivity('review');
      setTally((t) => (correct ? { ...t, right: t.right + 1 } : { ...t, missed: t.missed + 1 }));
      // A miss comes back once more at the end of this round, while it's fresh.
      if (!correct) setBatch((b) => [...b, id]);
    } else if (correct) {
      // Got it on the second go: relearned — schedule it for tomorrow instead of leaving it due today.
      markAnswer(id, true);
    }
  };

  // Type mode: N / → moves on once the answer has been checked.
  useEffect(() => {
    if (mode !== 'type' || !card) return;
    const onKey = (event: KeyboardEvent) => {
      if (shouldIgnoreShortcut(event)) return;
      if (graded && (event.key === 'ArrowRight' || event.key.toLowerCase() === 'n')) advance();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const head = (
    <header className="reader-head task-head on-waves rise">
      <span className="eyebrow no-rule">Review</span>
      <h1 className="title-xl">
        {firstPassCount > 0
          ? `${firstPassCount} ${firstPassCount === 1 ? 'card' : 'cards'} to review`
          : 'Nothing to review right now'}
      </h1>
      <p className="lede" style={{ textAlign: 'center' }}>
        Words you missed come back first. Get one right and it returns later — tomorrow, then in three days, then a week
        — so it sticks.
      </p>
    </header>
  );

  // Nothing due at all.
  if (batch.length === 0) {
    return (
      <div className="gen tab-page">
        <HeroBackdrop className="tab-waves" />
        {head}
        <div className="surface done rise-2">
          <div className="done-icon">
            <Icon name="check" />
          </div>
          <h2 className="title-lg">All caught up</h2>
          <p>
            {nextReview
              ? `Next review: ${relativeDay(nextReview.dateISO)} — ${nextReview.count} ${nextReview.count === 1 ? 'card' : 'cards'}.`
              : 'Cards you study, drill or practise show up here the day after — and again whenever you miss one.'}
          </p>
          <div className="done-actions">
            <Link to="/generieren" className="btn">
              <Icon name="sparkles" />
              Random sentence
            </Link>
            <Link to="/" className="btn btn-primary">
              Study a topic
              <Icon name="arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Round finished.
  if (!card) {
    const moreDue = reviewQueue.length;
    return (
      <div className="gen tab-page">
        <HeroBackdrop className="tab-waves" />
        {head}
        <div className="surface done rise-2">
          <div className="done-icon">
            <Icon name="trophy" />
          </div>
          <h2 className="title-lg">Wiederholung fertig!</h2>
          {undoBar}
          <p>
            {tally.right} of {firstPassCount} right first time
            {tally.missed > 0 ? ` — the ${tally.missed} you missed will come back again soon.` : '. Schön!'}
          </p>
          <div className="done-actions">
            {moreDue > 0 ? (
              <button type="button" className="btn btn-primary" onClick={startRound}>
                <Icon name="repeat" />
                Review {Math.min(moreDue, REVIEW_BATCH)} more
              </button>
            ) : (
              <Link to="/" className="btn btn-primary">
                Back to topics
                <Icon name="arrow-right" />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const item = reviewItemFor(card);
  const level = cardLevel(card);
  const topicLabel = topicById(card.topicIds[0])?.name ?? '';
  const missedLastTime = recordFor(card.id)?.lastCorrect === false;

  return (
    <div className="gen tab-page">
      <HeroBackdrop className="tab-waves" />
      {head}

      <div className="review-bar on-waves rise-2">
        <div className="session-progress">
          <div className="meter meter-sage">
            <span style={{ width: `${(pos / batch.length) * 100}%` }} />
          </div>
          <span className="session-count">
            <strong>{Math.min(pos + 1, batch.length)}</strong> / {batch.length}
          </span>
        </div>
        <Seg
          light
          label="Review mode"
          value={mode}
          onChange={changeMode}
          options={[
            { value: 'flip', label: 'Flip' },
            { value: 'type', label: 'Type' },
          ]}
        />
      </div>

      {undoBar}

      {isSecondPass && (
        <p className="review-note on-waves">
          <Icon name="repeat" />
          One more go at the ones you missed.
        </p>
      )}

      {mode === 'flip' ? (
        <ReviewFlipCard
          key={`${card.id}-${pos}`}
          item={item}
          level={level}
          topicLabel={topicLabel}
          missedLastTime={missedLastTime}
          onGrade={(correct) => {
            if (id) setUndo({ id, record: recordFor(id), batch, tally, pos, knew: correct });
            grade(correct);
            advance();
          }}
        />
      ) : (
        <>
          <TypeCheckCard
            key={`${card.id}-${pos}`}
            sentence={{ de: item.answer, en: item.prompt }}
            audioText={item.audioText}
            topicLabel={topicLabel}
            level={level}
            direction="en-to-de"
            onGraded={(correct) => {
              grade(correct);
              setGraded(true);
            }}
          />
          <div className="gen-foot">
            <span className="hint kbd-hint">
              {graded ? (
                <>
                  <span className="kbd">N</span> next card
                </>
              ) : (
                'Type or speak it in German'
              )}
            </span>
            <button type="button" className={`btn${graded ? ' btn-primary' : ' btn-ghost'}`} onClick={advance}>
              {graded ? 'Next card' : 'Skip'}
              <Icon name="arrow-right" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
