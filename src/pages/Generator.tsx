import { useEffect, useMemo, useState } from 'react';
import { Masthead } from '../components/Masthead';
import { SentenceFlipCard } from '../components/SentenceFlipCard';
import { TypeCheckCard } from '../components/TypeCheckCard';
import { allCards } from '../data/cards';
import { topicById, TOPIC_GROUP_LABELS, TOPIC_GROUP_ORDER } from '../data/topics';
import type { Card, CefrLevel, TopicGroup } from '../data/types';
import { cardLevel } from '../lib/level';
import { shuffle } from '../lib/text';
import { useProgress } from '../lib/progress';
import { sentenceOf, type PracticeDirection } from '../lib/practice';

const FALLBACK_ICON = 'category-communication' as const;

type LevelFilter = 'all' | CefrLevel;
type SourceFilter = 'all' | TopicGroup;
type Mode = 'flip' | 'type';

const COUNT_OPTIONS = [1, 3, 5, 10];
const LEVEL_OPTIONS: LevelFilter[] = ['all', 'A1', 'A2'];

function groupForCard(card: Card): TopicGroup | undefined {
  for (const topicId of card.topicIds) {
    const group = topicById(topicId)?.group;
    if (group) return group;
  }
  return undefined;
}

export function Generator() {
  const { markSeen, markAnswer } = useProgress();
  const [level, setLevel] = useState<LevelFilter>('all');
  const [source, setSource] = useState<SourceFilter>('all');
  const [direction, setDirection] = useState<PracticeDirection>('en-to-de');
  const [mode, setMode] = useState<Mode>('flip');
  const [count, setCount] = useState(5);
  const [batch, setBatch] = useState<Card[]>([]);

  const pool = useMemo(() => {
    return allCards.filter((card) => {
      if (!sentenceOf(card)) return false; // generator only ever shows full sentences
      if (level !== 'all' && cardLevel(card) !== level) return false;
      if (source !== 'all' && groupForCard(card) !== source) return false;
      return true;
    });
  }, [level, source]);

  const generate = () => {
    const sample = shuffle(pool).slice(0, count);
    setBatch(sample);
    if (mode === 'flip') sample.forEach((c) => markSeen(c.id));
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, source, count]);

  return (
    <div className="page">
      <Masthead />
      <div className="stack-label">practice generator</div>
      <h2 className="screen-title">Generate random practice</h2>

      <div className="terminal-panel">
        <div className="terminal-row">
          <span className="terminal-label">// LEVEL</span>
          <div className="terminal-group">
            {LEVEL_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`terminal-option${level === opt ? ' active' : ''}`}
                onClick={() => setLevel(opt)}
              >
                {opt === 'all' ? 'ALL' : opt}
              </button>
            ))}
          </div>

          <span className="terminal-label">// SOURCE</span>
          <select
            className="terminal-select"
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

          <span className="terminal-label">// COUNT</span>
          <div className="terminal-group">
            {COUNT_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                className={`terminal-option${count === n ? ' active' : ''}`}
                onClick={() => setCount(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="terminal-row">
          <span className="terminal-label">// DIRECTION</span>
          <div className="terminal-group">
            <button
              type="button"
              className={`terminal-option${direction === 'en-to-de' ? ' active' : ''}`}
              onClick={() => setDirection('en-to-de')}
            >
              EN → DE
            </button>
            <button
              type="button"
              className={`terminal-option${direction === 'de-to-en' ? ' active' : ''}`}
              onClick={() => setDirection('de-to-en')}
            >
              DE → EN
            </button>
          </div>

          <span className="terminal-label">// MODE</span>
          <div className="terminal-group">
            <button type="button" className={`terminal-option${mode === 'flip' ? ' active' : ''}`} onClick={() => setMode('flip')}>
              FLIP
            </button>
            <button type="button" className={`terminal-option${mode === 'type' ? ' active' : ''}`} onClick={() => setMode('type')}>
              TYPE
            </button>
          </div>

          <button type="button" className="generate-btn" onClick={generate} style={{ marginLeft: 'auto' }}>
            ↻ Generate
          </button>
        </div>
      </div>

      <p className="pool-note">
        {pool.length} card{pool.length === 1 ? '' : 's'} match these filters
        {pool.length < count && pool.length > 0 ? ` — showing all ${pool.length}` : ''}
      </p>

      {batch.length === 0 ? (
        <p className="empty-state">No full-sentence cards match these filters yet — try a different level or source.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {batch.map((card, i) => {
            const sentence = sentenceOf(card);
            if (!sentence) return null; // pool is already pre-filtered; guards TS
            const icon = card.image.kind === 'icon' ? card.image.icon : FALLBACK_ICON;
            const topicLabel = topicById(card.topicIds[0])?.name ?? '';

            return mode === 'flip' ? (
              <SentenceFlipCard
                key={card.id}
                sentence={sentence}
                icon={icon}
                topicLabel={topicLabel}
                direction={direction}
                index={i}
                total={batch.length}
              />
            ) : (
              <TypeCheckCard
                key={card.id}
                sentence={sentence}
                icon={icon}
                topicLabel={topicLabel}
                direction={direction}
                index={i}
                total={batch.length}
                onGraded={(correct) => markAnswer(card.id, correct)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
