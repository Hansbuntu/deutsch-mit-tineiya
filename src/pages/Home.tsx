import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { SceneIcon } from '../components/SceneIcon';
import { ProgressRing } from '../components/ProgressRing';
import { topics, topicById, TOPIC_GROUP_DESCRIPTIONS, TOPIC_GROUP_LABELS, TOPIC_GROUP_ORDER } from '../data/topics';
import { allCards, cardsForTopic, FREQUENCY_LIST_TARGET } from '../data/cards';
import { passageForTopic } from '../data/passages';
import type { Topic } from '../data/types';
import { todayISO, useProgress, type TopicProgress } from '../lib/progress';
import { candidatePicks, rankPicks } from '../lib/recommend';
import { TodaysPick } from '../components/TodaysPick';
import { getLastTopicId } from '../lib/lastTopic';
import { REVIEW_BATCH } from '../lib/review';
import { hasSpeaking } from '../lib/speaking';

function greeting(date: Date) {
  const hour = date.getHours();
  if (hour < 11) return 'Guten Morgen';
  if (hour < 18) return 'Guten Tag';
  return 'Guten Abend';
}

function TopicTile({ topic, progress }: { topic: Topic; progress: TopicProgress }) {
  const passage = passageForTopic(topic.id);
  const speakable = hasSpeaking(topic.id);
  const { total, done, learned, finished } = progress;
  const pct = total > 0 ? (done / total) * 100 : 0;

  return (
    <article className={`tile${finished ? ' is-finished' : ''}`}>
      <Link to={`/thema/${topic.id}`} className="tile-main">
        <div className="tile-top">
          <span className="tile-icon">
            <SceneIcon name={topic.icon} />
          </span>
          {finished ? (
            <span className="tag tag-sage tile-status">
              <Icon name="check" />
              Finished
            </span>
          ) : (
            <span className="tile-arrow" aria-hidden="true">
              <Icon name="arrow-right" />
            </span>
          )}
        </div>
        <div>
          <h3 className="tile-title">{topic.name}</h3>
        </div>
        <p className="tile-meta">
          {total} {total === 1 ? 'card' : 'cards'}
          {topic.tagline ? ` · ${topic.tagline}` : ''}
        </p>
        {done > 0 && !finished && (
          <p className="tile-progress-note">
            {done} of {total} done{learned > 0 ? ` · ${learned} learned` : ''}
          </p>
        )}
        {finished && learned < total && (
          <p className="tile-progress-note">
            All {total} done · {learned} learned — practise again to lock them in
          </p>
        )}
        <div className="tile-foot">
          <div className="meter">
            <span style={{ width: `${pct}%` }} />
          </div>
          <span className="tile-count" title={`${done} of ${total} worked through · ${learned} learned`}>
            {done}/{total}
          </span>
        </div>
      </Link>
      {(passage || speakable) && (
        <div className="tile-actions">
          {passage && (
            <Link to={`/thema/${topic.id}/passage`} className="chip-link">
              <Icon name="book-open" />
              Read passage
            </Link>
          )}
          {speakable && (
            <Link to={`/thema/${topic.id}/sprechen`} className="chip-link">
              <Icon name="mic" />
              Speak
            </Link>
          )}
        </div>
      )}
    </article>
  );
}

