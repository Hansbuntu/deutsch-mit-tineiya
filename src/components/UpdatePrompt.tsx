import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { applyUpdate, onUpdateReady } from '../lib/offline';

/** "A new version is ready" — appears when a deploy downloads while the app is open. */
export function UpdatePrompt() {
  const [ready, setReady] = useState(false);
  useEffect(() => onUpdateReady(() => setReady(true)), []);

  if (!ready) return null;
  return (
    <div className="update-toast rise" role="status">
      <p>A new version of the app is ready.</p>
      <button type="button" className="btn btn-sm btn-primary" onClick={applyUpdate}>
        <Icon name="refresh" />
        Reload
      </button>
      <button type="button" className="icon-btn" onClick={() => setReady(false)} aria-label="Later">
        <Icon name="x" />
      </button>
    </div>
  );
}
