import type { Card } from '../data/types';
import { SceneIcon } from './SceneIcon';
import { SoundButton } from './SoundButton';
import { splitOnWord } from '../lib/text';
import { seenBeforeInfo } from '../lib/repeats';

function headword(card: Card): string {
  if (card.type === 'verb') return card.infinitive;
  if (card.type === 'sentence') return card.de;
  return card.word;
}

function translation(card: Card): string {
  if (card.type === 'sentence') return card.en;
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
  const highlight =
    card.type === 'verb' && card.separable ? card.prefix : card.type === 'sentence' ? card.emphasis : undefined;
  const isSentence = card.type === 'sentence';
  const seenBefore = seenBeforeInfo(card);

  return (
    <div className="card">
      <div className="scene">
        {card.image.kind === 'icon' ? (
          <SceneIcon name={card.image.icon} />
        ) : (
          <img src={card.image.src} alt={card.image.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>

      {seenBefore && (
        <div className="seen-badge">you've seen this before · {seenBefore.topicName}</div>
      )}

      <div className="word-row">
        {card.type === 'noun' && <span className="gender">{card.article}</span>}
        {card.type === 'verb' && card.separable && <span className="gender">separable</span>}
        {isSentence ? (
          <p className="sentence core-sentence-text">
            <HighlightedSentence text={word} highlight={highlight} />
          </p>
        ) : (
          <span className="word">{word}</span>
        )}
        <SoundButton text={isSentence ? card.de : word} label={word} />
      </div>

      {!isSentence && translation(card) && (
        <p className="sentence-en" style={{ marginBottom: 14 }}>
          {translation(card)}
        </p>
      )}

      {isSentence && <p className="sentence-en">{translation(card)}</p>}

      {!isSentence && card.example && (
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
