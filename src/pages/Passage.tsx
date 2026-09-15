import { Link, useParams } from 'react-router-dom';
import { Masthead } from '../components/Masthead';
import { passageForTopic } from '../data/passages';
import { topicById } from '../data/topics';

export function PassagePage() {
  const { topicId = '' } = useParams();
  const passage = passageForTopic(topicId);
  const topic = topicById(topicId);

  if (!passage || !topic) {
    return (
      <div className="page">
        <Masthead />
        <p className="empty-state">There's no full passage for this topic.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <Masthead />

      <div className="stack-label">full passage · read &amp; memorize</div>
      <h2 className="screen-title">{passage.title}</h2>

      <div className="card passage-card">
        {passage.paragraphs.map((paragraph, i) => (
          <p key={i} className="passage-paragraph">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="card-nav">
        <Link to={`/thema/${topicId}`} className="btn btn-primary">
          Study the cards from this script
        </Link>
        <Link to="/" className="btn">
          Back to overview
        </Link>
      </div>
    </div>
  );
}
