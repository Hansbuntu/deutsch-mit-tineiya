import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { SceneIcon } from '../components/SceneIcon';
import type { Article, IconName } from '../data/types';
import {
  isBuiltInScript,
  loadUserScripts,
  newScriptId,
  originalScript,
  saveUserScripts,
  SCRIPT_ICONS,
  splitScript,
  type ScriptWord,
  type UserScript,
} from '../data/userScripts';

const DRAFT_KEY = 'deutsch-mit-tineiya:script-draft';

interface Draft {
  title: string;
  icon: IconName;
  text: string;
  translations: Record<string, string>;
  words: ScriptWord[];
}

const EMPTY: Draft = { title: '', icon: SCRIPT_ICONS[0], text: '', translations: {}, words: [] };

function readDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

/** Save the scripts list, then reload into the topic so every screen picks up the change. */
function saveAndOpen(scripts: UserScript[], openHash: string) {
  saveUserScripts(scripts);
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
  window.location.hash = openHash;
  window.location.reload();
}

/**
 * Add a new TikTok script, or edit one (route: /skript/neu or /skript/:topicId).
 * Scripts added here can be deleted; the built-in ones can be restored to how they shipped.
 */
export function ScriptEditor() {
  const { topicId } = useParams();
  const builtIn = !!topicId && isBuiltInScript(topicId);
  // A saved script — for a built-in one, that means it's been edited.
  const saved = useMemo(() => (topicId ? loadUserScripts().find((s) => s.id === topicId) : undefined), [topicId]);
  const existing = saved ?? (topicId && builtIn ? originalScript(topicId) : undefined);
  const isNew = !topicId;

  const [draft, setDraft] = useState<Draft>(() => {
    if (existing) {
      const { title, icon, text, translations, words } = existing;
      return { title, icon, text, translations, words };
    }
    return readDraft() ?? EMPTY;
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // A new script's draft survives leaving the page (long scripts take a while to type).
  useEffect(() => {
    if (!isNew) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch {
        // not saved — fine
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [draft, isNew]);

  const sentences = useMemo(() => [...new Set(splitScript(draft.text).flat())], [draft.text]);
  const translated = sentences.filter((s) => draft.translations[s]?.trim()).length;

  const update = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));
  const setTranslation = (de: string, en: string) =>
    setDraft((d) => ({ ...d, translations: { ...d.translations, [de]: en } }));
  const setWord = (i: number, patch: Partial<ScriptWord>) =>
    setDraft((d) => ({ ...d, words: d.words.map((w, j) => (j === i ? { ...w, ...patch } : w)) }));

  if (topicId && !existing) {
    return (
      <div className="surface empty">
        <p>That script isn’t on this device — it may have been deleted.</p>
        <Link to="/" className="btn" style={{ marginTop: 16 }}>
          Back to topics
        </Link>
      </div>
    );
  }

  const save = () => {
    const problems: string[] = [];
    if (!draft.title.trim()) problems.push('Give the script a title.');
    if (sentences.length === 0) problems.push('Type or paste the German script.');
    else if (translated === 0) problems.push('Add the English for at least one sentence — that’s what you practise from.');
    setErrors(problems);
    if (problems.length > 0) return;

    const now = new Date().toISOString();
    const script: UserScript = {
      id: existing?.id ?? newScriptId(draft.title),
      title: draft.title.trim(),
      icon: draft.icon,
      text: draft.text.trim(),
      // keep only translations for sentences still in the script
      translations: Object.fromEntries(
        sentences.filter((s) => draft.translations[s]?.trim()).map((s) => [s, draft.translations[s].trim()]),
      ),
      words: draft.words.filter((w) => w.word.trim() && w.english.trim()),
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };
    const others = loadUserScripts().filter((s) => s.id !== script.id);
    saveAndOpen([...others, script], `#/thema/${script.id}`);
  };

  // Deletes an added script; for a built-in one, drops the edits so the original comes back.
  const remove = () => {
    if (!existing) return;
    saveAndOpen(
      loadUserScripts().filter((s) => s.id !== existing.id),
      builtIn ? `#/thema/${existing.id}` : '#/',
    );
  };

  return (
    <div className="script-editor">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <Icon name="chevron-right" />
        {existing ? <Link to={`/thema/${existing.id}`}>{existing.title}</Link> : <span>Your TikTok scripts</span>}
        <Icon name="chevron-right" />
        <span>{isNew ? 'New script' : 'Edit'}</span>
      </nav>

      <header className="page-head rise">
        <div className="page-head-copy">
          <h1 className="title-xl">{isNew ? 'Add a TikTok script' : `Edit “${existing!.title}”`}</h1>
          <p className="muted">
            Paste the German, add the English for each sentence, and it becomes cards, drills, speaking and listening
            practice — like your other scripts.
          </p>
          {builtIn && (
            <p className="field-hint editor-note">
              The script’s word cards, pictures and drills stay as they are. Sentences you change or add get their own
              cards and use your device’s German voice; ones you remove are taken out.
            </p>
          )}
        </div>
      </header>

      <form
        className="editor-form"
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <section className="surface editor-section">
          <label className="field">
            <span className="field-label">Title</span>
            <input
              className="field-input"
              value={draft.title}
              onChange={(e) => update({ title: e.target.value })}
              placeholder="e.g. Meine Familie"
              maxLength={60}
              lang="de"
            />
          </label>

          <fieldset className="field">
            <legend className="field-label">Picture</legend>
            <div className="icon-picker" role="radiogroup" aria-label="Picture">
              {SCRIPT_ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  role="radio"
                  aria-checked={draft.icon === icon}
                  aria-label={icon.replace('category-', '').replace('-', ' ')}
                  className={`icon-choice${draft.icon === icon ? ' active' : ''}`}
                  onClick={() => update({ icon })}
                >
                  <SceneIcon name={icon} />
                </button>
              ))}
            </div>
          </fieldset>
        </section>

        <section className="surface editor-section">
          <label className="field">
            <span className="field-label">Your script, in German</span>
            <textarea
              className="field-input field-text"
              value={draft.text}
              onChange={(e) => update({ text: e.target.value })}
              rows={9}
              lang="de"
              placeholder={'Ich heiße Tineiya. Ich wohne in Ghana.\n\nJeden Morgen …'}
            />
            <span className="field-hint">Leave an empty line between paragraphs. Sentences are split after . ! ?</span>
          </label>
        </section>

        <section className="surface editor-section">
          <div className="editor-section-head">
            <h2 className="field-label">English for each sentence</h2>
            <span className="editor-count">
              {translated} of {sentences.length} done
            </span>
          </div>
          {sentences.length === 0 ? (
            <p className="field-hint">The sentences appear here as you write the script.</p>
          ) : (
            <ol className="sentence-list">
              {sentences.map((de) => (
                <li key={de} className="sentence-row">
                  <p className="sentence-de" lang="de">
                    {de}
                  </p>
                  <input
                    className="field-input"
                    value={draft.translations[de] ?? ''}
                    onChange={(e) => setTranslation(de, e.target.value)}
                    placeholder="English"
                    aria-label={`English for: ${de}`}
                  />
                </li>
              ))}
            </ol>
          )}
          <p className="field-hint">Sentences without English stay in the passage but aren’t practised.</p>
        </section>

        <section className="surface editor-section">
          <div className="editor-section-head">
            <h2 className="field-label">Words to learn (optional)</h2>
          </div>
          {draft.words.length > 0 && (
            <ul className="word-rows">
              {draft.words.map((w, i) => (
                <li key={i} className="word-edit-row">
                  <select
                    className="field-input word-article-select"
                    value={w.article}
                    onChange={(e) => setWord(i, { article: e.target.value as Article | '' })}
                    aria-label="Article"
                  >
                    <option value="">—</option>
                    <option value="der">der</option>
                    <option value="die">die</option>
                    <option value="das">das</option>
                  </select>
                  <input
                    className="field-input"
                    value={w.word}
                    onChange={(e) => setWord(i, { word: e.target.value })}
                    placeholder="German word"
                    lang="de"
                    aria-label="German word"
                  />
                  <input
                    className="field-input"
                    value={w.english}
                    onChange={(e) => setWord(i, { english: e.target.value })}
                    placeholder="English"
                    aria-label="English"
                  />
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => update({ words: draft.words.filter((_, j) => j !== i) })}
                    aria-label={`Remove ${w.word || 'word'}`}
                  >
                    <Icon name="x" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => update({ words: [...draft.words, { word: '', article: '', english: '' }] })}
          >
            <Icon name="plus" />
            Add a word
          </button>
          <p className="field-hint">
            {builtIn ? 'The script’s own word cards stay — add any extra words here. ' : ''}
            Nouns get a der/die/das drill; other words get a “what does it mean?” drill.
          </p>
        </section>

        {errors.length > 0 && (
          <div className="editor-errors" role="alert">
            {errors.map((e) => (
              <p key={e}>
                <Icon name="info" />
                {e}
              </p>
            ))}
          </div>
        )}

        <div className="editor-actions">
          <button type="submit" className="btn btn-primary">
            <Icon name="check" />
            {isNew ? 'Add script' : 'Save changes'}
          </button>
          <Link to={existing ? `/thema/${existing.id}` : '/'} className="btn btn-ghost">
            Cancel
          </Link>
          {existing &&
            (!builtIn || saved) &&
            (confirmDelete ? (
              <span className="editor-delete-confirm">
                {builtIn ? 'Undo all your changes?' : 'Delete this script?'}
                <button type="button" className="btn btn-sm btn-danger" onClick={remove}>
                  {builtIn ? 'Restore' : 'Delete'}
                </button>
                <button type="button" className="btn btn-sm btn-ghost" onClick={() => setConfirmDelete(false)}>
                  {builtIn ? 'Keep my changes' : 'Keep it'}
                </button>
              </span>
            ) : (
              <button type="button" className="btn btn-ghost editor-delete" onClick={() => setConfirmDelete(true)}>
                <Icon name={builtIn ? 'refresh' : 'trash'} />
                {builtIn ? 'Restore original' : 'Delete script'}
              </button>
            ))}
        </div>
        <p className="field-hint">
          Saved on this device. Back it up from Progress → Back up your progress. Pronunciation uses your device’s German
          voice.
        </p>
      </form>
    </div>
  );
}
