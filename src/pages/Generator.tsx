import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { SentenceFlipCard } from '../components/SentenceFlipCard';
import { TypeCheckCard } from '../components/TypeCheckCard';
import { Seg } from '../components/Seg';
import { allCards } from '../data/cards';
import { topicById, TOPIC_GROUP_LABELS, TOPIC_GROUP_ORDER } from '../data/topics';
import type { Card, CefrLevel, TopicGroup } from '../data/types';
import { cardLevel } from '../lib/level';
import { useProgress } from '../lib/progress';
import { sentenceOf, type PracticeDirection } from '../lib/practice';
import { shouldIgnoreShortcut } from '../lib/keys';

type LevelFilter = 'all' | CefrLevel;
type SourceFilter = 'all' | TopicGroup;
type Mode = 'flip' | 'type' | 'listen';

const MODES: Mode[] = ['flip', 'type', 'listen'];
const MODE_LABELS: Record<Mode, string> = { flip: 'Flip', type: 'Type', listen: 'Listen' };

const LEVEL_OPTIONS: LevelFilter[] = ['all', 'A1', 'A2'];

function groupForCard(card: Card): TopicGroup | undefined {
  for (const topicId of card.topicIds) {
    const group = topicById(topicId)?.group;
    if (group) return group;
  }
  return undefined;
}

export function Generator() {
  const { markSeen, markAnswer, logActivity } = useProgress();
  // Links can open a mode and source directly, e.g. #/generieren?mode=listen&source=tiktok.
  const [searchParams] = useSearchParams();
  const [level, setLevel] = useState<LevelFilter>('all');
  const [source, setSource] = useState<SourceFilter>(() => {
    const requested = searchParams.get('source') as TopicGroup | null;
    return requested && TOPIC_GROUP_ORDER.includes(requested) ? requested : 'all';
  });
  const [direction, setDirection] = useState<PracticeDirection>('en-to-de');
  const [mode, setMode] = useState<Mode>(() => {
    const requested = searchParams.get('mode') as Mode | null;
    return requested && MODES.includes(requested) ? requested : 'flip';
  });
  const [current, setCurrent] = useState<Card | null>(null);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(() => !window.matchMedia('(max-width: 720px)').matches);

  const pool = useMemo(() => {
    return allCards.filter((card) => {
      if (!sentenceOf(card)) return false; // generator only ever shows full sentences
      if (level !== 'all' && cardLevel(card) !== level) return false;
      if (source !== 'all' && groupForCard(card) !== source) return false;
      return true;
    });
  }, [level, source]);

  const generate = () => {
    if (pool.length === 0) {
      setCurrent(null);
      return;
    }
    // Never show the same sentence twice in a row.
    const candidates = pool.length > 1 && current ? pool.filter((c) => c.id !== current.id) : pool;
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    setCurrent(next);
    setGeneratedCount((n) => n + 1);
    if (mode === 'flip') markSeen(next.id);
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, source]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (shouldIgnoreShortcut(event)) return;
      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'n') generate();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const sentence = current ? sentenceOf(current) : null;
  const topicLabel = current ? (topicById(current.topicIds[0])?.name ?? '') : '';

  return (
    <div className="gen">
      <header className="reader-head task-head rise">
        <span className="eyebrow no-rule">Practice generator</span>
        <h1 className="title-xl">One sentence at a time.</h1>
        <p className="lede" style={{ textAlign: 'center' }}>
          Choose a level and a source, work out the meaning yourself — then check.
        </p>
      </header>

      <section className="console rise-2" aria-label="Generator settings">
        <div className="console-bar">
          <span className="console-dot" />
          <span className="console-dot" />
          <span className="console-dot" />
          <span className="console-title">generator</span>
          <span className="console-count">
            {pool.length} sentences{generatedCount > 0 ? ` · #${generatedCount}` : ''}
          </span>
        </div>

        {/* Phones: the settings fold into one summary row so the practice card stays on the first screen. */}
        <button
          type="button"
          className="console-summary"
          aria-expanded={settingsOpen}
          aria-controls="gen-settings"
          onClick={() => setSettingsOpen((open) => !open)}
        >
          <span>
            {level === 'all' ? 'All levels' : level} · {source === 'all' ? 'All content' : TOPIC_GROUP_LABELS[source]} ·{' '}
            {MODE_LABELS[mode]}
          </span>
          <span className="console-summary-action">
            {settingsOpen ? 'Done' : 'Change'}
            <Icon name="chevron-right" />
          </span>
        </button>

        <div id="gen-settings" className={`console-grid${settingsOpen ? '' : ' is-collapsed'}`}>
          <div className="console-field">
            <span className="console-label">Level</span>
            <Seg
              label="Level"
              value={level}
              onChange={setLevel}
              options={LEVEL_OPTIONS.map((o) => ({ value: o, label: o === 'all' ? 'All' : o }))}
            />
          </div>

          <div className="console-field">
            <label className="console-label" htmlFor="gen-source">
              Source
            </label>
            <select
              id="gen-source"
              className="console-select"
              value={source}
              onChange={(e) => setSource(e.target.value as SourceFilter)}
            >
              <option value="all">All content</option>
              {TOPIC_GROUP_ORDER.map((g) => (
                <option key={g} value={g}>
                  {TOPIC_GROUP_LABELS[g]}
                </option>
              ))}
            </select>
          </div>

          <div className="console-field">
            <span className="console-label">Direction</span>
            {mode === 'listen' ? (
              <span className="console-note">German audio → you write it</span>
            ) : (
              <Seg
                label="Direction"
                value={direction}
                onChange={setDirection}
                options={[
                  { value: 'en-to-de', label: 'EN → DE' },
                  { value: 'de-to-en', label: 'DE → EN' },
                ]}
              />
            )}
          </div>

          <div className="console-field">
            <span className="console-label">Mode</span>
            <Seg
              label="Mode"
              value={mode}
              onChange={setMode}
              options={[
                { value: 'flip', label: 'Flip' },
                { value: 'type', label: 'Type' },
                { value: 'listen', label: 'Listen' },
              ]}
            />
          </div>

          <button type="button" className="gen-btn" onClick={generate}>
            <Icon name="refresh" />
            Generate
          </button>
        </div>
      </section>

      <div className="gen-stage">
        {!current || !sentence ? (
          <div className="surface empty">
            No full sentences match these filters yet — try a different level or source.
          </div>
        ) : mode === 'flip' ? (
          <SentenceFlipCard
            key={current.id + direction}
            sentence={sentence}
            topicLabel={topicLabel}
            level={cardLevel(current)}
            direction={direction}
          />
        ) : (
          <TypeCheckCard
            key={current.id + direction + mode}
            listen={mode === 'listen'}
            sentence={sentence}
            topicLabel={topicLabel}
            level={cardLevel(current)}
            direction={direction}
            onGraded={(correct) => {
              markAnswer(current.id, correct);
              logActivity(mode === 'listen' ? 'listening' : 'writing');
            }}
          />
        )}

        {current && (
          <div className="gen-foot">
            <span className="hint kbd-hint">
              <span className="kbd">N</span> next sentence
              {mode === 'flip' && (
                <>
                  {' '}
                  · <span className="kbd">Space</span> reveal
                </>
              )}
            </span>
            <button type="button" className="btn btn-primary" onClick={generate}>
              Next sentence
              <Icon name="arrow-right" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
