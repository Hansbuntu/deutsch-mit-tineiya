export function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Split `sentence` around the first whole-word match of `word` (case-insensitive). */
export function splitOnWord(sentence: string, word: string): [string, string] | null {
  const re = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'i');
  const match = re.exec(sentence);
  if (!match) return null;
  return [sentence.slice(0, match.index), sentence.slice(match.index + match[0].length)];
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
