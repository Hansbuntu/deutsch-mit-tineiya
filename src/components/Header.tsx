import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon, type UiIconName } from './Icon';
import { useProgress } from '../lib/progress';
import { applyTheme, currentTheme, type Theme } from '../lib/theme';

const NAV: { to: string; label: string; icon: UiIconName }[] = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/generieren', label: 'Generate', icon: 'sparkles' },
  { to: '/fortschritt', label: 'Progress', icon: 'chart' },
];

function useIsActive() {
  const { pathname } = useLocation();
  return (to: string) => (to === '/' ? pathname === '/' || pathname.startsWith('/thema') : pathname.startsWith(to));
}

export function Header() {
  const { daysActive } = useProgress();
  const isActive = useIsActive();
  const [theme, setTheme] = useState<Theme>(currentTheme);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
  };

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Deutsch mit Tineiya — home">
          <span className="brand-mark" aria-hidden="true">
            D
          </span>
          <span className="brand-name">
            Deutsch mit <em>Tineiya</em>
          </span>
        </Link>

        <nav className="nav" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link${isActive(item.to) ? ' active' : ''}`}
              aria-current={isActive(item.to) ? 'page' : undefined}
            >
              <Icon name={item.icon} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <span className="day-chip" title="Days you've opened the app — no streak to keep">
            <span className="day-chip-dot" aria-hidden="true" />
            <strong>Day {Math.max(daysActive, 1)}</strong>
            <span className="day-chip-label">· your pace</span>
          </span>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const isActive = useIsActive();
  return (
    <nav className="bottom-nav" aria-label="Main">
      {NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`bottom-nav-link${isActive(item.to) ? ' active' : ''}`}
          aria-current={isActive(item.to) ? 'page' : undefined}
        >
          <span className="bottom-nav-icon">
            <Icon name={item.icon} />
          </span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
