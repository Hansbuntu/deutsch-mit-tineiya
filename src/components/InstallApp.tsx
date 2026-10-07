import { useState } from 'react';
import { Icon } from './Icon';
import { useInstall } from '../lib/install';

const HINT_DISMISSED_KEY = 'deutsch-mit-tineiya:install-hint-dismissed';

function readDismissed(): boolean {
  try {
    return localStorage.getItem(HINT_DISMISSED_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * "Install the app" — an install button where the browser offers one (Chrome, Edge, Android),
 * the Add to Home Screen steps on iPhone/iPad. Hidden once installed.
 * - `card` (Progress page): always there until installed.
 * - `hint` (Home): only where installing is possible, and it can be dismissed for good.
 */
export function InstallApp({ variant = 'card' }: { variant?: 'card' | 'hint' }) {
  const { installed, canPrompt, ios, macSafari, promptInstall } = useInstall();
  const [dismissed, setDismissed] = useState(() => variant === 'hint' && readDismissed());
  const [showSteps, setShowSteps] = useState(variant === 'card');

  if (installed || dismissed) return null;
  // Firefox and other browsers without an install option: nothing to offer.
  if (!canPrompt && !ios && !(macSafari && variant === 'card')) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(HINT_DISMISSED_KEY, '1');
    } catch {
      // only hidden for this visit
    }
  };

  const steps = ios ? (
    <p className="install-steps">
      In Safari, tap <strong>Share</strong>
      <Icon name="share" className="install-steps-icon" />{' '}
      then <strong>Add to Home Screen</strong>.
    </p>
  ) : macSafari ? (
    <p className="install-steps">
      In Safari’s menu bar, choose <strong>File → Add to Dock</strong>.
    </p>
  ) : null;

  return (
    <section className="section" aria-labelledby={`install-${variant}`}>
      <div className={`surface offline-card install-card${variant === 'hint' ? ' install-hint' : ''}`}>
        <span className="offline-icon">
          <Icon name="install" />
        </span>
        <div className="offline-copy">
          <h2 className="offline-title" id={`install-${variant}`}>
            {variant === 'hint' ? 'Put Deutsch on your home screen' : 'Install the app'}
          </h2>
          <p className="offline-sub">
            {variant === 'hint'
              ? 'Opens full screen like an app, and works offline.'
              : 'It opens full screen like any other app, straight from your home screen, and works without internet.'}
          </p>
          {showSteps && steps}
        </div>
        {canPrompt ? (
          <button type="button" className="btn btn-primary" onClick={() => void promptInstall()}>
            <Icon name="install" />
            Install
          </button>
        ) : (
          !showSteps && (
            <button type="button" className="btn" onClick={() => setShowSteps(true)}>
              Show me how
            </button>
          )
        )}
        {variant === 'hint' && (
          <button type="button" className="icon-btn install-dismiss" onClick={dismiss} aria-label="Don’t show this again">
            <Icon name="x" />
          </button>
        )}
      </div>
    </section>
  );
}
