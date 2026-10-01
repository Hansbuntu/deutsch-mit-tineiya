import { useDeferredValue, useMemo, useState } from 'react';
import { Icon } from '../components/Icon';
import { Seg } from '../components/Seg';
import { SoundButton } from '../components/SoundButton';
import { allCards } from '../data/cards';
import type { Article, Card, CefrLevel, ExampleSentence } from '../data/types';
import { cardLevel } from '../lib/level';
import { useProgress } from '../lib/progress';
import { escapeRegExp, speakableText } from '../lib/text';
import { HeroBackdrop } from '../components/HeroBackdrop';

type Filter = 'all' | Article | 'verb' | 'other';
type Sort = 'common' | 'az';

interface WordEntry {
  id: string;
  word: string;
  article?: Article;
  translation: string;
  kind: 'noun' | 'verb' | 'other';
  level: CefrLevel;
  rank: number;
  audio: string;
  example?: ExampleSentence;
  /** Lower-cased, umlaut-folded German + English, for search. */
  haystack: string;
  foldedWord: string;
  foldedTranslation: string;
}

const PAGE = 60;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'der', label: 'der' },
  { value: 'die', label: 'die' },
  { value: 'das', label: 'das' },
  { value: 'verb', label: 'Verbs' },
  { value: 'other', label: 'Other' },
];

/** Lower case with umlauts and ß folded, so "fruhstuck" finds "Frühstück". */
function fold(text: string): string {
  return text.toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss');
}

function toEntry(card: Exclude<Card, { type: 'sentence' }>): WordEntry {
  const word = card.type === 'verb' ? card.infinitive : card.word;
  const article = card.type === 'noun' ? card.article : undefined;
  return {
    id: card.id,
    word,
    article,
    translation: card.translation,
    kind:
      card.type === 'noun' ? 'noun' : card.type === 'verb' ? 'verb' : card.partOfSpeech === 'verb' ? 'verb' : 'other',
    level: cardLevel(card),
    // Only the frequency list's rank means 'how common' (the Numbers deck numbers its cards 1–20 too).
    rank: card.source === 'frequency-list' && card.frequencyRank ? card.frequencyRank : Number.MAX_SAFE_INTEGER,
    audio: speakableText(card),
    example: card.example,
    haystack: fold(`${article ?? ''} ${word} ${card.translation}`),
    foldedWord: fold(word),
    foldedTranslation: fold(card.translation),
  };
}

/** Every word card once — the TikTok decks repeat some words per topic on purpose; the browser doesn't. */
const ENTRIES: WordEntry[] = (() => {
  const seen = new Map<string, WordEntry>();
  for (const card of allCards) {
    if (card.type === 'sentence') continue;
    const entry = toEntry(card);
    const key = `${entry.article ?? ''} ${entry.word}`.toLowerCase();
    const existing = seen.get(key);
    // Keep the version that has an example sentence, then the one with a frequency rank.
    if (
      !existing ||
      (!existing.example && entry.example) ||
      (entry.rank < existing.rank && !!entry.example === !!existing.example)
    ) {
      seen.set(key, entry);
    }
  }
  return [...seen.values()];
})();

const isArticle = (value: Filter): value is Article => value === 'der' || value === 'die' || value === 'das';

/**
 * How well an entry matches the search (lower is better): the German word itself,
 * then German words starting with it, then a whole English word (table → der Tisch,
 * not "vegetables"), then anything containing it.
 */
function matchScore(e: WordEntry, q: string): number {
  if (e.foldedWord === q) return 0;
  // One of the English meanings exactly ("table", or "go" for "to go").
  const meanings = e.foldedTranslation.split(/[,;/]/).map((m) =>
    m
      .replace(/\(.*?\)/g, '')
      .replace(/^\s*to\s+/, '')
      .trim(),
  );
  if (meanings.includes(q)) return 1;
  if (e.foldedWord.startsWith(q)) return 2;
  if (new RegExp(`(^|[^a-z])${escapeRegExp(q)}([^a-z]|$)`).test(e.foldedTranslation)) return 3;
  if (e.foldedWord.includes(q)) return 4;
  return 5;
}

