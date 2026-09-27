import type { Card } from '../data/types';
import { Icon } from './Icon';
import { SceneIcon } from './SceneIcon';
import { SoundButton } from './SoundButton';
import { splitOnWord, speakableText } from '../lib/text';
import { seenBeforeInfo } from '../lib/repeats';

function translation(card: Card): string {
  return card.type === 'sentence' ? card.en : card.translation;
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

export function Flashcard({ card }: { card: Card }) {
  const word = speakableText(card);
  const highlight =
    card.type === 'verb' && card.separable ? card.prefix : card.type === 'sentence' ? card.emphasis : undefined;
  const isSentence = card.type === 'sentence';
  const isSeparable = card.type === 'verb' && card.separable;
  const seenBefore = seenBeforeInfo(card);

  return (
    <article className="flashcard rise">
      <div className="scene">
        {card.image.kind === 'icon' ? (
          <SceneIcon name={card.image.icon} />
        ) : (
          <img src={card.image.src} alt={card.image.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>

      <div className="flashcard-body">
        <div className="headword-row">
          <div className="headword-stack">
            {(isSeparable || seenBefore) && (
              <div className="headword-line">
                {isSeparable && <span className="tag tag-sage">separable · {card.prefix}-</span>}
                {seenBefore && (
                  <span className="tag tag-gold">
                    <Icon name="refresh" />
                    Seen before in {seenBefore.topicName}
                  </span>
                )}
              </div>
            )}

            <div className="headword-line">
              {card.type === 'noun' && <span className={`article-badge article-${card.article}`}>{card.article}</span>}
              {isSentence ? (
                <p className="headword-sentence" lang="de">
                  <HighlightedSentence text={word} highlight={highlight} />
                </p>
              ) : (
                <h2 className="headword" lang="de">
                  {word}
                </h2>
              )}
            </div>

            {translation(card) && <p className="translation">{translation(card)}</p>}
          </div>
          <SoundButton text={word} label={word} />
        </div>

        {!isSentence && card.example && (
          <div className="example">
            <p className="example-de" lang="de">
              <HighlightedSentence text={card.example.de} highlight={highlight} />
            </p>
            <p className="example-en">{card.example.en}</p>
          </div>
        )}
      </div>
    </article>
  );
}
