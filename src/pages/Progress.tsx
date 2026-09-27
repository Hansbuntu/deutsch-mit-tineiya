import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { SceneIcon } from '../components/SceneIcon';
import { ProgressRing } from '../components/ProgressRing';
import { OfflineAudio } from '../components/OfflineAudio';
import { useProgress } from '../lib/progress';
import { topics, TOPIC_GROUP_ORDER, TOPIC_GROUP_LABELS } from '../data/topics';
import { allCards, cardsForTopic, FREQUENCY_LIST_TARGET } from '../data/cards';

export function Progress() {
  const { daysActive, totalCardsLearned, notebookPagesDigitized, frequencyListLearned, isLearned } = useProgress();
  const learnedIn = (topicId: string) => cardsForTopic(topicId).filter((c) => isLearned(c.id)).length;

  return (
    <>
      <header className="page-head rise">
        <div className="page-head-copy">
          <span className="eyebrow">Your progress</span>
          <h1 className="title-xl">How far you've come</h1>
          <p className="lede">Quiet numbers, no streaks. A card counts as learned once you've answered it correctly twice.</p>
        </div>
      </header>

      <div className="stats-grid rise-2">
        <div className="surface stat-card stat-hero">
          <ProgressRing value={frequencyListLearned} max={FREQUENCY_LIST_TARGET} />
          <div>
            <div className="stat-value">
              {frequencyListLearned}
              <small> / {FREQUENCY_LIST_TARGET.toLocaleString('en')}</small>
            </div>
            <p className="stat-label">most common German words learned</p>
          </div>
        </div>
        <div className="surface stat-card">
          <span className="stat-icon">
            <Icon name="calendar" />
          </span>
          <div>
            <div className="stat-value">{daysActive}</div>
            <p className="stat-label">days active</p>
          </div>
        </div>
        <div className="surface stat-card">
          <span className="stat-icon">
            <Icon name="cards" />
          </span>
          <div>
            <div className="stat-value">
              {totalCardsLearned}
              <small> / {allCards.length}</small>
            </div>
            <p className="stat-label">cards learned</p>
          </div>
        </div>
        <div className="surface stat-card">
          <span className="stat-icon">
            <Icon name="notebook" />
          </span>
          <div>
            <div className="stat-value">{notebookPagesDigitized}</div>
            <p className="stat-label">notebook pages digitized</p>
          </div>
        </div>
      </div>

      {TOPIC_GROUP_ORDER.map((group) => {
        const groupTopics = topics.filter((t) => t.group === group);
        if (groupTopics.length === 0) return null;
        const groupTotal = groupTopics.reduce((sum, t) => sum + cardsForTopic(t.id).length, 0);
        const groupLearned = groupTopics.reduce((sum, t) => sum + learnedIn(t.id), 0);

        return (
          <section key={group} className="section">
            <header className="section-head">
              <div className="section-head-copy">
                <h2 className="section-title">{TOPIC_GROUP_LABELS[group]}</h2>
              </div>
              <span className="section-count">
                {groupLearned} of {groupTotal} learned
              </span>
            </header>
            <div className="surface topic-rows">
              {groupTopics.map((topic) => {
                const total = cardsForTopic(topic.id).length;
                const learned = learnedIn(topic.id);
                return (
                  <Link key={topic.id} to={`/thema/${topic.id}`} className="topic-row">
                    <span className="topic-row-name">
                      <span className="topic-row-icon">
                        <SceneIcon name={topic.icon} />
                      </span>
                      <span>{topic.name}</span>
                    </span>
                    <div className="meter meter-sage">
                      <span style={{ width: `${total ? (learned / total) * 100 : 0}%` }} />
                    </div>
                    <span className="topic-row-count">
                      <strong>{learned}</strong> / {total}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <OfflineAudio />

      <p className="footnote">
        <Icon name="info" />
        Progress is stored only in this browser. Nothing is sent anywhere — and there's no streak to protect, so come back
        whenever it suits you.
      </p>
    </>
  );
}
