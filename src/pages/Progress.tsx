import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { SceneIcon } from '../components/SceneIcon';
import { ProgressRing } from '../components/ProgressRing';
import { OfflineAudio } from '../components/OfflineAudio';
import { InstallApp } from '../components/InstallApp';
import { ProgressBackup } from '../components/ProgressBackup';
import { HowItWorksList } from '../components/HowItWorks';
import { useProgress } from '../lib/progress';
import { topics, TOPIC_GROUP_ORDER, TOPIC_GROUP_LABELS } from '../data/topics';
import { FREQUENCY_LIST_TARGET } from '../data/cards';
import { HeroBackdrop } from '../components/HeroBackdrop';

export function Progress() {
  const {
    daysActive,
    totalCardsLearned,
    practisedThisWeek,
    frequencyListLearned,
    frequencyListPractised,
    topicProgress,
  } = useProgress();

  return (
    <div className="tab-page">
      <HeroBackdrop className="tab-waves" />
      <header className="page-head rise">
        <div className="page-head-copy on-waves">
          <span className="eyebrow">Your progress</span>
          <h1 className="title-xl">How far you've come</h1>
          <p className="lede">
            Quiet numbers, no streaks. A card counts as learned once you've answered it correctly twice.
          </p>
        </div>
      </header>

      <div className="stats-grid rise-2">
        <div className="surface stat-card stat-hero">
          <ProgressRing value={frequencyListLearned} secondary={frequencyListPractised} max={FREQUENCY_LIST_TARGET} />
          <div>
            <div className="stat-value">
              {frequencyListLearned}
              <small> / {FREQUENCY_LIST_TARGET.toLocaleString('en')}</small>
            </div>
            <p className="stat-label">most common German words learned</p>
            {frequencyListPractised > 0 && (
              <p className="glance-sub">
                <span className="glance-swatch" aria-hidden="true" />
                {frequencyListPractised.toLocaleString('en')} practised so far
              </p>
            )}
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
            <div className="stat-value">{totalCardsLearned}</div>
            <p className="stat-label">cards learned (answered right twice)</p>
          </div>
        </div>
        <div className="surface stat-card">
          <span className="stat-icon">
            <Icon name="chart" />
          </span>
          <div>
            <div className="stat-value">{practisedThisWeek}</div>
            <p className="stat-label">cards practised this week</p>
          </div>
        </div>
      </div>

      {TOPIC_GROUP_ORDER.map((group) => {
        const groupTopics = topics.filter((t) => t.group === group);
        if (groupTopics.length === 0) return null;
        const groupProgress = groupTopics.map((t) => topicProgress(t.id));
        const groupTotal = groupProgress.reduce((sum, p) => sum + p.total, 0);
        const groupDone = groupProgress.reduce((sum, p) => sum + p.done, 0);
        const groupLearned = groupProgress.reduce((sum, p) => sum + p.learned, 0);

        return (
          <section key={group} className="section">
            <header className="section-head">
              <div className="section-head-copy">
                <h2 className="section-title">{TOPIC_GROUP_LABELS[group]}</h2>
              </div>
              <span className="section-count">
                {groupDone} of {groupTotal} done · {groupLearned} learned
              </span>
            </header>
            <div className="surface topic-rows">
              {groupTopics.map((topic) => {
                const { total, done, learned, finished } = topicProgress(topic.id);
                return (
                  <Link
                    key={topic.id}
                    to={`/thema/${topic.id}`}
                    className={`topic-row${finished ? ' is-finished' : ''}`}
                  >
                    <span className="topic-row-name">
                      <span className="topic-row-icon">
                        <SceneIcon name={topic.icon} />
                      </span>
                      <span>{topic.name}</span>
                      {finished && (
                        <span className="tag tag-sage topic-row-status">
                          <Icon name="check" />
                          Finished
                        </span>
                      )}
                    </span>
                    <div className="meter meter-sage">
                      <span style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
                    </div>
                    <span className="topic-row-count">
                      <strong>{done}</strong> / {total}
                      {learned > 0 && <small> · {learned} learned</small>}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <ProgressBackup />

      <section className="section">
        <details className="surface how-details">
          <summary>
            <Icon name="info" />
            How this app works
          </summary>
          <HowItWorksList />
        </details>
      </section>

      <InstallApp />
      <OfflineAudio />

      <p className="footnote">
        <Icon name="info" />
        Progress is stored only in this browser. Nothing is sent anywhere — and there's no streak to protect, so come
        back whenever it suits you.
      </p>
    </div>
  );
}