const collator = new Intl.Collator('de', { sensitivity: 'base' });

export function Words() {
  const { isLearned } = useProgress();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('common');
  const [limit, setLimit] = useState(PAGE);
  const [openId, setOpenId] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const q = fold(deferredQuery.trim());
    const matches = ENTRIES.filter((e) => {
      if (filter === 'verb' && e.kind !== 'verb') return false;
      if (filter === 'other' && e.kind !== 'other') return false;
      if (isArticle(filter) && e.article !== filter) return false;
      return !q || e.haystack.includes(q);
    });
    const byWord = (a: WordEntry, b: WordEntry) => collator.compare(a.word, b.word);
    return matches.sort((a, b) => {
      if (sort === 'az') return byWord(a, b);
      // With a search, the closest matches come first.
      if (q) {
        const diff = matchScore(a, q) - matchScore(b, q);
        if (diff !== 0) return diff;
      }
      return a.rank - b.rank || byWord(a, b);
    });
  }, [deferredQuery, filter, sort]);

  const shown = results.slice(0, limit);

  return (
    <div className="words tab-page">
      <HeroBackdrop className="tab-waves" />
      <header className="reader-head task-head on-waves rise">
        <span className="eyebrow no-rule">Word list</span>
        <h1 className="title-xl">Every word, in one place.</h1>
        <p className="lede" style={{ textAlign: 'center' }}>
          {ENTRIES.length.toLocaleString('en')} words from your notebook, your TikTok scripts and the most common German
          vocabulary. Search in German or English.
        </p>
      </header>

      <div className="words-controls rise-2">
        <label className="search-field">
          <Icon name="search" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE);
            }}
            placeholder="Search — e.g. Tisch, table, gehen"
            aria-label="Search words"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </label>
        <div className="words-filters">
          <div className="chip-row" role="radiogroup" aria-label="Filter">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                role="radio"
                aria-checked={filter === f.value}
                className={`filter-chip${filter === f.value ? ` active${isArticle(f.value) ? ` article-${f.value}` : ''}` : ''}`}
                onClick={() => {
                  setFilter(f.value);
                  setLimit(PAGE);
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <Seg
            light
            label="Sort"
            value={sort}
            onChange={setSort}
            options={[
              { value: 'common', label: 'Most common' },
              { value: 'az', label: 'A–Z' },
            ]}
          />
        </div>
      </div>

      <p className="words-count on-waves" aria-live="polite">
        {results.length.toLocaleString('en')} {results.length === 1 ? 'word' : 'words'}
      </p>

      {results.length === 0 ? (
        <div className="surface empty">
          <p>No words match “{query}”. Try the English, or fewer letters.</p>
        </div>
      ) : (
        <ul className="surface word-list">
          {shown.map((e) => {
            const open = openId === e.id;
            return (
              <li key={e.id} className={`word-row${open ? ' open' : ''}`}>
                <div className="word-main">
                  <button
                    type="button"
                    className="word-toggle"
                    onClick={() => setOpenId(open ? null : e.id)}
                    aria-expanded={e.example ? open : undefined}
                    disabled={!e.example}
                  >
                    <span className="word-de" lang="de">
                      {e.article && <span className={`word-article article-${e.article}`}>{e.article}</span>}
                      {e.word}
                    </span>
                    <span className="word-en">{e.translation}</span>
                  </button>
                  <span className="word-meta">
                    {isLearned(e.id) && (
                      <span className="word-learned" title="Learned">
                        <Icon name="check" />
                      </span>
                    )}
                    <span className="tag tag-mono">{e.level}</span>
                    <SoundButton text={e.audio} label={e.word} />
                  </span>
                </div>
                {open && e.example && (
                  <p className="word-example">
                    <span lang="de">{e.example.de}</span>
                    <span>{e.example.en}</span>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {results.length > limit && (
        <div className="words-more">
          <button type="button" className="btn" onClick={() => setLimit((l) => l + PAGE * 2)}>
            Show more ({(results.length - limit).toLocaleString('en')} left)
          </button>
        </div>
      )}
    </div>
  );
}
