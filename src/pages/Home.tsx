import { Link } from 'react-router-dom';
import { Masthead } from '../components/Masthead';
import { topics } from '../data/topics';
import { cardsForTopic, FREQUENCY_LIST_TARGET } from '../data/cards';
import { useProgress } from '../lib/progress';

export function Home() {
  const { isLearned } = useProgress();

  return (
    <div className="page">
      <Masthead />

      <div className="stack-label">start &amp; themen</div>
      <h2 className="screen-title">Wo möchtest du weitermachen?</h2>
      <div className="topic-grid">
        {topics.map((topic) => {
          const cards = cardsForTopic(topic.id);
          const isFrequencyList = topic.id === 'wortschatz-1000';
          const learnedCount = cards.filter((c) => isLearned(c.id)).length;
          const countLabel = isFrequencyList
            ? `${learnedCount} von ${FREQUENCY_LIST_TARGET} gelernt`
            : topic.tagline
              ? `${cards.length} Karten · ${topic.tagline}`
              : `${cards.length} Karten`;

          return (
            <Link key={topic.id} to={`/thema/${topic.id}`} className={`tile${topic.featured ? ' featured' : ''}`}>
              <p className="tile-name">{topic.name}</p>
              <span className="tile-count">{countLabel}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
