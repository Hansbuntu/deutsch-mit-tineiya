import { Masthead } from '../components/Masthead';
import { useProgress } from '../lib/progress';
import { topics } from '../data/topics';
import { allCards, cardsForTopic, FREQUENCY_LIST_TARGET } from '../data/cards';

export function Progress() {
  const { daysActive, notebookPagesDigitized, frequencyListLearned, isLearned } = useProgress();

  return (
    <div className="page">
      <Masthead />

      <div className="stack-label">dein fortschritt</div>
      <h2 className="screen-title">Wie weit du gekommen bist</h2>
      <div className="stat-row">
        <div className="stat">
          <span className="stat-num">{daysActive}</span>
          <span className="stat-label">Tage dabei</span>
        </div>
        <div className="stat">
          <span className="stat-num">{allCards.length}</span>
          <span className="stat-label">Karten insgesamt</span>
        </div>
        <div className="stat">
          <span className="stat-num">{notebookPagesDigitized}</span>
          <span className="stat-label">Heftseiten digitalisiert</span>
        </div>
        <div className="stat">
          <span className="stat-num">{frequencyListLearned}</span>
          <span className="stat-label">von {FREQUENCY_LIST_TARGET} häufigsten Wörtern</span>
        </div>
      </div>

      <div className="section-gap">
        <div className="stack-label">nach thema</div>
        <div className="topic-grid">
          {topics.map((topic) => {
            const cards = cardsForTopic(topic.id);
            const learned = cards.filter((c) => isLearned(c.id)).length;
            return (
              <div key={topic.id} className="tile">
                <p className="tile-name">{topic.name}</p>
                <span className="tile-count">
                  {learned} von {cards.length} gelernt
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="empty-state" style={{ marginTop: 28 }}>
        Eine Karte gilt als „gelernt“, sobald du sie zweimal richtig in einer Übung beantwortet hast. Kein Streak-Zwang —
        schau einfach vorbei, wenn du Lust hast.
      </p>
    </div>
  );
}
