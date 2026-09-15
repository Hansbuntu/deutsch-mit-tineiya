import type { Card } from '../data/types';
import { SceneIcon } from './SceneIcon';
import { SoundButton } from './SoundButton';
import { splitOnWord } from '../lib/text';

function headword(card: Card): string {
  if (card.type === 'verb') return card.infinitive;
  return card.word;
}

function translation(card: Card): string {
  return card.type === 'verb' || card.type === 'noun' || card.type === 'vocab' ? card.translation : '';
}

function HighlightedSentence({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight) return <>{text}</>;
  const split = splitOnWord(text, highlight);
  if (!split) return <>{text}</>;
  const [before, after] = split;
  const matched = text.slice(before.length, text.length - after.length);
  return (
    <>
      {before}
      <strong className="prefix-highlight">{matched}</strong>
      {after}
    </>
  );
}

export function Flashcard({
  card,
  index,
  total,
}: {
  card: Card;
  index: number;
  total: number;
}) {
  const word = headword(card);
  const highlight = card.type === 'verb' && card.separable ? card.prefix : undefined;

  return (
    <div className="card">
      <div className="scene">
        {card.image.kind === 'icon' ? (
          <SceneIcon name={card.image.icon} />
        ) : (
          <img src={card.image.src} alt={card.image.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>

      <div className="word-row">
        {card.type === 'noun' && <span className="gender">{card.article}</span>}
        {card.type === 'verb' && card.separable && <span className="gender">separable</span>}
        <span className="word">{word}</span>
        <SoundButton text={word} label={word} />
      </div>

      {card.type !== 'verb' && translation(card) && (
        <p className="sentence-en" style={{ marginBottom: 14 }}>
          {translation(card)}
        </p>
      )}

      {card.example && (
        <>
          <p className="sentence">
            <HighlightedSentence text={card.example.de} highlight={highlight} />
          </p>
          <p className="sentence-en">{card.example.en}</p>
        </>
      )}

      <div className="progress-row">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
        <div className="progress-label">
          Card {index + 1} of {total}
        </div>
      </div>
    </div>
  );
}
