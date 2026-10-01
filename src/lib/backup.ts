// Progress backup: everything lives in this browser's localStorage, so clearing
// site data or switching phones would lose it. A backup is the progress plus the
// small preferences, as a downloadable JSON file or a compact code to paste on
// another device. Restoring replaces this device's progress, then reloads.

const PROGRESS_KEY = 'deutsch-mit-tineiya:progress:v1';
const PREF_KEYS = [
  'deutsch-mit-tineiya:theme',
  'deutsch-mit-tineiya:last-topic',
  'deutsch-mit-tineiya:review-mode',
  'deutsch-mit-tineiya:pick-history',
];
const APP = 'deutsch-mit-tineiya';
const CODE_PREFIX = 'DMT1:';

interface SavedProgress {
  version: 1;
  firstUseISO: string;
  activeDates: string[];
  cards: Record<string, { learned?: boolean }>;
}

export interface Backup {
  app: typeof APP;
  format: 1;
  exportedAt: string;
  progress: SavedProgress;
  prefs: Record<string, string>;
}

export interface BackupSummary {
  cardsPractised: number;
  cardsLearned: number;
  daysActive: number;
  exportedAt: string;
}

export function createBackup(): Backup | null {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    const prefs: Record<string, string> = {};
    for (const key of PREF_KEYS) {
      const value = localStorage.getItem(key);
      if (value !== null) prefs[key] = value;
    }
    return { app: APP, format: 1, exportedAt: new Date().toISOString(), progress: JSON.parse(raw), prefs };
  } catch {
    return null;
  }
}

export function summarize(backup: Backup): BackupSummary {
  const records = Object.values(backup.progress.cards);
  return {
    cardsPractised: records.length,
    cardsLearned: records.filter((r) => r.learned).length,
    daysActive: backup.progress.activeDates.length,
    exportedAt: backup.exportedAt,
  };
}

export function backupFileName(backup: Backup): string {
  return `deutsch-mit-tineiya-backup-${backup.exportedAt.slice(0, 10)}.json`;
}

export function downloadBackup(backup: Backup) {
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = backupFileName(backup);
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// --- compact code: gzip (when the browser can) + base64, so it's short enough to paste ---

const toBase64 = (bytes: Uint8Array) => {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
};
const fromBase64 = (text: string) => Uint8Array.from(atob(text), (c) => c.charCodeAt(0));

async function pipe(bytes: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const out = new Blob([bytes as BlobPart]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(out).arrayBuffer());
}

export async function backupToCode(backup: Backup): Promise<string> {
  const bytes = new TextEncoder().encode(JSON.stringify(backup));
  if (typeof CompressionStream === 'undefined') return `${CODE_PREFIX}raw:${toBase64(bytes)}`;
  return `${CODE_PREFIX}gz:${toBase64(await pipe(bytes, new CompressionStream('gzip')))}`;
}

async function codeToJson(code: string): Promise<string> {
  const body = code.slice(CODE_PREFIX.length);
  if (body.startsWith('raw:')) return new TextDecoder().decode(fromBase64(body.slice(4)));
  if (body.startsWith('gz:')) {
    if (typeof DecompressionStream === 'undefined') throw new Error('This browser cannot read compressed codes.');
    return new TextDecoder().decode(await pipe(fromBase64(body.slice(3)), new DecompressionStream('gzip')));
  }
  throw new Error('unknown code');
}

export type ParseResult = { ok: true; backup: Backup } | { ok: false; error: string };

/** Accepts a backup file's text or a pasted code. */
export async function parseBackup(input: string): Promise<ParseResult> {
  const trimmed = input.trim();
  // A pasted code may arrive wrapped across lines; a file's JSON is kept as it is.
  const text = trimmed.startsWith(CODE_PREFIX) ? trimmed.replace(/\s+/g, '') : trimmed;
  if (!text) return { ok: false, error: 'Nothing to restore — paste a backup code or choose a backup file.' };
  let data: unknown;
  try {
    data = JSON.parse(text.startsWith(CODE_PREFIX) ? await codeToJson(text) : text);
  } catch {
    return { ok: false, error: "That doesn't look like a backup from this app — check you copied the whole code." };
  }
  const backup = data as Partial<Backup>;
  const progress = backup?.progress as Partial<SavedProgress> | undefined;
  if (
    backup?.app !== APP ||
    backup.format !== 1 ||
    progress?.version !== 1 ||
    typeof progress.cards !== 'object' ||
    !Array.isArray(progress.activeDates)
  ) {
    return { ok: false, error: "That isn't a Deutsch mit Tineiya backup, or it's from a newer version of the app." };
  }
  return { ok: true, backup: backup as Backup };
}

/** Replace this device's progress and preferences with the backup, then reload so everything picks it up. */
export function restoreBackup(backup: Backup) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(backup.progress));
  for (const key of PREF_KEYS) {
    const value = backup.prefs[key];
    if (value === undefined) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  }
  window.location.reload();
}
