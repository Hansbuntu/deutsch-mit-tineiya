import { Masthead } from '../components/Masthead';
import { useProgress } from '../lib/progress';
import { topics } from '../data/topics';
import { allCards, cardsForTopic, FREQUENCY_LIST_TARGET } from '../data/cards';

export function Progress() {
  const { daysActive, notebookPagesDigitized, frequencyListLearned, isLearned } = useProgress();

  return (
    <div className="page">
      <Masthead />

      <div className="stack-label">your progress</div>
      <h2 className="screen-title">How far you've come</h2>
      <div className="stat-row">
        <div className="stat">
          <span className="stat-num">{daysActive}</span>
          <span className="stat-label">days active</span>
        </div>
        <div className="stat">
          <span className="stat-num">{allCards.length}</span>
          <span className="stat-label">cards total</span>
        </div>
        <div className="stat">
          <span className="stat-num">{notebookPagesDigitized}</span>
          <span className="stat-label">notebook pages digitized</span>
        </div>
        <div className="stat">
          <span className="stat-num">{frequencyListLearned}</span>
          <span className="stat-label">of {FREQUENCY_LIST_TARGET} most common words</span>
        </div>
      </div>

      <div className="section-gap">
        <div className="stack-label">by topic</div>
        <div className="topic-grid">
          {topics.map((topic) => {
            const cards = cardsForTopic(topic.id);
            const learned = cards.filter((c) => isLearned(c.id)).length;
            return (
              <div key={topic.id} className="tile">
                <p className="tile-name">{topic.name}</p>
                <span className="tile-count">
                  {learned} of {cards.length} learned
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="empty-state" style={{ marginTop: 28 }}>
        A card counts as "learned" once you've answered it correctly twice in a drill. No streak pressure — just stop by
        whenever you feel like it.
      </p>
    </div>
  );
}
