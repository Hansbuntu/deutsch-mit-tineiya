import { useRef, useState } from 'react';
import { Icon } from './Icon';
import {
  backupToCode,
  createBackup,
  downloadBackup,
  parseBackup,
  restoreBackup,
  summarize,
  type Backup,
} from '../lib/backup';

type Status = { tone: 'ok' | 'bad'; text: string } | null;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** Back up progress to a file or a code, and restore it — on the Progress page. */
export function ProgressBackup() {
  const [status, setStatus] = useState<Status>(null);
  const [pasting, setPasting] = useState(false);
  const [code, setCode] = useState('');
  const [pending, setPending] = useState<Backup | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const withBackup = (run: (backup: Backup) => void | Promise<void>) => {
    const backup = createBackup();
    if (!backup) {
      setStatus({ tone: 'bad', text: 'Nothing to back up yet — study a few cards first.' });
      return;
    }
    void run(backup);
  };

  const download = () =>
    withBackup((backup) => {
      downloadBackup(backup);
      setStatus({ tone: 'ok', text: 'Backup file saved. Keep it somewhere safe, like your cloud drive or email.' });
    });

  const copyCode = () =>
    withBackup(async (backup) => {
      try {
        await navigator.clipboard.writeText(await backupToCode(backup));
        setStatus({ tone: 'ok', text: 'Backup code copied — paste it into a note or a message to yourself.' });
      } catch {
        setStatus({ tone: 'bad', text: "Couldn't copy the code here — use Download backup instead." });
      }
    });

  const check = async (text: string) => {
    const result = await parseBackup(text);
    if (result.ok) {
      setPending(result.backup);
      setStatus(null);
    } else {
      setPending(null);
      setStatus({ tone: 'bad', text: result.error });
    }
  };

  const chooseFile = async (file: File | undefined) => {
    if (file) await check(await file.text());
    if (fileInput.current) fileInput.current.value = '';
  };

  const summary = pending ? summarize(pending) : null;

  return (
    <section className="section">
      <div className="surface backup-card">
        <div className="backup-head">
          <span className="offline-icon">
            <Icon name="cards" />
          </span>
          <div>
            <h2 className="offline-title">Back up your progress</h2>
            <p className="offline-sub">
              Your progress is saved only in this browser. A backup keeps it safe if you clear your browser or move to
              a new phone.
            </p>
          </div>
        </div>

        <div className="backup-actions">
          <button type="button" className="btn btn-primary" onClick={download}>
            Download backup
          </button>
          <button type="button" className="btn" onClick={copyCode}>
            Copy backup code
          </button>
        </div>

        <div className="backup-restore">
          <span className="backup-label">Restore on this device</span>
          <div className="backup-actions">
            <button type="button" className="btn btn-sm" onClick={() => fileInput.current?.click()}>
              From a file
            </button>
            <button type="button" className="btn btn-sm" onClick={() => setPasting((p) => !p)} aria-expanded={pasting}>
              Paste a code
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="application/json,.json"
              hidden
              onChange={(e) => chooseFile(e.target.files?.[0])}
            />
          </div>
          {pasting && (
            <div className="backup-paste">
              <textarea
                className="backup-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your backup code (it starts with DMT1:)"
                rows={3}
                spellCheck={false}
                aria-label="Backup code"
              />
              <button type="button" className="btn btn-sm btn-primary" onClick={() => check(code)} disabled={!code.trim()}>
                Check code
              </button>
            </div>
          )}
        </div>

        {pending && summary && (
          <div className="backup-confirm" role="alertdialog" aria-label="Replace progress?">
            <p>
              <strong>Backup from {formatDate(summary.exportedAt)}</strong> — {summary.cardsPractised} cards practised,{' '}
              {summary.cardsLearned} learned, {summary.daysActive} days active.
            </p>
            <p>Restoring replaces the progress on this device with this backup.</p>
            <div className="backup-actions">
              <button type="button" className="btn btn-primary" onClick={() => restoreBackup(pending)}>
                Replace my progress
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setPending(null)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {status && (
          <p className={`backup-status ${status.tone}`} role="status">
            <Icon name={status.tone === 'ok' ? 'check' : 'info'} />
            {status.text}
          </p>
        )}
      </div>
    </section>
  );
}