export function Home() {
  const {
    daysActive,
    totalCardsLearned,
    frequencyListLearned,
    frequencyListPractised,
    reviewQueue,
    topicProgress,
    recordFor,
    activity,
  } = useProgress();
  const dueCount = reviewQueue.length;

  const lastTopic = topicById(getLastTopicId() ?? '');
  const continueTopic = lastTopic ?? topics[0];
  const notebook = topics.find((t) => t.group === 'notebook')!;
  const notebookCards = cardsForTopic(notebook.id);
  const notebookProgress = topicProgress(notebook.id);
  const continueLabel = lastTopic ? `Continue: ${continueTopic.name}` : `Start with ${continueTopic.name}`;
  const reviewMinutes = Math.max(1, Math.round((Math.min(dueCount, REVIEW_BATCH) * 12) / 60));
  const continueProgress = topicProgress(continueTopic.id);

  // Today's pick: scored from the learner's own patterns, rotated so each visit brings something new.
  const today = todayISO();
  const rankedPicks = rankPicks(
    candidatePicks({
      topicProgress,
      recordFor,
      activity,
      continueTopicId: continueTopic.id,
      frequencyPractised: frequencyListPractised,
      todayISO: today,
    }),
    today,
  );

  // "Up next": unfinished topics (furthest along first), then ones not started — never the Continue topic.
  const upNext = (() => {
    const others = topics
      .filter((t) => t.id !== continueTopic.id)
      .map((topic) => ({ topic, progress: topicProgress(topic.id) }));
    const inProgress = others
      .filter(({ progress }) => progress.done > 0 && !progress.finished)
      .sort((a, b) => b.progress.done / b.progress.total - a.progress.done / a.progress.total);
    const notStarted = others.filter(({ progress }) => progress.done === 0);
    return [...inProgress, ...notStarted].slice(0, 3);
  })();

  return (
    <>
      <section className="hero hero-today">
        <div className="hero-copy rise">
          <span className="eyebrow">{greeting(new Date())}, Tineiya</span>
          <h1 className="display">
            Something <em>new</em> for today.
          </h1>
          <p className="lede">
            Picked from how you’ve been practising — your weak spots, the skills you haven’t used lately and what you
            haven’t tried yet.
          </p>
          <TodaysPick ranked={rankedPicks} todayISO={today} />
          <div className="hero-practice">
            <Link to="/generieren" className="chip-link">
              <Icon name="sparkles" />
              Random sentence
            </Link>
            <Link to="/generieren?mode=listen" className="chip-link">
              <Icon name="volume" />
              Listening practice
            </Link>
          </div>
        </div>

        <div className="hero-side rise-2">
          {/* Where you left off stays one tap away, beside the pick. */}
          <section className="surface left-off" aria-label="Where you left off">
            <span className="eyebrow">Where you left off</span>
            {dueCount > 0 && (
              <Link to="/wiederholen" className="left-off-row left-off-review">
                <span className="left-off-icon">
                  <Icon name="repeat" />
                </span>
                <span className="left-off-copy">
                  <strong>
                    Review {dueCount} {dueCount === 1 ? 'card' : 'cards'}
                  </strong>
                  <span>Missed ones first · about {reviewMinutes} min</span>
                </span>
                <Icon name="arrow-right" />
              </Link>
            )}
            <Link to={`/thema/${continueTopic.id}`} className="left-off-row">
              <span className="left-off-icon">
                <SceneIcon name={continueTopic.icon} />
              </span>
              <span className="left-off-copy">
                <strong>{continueLabel}</strong>
                <span className="left-off-meter">
                  <span className="meter meter-sage">
                    <span
                      style={{
                        width: `${continueProgress.total ? (continueProgress.done / continueProgress.total) * 100 : 0}%`,
                      }}
                    />
                  </span>
                  {continueProgress.finished ? 'Finished' : `${continueProgress.done} / ${continueProgress.total}`}
                </span>
              </span>
              <Icon name="arrow-right" />
            </Link>
          </section>

          <aside className="hero-panel surface corner-mark" aria-label="At a glance">
            <span className="eyebrow">At a glance</span>
            <div className="glance">
              <ProgressRing
                value={frequencyListLearned}
                secondary={frequencyListPractised}
                max={FREQUENCY_LIST_TARGET}
              />
              <div>
                <div className="glance-value">
                  {frequencyListLearned}
                  <small> / {FREQUENCY_LIST_TARGET.toLocaleString('en')}</small>
                </div>
                <p className="glance-label">most common German words learned</p>
                {frequencyListPractised > 0 && (
                  <p className="glance-sub">
                    <span className="glance-swatch" aria-hidden="true" />
                    {frequencyListPractised.toLocaleString('en')} practised so far
                  </p>
                )}
              </div>
            </div>
            <dl className="mini-stats">
              <div>
                <dt>Days active</dt>
                <dd>{daysActive}</dd>
              </div>
              <div>
                <dt>Cards learned</dt>
                <dd>{totalCardsLearned}</dd>
              </div>
              <div>
                <dt>In library</dt>
                <dd>{allCards.length}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {upNext.length > 0 && (
        <section className="section rise-2" aria-labelledby="up-next-title">
          <header className="section-head">
            <div className="section-head-copy">
              <h2 className="section-title" id="up-next-title">
                Up next
              </h2>
              <p className="section-desc">Carry on with a topic you've started, or try a new one.</p>
            </div>
          </header>
          <div className="surface topic-rows">
            {upNext.map(({ topic, progress }) => (
              <Link key={topic.id} to={`/thema/${topic.id}`} className="topic-row">
                <span className="topic-row-name">
                  <span className="topic-row-icon">
                    <SceneIcon name={topic.icon} />
                  </span>
                  <span>{topic.name}</span>
                </span>
                <div className="meter meter-sage">
                  <span style={{ width: `${progress.total ? (progress.done / progress.total) * 100 : 0}%` }} />
                </div>
                <span className="topic-row-count">
                  {progress.done > 0 ? (
                    <>
                      <strong>{progress.done}</strong> / {progress.total}
                    </>
                  ) : (
                    'Start'
                  )}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {TOPIC_GROUP_ORDER.map((group) => {
        const groupTopics = topics.filter((t) => t.group === group);
        if (groupTopics.length === 0) return null;
        const cardTotal = groupTopics.reduce((sum, t) => sum + cardsForTopic(t.id).length, 0);

        if (group === 'notebook') {
          return (
            <section key={group} className="section rise-3">
              <Link to={`/thema/${notebook.id}`} className="feature">
                <div>
                  <span className="eyebrow">{TOPIC_GROUP_LABELS.notebook}</span>
                  <h2 className="feature-title">{notebook.name}</h2>
                  <p className="feature-desc">
                    All {notebookCards.length} verbs from your handwritten flashcards — each with a picture, an example
                    sentence and the full present-tense conjugation.
                  </p>
                  <div className="feature-foot">
                    <span className="feature-cta">
                      Study the verbs <Icon name="arrow-right" />
                    </span>
                    <span className="feature-progress">
                      {notebookProgress.finished ? (
                        <>
                          <Icon name="check" />
                          Finished · {notebookProgress.learned} of {notebookCards.length} learned
                        </>
                      ) : (
                        <>
                          <span className="meter">
                            <span style={{ width: `${(notebookProgress.done / notebookCards.length) * 100}%` }} />
                          </span>
                          {notebookProgress.done} of {notebookCards.length} done
                          {notebookProgress.learned > 0 ? ` · ${notebookProgress.learned} learned` : ''}
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="feature-art" aria-hidden="true">
                  <SceneIcon name={notebook.icon} />
                </div>
              </Link>
            </section>
          );
        }

        return (
          <section key={group} className="section">
            <header className="section-head">
              <div className="section-head-copy">
                <h2 className="section-title">{TOPIC_GROUP_LABELS[group]}</h2>
                <p className="section-desc">{TOPIC_GROUP_DESCRIPTIONS[group]}</p>
              </div>
              <span className="section-count">
                {groupTopics.length} topics · {cardTotal} cards
              </span>
            </header>
            <div className="topic-grid" data-count={groupTopics.length}>
              {groupTopics.map((topic) => (
                <TopicTile key={topic.id} topic={topic} progress={topicProgress(topic.id)} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
