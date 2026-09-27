// Speech recognizers write numbers as digits ("sieben Uhr" comes back as
// "7:00", "dreiundzwanzig" as "23"), while the sentences in the app mostly
// spell them out — and a few use digits. Spelling every number out as words
// gives both sides one shared form, so answers are compared on what was said.

export type NumberLang = 'de' | 'en';

const DE_ONES = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
const DE_TENS = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
const EN_ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const EN_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

/** German number word, written as one word the way German does ("dreiundzwanzig"). 0–999,999. */
function germanWord(n: number): string {
  if (n < 20) return DE_ONES[n];
  if (n < 100) {
    const ones = n % 10;
    const tens = DE_TENS[Math.floor(n / 10)];
    // Inside a compound, 1 is "ein" ("einundzwanzig").
    return ones === 0 ? tens : `${ones === 1 ? 'ein' : DE_ONES[ones]}und${tens}`;
  }
  if (n < 1000) {
    const rest = n % 100;
    const hundreds = Math.floor(n / 100);
    return `${hundreds === 1 ? 'ein' : DE_ONES[hundreds]}hundert${rest ? germanWord(rest) : ''}`;
  }
  const rest = n % 1000;
  const thousands = Math.floor(n / 1000);
  return `${thousands === 1 ? 'ein' : germanWord(thousands)}tausend${rest ? germanWord(rest) : ''}`;
}

/** English number words, space-separated ("twenty three", "two hundred five"). 0–999,999. */
function englishWord(n: number): string {
  if (n < 20) return EN_ONES[n];
  if (n < 100) return `${EN_TENS[Math.floor(n / 10)]}${n % 10 ? ` ${EN_ONES[n % 10]}` : ''}`;
  if (n < 1000) return `${EN_ONES[Math.floor(n / 100)]} hundred${n % 100 ? ` ${englishWord(n % 100)}` : ''}`;
  return `${englishWord(Math.floor(n / 1000))} thousand${n % 1000 ? ` ${englishWord(n % 1000)}` : ''}`;
}

const MAX_SPELLED = 999_999;

export function numberToWords(n: number, lang: NumberLang): string {
  return lang === 'de' ? germanWord(n) : englishWord(n);
}

/**
 * Replace digits in `text` with words: clock times ("7:00" → "sieben Uhr" /
 * "seven o'clock", "7:30" → "sieben Uhr dreißig" / "seven thirty") and whole
 * numbers ("23" → "dreiundzwanzig"). Anything else is left untouched.
 */
export function spellOutNumbers(text: string, lang: NumberLang): string {
  const word = (n: number) => numberToWords(n, lang);

  const withTimes = text.replace(/\b(\d{1,2})[:.](\d{2})\b(\s*Uhr\b)?/gi, (match, h: string, m: string) => {
    const hours = Number(h);
    const minutes = Number(m);
    if (hours > 24 || minutes > 59) return match;
    if (lang === 'de') {
      // "ein Uhr", not "eins Uhr".
      const hourWord = hours === 1 ? 'ein' : word(hours);
      return minutes === 0 ? `${hourWord} Uhr` : `${hourWord} Uhr ${word(minutes)}`;
    }
    if (minutes === 0) return `${word(hours)} o'clock`;
    return `${word(hours)} ${minutes < 10 ? `oh ${word(minutes)}` : word(minutes)}`;
  });

  // Whole numbers only — skip either half of a decimal like "3,5".
  return withTimes.replace(/(?<!\d[.,:])\b\d+\b(?![.,:]\d)/g, (digits, offset: number, whole: string) => {
    const n = Number(digits);
    if (n > MAX_SPELLED) return digits;
    // "1 Uhr" / "1 Bruder" → "ein"; a bare "1" (counting, "Nummer 1") stays "eins".
    if (lang === 'de' && n === 1 && /^\s+\p{L}/u.test(whole.slice(offset + digits.length))) return 'ein';
    return word(n);
  });
}
