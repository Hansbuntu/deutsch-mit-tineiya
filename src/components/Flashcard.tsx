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

/**
 * What the card keeps back while the drill beside it is unanswered:
 * - 'meaning': the English meaning (meaning drill)
 * - 'article': the article — and the example, which would give it away too (article drill)
 * - 'example': the German example sentence, the drill's own sentence (conjugation, separable prefix)
 * - 'sentence': the German sentence itself, which is the answer (word-order drill)
 */
export type FlashcardHide = 'meaning' | 'article' | 'example' | 'sentence';

export function Flashcard({ card, hide }: { card: Card; hide?: FlashcardHide }) {
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
              {card.type === 'noun' &&
                (hide === 'article' ? (
                  <span className="article-badge article-hidden" aria-label="Article hidden until you answer">
                    ?
                  </span>
                ) : (
                  <span className={`article-badge article-${card.article}`}>{card.article}</span>
                ))}
              {isSentence && hide === 'sentence' ? (
                <h2 className="headword-sentence headword-hidden">Answer the question to see the German</h2>
              ) : isSentence ? (
                <h2 className="headword-sentence" lang="de">
                  <HighlightedSentence text={word} highlight={highlight} />
                </h2>
              ) : (
                <h2 className="headword" lang="de">
                  {word}
                </h2>
              )}
            </div>

            {hide === 'meaning' ? (
              <p className="translation translation-hidden">Answer the question to see the meaning</p>
            ) : (
              translation(card) && <p className="translation">{translation(card)}</p>
            )}
          </div>
          {hide !== 'sentence' && <SoundButton text={word} label={word} />}
        </div>

        {!isSentence && card.example && hide !== 'article' && (
          <div className="example">
            {hide === 'example' ? (
              <p className="example-de example-hidden">Answer the question to see the German sentence</p>
            ) : (
              <p className="example-de" lang="de">
                <HighlightedSentence text={card.example.de} highlight={highlight} />
              </p>
            )}
            {hide !== 'meaning' && <p className="example-en">{card.example.en}</p>}
          </div>
        )}
      </div>
    </article>
  );
}
