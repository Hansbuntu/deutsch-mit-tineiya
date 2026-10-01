import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { passageForTopic } from '../data/passages';
import { topicById } from '../data/topics';
import { cardsForTopic } from '../data/cards';
import { useProgress } from '../lib/progress';

// A learner reading German aloud manages roughly 120–140 words a minute.
const READ_ALOUD_WPM = 130;

export function PassagePage() {
  const { topicId = '' } = useParams();
  const passage = passageForTopic(topicId);
  const topic = topicById(topicId);
  const { logActivity } = useProgress();

  // Opening a script counts as reading practice.
  useEffect(() => {
    if (passage) logActivity('reading');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  if (!passage || !topic) {
    return (
      <div className="surface empty">
        <p>There's no full passage for this topic.</p>
        <Link to="/" className="btn" style={{ marginTop: 16 }}>
          Back to topics
        </Link>
      </div>
    );
  }

  const cards = cardsForTopic(topicId);
  const sentenceCount = cards.filter((c) => c.type === 'sentence').length;
  const words = passage.paragraphs.join(' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / READ_ALOUD_WPM));

  return (
    <article className="reader">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <Icon name="chevron-right" />
        <Link to={`/thema/${topicId}`}>{topic.name}</Link>
        <Icon name="chevron-right" />
        <span>Passage</span>
      </nav>

      <header className="reader-head rise">
        <span className="eyebrow no-rule">TikTok script · read &amp; memorize</span>
        <h1 className="title-xl" lang="de">
          {passage.title}
        </h1>
        <div className="reader-meta">
          <span className="tag">{passage.paragraphs.length} paragraphs</span>
          <span className="tag">{words} words</span>
          <span className="tag">~{minutes} min read aloud</span>
        </div>
      </header>

      <div className="surface reader-body corner-mark rise-2" lang="de">
        {passage.paragraphs.map((paragraph, i) => (
          <p key={i} className="reader-p">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="reader-cta rise-3">
        <Link to={`/thema/${topicId}`} className="cta-card">
          <span className="cta-card-icon">
            <Icon name="cards" />
          </span>
          <div>
            <strong>Study the cards</strong>
            <span>{cards.length} cards from this script</span>
          </div>
          <Icon name="arrow-right" />
        </Link>
        {sentenceCount > 0 && (
          <Link to={`/thema/${topicId}/sprechen`} className="cta-card">
            <span className="cta-card-icon">
              <Icon name="mic" />
            </span>
            <div>
              <strong>Practice speaking</strong>
              <span>{sentenceCount} core sentences to say aloud</span>
            </div>
            <Icon name="arrow-right" />
          </Link>
        )}
      </div>
    </article>
  );
}
