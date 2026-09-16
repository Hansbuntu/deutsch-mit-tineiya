import type { Card, CefrLevel } from '../data/types';

/**
 * Derives a CEFR level from signals the card already carries, rather than
 * hand-tagging every card — the frequency-word pool's own `frequencyRank`
 * is a real, principled signal (more frequent ≈ more basic); everything
 * else in the app today (notebook verbs, curated topics, TikTok content,
 * the A1 sentence bank) was written as A1-level material, so it's tagged
 * as such directly. If a genuinely leveled dataset (B1+) is added later,
 * give it a real `frequencyRank`-independent signal here rather than
 * threading a `level` field through every data file.
 */
export function cardLevel(card: Card): CefrLevel {
  if (card.source === 'frequency-list' && card.frequencyRank) {
    return card.frequencyRank <= 250 ? 'A1' : 'A2';
  }
  return 'A1';
}
