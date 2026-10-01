import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { pickForThisVisit, rememberShown, type TodayPick } from '../lib/recommend';

/**
 * The recommended thing to do, picked from the learner's own patterns. It stays the
 * same for this visit (going back to Home doesn't reshuffle it); "Something else" moves
 * through the rest of the ranking.
 */
export function TodaysPick({ ranked: latest, todayISO }: { ranked: TodayPick[]; todayISO: string }) {
  // Freeze the ranking for this view: recording a pick as shown lowers its score, and a
  // re-ranked list would otherwise swap the card out from under the learner.
  const [ranked] = useState(latest);
  const [index, setIndex] = useState(() => {
    const keptId = pickForThisVisit();
    const kept = ranked.findIndex((p) => p.id === keptId);
    if (kept >= 0) return kept;
    if (ranked[0]) rememberShown(ranked[0].id, todayISO);
    return 0;
  });

  if (ranked.length === 0) return null;
  const pick = ranked[Math.min(index, ranked.length - 1)];

  const somethingElse = () => {
    const next = (index + 1) % ranked.length;
    setIndex(next);
    rememberShown(ranked[next].id, todayISO);
  };

  return (
    <article className="pick-card rise-2" aria-labelledby="todays-pick-title">
      <div className="pick-head">
        <span className="pick-label">
          <Icon name="sparkles" />
          Today’s pick for you
        </span>
        <span className="pick-time">about {pick.minutes} min</span>
      </div>

      <div className="pick-main">
        <span className="pick-icon" aria-hidden="true">
          <Icon name={pick.icon} />
        </span>
        <h2 className="pick-title" id="todays-pick-title">
          {pick.title}
        </h2>
      </div>

      <p className="pick-reason">
        <Icon name="lightbulb" />
        <span>{pick.reason}</span>
      </p>

      <div className="pick-actions">
        <Link to={pick.to} className="btn btn-primary">
          {pick.action}
          <Icon name="arrow-right" />
        </Link>
        {ranked.length > 1 && (
          <button type="button" className="btn btn-ghost" onClick={somethingElse}>
            <Icon name="refresh" />
            Something else
          </button>
        )}
      </div>
    </article>
  );
}
