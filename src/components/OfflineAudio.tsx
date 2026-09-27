import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { audioStatus, saveAllAudio, type AudioStatus } from '../lib/offline';

// Rough average clip size, for the download estimate.
const AVG_CLIP_KB = 14;

/** "Save all audio for offline" — only shown where the offline service worker runs (production builds). */
export function OfflineAudio() {
  const [status, setStatus] = useState<AudioStatus | null>(null);
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);
  const abort = useRef<AbortController | null>(null);

  useEffect(() => {
    audioStatus().then(setStatus);
    return () => abort.current?.abort();
  }, []);

  if (!status) return null;

  const done = status.saved >= status.total;
  const remainingMB = Math.max(1, Math.round(((status.total - status.saved) * AVG_CLIP_KB) / 1024));
  const pct = status.total ? (status.saved / status.total) * 100 : 0;

  const start = async () => {
    setSaving(true);
    setFailed(false);
    abort.current = new AbortController();
    try {
      const final = await saveAllAudio(setStatus, abort.current.signal);
      if (final.saved < final.total && !abort.current.signal.aborted) setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="section">
      <div className="surface offline-card">
        <span className="offline-icon">
          <Icon name={done ? 'check' : 'volume'} />
        </span>
        <div className="offline-copy">
          <h2 className="offline-title">{done ? 'All audio saved for offline' : 'Audio without internet'}</h2>
          <p className="offline-sub">
            {done
              ? `All ${status.total.toLocaleString('en')} pronunciation clips are on this device — the sound buttons work with no signal.`
              : saving
                ? `Saving… ${status.saved.toLocaleString('en')} of ${status.total.toLocaleString('en')} clips`
                : status.saved === 0
                  ? `Save all ${status.total.toLocaleString('en')} pronunciation clips (about ${remainingMB} MB) so every sound button works with no signal — best on Wi-Fi.`
                  : `${status.saved.toLocaleString('en')} of ${status.total.toLocaleString('en')} clips saved. Save the rest (about ${remainingMB} MB) so every sound button works offline — best on Wi-Fi.`}
          </p>
          {!done && (
            <div className="meter meter-sage offline-meter">
              <span style={{ width: `${pct}%` }} />
            </div>
          )}
          {failed && <p className="offline-error">Some clips didn’t download — check your connection and try again.</p>}
        </div>
        {!done &&
          (saving ? (
            <button type="button" className="btn" onClick={() => abort.current?.abort()}>
              Pause
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={start}>
              <Icon name="volume" />
              {status.saved > 0 ? 'Save the rest' : 'Save all audio'}
            </button>
          ))}
      </div>
    </section>
  );
}
