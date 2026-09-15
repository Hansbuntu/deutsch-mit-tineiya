import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '../lib/progress';

export function Masthead() {
  const { daysActive } = useProgress();
  const location = useLocation();

  return (
    <div className="masthead">
      <div className="masthead-left">
        <Link to="/" className="wordmark">
          Deutsch mit <span>Milan</span>
        </Link>
        <div className="tagline">gebaut aus eigenen Karten · A1 auf dem Weg zu A2</div>
        <nav className="nav-links">
          <Link to="/" className={`nav-link${location.pathname === '/' ? ' active' : ''}`}>
            Start
          </Link>
          <Link to="/fortschritt" className={`nav-link${location.pathname === '/fortschritt' ? ' active' : ''}`}>
            Fortschritt
          </Link>
        </nav>
      </div>
      <div className="day-note">
        <strong>Tag {Math.max(daysActive, 1)}</strong>
        dein Tempo, keine Serie
      </div>
    </div>
  );
}
