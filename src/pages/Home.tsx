import { Link } from 'react-router-dom';
import { Masthead } from '../components/Masthead';
import { topics, TOPIC_GROUP_ORDER, TOPIC_GROUP_LABELS } from '../data/topics';
import { cardsForTopic, FREQUENCY_LIST_TARGET } from '../data/cards';
import { passageForTopic } from '../data/passages';
import { useProgress } from '../lib/progress';

export function Home() {
  const { isLearned } = useProgress();

  return (
    <div className="page">
      <Masthead />

      <div className="stack-label">start &amp; topics</div>
      <h2 className="screen-title">Where do you want to pick up?</h2>

      {TOPIC_GROUP_ORDER.map((group, groupIndex) => {
        const groupTopics = topics.filter((t) => t.group === group);
        if (groupTopics.length === 0) return null;

        return (
          <div key={group} className={groupIndex === 0 ? undefined : 'section-gap'}>
            <div className="stack-label">{TOPIC_GROUP_LABELS[group]}</div>
            <div className="topic-grid">
              {groupTopics.map((topic) => {
                const cards = cardsForTopic(topic.id);
                const isFrequencyList = topic.id === 'wortschatz-1000';
                const learnedCount = cards.filter((c) => isLearned(c.id)).length;
                const countLabel = isFrequencyList
                  ? `${learnedCount} of ${FREQUENCY_LIST_TARGET} learned`
                  : topic.tagline
                    ? `${cards.length} cards · ${topic.tagline}`
                    : `${cards.length} cards`;
                const passage = passageForTopic(topic.id);
                const hasSpeakingPractice = cards.some((c) => c.type === 'sentence');

                return (
                  <div key={topic.id} className={`tile tile-with-extra${topic.featured ? ' featured' : ''}`}>
                    <Link to={`/thema/${topic.id}`} className="tile-link">
                      <p className="tile-name">{topic.name}</p>
                      <span className="tile-count">{countLabel}</span>
                    </Link>
                    {passage && (
                      <Link to={`/thema/${topic.id}/passage`} className="tile-extra-link">
                        Read full passage →
                      </Link>
                    )}
                    {hasSpeakingPractice && (
                      <Link to={`/thema/${topic.id}/sprechen`} className="tile-extra-link">
                        Practice speaking →
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
