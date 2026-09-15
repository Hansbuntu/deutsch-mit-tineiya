import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '../lib/progress';

export function Masthead() {
  const { daysActive } = useProgress();
  const location = useLocation();

  return (
    <div className="masthead">
      <div className="masthead-left">
        <Link to="/" className="wordmark">
          Deutsch mit <span>Tineiya</span>
        </Link>
        <div className="tagline">built from my own cards · A1 on the way to A2</div>
        <nav className="nav-links">
          <Link to="/" className={`nav-link${location.pathname === '/' ? ' active' : ''}`}>
            Home
          </Link>
          <Link to="/fortschritt" className={`nav-link${location.pathname === '/fortschritt' ? ' active' : ''}`}>
            Progress
          </Link>
        </nav>
      </div>
      <div className="day-note">
        <strong>Day {Math.max(daysActive, 1)}</strong>
        your pace, no streak
      </div>
    </div>
  );
}
