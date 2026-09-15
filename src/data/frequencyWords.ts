import type { NounCard, VocabCard } from './types';

// Curated ~500-word A1/A2 frequency-ranked pool (bulk everyday vocabulary
// beyond the hand-digitized notebook cards). Words already covered by the
// curated topic decks are excluded to avoid duplicates.
export const frequencyWords: (NounCard | VocabCard)[] = [
  {
    "id": "ich",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 1,
    "source": "frequency-list",
    "word": "ich",
    "translation": "I"
  },
  {
    "id": "du",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 2,
    "source": "frequency-list",
    "word": "du",
    "translation": "you (informal)"
  },
  {
    "id": "er",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 3,
    "source": "frequency-list",
    "word": "er",
    "translation": "he"
  },
  {
    "id": "sie",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 4,
    "source": "frequency-list",
    "word": "sie",
    "translation": "she; they"
  },
  {
    "id": "es",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 5,
    "source": "frequency-list",
    "word": "es",
    "translation": "it"
  },
  {
    "id": "wir",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 6,
    "source": "frequency-list",
    "word": "wir",
    "translation": "we"
  },
  {
    "id": "ihr",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 7,
    "source": "frequency-list",
    "word": "ihr",
    "translation": "you all; her; their"
  },
  {
    "id": "sie-pron",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 8,
    "source": "frequency-list",
    "word": "Sie",
    "translation": "you (formal)"
  },
  {
    "id": "mich",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 9,
    "source": "frequency-list",
    "word": "mich",
    "translation": "me"
  },
  {
    "id": "dich",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 10,
    "source": "frequency-list",
    "word": "dich",
    "translation": "you (acc.)"
  },
  {
    "id": "ihn",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 11,
    "source": "frequency-list",
    "word": "ihn",
    "translation": "him"
  },
  {
    "id": "uns",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 12,
    "source": "frequency-list",
    "word": "uns",
    "translation": "us"
  },
  {
    "id": "euch",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 13,
    "source": "frequency-list",
    "word": "euch",
    "translation": "you all (acc./dat.)"
  },
  {
    "id": "mir",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 14,
    "source": "frequency-list",
    "word": "mir",
    "translation": "to me"
  },
  {
    "id": "dir",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 15,
    "source": "frequency-list",
    "word": "dir",
    "translation": "to you"
  },
  {
    "id": "ihm",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 16,
    "source": "frequency-list",
    "word": "ihm",
    "translation": "to him"
  },
  {
    "id": "mein",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 17,
    "source": "frequency-list",
    "word": "mein",
    "translation": "my"
  },
  {
    "id": "dein",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 18,
    "source": "frequency-list",
    "word": "dein",
    "translation": "your"
  },
  {
    "id": "unser",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 19,
    "source": "frequency-list",
    "word": "unser",
    "translation": "our"
  },
  {
    "id": "euer",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 20,
    "source": "frequency-list",
    "word": "euer",
    "translation": "your (pl.)"
  },
  {
    "id": "dieser",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-object"
    },
    "frequencyRank": 21,
    "source": "frequency-list",
    "word": "dieser",
    "translation": "this"
  },
  {
    "id": "jeder",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-object"
    },
    "frequencyRank": 22,
    "source": "frequency-list",
    "word": "jeder",
    "translation": "every, each"
  },
  {
    "id": "welcher",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-question"
    },
    "frequencyRank": 23,
    "source": "frequency-list",
    "word": "welcher",
    "translation": "which"
  },
  {
    "id": "man",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 24,
    "source": "frequency-list",
    "word": "man",
    "translation": "one, you (general)"
  },
  {
    "id": "etwas",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-object"
    },
    "frequencyRank": 25,
    "source": "frequency-list",
    "word": "etwas",
    "translation": "something"
  },
  {
    "id": "nichts",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-object"
    },
    "frequencyRank": 26,
    "source": "frequency-list",
    "word": "nichts",
    "translation": "nothing"
  },
  {
    "id": "jemand",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 27,
    "source": "frequency-list",
    "word": "jemand",
    "translation": "someone"
  },
  {
    "id": "niemand",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 28,
    "source": "frequency-list",
    "word": "niemand",
    "translation": "no one"
  },
  {
    "id": "alle",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 29,
    "source": "frequency-list",
    "word": "alle",
    "translation": "all, everyone"
  },
  {
    "id": "was",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-question"
    },
    "frequencyRank": 30,
    "source": "frequency-list",
    "word": "was",
    "translation": "what"
  },
  {
    "id": "wer",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "pronoun",
    "image": {
      "kind": "icon",
      "icon": "category-question"
    },
    "frequencyRank": 31,
    "source": "frequency-list",
    "word": "wer",
    "translation": "who"
  },
  {
    "id": "wo",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-question"
    },
    "frequencyRank": 32,
    "source": "frequency-list",
    "word": "wo",
    "translation": "where"
  },
  {
    "id": "wann",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-question"
    },
    "frequencyRank": 33,
    "source": "frequency-list",
    "word": "wann",
    "translation": "when"
  },
  {
    "id": "warum",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-question"
    },
    "frequencyRank": 34,
    "source": "frequency-list",
    "word": "warum",
    "translation": "why"
  },
  {
    "id": "wie",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-question"
    },
    "frequencyRank": 35,
    "source": "frequency-list",
    "word": "wie",
    "translation": "how"
  },
  {
    "id": "wie-viel",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-question"
    },
    "frequencyRank": 36,
    "source": "frequency-list",
    "word": "wie viel",
    "translation": "how much"
  },
  {
    "id": "woher",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-question"
    },
    "frequencyRank": 37,
    "source": "frequency-list",
    "word": "woher",
    "translation": "from where"
  },
  {
    "id": "wohin",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-question"
    },
    "frequencyRank": 38,
    "source": "frequency-list",
    "word": "wohin",
    "translation": "to where"
  },
  {
    "id": "sein",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 39,
    "source": "frequency-list",
    "word": "sein",
    "translation": "to be"
  },
  {
    "id": "haben",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 40,
    "source": "frequency-list",
    "word": "haben",
    "translation": "to have"
  },
  {
    "id": "werden",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 41,
    "source": "frequency-list",
    "word": "werden",
    "translation": "to become"
  },
  {
    "id": "koennen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 42,
    "source": "frequency-list",
    "word": "können",
    "translation": "can, to be able to"
  },
  {
    "id": "muessen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 43,
    "source": "frequency-list",
    "word": "müssen",
    "translation": "must, to have to"
  },
  {
    "id": "wollen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 44,
    "source": "frequency-list",
    "word": "wollen",
    "translation": "to want"
  },
  {
    "id": "sollen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 45,
    "source": "frequency-list",
    "word": "sollen",
    "translation": "should, to be supposed to"
  },
  {
    "id": "duerfen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 46,
    "source": "frequency-list",
    "word": "dürfen",
    "translation": "may, to be allowed to"
  },
  {
    "id": "moegen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 47,
    "source": "frequency-list",
    "word": "mögen",
    "translation": "to like"
  },
  {
    "id": "machen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 48,
    "source": "frequency-list",
    "word": "machen",
    "translation": "to do, make"
  },
  {
    "id": "gehen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 49,
    "source": "frequency-list",
    "word": "gehen",
    "translation": "to go"
  },
  {
    "id": "kommen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 50,
    "source": "frequency-list",
    "word": "kommen",
    "translation": "to come"
  },
  {
    "id": "sehen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 51,
    "source": "frequency-list",
    "word": "sehen",
    "translation": "to see"
  },
  {
    "id": "wissen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 52,
    "source": "frequency-list",
    "word": "wissen",
    "translation": "to know (a fact)"
  },
  {
    "id": "kennen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 53,
    "source": "frequency-list",
    "word": "kennen",
    "translation": "to know (be familiar with)"
  },
  {
    "id": "sagen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 54,
    "source": "frequency-list",
    "word": "sagen",
    "translation": "to say"
  },
  {
    "id": "geben",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 55,
    "source": "frequency-list",
    "word": "geben",
    "translation": "to give"
  },
  {
    "id": "nehmen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 56,
    "source": "frequency-list",
    "word": "nehmen",
    "translation": "to take"
  },
  {
    "id": "finden",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 57,
    "source": "frequency-list",
    "word": "finden",
    "translation": "to find"
  },
  {
    "id": "denken",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 58,
    "source": "frequency-list",
    "word": "denken",
    "translation": "to think"
  },
  {
    "id": "glauben",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 59,
    "source": "frequency-list",
    "word": "glauben",
    "translation": "to believe"
  },
  {
    "id": "arbeiten",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 60,
    "source": "frequency-list",
    "word": "arbeiten",
    "translation": "to work"
  },
  {
    "id": "spielen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 61,
    "source": "frequency-list",
    "word": "spielen",
    "translation": "to play"
  },
  {
    "id": "lernen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 62,
    "source": "frequency-list",
    "word": "lernen",
    "translation": "to learn"
  },
  {
    "id": "wohnen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 63,
    "source": "frequency-list",
    "word": "wohnen",
    "translation": "to live, reside"
  },
  {
    "id": "leben",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 64,
    "source": "frequency-list",
    "word": "leben",
    "translation": "to live (be alive)"
  },
  {
    "id": "lieben",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 65,
    "source": "frequency-list",
    "word": "lieben",
    "translation": "to love"
  },
  {
    "id": "brauchen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 66,
    "source": "frequency-list",
    "word": "brauchen",
    "translation": "to need"
  },
  {
    "id": "kaufen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-money"
    },
    "frequencyRank": 67,
    "source": "frequency-list",
    "word": "kaufen",
    "translation": "to buy"
  },
  {
    "id": "verkaufen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-money"
    },
    "frequencyRank": 68,
    "source": "frequency-list",
    "word": "verkaufen",
    "translation": "to sell"
  },
  {
    "id": "essen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 69,
    "source": "frequency-list",
    "word": "essen",
    "translation": "to eat"
  },
  {
    "id": "trinken",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-drink"
    },
    "frequencyRank": 70,
    "source": "frequency-list",
    "word": "trinken",
    "translation": "to drink"
  },
  {
    "id": "schlafen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 71,
    "source": "frequency-list",
    "word": "schlafen",
    "translation": "to sleep"
  },
  {
    "id": "lesen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 72,
    "source": "frequency-list",
    "word": "lesen",
    "translation": "to read"
  },
  {
    "id": "schreiben",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 73,
    "source": "frequency-list",
    "word": "schreiben",
    "translation": "to write"
  },
  {
    "id": "hoeren",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 74,
    "source": "frequency-list",
    "word": "hören",
    "translation": "to hear, listen"
  },
  {
    "id": "sprechen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 75,
    "source": "frequency-list",
    "word": "sprechen",
    "translation": "to speak"
  },
  {
    "id": "verstehen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 76,
    "source": "frequency-list",
    "word": "verstehen",
    "translation": "to understand"
  },
  {
    "id": "fragen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 77,
    "source": "frequency-list",
    "word": "fragen",
    "translation": "to ask"
  },
  {
    "id": "antworten",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 78,
    "source": "frequency-list",
    "word": "antworten",
    "translation": "to answer"
  },
  {
    "id": "helfen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 79,
    "source": "frequency-list",
    "word": "helfen",
    "translation": "to help"
  },
  {
    "id": "bringen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 80,
    "source": "frequency-list",
    "word": "bringen",
    "translation": "to bring"
  },
  {
    "id": "holen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 81,
    "source": "frequency-list",
    "word": "holen",
    "translation": "to fetch, get"
  },
  {
    "id": "bleiben",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 82,
    "source": "frequency-list",
    "word": "bleiben",
    "translation": "to stay"
  },
  {
    "id": "fahren",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 83,
    "source": "frequency-list",
    "word": "fahren",
    "translation": "to drive, go (by vehicle)"
  },
  {
    "id": "fliegen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 84,
    "source": "frequency-list",
    "word": "fliegen",
    "translation": "to fly"
  },
  {
    "id": "laufen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 85,
    "source": "frequency-list",
    "word": "laufen",
    "translation": "to run, walk"
  },
  {
    "id": "sitzen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 86,
    "source": "frequency-list",
    "word": "sitzen",
    "translation": "to sit"
  },
  {
    "id": "stehen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 87,
    "source": "frequency-list",
    "word": "stehen",
    "translation": "to stand"
  },
  {
    "id": "liegen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 88,
    "source": "frequency-list",
    "word": "liegen",
    "translation": "to lie (be lying down)"
  },
  {
    "id": "warten",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 89,
    "source": "frequency-list",
    "word": "warten",
    "translation": "to wait"
  },
  {
    "id": "suchen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 90,
    "source": "frequency-list",
    "word": "suchen",
    "translation": "to look for"
  },
  {
    "id": "oeffnen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 91,
    "source": "frequency-list",
    "word": "öffnen",
    "translation": "to open"
  },
  {
    "id": "schliessen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 92,
    "source": "frequency-list",
    "word": "schließen",
    "translation": "to close"
  },
  {
    "id": "beginnen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 93,
    "source": "frequency-list",
    "word": "beginnen",
    "translation": "to begin"
  },
  {
    "id": "zeigen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 94,
    "source": "frequency-list",
    "word": "zeigen",
    "translation": "to show"
  },
  {
    "id": "erzaehlen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 95,
    "source": "frequency-list",
    "word": "erzählen",
    "translation": "to tell (a story)"
  },
  {
    "id": "treffen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 96,
    "source": "frequency-list",
    "word": "treffen",
    "translation": "to meet"
  },
  {
    "id": "besuchen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 97,
    "source": "frequency-list",
    "word": "besuchen",
    "translation": "to visit"
  },
  {
    "id": "kochen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 98,
    "source": "frequency-list",
    "word": "kochen",
    "translation": "to cook"
  },
  {
    "id": "putzen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 99,
    "source": "frequency-list",
    "word": "putzen",
    "translation": "to clean"
  },
  {
    "id": "waschen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 100,
    "source": "frequency-list",
    "word": "waschen",
    "translation": "to wash"
  },
  {
    "id": "duschen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 101,
    "source": "frequency-list",
    "word": "duschen",
    "translation": "to shower"
  },
  {
    "id": "tragen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 102,
    "source": "frequency-list",
    "word": "tragen",
    "translation": "to carry, wear"
  },
  {
    "id": "lachen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 103,
    "source": "frequency-list",
    "word": "lachen",
    "translation": "to laugh"
  },
  {
    "id": "zahlen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-money"
    },
    "frequencyRank": 104,
    "source": "frequency-list",
    "word": "zahlen",
    "translation": "to pay"
  },
  {
    "id": "kosten",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-money"
    },
    "frequencyRank": 105,
    "source": "frequency-list",
    "word": "kosten",
    "translation": "to cost"
  },
  {
    "id": "schicken",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 106,
    "source": "frequency-list",
    "word": "schicken",
    "translation": "to send"
  },
  {
    "id": "bekommen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 107,
    "source": "frequency-list",
    "word": "bekommen",
    "translation": "to receive, get"
  },
  {
    "id": "verlieren",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 108,
    "source": "frequency-list",
    "word": "verlieren",
    "translation": "to lose"
  },
  {
    "id": "gewinnen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 109,
    "source": "frequency-list",
    "word": "gewinnen",
    "translation": "to win"
  },
  {
    "id": "reisen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 110,
    "source": "frequency-list",
    "word": "reisen",
    "translation": "to travel"
  },
  {
    "id": "vergessen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 111,
    "source": "frequency-list",
    "word": "vergessen",
    "translation": "to forget"
  },
  {
    "id": "sich-erinnern",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 112,
    "source": "frequency-list",
    "word": "sich erinnern",
    "translation": "to remember"
  },
  {
    "id": "hoffen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 113,
    "source": "frequency-list",
    "word": "hoffen",
    "translation": "to hope"
  },
  {
    "id": "danken",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 114,
    "source": "frequency-list",
    "word": "danken",
    "translation": "to thank"
  },
  {
    "id": "schmecken",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 115,
    "source": "frequency-list",
    "word": "schmecken",
    "translation": "to taste"
  },
  {
    "id": "fuehlen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 116,
    "source": "frequency-list",
    "word": "fühlen",
    "translation": "to feel"
  },
  {
    "id": "schwimmen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 117,
    "source": "frequency-list",
    "word": "schwimmen",
    "translation": "to swim"
  },
  {
    "id": "stellen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 118,
    "source": "frequency-list",
    "word": "stellen",
    "translation": "to put, place (upright)"
  },
  {
    "id": "passieren",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 119,
    "source": "frequency-list",
    "word": "passieren",
    "translation": "to happen"
  },
  {
    "id": "entscheiden",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 120,
    "source": "frequency-list",
    "word": "entscheiden",
    "translation": "to decide"
  },
  {
    "id": "regnen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 121,
    "source": "frequency-list",
    "word": "regnen",
    "translation": "to rain"
  },
  {
    "id": "schneien",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 122,
    "source": "frequency-list",
    "word": "schneien",
    "translation": "to snow"
  },
  {
    "id": "scheinen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 123,
    "source": "frequency-list",
    "word": "scheinen",
    "translation": "to shine; to seem"
  },
  {
    "id": "sich-freuen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 124,
    "source": "frequency-list",
    "word": "sich freuen",
    "translation": "to be glad, look forward to"
  },
  {
    "id": "fernsehen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 125,
    "source": "frequency-list",
    "word": "fernsehen",
    "translation": "to watch TV"
  },
  {
    "id": "zuhoeren",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 126,
    "source": "frequency-list",
    "word": "zuhören",
    "translation": "to listen"
  },
  {
    "id": "aufhoeren",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-action"
    },
    "frequencyRank": 127,
    "source": "frequency-list",
    "word": "aufhören",
    "translation": "to stop"
  },
  {
    "id": "aufraeumen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 128,
    "source": "frequency-list",
    "word": "aufräumen",
    "translation": "to tidy up"
  },
  {
    "id": "einladen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 129,
    "source": "frequency-list",
    "word": "einladen",
    "translation": "to invite"
  },
  {
    "id": "ankommen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 130,
    "source": "frequency-list",
    "word": "ankommen",
    "translation": "to arrive"
  },
  {
    "id": "vorstellen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 131,
    "source": "frequency-list",
    "word": "vorstellen",
    "translation": "to introduce"
  },
  {
    "id": "anziehen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 132,
    "source": "frequency-list",
    "word": "anziehen",
    "translation": "to put on (clothes)"
  },
  {
    "id": "ausziehen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "verb",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 133,
    "source": "frequency-list",
    "word": "ausziehen",
    "translation": "to take off (clothes)"
  },
  {
    "id": "dreissig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "number",
    "image": {
      "kind": "icon",
      "icon": "category-number"
    },
    "frequencyRank": 154,
    "source": "frequency-list",
    "word": "dreißig",
    "translation": "thirty"
  },
  {
    "id": "vierzig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "number",
    "image": {
      "kind": "icon",
      "icon": "category-number"
    },
    "frequencyRank": 155,
    "source": "frequency-list",
    "word": "vierzig",
    "translation": "forty"
  },
  {
    "id": "fuenfzig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "number",
    "image": {
      "kind": "icon",
      "icon": "category-number"
    },
    "frequencyRank": 156,
    "source": "frequency-list",
    "word": "fünfzig",
    "translation": "fifty"
  },
  {
    "id": "sechzig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "number",
    "image": {
      "kind": "icon",
      "icon": "category-number"
    },
    "frequencyRank": 157,
    "source": "frequency-list",
    "word": "sechzig",
    "translation": "sixty"
  },
  {
    "id": "siebzig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "number",
    "image": {
      "kind": "icon",
      "icon": "category-number"
    },
    "frequencyRank": 158,
    "source": "frequency-list",
    "word": "siebzig",
    "translation": "seventy"
  },
  {
    "id": "achtzig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "number",
    "image": {
      "kind": "icon",
      "icon": "category-number"
    },
    "frequencyRank": 159,
    "source": "frequency-list",
    "word": "achtzig",
    "translation": "eighty"
  },
  {
    "id": "neunzig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "number",
    "image": {
      "kind": "icon",
      "icon": "category-number"
    },
    "frequencyRank": 160,
    "source": "frequency-list",
    "word": "neunzig",
    "translation": "ninety"
  },
  {
    "id": "hundert",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "number",
    "image": {
      "kind": "icon",
      "icon": "category-number"
    },
    "frequencyRank": 161,
    "source": "frequency-list",
    "word": "hundert",
    "translation": "hundred"
  },
  {
    "id": "tausend",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "number",
    "image": {
      "kind": "icon",
      "icon": "category-number"
    },
    "frequencyRank": 162,
    "source": "frequency-list",
    "word": "tausend",
    "translation": "thousand"
  },
  {
    "id": "erste",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "number",
    "image": {
      "kind": "icon",
      "icon": "category-number"
    },
    "frequencyRank": 163,
    "source": "frequency-list",
    "word": "erste",
    "translation": "first"
  },
  {
    "id": "zweite",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "number",
    "image": {
      "kind": "icon",
      "icon": "category-number"
    },
    "frequencyRank": 164,
    "source": "frequency-list",
    "word": "zweite",
    "translation": "second"
  },
  {
    "id": "dritte",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "number",
    "image": {
      "kind": "icon",
      "icon": "category-number"
    },
    "frequencyRank": 165,
    "source": "frequency-list",
    "word": "dritte",
    "translation": "third"
  },
  {
    "id": "letzte",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "number",
    "image": {
      "kind": "icon",
      "icon": "category-number"
    },
    "frequencyRank": 166,
    "source": "frequency-list",
    "word": "letzte",
    "translation": "last"
  },
  {
    "id": "in",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 167,
    "source": "frequency-list",
    "word": "in",
    "translation": "in"
  },
  {
    "id": "an",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 168,
    "source": "frequency-list",
    "word": "an",
    "translation": "at, on"
  },
  {
    "id": "auf",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 169,
    "source": "frequency-list",
    "word": "auf",
    "translation": "on, onto"
  },
  {
    "id": "unter",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 170,
    "source": "frequency-list",
    "word": "unter",
    "translation": "under"
  },
  {
    "id": "ueber",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 171,
    "source": "frequency-list",
    "word": "über",
    "translation": "over, above"
  },
  {
    "id": "vor",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 172,
    "source": "frequency-list",
    "word": "vor",
    "translation": "in front of; before"
  },
  {
    "id": "hinter",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 173,
    "source": "frequency-list",
    "word": "hinter",
    "translation": "behind"
  },
  {
    "id": "neben",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 174,
    "source": "frequency-list",
    "word": "neben",
    "translation": "next to"
  },
  {
    "id": "zwischen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 175,
    "source": "frequency-list",
    "word": "zwischen",
    "translation": "between"
  },
  {
    "id": "aus",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 176,
    "source": "frequency-list",
    "word": "aus",
    "translation": "out of, from"
  },
  {
    "id": "nach",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 177,
    "source": "frequency-list",
    "word": "nach",
    "translation": "after; to (a place)"
  },
  {
    "id": "zu",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 178,
    "source": "frequency-list",
    "word": "zu",
    "translation": "to"
  },
  {
    "id": "von",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 179,
    "source": "frequency-list",
    "word": "von",
    "translation": "from, of"
  },
  {
    "id": "bei",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 180,
    "source": "frequency-list",
    "word": "bei",
    "translation": "at, near"
  },
  {
    "id": "durch",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 181,
    "source": "frequency-list",
    "word": "durch",
    "translation": "through"
  },
  {
    "id": "um",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 182,
    "source": "frequency-list",
    "word": "um",
    "translation": "around; at (time)"
  },
  {
    "id": "gegen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 183,
    "source": "frequency-list",
    "word": "gegen",
    "translation": "against"
  },
  {
    "id": "mit",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 184,
    "source": "frequency-list",
    "word": "mit",
    "translation": "with"
  },
  {
    "id": "ohne",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 185,
    "source": "frequency-list",
    "word": "ohne",
    "translation": "without"
  },
  {
    "id": "fuer",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 186,
    "source": "frequency-list",
    "word": "für",
    "translation": "for"
  },
  {
    "id": "seit",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 187,
    "source": "frequency-list",
    "word": "seit",
    "translation": "since"
  },
  {
    "id": "bis",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 188,
    "source": "frequency-list",
    "word": "bis",
    "translation": "until"
  },
  {
    "id": "waehrend",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 189,
    "source": "frequency-list",
    "word": "während",
    "translation": "during"
  },
  {
    "id": "wegen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 190,
    "source": "frequency-list",
    "word": "wegen",
    "translation": "because of"
  },
  {
    "id": "trotz",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "preposition",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 191,
    "source": "frequency-list",
    "word": "trotz",
    "translation": "despite"
  },
  {
    "id": "und",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 192,
    "source": "frequency-list",
    "word": "und",
    "translation": "and"
  },
  {
    "id": "oder",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 193,
    "source": "frequency-list",
    "word": "oder",
    "translation": "or"
  },
  {
    "id": "aber",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 194,
    "source": "frequency-list",
    "word": "aber",
    "translation": "but"
  },
  {
    "id": "denn",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 195,
    "source": "frequency-list",
    "word": "denn",
    "translation": "because, for"
  },
  {
    "id": "sondern",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 196,
    "source": "frequency-list",
    "word": "sondern",
    "translation": "but rather"
  },
  {
    "id": "weil",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 197,
    "source": "frequency-list",
    "word": "weil",
    "translation": "because"
  },
  {
    "id": "dass",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 198,
    "source": "frequency-list",
    "word": "dass",
    "translation": "that"
  },
  {
    "id": "wenn",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 199,
    "source": "frequency-list",
    "word": "wenn",
    "translation": "if, when"
  },
  {
    "id": "obwohl",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 200,
    "source": "frequency-list",
    "word": "obwohl",
    "translation": "although"
  },
  {
    "id": "als",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 201,
    "source": "frequency-list",
    "word": "als",
    "translation": "when (past); than"
  },
  {
    "id": "bevor",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 202,
    "source": "frequency-list",
    "word": "bevor",
    "translation": "before"
  },
  {
    "id": "nachdem",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 203,
    "source": "frequency-list",
    "word": "nachdem",
    "translation": "after"
  },
  {
    "id": "damit",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 204,
    "source": "frequency-list",
    "word": "damit",
    "translation": "so that"
  },
  {
    "id": "also",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 205,
    "source": "frequency-list",
    "word": "also",
    "translation": "so, thus"
  },
  {
    "id": "deshalb",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "conjunction",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 206,
    "source": "frequency-list",
    "word": "deshalb",
    "translation": "therefore"
  },
  {
    "id": "monat",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 209,
    "source": "frequency-list",
    "word": "Monat",
    "article": "der",
    "plural": "Monate",
    "translation": "month"
  },
  {
    "id": "jahr",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 210,
    "source": "frequency-list",
    "word": "Jahr",
    "article": "das",
    "plural": "Jahre",
    "translation": "year"
  },
  {
    "id": "stunde",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 211,
    "source": "frequency-list",
    "word": "Stunde",
    "article": "die",
    "plural": "Stunden",
    "translation": "hour"
  },
  {
    "id": "minute",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 212,
    "source": "frequency-list",
    "word": "Minute",
    "article": "die",
    "plural": "Minuten",
    "translation": "minute"
  },
  {
    "id": "sekunde",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 213,
    "source": "frequency-list",
    "word": "Sekunde",
    "article": "die",
    "plural": "Sekunden",
    "translation": "second"
  },
  {
    "id": "nacht",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 217,
    "source": "frequency-list",
    "word": "Nacht",
    "article": "die",
    "plural": "Nächte",
    "translation": "night"
  },
  {
    "id": "mittag",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 218,
    "source": "frequency-list",
    "word": "Mittag",
    "article": "der",
    "plural": "Mittage",
    "translation": "noon"
  },
  {
    "id": "montag",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 220,
    "source": "frequency-list",
    "word": "Montag",
    "article": "der",
    "plural": "Montage",
    "translation": "Monday"
  },
  {
    "id": "dienstag",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 221,
    "source": "frequency-list",
    "word": "Dienstag",
    "article": "der",
    "plural": "Dienstage",
    "translation": "Tuesday"
  },
  {
    "id": "mittwoch",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 222,
    "source": "frequency-list",
    "word": "Mittwoch",
    "article": "der",
    "plural": "Mittwoche",
    "translation": "Wednesday"
  },
  {
    "id": "donnerstag",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 223,
    "source": "frequency-list",
    "word": "Donnerstag",
    "article": "der",
    "plural": "Donnerstage",
    "translation": "Thursday"
  },
  {
    "id": "freitag",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 224,
    "source": "frequency-list",
    "word": "Freitag",
    "article": "der",
    "plural": "Freitage",
    "translation": "Friday"
  },
  {
    "id": "samstag",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 225,
    "source": "frequency-list",
    "word": "Samstag",
    "article": "der",
    "plural": "Samstage",
    "translation": "Saturday"
  },
  {
    "id": "sonntag",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 226,
    "source": "frequency-list",
    "word": "Sonntag",
    "article": "der",
    "plural": "Sonntage",
    "translation": "Sunday"
  },
  {
    "id": "januar",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 227,
    "source": "frequency-list",
    "word": "Januar",
    "article": "der",
    "plural": "Januare",
    "translation": "January"
  },
  {
    "id": "februar",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 228,
    "source": "frequency-list",
    "word": "Februar",
    "article": "der",
    "plural": "Februare",
    "translation": "February"
  },
  {
    "id": "maerz",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 229,
    "source": "frequency-list",
    "word": "März",
    "article": "der",
    "plural": "Märze",
    "translation": "March"
  },
  {
    "id": "april",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 230,
    "source": "frequency-list",
    "word": "April",
    "article": "der",
    "plural": "Aprile",
    "translation": "April"
  },
  {
    "id": "mai",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 231,
    "source": "frequency-list",
    "word": "Mai",
    "article": "der",
    "plural": "Maie",
    "translation": "May"
  },
  {
    "id": "juni",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 232,
    "source": "frequency-list",
    "word": "Juni",
    "article": "der",
    "plural": "Junis",
    "translation": "June"
  },
  {
    "id": "juli",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 233,
    "source": "frequency-list",
    "word": "Juli",
    "article": "der",
    "plural": "Julis",
    "translation": "July"
  },
  {
    "id": "august",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 234,
    "source": "frequency-list",
    "word": "August",
    "article": "der",
    "plural": "Auguste",
    "translation": "August"
  },
  {
    "id": "september",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 235,
    "source": "frequency-list",
    "word": "September",
    "article": "der",
    "plural": "September",
    "translation": "September"
  },
  {
    "id": "oktober",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 236,
    "source": "frequency-list",
    "word": "Oktober",
    "article": "der",
    "plural": "Oktober",
    "translation": "October"
  },
  {
    "id": "november",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 237,
    "source": "frequency-list",
    "word": "November",
    "article": "der",
    "plural": "November",
    "translation": "November"
  },
  {
    "id": "dezember",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 238,
    "source": "frequency-list",
    "word": "Dezember",
    "article": "der",
    "plural": "Dezember",
    "translation": "December"
  },
  {
    "id": "fruehling",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 239,
    "source": "frequency-list",
    "word": "Frühling",
    "article": "der",
    "plural": "Frühlinge",
    "translation": "spring"
  },
  {
    "id": "sommer",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 240,
    "source": "frequency-list",
    "word": "Sommer",
    "article": "der",
    "plural": "Sommer",
    "translation": "summer"
  },
  {
    "id": "herbst",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 241,
    "source": "frequency-list",
    "word": "Herbst",
    "article": "der",
    "plural": "Herbste",
    "translation": "autumn"
  },
  {
    "id": "winter",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 242,
    "source": "frequency-list",
    "word": "Winter",
    "article": "der",
    "plural": "Winter",
    "translation": "winter"
  },
  {
    "id": "gestern",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 245,
    "source": "frequency-list",
    "word": "gestern",
    "translation": "yesterday"
  },
  {
    "id": "jetzt",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 246,
    "source": "frequency-list",
    "word": "jetzt",
    "translation": "now"
  },
  {
    "id": "spaeter",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 247,
    "source": "frequency-list",
    "word": "später",
    "translation": "later"
  },
  {
    "id": "bald",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 250,
    "source": "frequency-list",
    "word": "bald",
    "translation": "soon"
  },
  {
    "id": "schon",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 251,
    "source": "frequency-list",
    "word": "schon",
    "translation": "already"
  },
  {
    "id": "noch",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 252,
    "source": "frequency-list",
    "word": "noch",
    "translation": "still, yet"
  },
  {
    "id": "immer",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 253,
    "source": "frequency-list",
    "word": "immer",
    "translation": "always"
  },
  {
    "id": "oft",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 254,
    "source": "frequency-list",
    "word": "oft",
    "translation": "often"
  },
  {
    "id": "manchmal",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 255,
    "source": "frequency-list",
    "word": "manchmal",
    "translation": "sometimes"
  },
  {
    "id": "selten",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 256,
    "source": "frequency-list",
    "word": "selten",
    "translation": "rarely"
  },
  {
    "id": "nie",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 257,
    "source": "frequency-list",
    "word": "nie",
    "translation": "never"
  },
  {
    "id": "gleich",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 258,
    "source": "frequency-list",
    "word": "gleich",
    "translation": "right away; the same"
  },
  {
    "id": "sofort",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 259,
    "source": "frequency-list",
    "word": "sofort",
    "translation": "immediately"
  },
  {
    "id": "zuerst",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 260,
    "source": "frequency-list",
    "word": "zuerst",
    "translation": "first, at first"
  },
  {
    "id": "danach",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 261,
    "source": "frequency-list",
    "word": "danach",
    "translation": "afterwards"
  },
  {
    "id": "dann",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 262,
    "source": "frequency-list",
    "word": "dann",
    "translation": "then"
  },
  {
    "id": "heute-abend",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 263,
    "source": "frequency-list",
    "word": "heute Abend",
    "translation": "this evening"
  },
  {
    "id": "gut",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 264,
    "source": "frequency-list",
    "word": "gut",
    "translation": "good"
  },
  {
    "id": "schlecht",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 265,
    "source": "frequency-list",
    "word": "schlecht",
    "translation": "bad"
  },
  {
    "id": "gross",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 266,
    "source": "frequency-list",
    "word": "groß",
    "translation": "big, tall"
  },
  {
    "id": "klein",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 267,
    "source": "frequency-list",
    "word": "klein",
    "translation": "small"
  },
  {
    "id": "neu",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 268,
    "source": "frequency-list",
    "word": "neu",
    "translation": "new"
  },
  {
    "id": "alt",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 269,
    "source": "frequency-list",
    "word": "alt",
    "translation": "old"
  },
  {
    "id": "jung",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 270,
    "source": "frequency-list",
    "word": "jung",
    "translation": "young"
  },
  {
    "id": "schoen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 271,
    "source": "frequency-list",
    "word": "schön",
    "translation": "beautiful"
  },
  {
    "id": "haesslich",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 272,
    "source": "frequency-list",
    "word": "hässlich",
    "translation": "ugly"
  },
  {
    "id": "lang",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 273,
    "source": "frequency-list",
    "word": "lang",
    "translation": "long"
  },
  {
    "id": "kurz",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 274,
    "source": "frequency-list",
    "word": "kurz",
    "translation": "short"
  },
  {
    "id": "hoch",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 275,
    "source": "frequency-list",
    "word": "hoch",
    "translation": "high, tall"
  },
  {
    "id": "niedrig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 276,
    "source": "frequency-list",
    "word": "niedrig",
    "translation": "low"
  },
  {
    "id": "breit",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 277,
    "source": "frequency-list",
    "word": "breit",
    "translation": "wide"
  },
  {
    "id": "schmal",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 278,
    "source": "frequency-list",
    "word": "schmal",
    "translation": "narrow"
  },
  {
    "id": "schwer",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 279,
    "source": "frequency-list",
    "word": "schwer",
    "translation": "heavy; difficult"
  },
  {
    "id": "leicht",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 280,
    "source": "frequency-list",
    "word": "leicht",
    "translation": "light; easy"
  },
  {
    "id": "schnell",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 281,
    "source": "frequency-list",
    "word": "schnell",
    "translation": "fast"
  },
  {
    "id": "langsam",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 282,
    "source": "frequency-list",
    "word": "langsam",
    "translation": "slow"
  },
  {
    "id": "stark",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 283,
    "source": "frequency-list",
    "word": "stark",
    "translation": "strong"
  },
  {
    "id": "schwach",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 284,
    "source": "frequency-list",
    "word": "schwach",
    "translation": "weak"
  },
  {
    "id": "laut",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 285,
    "source": "frequency-list",
    "word": "laut",
    "translation": "loud"
  },
  {
    "id": "leise",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 286,
    "source": "frequency-list",
    "word": "leise",
    "translation": "quiet"
  },
  {
    "id": "voll",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 287,
    "source": "frequency-list",
    "word": "voll",
    "translation": "full"
  },
  {
    "id": "leer",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 288,
    "source": "frequency-list",
    "word": "leer",
    "translation": "empty"
  },
  {
    "id": "sauber",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 289,
    "source": "frequency-list",
    "word": "sauber",
    "translation": "clean"
  },
  {
    "id": "schmutzig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 290,
    "source": "frequency-list",
    "word": "schmutzig",
    "translation": "dirty"
  },
  {
    "id": "richtig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 291,
    "source": "frequency-list",
    "word": "richtig",
    "translation": "correct, right"
  },
  {
    "id": "falsch",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 292,
    "source": "frequency-list",
    "word": "falsch",
    "translation": "wrong"
  },
  {
    "id": "einfach",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 293,
    "source": "frequency-list",
    "word": "einfach",
    "translation": "simple, easy"
  },
  {
    "id": "schwierig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 294,
    "source": "frequency-list",
    "word": "schwierig",
    "translation": "difficult"
  },
  {
    "id": "wichtig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 295,
    "source": "frequency-list",
    "word": "wichtig",
    "translation": "important"
  },
  {
    "id": "interessant",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 296,
    "source": "frequency-list",
    "word": "interessant",
    "translation": "interesting"
  },
  {
    "id": "langweilig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 297,
    "source": "frequency-list",
    "word": "langweilig",
    "translation": "boring"
  },
  {
    "id": "teuer",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-money"
    },
    "frequencyRank": 298,
    "source": "frequency-list",
    "word": "teuer",
    "translation": "expensive"
  },
  {
    "id": "billig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-money"
    },
    "frequencyRank": 299,
    "source": "frequency-list",
    "word": "billig",
    "translation": "cheap"
  },
  {
    "id": "guenstig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-money"
    },
    "frequencyRank": 300,
    "source": "frequency-list",
    "word": "günstig",
    "translation": "affordable, favorable"
  },
  {
    "id": "neugierig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 301,
    "source": "frequency-list",
    "word": "neugierig",
    "translation": "curious"
  },
  {
    "id": "freundlich",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 302,
    "source": "frequency-list",
    "word": "freundlich",
    "translation": "friendly"
  },
  {
    "id": "nett",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 303,
    "source": "frequency-list",
    "word": "nett",
    "translation": "nice"
  },
  {
    "id": "gluecklich",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 304,
    "source": "frequency-list",
    "word": "glücklich",
    "translation": "happy"
  },
  {
    "id": "traurig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 305,
    "source": "frequency-list",
    "word": "traurig",
    "translation": "sad"
  },
  {
    "id": "muede",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 306,
    "source": "frequency-list",
    "word": "müde",
    "translation": "tired"
  },
  {
    "id": "wach",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 307,
    "source": "frequency-list",
    "word": "wach",
    "translation": "awake"
  },
  {
    "id": "hungrig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 308,
    "source": "frequency-list",
    "word": "hungrig",
    "translation": "hungry"
  },
  {
    "id": "durstig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 309,
    "source": "frequency-list",
    "word": "durstig",
    "translation": "thirsty"
  },
  {
    "id": "krank",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 310,
    "source": "frequency-list",
    "word": "krank",
    "translation": "sick"
  },
  {
    "id": "gesund",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 311,
    "source": "frequency-list",
    "word": "gesund",
    "translation": "healthy"
  },
  {
    "id": "wuetend",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 312,
    "source": "frequency-list",
    "word": "wütend",
    "translation": "angry"
  },
  {
    "id": "nervoes",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 313,
    "source": "frequency-list",
    "word": "nervös",
    "translation": "nervous"
  },
  {
    "id": "aengstlich",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 314,
    "source": "frequency-list",
    "word": "ängstlich",
    "translation": "anxious, fearful"
  },
  {
    "id": "zufrieden",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 315,
    "source": "frequency-list",
    "word": "zufrieden",
    "translation": "satisfied"
  },
  {
    "id": "verheiratet",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 316,
    "source": "frequency-list",
    "word": "verheiratet",
    "translation": "married"
  },
  {
    "id": "ledig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 317,
    "source": "frequency-list",
    "word": "ledig",
    "translation": "single (unmarried)"
  },
  {
    "id": "kalt",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 318,
    "source": "frequency-list",
    "word": "kalt",
    "translation": "cold"
  },
  {
    "id": "warm",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 319,
    "source": "frequency-list",
    "word": "warm",
    "translation": "warm"
  },
  {
    "id": "heiss",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 320,
    "source": "frequency-list",
    "word": "heiß",
    "translation": "hot"
  },
  {
    "id": "nass",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 321,
    "source": "frequency-list",
    "word": "nass",
    "translation": "wet"
  },
  {
    "id": "trocken",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 322,
    "source": "frequency-list",
    "word": "trocken",
    "translation": "dry"
  },
  {
    "id": "sonnig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 323,
    "source": "frequency-list",
    "word": "sonnig",
    "translation": "sunny"
  },
  {
    "id": "windig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 324,
    "source": "frequency-list",
    "word": "windig",
    "translation": "windy"
  },
  {
    "id": "wolkig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 325,
    "source": "frequency-list",
    "word": "wolkig",
    "translation": "cloudy"
  },
  {
    "id": "dunkel",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 326,
    "source": "frequency-list",
    "word": "dunkel",
    "translation": "dark"
  },
  {
    "id": "hell",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 327,
    "source": "frequency-list",
    "word": "hell",
    "translation": "bright, light"
  },
  {
    "id": "rot",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-color"
    },
    "frequencyRank": 328,
    "source": "frequency-list",
    "word": "rot",
    "translation": "red"
  },
  {
    "id": "blau",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-color"
    },
    "frequencyRank": 329,
    "source": "frequency-list",
    "word": "blau",
    "translation": "blue"
  },
  {
    "id": "gruen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-color"
    },
    "frequencyRank": 330,
    "source": "frequency-list",
    "word": "grün",
    "translation": "green"
  },
  {
    "id": "gelb",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-color"
    },
    "frequencyRank": 331,
    "source": "frequency-list",
    "word": "gelb",
    "translation": "yellow"
  },
  {
    "id": "schwarz",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-color"
    },
    "frequencyRank": 332,
    "source": "frequency-list",
    "word": "schwarz",
    "translation": "black"
  },
  {
    "id": "weiss",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-color"
    },
    "frequencyRank": 333,
    "source": "frequency-list",
    "word": "weiß",
    "translation": "white"
  },
  {
    "id": "grau",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-color"
    },
    "frequencyRank": 334,
    "source": "frequency-list",
    "word": "grau",
    "translation": "gray"
  },
  {
    "id": "braun",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-color"
    },
    "frequencyRank": 335,
    "source": "frequency-list",
    "word": "braun",
    "translation": "brown"
  },
  {
    "id": "rosa",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-color"
    },
    "frequencyRank": 336,
    "source": "frequency-list",
    "word": "rosa",
    "translation": "pink"
  },
  {
    "id": "orange",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-color"
    },
    "frequencyRank": 337,
    "source": "frequency-list",
    "word": "orange",
    "translation": "orange"
  },
  {
    "id": "dick",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 338,
    "source": "frequency-list",
    "word": "dick",
    "translation": "thick, fat"
  },
  {
    "id": "duenn",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 339,
    "source": "frequency-list",
    "word": "dünn",
    "translation": "thin"
  },
  {
    "id": "frei",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 340,
    "source": "frequency-list",
    "word": "frei",
    "translation": "free"
  },
  {
    "id": "fertig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 341,
    "source": "frequency-list",
    "word": "fertig",
    "translation": "finished, ready"
  },
  {
    "id": "kaputt",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-object"
    },
    "frequencyRank": 342,
    "source": "frequency-list",
    "word": "kaputt",
    "translation": "broken"
  },
  {
    "id": "andere",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 343,
    "source": "frequency-list",
    "word": "andere",
    "translation": "other, different"
  },
  {
    "id": "naechste",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 344,
    "source": "frequency-list",
    "word": "nächste",
    "translation": "next"
  },
  {
    "id": "eigen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 345,
    "source": "frequency-list",
    "word": "eigen",
    "translation": "own"
  },
  {
    "id": "ganz",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 346,
    "source": "frequency-list",
    "word": "ganz",
    "translation": "whole, entire; quite"
  },
  {
    "id": "lecker",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 347,
    "source": "frequency-list",
    "word": "lecker",
    "translation": "delicious"
  },
  {
    "id": "frisch",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 348,
    "source": "frequency-list",
    "word": "frisch",
    "translation": "fresh"
  },
  {
    "id": "suess",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 349,
    "source": "frequency-list",
    "word": "süß",
    "translation": "sweet"
  },
  {
    "id": "sauer",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 350,
    "source": "frequency-list",
    "word": "sauer",
    "translation": "sour"
  },
  {
    "id": "scharf",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 351,
    "source": "frequency-list",
    "word": "scharf",
    "translation": "spicy, sharp"
  },
  {
    "id": "bitter",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 352,
    "source": "frequency-list",
    "word": "bitter",
    "translation": "bitter"
  },
  {
    "id": "salzig",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adjective",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 353,
    "source": "frequency-list",
    "word": "salzig",
    "translation": "salty"
  },
  {
    "id": "sehr",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 354,
    "source": "frequency-list",
    "word": "sehr",
    "translation": "very"
  },
  {
    "id": "auch",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 355,
    "source": "frequency-list",
    "word": "auch",
    "translation": "also"
  },
  {
    "id": "nur",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 356,
    "source": "frequency-list",
    "word": "nur",
    "translation": "only"
  },
  {
    "id": "fast",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 357,
    "source": "frequency-list",
    "word": "fast",
    "translation": "almost"
  },
  {
    "id": "genug",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 358,
    "source": "frequency-list",
    "word": "genug",
    "translation": "enough"
  },
  {
    "id": "vielleicht",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 359,
    "source": "frequency-list",
    "word": "vielleicht",
    "translation": "maybe"
  },
  {
    "id": "wirklich",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 360,
    "source": "frequency-list",
    "word": "wirklich",
    "translation": "really"
  },
  {
    "id": "natuerlich",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 361,
    "source": "frequency-list",
    "word": "natürlich",
    "translation": "naturally, of course"
  },
  {
    "id": "leider",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 362,
    "source": "frequency-list",
    "word": "leider",
    "translation": "unfortunately"
  },
  {
    "id": "zusammen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 363,
    "source": "frequency-list",
    "word": "zusammen",
    "translation": "together"
  },
  {
    "id": "allein",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 364,
    "source": "frequency-list",
    "word": "allein",
    "translation": "alone"
  },
  {
    "id": "gern",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 365,
    "source": "frequency-list",
    "word": "gern",
    "translation": "gladly, with pleasure"
  },
  {
    "id": "hier",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 366,
    "source": "frequency-list",
    "word": "hier",
    "translation": "here"
  },
  {
    "id": "dort",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 367,
    "source": "frequency-list",
    "word": "dort",
    "translation": "there"
  },
  {
    "id": "da",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 368,
    "source": "frequency-list",
    "word": "da",
    "translation": "there, then"
  },
  {
    "id": "oben",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 369,
    "source": "frequency-list",
    "word": "oben",
    "translation": "above, upstairs"
  },
  {
    "id": "unten",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 370,
    "source": "frequency-list",
    "word": "unten",
    "translation": "below, downstairs"
  },
  {
    "id": "links",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 371,
    "source": "frequency-list",
    "word": "links",
    "translation": "left"
  },
  {
    "id": "rechts",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 372,
    "source": "frequency-list",
    "word": "rechts",
    "translation": "right"
  },
  {
    "id": "drinnen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 373,
    "source": "frequency-list",
    "word": "drinnen",
    "translation": "inside"
  },
  {
    "id": "draussen",
    "type": "vocab",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "adverb",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 374,
    "source": "frequency-list",
    "word": "draußen",
    "translation": "outside"
  },
  {
    "id": "mann",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 375,
    "source": "frequency-list",
    "word": "Mann",
    "article": "der",
    "plural": "Männer",
    "translation": "man"
  },
  {
    "id": "frau",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 376,
    "source": "frequency-list",
    "word": "Frau",
    "article": "die",
    "plural": "Frauen",
    "translation": "woman"
  },
  {
    "id": "kind",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 377,
    "source": "frequency-list",
    "word": "Kind",
    "article": "das",
    "plural": "Kinder",
    "translation": "child"
  },
  {
    "id": "junge",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 378,
    "source": "frequency-list",
    "word": "Junge",
    "article": "der",
    "plural": "Jungen",
    "translation": "boy"
  },
  {
    "id": "maedchen",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 379,
    "source": "frequency-list",
    "word": "Mädchen",
    "article": "das",
    "plural": "Mädchen",
    "translation": "girl"
  },
  {
    "id": "familie",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 380,
    "source": "frequency-list",
    "word": "Familie",
    "article": "die",
    "plural": "Familien",
    "translation": "family"
  },
  {
    "id": "mutter",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 381,
    "source": "frequency-list",
    "word": "Mutter",
    "article": "die",
    "plural": "Mütter",
    "translation": "mother"
  },
  {
    "id": "vater",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 382,
    "source": "frequency-list",
    "word": "Vater",
    "article": "der",
    "plural": "Väter",
    "translation": "father"
  },
  {
    "id": "eltern",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 383,
    "source": "frequency-list",
    "word": "Eltern",
    "article": "die",
    "plural": "Eltern",
    "translation": "parents"
  },
  {
    "id": "sohn",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 384,
    "source": "frequency-list",
    "word": "Sohn",
    "article": "der",
    "plural": "Söhne",
    "translation": "son"
  },
  {
    "id": "tochter",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 385,
    "source": "frequency-list",
    "word": "Tochter",
    "article": "die",
    "plural": "Töchter",
    "translation": "daughter"
  },
  {
    "id": "bruder",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 386,
    "source": "frequency-list",
    "word": "Bruder",
    "article": "der",
    "plural": "Brüder",
    "translation": "brother"
  },
  {
    "id": "schwester",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 387,
    "source": "frequency-list",
    "word": "Schwester",
    "article": "die",
    "plural": "Schwestern",
    "translation": "sister"
  },
  {
    "id": "grossmutter",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 388,
    "source": "frequency-list",
    "word": "Großmutter",
    "article": "die",
    "plural": "Großmütter",
    "translation": "grandmother"
  },
  {
    "id": "grossvater",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 389,
    "source": "frequency-list",
    "word": "Großvater",
    "article": "der",
    "plural": "Großväter",
    "translation": "grandfather"
  },
  {
    "id": "onkel",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 390,
    "source": "frequency-list",
    "word": "Onkel",
    "article": "der",
    "plural": "Onkel",
    "translation": "uncle"
  },
  {
    "id": "tante",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 391,
    "source": "frequency-list",
    "word": "Tante",
    "article": "die",
    "plural": "Tanten",
    "translation": "aunt"
  },
  {
    "id": "freund",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 392,
    "source": "frequency-list",
    "word": "Freund",
    "article": "der",
    "plural": "Freunde",
    "translation": "friend (male)"
  },
  {
    "id": "freundin",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 393,
    "source": "frequency-list",
    "word": "Freundin",
    "article": "die",
    "plural": "Freundinnen",
    "translation": "friend (female)"
  },
  {
    "id": "baby",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 394,
    "source": "frequency-list",
    "word": "Baby",
    "article": "das",
    "plural": "Babys",
    "translation": "baby"
  },
  {
    "id": "ehemann",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 395,
    "source": "frequency-list",
    "word": "Ehemann",
    "article": "der",
    "plural": "Ehemänner",
    "translation": "husband"
  },
  {
    "id": "ehefrau",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-family"
    },
    "frequencyRank": 396,
    "source": "frequency-list",
    "word": "Ehefrau",
    "article": "die",
    "plural": "Ehefrauen",
    "translation": "wife"
  },
  {
    "id": "nachbar",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 397,
    "source": "frequency-list",
    "word": "Nachbar",
    "article": "der",
    "plural": "Nachbarn",
    "translation": "neighbor"
  },
  {
    "id": "leute",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 398,
    "source": "frequency-list",
    "word": "Leute",
    "article": "die",
    "plural": "Leute",
    "translation": "people"
  },
  {
    "id": "person",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 399,
    "source": "frequency-list",
    "word": "Person",
    "article": "die",
    "plural": "Personen",
    "translation": "person"
  },
  {
    "id": "name",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-person"
    },
    "frequencyRank": 400,
    "source": "frequency-list",
    "word": "Name",
    "article": "der",
    "plural": "Namen",
    "translation": "name"
  },
  {
    "id": "wohnung",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 402,
    "source": "frequency-list",
    "word": "Wohnung",
    "article": "die",
    "plural": "Wohnungen",
    "translation": "apartment"
  },
  {
    "id": "zimmer",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 403,
    "source": "frequency-list",
    "word": "Zimmer",
    "article": "das",
    "plural": "Zimmer",
    "translation": "room"
  },
  {
    "id": "kueche",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 404,
    "source": "frequency-list",
    "word": "Küche",
    "article": "die",
    "plural": "Küchen",
    "translation": "kitchen"
  },
  {
    "id": "bad",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 405,
    "source": "frequency-list",
    "word": "Bad",
    "article": "das",
    "plural": "Bäder",
    "translation": "bathroom"
  },
  {
    "id": "schlafzimmer",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 406,
    "source": "frequency-list",
    "word": "Schlafzimmer",
    "article": "das",
    "plural": "Schlafzimmer",
    "translation": "bedroom"
  },
  {
    "id": "wohnzimmer",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 407,
    "source": "frequency-list",
    "word": "Wohnzimmer",
    "article": "das",
    "plural": "Wohnzimmer",
    "translation": "living room"
  },
  {
    "id": "wand",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 410,
    "source": "frequency-list",
    "word": "Wand",
    "article": "die",
    "plural": "Wände",
    "translation": "wall"
  },
  {
    "id": "boden",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 411,
    "source": "frequency-list",
    "word": "Boden",
    "article": "der",
    "plural": "Böden",
    "translation": "floor, ground"
  },
  {
    "id": "garten",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 412,
    "source": "frequency-list",
    "word": "Garten",
    "article": "der",
    "plural": "Gärten",
    "translation": "garden"
  },
  {
    "id": "stuhl",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 413,
    "source": "frequency-list",
    "word": "Stuhl",
    "article": "der",
    "plural": "Stühle",
    "translation": "chair"
  },
  {
    "id": "sofa",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 414,
    "source": "frequency-list",
    "word": "Sofa",
    "article": "das",
    "plural": "Sofas",
    "translation": "sofa"
  },
  {
    "id": "lampe",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 415,
    "source": "frequency-list",
    "word": "Lampe",
    "article": "die",
    "plural": "Lampen",
    "translation": "lamp"
  },
  {
    "id": "spiegel",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 416,
    "source": "frequency-list",
    "word": "Spiegel",
    "article": "der",
    "plural": "Spiegel",
    "translation": "mirror"
  },
  {
    "id": "schrank",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 417,
    "source": "frequency-list",
    "word": "Schrank",
    "article": "der",
    "plural": "Schränke",
    "translation": "cupboard, closet"
  },
  {
    "id": "kuehlschrank",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 418,
    "source": "frequency-list",
    "word": "Kühlschrank",
    "article": "der",
    "plural": "Kühlschränke",
    "translation": "refrigerator"
  },
  {
    "id": "herd",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 419,
    "source": "frequency-list",
    "word": "Herd",
    "article": "der",
    "plural": "Herde",
    "translation": "stove"
  },
  {
    "id": "handtuch",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 420,
    "source": "frequency-list",
    "word": "Handtuch",
    "article": "das",
    "plural": "Handtücher",
    "translation": "towel"
  },
  {
    "id": "decke",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-home"
    },
    "frequencyRank": 421,
    "source": "frequency-list",
    "word": "Decke",
    "article": "die",
    "plural": "Decken",
    "translation": "blanket; ceiling"
  },
  {
    "id": "miete",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-money"
    },
    "frequencyRank": 422,
    "source": "frequency-list",
    "word": "Miete",
    "article": "die",
    "plural": "Mieten",
    "translation": "rent"
  },
  {
    "id": "brot",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 423,
    "source": "frequency-list",
    "word": "Brot",
    "article": "das",
    "plural": "Brote",
    "translation": "bread"
  },
  {
    "id": "butter",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 424,
    "source": "frequency-list",
    "word": "Butter",
    "article": "die",
    "translation": "butter"
  },
  {
    "id": "kaese",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 425,
    "source": "frequency-list",
    "word": "Käse",
    "article": "der",
    "plural": "Käse",
    "translation": "cheese"
  },
  {
    "id": "ei",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 426,
    "source": "frequency-list",
    "word": "Ei",
    "article": "das",
    "plural": "Eier",
    "translation": "egg"
  },
  {
    "id": "zucker",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 428,
    "source": "frequency-list",
    "word": "Zucker",
    "article": "der",
    "translation": "sugar"
  },
  {
    "id": "salz",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 429,
    "source": "frequency-list",
    "word": "Salz",
    "article": "das",
    "translation": "salt"
  },
  {
    "id": "fleisch",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 430,
    "source": "frequency-list",
    "word": "Fleisch",
    "article": "das",
    "translation": "meat"
  },
  {
    "id": "fisch",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 431,
    "source": "frequency-list",
    "word": "Fisch",
    "article": "der",
    "plural": "Fische",
    "translation": "fish"
  },
  {
    "id": "gemuese",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 432,
    "source": "frequency-list",
    "word": "Gemüse",
    "article": "das",
    "plural": "Gemüse",
    "translation": "vegetables"
  },
  {
    "id": "obst",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 433,
    "source": "frequency-list",
    "word": "Obst",
    "article": "das",
    "translation": "fruit"
  },
  {
    "id": "apfel",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 434,
    "source": "frequency-list",
    "word": "Apfel",
    "article": "der",
    "plural": "Äpfel",
    "translation": "apple"
  },
  {
    "id": "kartoffel",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 435,
    "source": "frequency-list",
    "word": "Kartoffel",
    "article": "die",
    "plural": "Kartoffeln",
    "translation": "potato"
  },
  {
    "id": "suppe",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 436,
    "source": "frequency-list",
    "word": "Suppe",
    "article": "die",
    "plural": "Suppen",
    "translation": "soup"
  },
  {
    "id": "nudeln",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 437,
    "source": "frequency-list",
    "word": "Nudeln",
    "article": "die",
    "plural": "Nudeln",
    "translation": "noodles, pasta"
  },
  {
    "id": "fruehstueck",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 439,
    "source": "frequency-list",
    "word": "Frühstück",
    "article": "das",
    "plural": "Frühstücke",
    "translation": "breakfast"
  },
  {
    "id": "mittagessen",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 440,
    "source": "frequency-list",
    "word": "Mittagessen",
    "article": "das",
    "plural": "Mittagessen",
    "translation": "lunch"
  },
  {
    "id": "abendessen",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 441,
    "source": "frequency-list",
    "word": "Abendessen",
    "article": "das",
    "plural": "Abendessen",
    "translation": "dinner"
  },
  {
    "id": "wasser",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-drink"
    },
    "frequencyRank": 442,
    "source": "frequency-list",
    "word": "Wasser",
    "article": "das",
    "translation": "water"
  },
  {
    "id": "saft",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-drink"
    },
    "frequencyRank": 445,
    "source": "frequency-list",
    "word": "Saft",
    "article": "der",
    "plural": "Säfte",
    "translation": "juice"
  },
  {
    "id": "bier",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-drink"
    },
    "frequencyRank": 446,
    "source": "frequency-list",
    "word": "Bier",
    "article": "das",
    "plural": "Biere",
    "translation": "beer"
  },
  {
    "id": "wein",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-drink"
    },
    "frequencyRank": 447,
    "source": "frequency-list",
    "word": "Wein",
    "article": "der",
    "plural": "Weine",
    "translation": "wine"
  },
  {
    "id": "restaurant",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 448,
    "source": "frequency-list",
    "word": "Restaurant",
    "article": "das",
    "plural": "Restaurants",
    "translation": "restaurant"
  },
  {
    "id": "loeffel",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 449,
    "source": "frequency-list",
    "word": "Löffel",
    "article": "der",
    "plural": "Löffel",
    "translation": "spoon"
  },
  {
    "id": "messer",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-food"
    },
    "frequencyRank": 450,
    "source": "frequency-list",
    "word": "Messer",
    "article": "das",
    "plural": "Messer",
    "translation": "knife"
  },
  {
    "id": "glas",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-drink"
    },
    "frequencyRank": 452,
    "source": "frequency-list",
    "word": "Glas",
    "article": "das",
    "plural": "Gläser",
    "translation": "glass"
  },
  {
    "id": "kopf",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 453,
    "source": "frequency-list",
    "word": "Kopf",
    "article": "der",
    "plural": "Köpfe",
    "translation": "head"
  },
  {
    "id": "haar",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 454,
    "source": "frequency-list",
    "word": "Haar",
    "article": "das",
    "plural": "Haare",
    "translation": "hair"
  },
  {
    "id": "gesicht",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 455,
    "source": "frequency-list",
    "word": "Gesicht",
    "article": "das",
    "plural": "Gesichter",
    "translation": "face"
  },
  {
    "id": "auge",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 456,
    "source": "frequency-list",
    "word": "Auge",
    "article": "das",
    "plural": "Augen",
    "translation": "eye"
  },
  {
    "id": "ohr",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 457,
    "source": "frequency-list",
    "word": "Ohr",
    "article": "das",
    "plural": "Ohren",
    "translation": "ear"
  },
  {
    "id": "nase",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 458,
    "source": "frequency-list",
    "word": "Nase",
    "article": "die",
    "plural": "Nasen",
    "translation": "nose"
  },
  {
    "id": "mund",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 459,
    "source": "frequency-list",
    "word": "Mund",
    "article": "der",
    "plural": "Münder",
    "translation": "mouth"
  },
  {
    "id": "zahn",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 460,
    "source": "frequency-list",
    "word": "Zahn",
    "article": "der",
    "plural": "Zähne",
    "translation": "tooth"
  },
  {
    "id": "hals",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 461,
    "source": "frequency-list",
    "word": "Hals",
    "article": "der",
    "plural": "Hälse",
    "translation": "neck, throat"
  },
  {
    "id": "arm",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 462,
    "source": "frequency-list",
    "word": "Arm",
    "article": "der",
    "plural": "Arme",
    "translation": "arm"
  },
  {
    "id": "hand",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 463,
    "source": "frequency-list",
    "word": "Hand",
    "article": "die",
    "plural": "Hände",
    "translation": "hand"
  },
  {
    "id": "finger",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 464,
    "source": "frequency-list",
    "word": "Finger",
    "article": "der",
    "plural": "Finger",
    "translation": "finger"
  },
  {
    "id": "bein",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 465,
    "source": "frequency-list",
    "word": "Bein",
    "article": "das",
    "plural": "Beine",
    "translation": "leg"
  },
  {
    "id": "fuss",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 466,
    "source": "frequency-list",
    "word": "Fuß",
    "article": "der",
    "plural": "Füße",
    "translation": "foot"
  },
  {
    "id": "bauch",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 467,
    "source": "frequency-list",
    "word": "Bauch",
    "article": "der",
    "plural": "Bäuche",
    "translation": "belly, stomach"
  },
  {
    "id": "ruecken",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 468,
    "source": "frequency-list",
    "word": "Rücken",
    "article": "der",
    "plural": "Rücken",
    "translation": "back"
  },
  {
    "id": "herz",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 469,
    "source": "frequency-list",
    "word": "Herz",
    "article": "das",
    "plural": "Herzen",
    "translation": "heart"
  },
  {
    "id": "koerper",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-body"
    },
    "frequencyRank": 470,
    "source": "frequency-list",
    "word": "Körper",
    "article": "der",
    "plural": "Körper",
    "translation": "body"
  },
  {
    "id": "kleidung",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 471,
    "source": "frequency-list",
    "word": "Kleidung",
    "article": "die",
    "translation": "clothing"
  },
  {
    "id": "hemd",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 472,
    "source": "frequency-list",
    "word": "Hemd",
    "article": "das",
    "plural": "Hemden",
    "translation": "shirt"
  },
  {
    "id": "hose",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 473,
    "source": "frequency-list",
    "word": "Hose",
    "article": "die",
    "plural": "Hosen",
    "translation": "trousers, pants"
  },
  {
    "id": "kleid",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 474,
    "source": "frequency-list",
    "word": "Kleid",
    "article": "das",
    "plural": "Kleider",
    "translation": "dress"
  },
  {
    "id": "rock",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 475,
    "source": "frequency-list",
    "word": "Rock",
    "article": "der",
    "plural": "Röcke",
    "translation": "skirt"
  },
  {
    "id": "jacke",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 476,
    "source": "frequency-list",
    "word": "Jacke",
    "article": "die",
    "plural": "Jacken",
    "translation": "jacket"
  },
  {
    "id": "mantel",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 477,
    "source": "frequency-list",
    "word": "Mantel",
    "article": "der",
    "plural": "Mäntel",
    "translation": "coat"
  },
  {
    "id": "schuh",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 478,
    "source": "frequency-list",
    "word": "Schuh",
    "article": "der",
    "plural": "Schuhe",
    "translation": "shoe"
  },
  {
    "id": "socke",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 479,
    "source": "frequency-list",
    "word": "Socke",
    "article": "die",
    "plural": "Socken",
    "translation": "sock"
  },
  {
    "id": "hut",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 480,
    "source": "frequency-list",
    "word": "Hut",
    "article": "der",
    "plural": "Hüte",
    "translation": "hat"
  },
  {
    "id": "muetze",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 481,
    "source": "frequency-list",
    "word": "Mütze",
    "article": "die",
    "plural": "Mützen",
    "translation": "cap, beanie"
  },
  {
    "id": "handschuh",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-clothing"
    },
    "frequencyRank": 482,
    "source": "frequency-list",
    "word": "Handschuh",
    "article": "der",
    "plural": "Handschuhe",
    "translation": "glove"
  },
  {
    "id": "stadt",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 483,
    "source": "frequency-list",
    "word": "Stadt",
    "article": "die",
    "plural": "Städte",
    "translation": "city, town"
  },
  {
    "id": "land",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 484,
    "source": "frequency-list",
    "word": "Land",
    "article": "das",
    "plural": "Länder",
    "translation": "country"
  },
  {
    "id": "strasse",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 485,
    "source": "frequency-list",
    "word": "Straße",
    "article": "die",
    "plural": "Straßen",
    "translation": "street"
  },
  {
    "id": "platz",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 486,
    "source": "frequency-list",
    "word": "Platz",
    "article": "der",
    "plural": "Plätze",
    "translation": "square, place; seat"
  },
  {
    "id": "weg",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 487,
    "source": "frequency-list",
    "word": "Weg",
    "article": "der",
    "plural": "Wege",
    "translation": "way, path"
  },
  {
    "id": "bus",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 489,
    "source": "frequency-list",
    "word": "Bus",
    "article": "der",
    "plural": "Busse",
    "translation": "bus"
  },
  {
    "id": "zug",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 490,
    "source": "frequency-list",
    "word": "Zug",
    "article": "der",
    "plural": "Züge",
    "translation": "train"
  },
  {
    "id": "fahrrad",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 491,
    "source": "frequency-list",
    "word": "Fahrrad",
    "article": "das",
    "plural": "Fahrräder",
    "translation": "bicycle"
  },
  {
    "id": "flugzeug",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 492,
    "source": "frequency-list",
    "word": "Flugzeug",
    "article": "das",
    "plural": "Flugzeuge",
    "translation": "airplane"
  },
  {
    "id": "taxi",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 493,
    "source": "frequency-list",
    "word": "Taxi",
    "article": "das",
    "plural": "Taxis",
    "translation": "taxi"
  },
  {
    "id": "bahnhof",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 494,
    "source": "frequency-list",
    "word": "Bahnhof",
    "article": "der",
    "plural": "Bahnhöfe",
    "translation": "train station"
  },
  {
    "id": "flughafen",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 495,
    "source": "frequency-list",
    "word": "Flughafen",
    "article": "der",
    "plural": "Flughäfen",
    "translation": "airport"
  },
  {
    "id": "fahrkarte",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 496,
    "source": "frequency-list",
    "word": "Fahrkarte",
    "article": "die",
    "plural": "Fahrkarten",
    "translation": "ticket"
  },
  {
    "id": "koffer",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 497,
    "source": "frequency-list",
    "word": "Koffer",
    "article": "der",
    "plural": "Koffer",
    "translation": "suitcase"
  },
  {
    "id": "reise",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 498,
    "source": "frequency-list",
    "word": "Reise",
    "article": "die",
    "plural": "Reisen",
    "translation": "trip, journey"
  },
  {
    "id": "urlaub",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-travel"
    },
    "frequencyRank": 499,
    "source": "frequency-list",
    "word": "Urlaub",
    "article": "der",
    "plural": "Urlaube",
    "translation": "vacation"
  },
  {
    "id": "geschaeft",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 500,
    "source": "frequency-list",
    "word": "Geschäft",
    "article": "das",
    "plural": "Geschäfte",
    "translation": "shop, business"
  },
  {
    "id": "supermarkt",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 501,
    "source": "frequency-list",
    "word": "Supermarkt",
    "article": "der",
    "plural": "Supermärkte",
    "translation": "supermarket"
  },
  {
    "id": "krankenhaus",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 502,
    "source": "frequency-list",
    "word": "Krankenhaus",
    "article": "das",
    "plural": "Krankenhäuser",
    "translation": "hospital"
  },
  {
    "id": "apotheke",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 503,
    "source": "frequency-list",
    "word": "Apotheke",
    "article": "die",
    "plural": "Apotheken",
    "translation": "pharmacy"
  },
  {
    "id": "kirche",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 504,
    "source": "frequency-list",
    "word": "Kirche",
    "article": "die",
    "plural": "Kirchen",
    "translation": "church"
  },
  {
    "id": "park",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 505,
    "source": "frequency-list",
    "word": "Park",
    "article": "der",
    "plural": "Parks",
    "translation": "park"
  },
  {
    "id": "bank",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 506,
    "source": "frequency-list",
    "word": "Bank",
    "article": "die",
    "plural": "Banken",
    "translation": "bank"
  },
  {
    "id": "post",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 507,
    "source": "frequency-list",
    "word": "Post",
    "article": "die",
    "translation": "post office; mail"
  },
  {
    "id": "hotel",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 508,
    "source": "frequency-list",
    "word": "Hotel",
    "article": "das",
    "plural": "Hotels",
    "translation": "hotel"
  },
  {
    "id": "flasche",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-object"
    },
    "frequencyRank": 509,
    "source": "frequency-list",
    "word": "Flasche",
    "article": "die",
    "plural": "Flaschen",
    "translation": "bottle"
  },
  {
    "id": "arbeit",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 511,
    "source": "frequency-list",
    "word": "Arbeit",
    "article": "die",
    "plural": "Arbeiten",
    "translation": "work, job"
  },
  {
    "id": "beruf",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 512,
    "source": "frequency-list",
    "word": "Beruf",
    "article": "der",
    "plural": "Berufe",
    "translation": "profession"
  },
  {
    "id": "firma",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 513,
    "source": "frequency-list",
    "word": "Firma",
    "article": "die",
    "plural": "Firmen",
    "translation": "company"
  },
  {
    "id": "buero",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 514,
    "source": "frequency-list",
    "word": "Büro",
    "article": "das",
    "plural": "Büros",
    "translation": "office"
  },
  {
    "id": "chef",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 515,
    "source": "frequency-list",
    "word": "Chef",
    "article": "der",
    "plural": "Chefs",
    "translation": "boss"
  },
  {
    "id": "schule",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 516,
    "source": "frequency-list",
    "word": "Schule",
    "article": "die",
    "plural": "Schulen",
    "translation": "school"
  },
  {
    "id": "universitaet",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 517,
    "source": "frequency-list",
    "word": "Universität",
    "article": "die",
    "plural": "Universitäten",
    "translation": "university"
  },
  {
    "id": "lehrer",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 518,
    "source": "frequency-list",
    "word": "Lehrer",
    "article": "der",
    "plural": "Lehrer",
    "translation": "teacher"
  },
  {
    "id": "schueler",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 519,
    "source": "frequency-list",
    "word": "Schüler",
    "article": "der",
    "plural": "Schüler",
    "translation": "pupil, student"
  },
  {
    "id": "student",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 520,
    "source": "frequency-list",
    "word": "Student",
    "article": "der",
    "plural": "Studenten",
    "translation": "student (university)"
  },
  {
    "id": "klasse",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 521,
    "source": "frequency-list",
    "word": "Klasse",
    "article": "die",
    "plural": "Klassen",
    "translation": "class"
  },
  {
    "id": "pruefung",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-work"
    },
    "frequencyRank": 522,
    "source": "frequency-list",
    "word": "Prüfung",
    "article": "die",
    "plural": "Prüfungen",
    "translation": "exam"
  },
  {
    "id": "frage",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 523,
    "source": "frequency-list",
    "word": "Frage",
    "article": "die",
    "plural": "Fragen",
    "translation": "question"
  },
  {
    "id": "antwort",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 524,
    "source": "frequency-list",
    "word": "Antwort",
    "article": "die",
    "plural": "Antworten",
    "translation": "answer"
  },
  {
    "id": "computer",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-object"
    },
    "frequencyRank": 525,
    "source": "frequency-list",
    "word": "Computer",
    "article": "der",
    "plural": "Computer",
    "translation": "computer"
  },
  {
    "id": "termin",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 526,
    "source": "frequency-list",
    "word": "Termin",
    "article": "der",
    "plural": "Termine",
    "translation": "appointment"
  },
  {
    "id": "pause",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-time"
    },
    "frequencyRank": 527,
    "source": "frequency-list",
    "word": "Pause",
    "article": "die",
    "plural": "Pausen",
    "translation": "break"
  },
  {
    "id": "wetter",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 528,
    "source": "frequency-list",
    "word": "Wetter",
    "article": "das",
    "translation": "weather"
  },
  {
    "id": "sonne",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 529,
    "source": "frequency-list",
    "word": "Sonne",
    "article": "die",
    "plural": "Sonnen",
    "translation": "sun"
  },
  {
    "id": "regen",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 530,
    "source": "frequency-list",
    "word": "Regen",
    "article": "der",
    "translation": "rain"
  },
  {
    "id": "schnee",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 531,
    "source": "frequency-list",
    "word": "Schnee",
    "article": "der",
    "translation": "snow"
  },
  {
    "id": "wind",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 532,
    "source": "frequency-list",
    "word": "Wind",
    "article": "der",
    "plural": "Winde",
    "translation": "wind"
  },
  {
    "id": "wolke",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-weather"
    },
    "frequencyRank": 533,
    "source": "frequency-list",
    "word": "Wolke",
    "article": "die",
    "plural": "Wolken",
    "translation": "cloud"
  },
  {
    "id": "himmel",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-nature"
    },
    "frequencyRank": 534,
    "source": "frequency-list",
    "word": "Himmel",
    "article": "der",
    "plural": "Himmel",
    "translation": "sky"
  },
  {
    "id": "baum",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-nature"
    },
    "frequencyRank": 535,
    "source": "frequency-list",
    "word": "Baum",
    "article": "der",
    "plural": "Bäume",
    "translation": "tree"
  },
  {
    "id": "blume",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-nature"
    },
    "frequencyRank": 536,
    "source": "frequency-list",
    "word": "Blume",
    "article": "die",
    "plural": "Blumen",
    "translation": "flower"
  },
  {
    "id": "wald",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-nature"
    },
    "frequencyRank": 537,
    "source": "frequency-list",
    "word": "Wald",
    "article": "der",
    "plural": "Wälder",
    "translation": "forest"
  },
  {
    "id": "berg",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-nature"
    },
    "frequencyRank": 538,
    "source": "frequency-list",
    "word": "Berg",
    "article": "der",
    "plural": "Berge",
    "translation": "mountain"
  },
  {
    "id": "see",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-nature"
    },
    "frequencyRank": 539,
    "source": "frequency-list",
    "word": "See",
    "article": "der",
    "plural": "Seen",
    "translation": "lake"
  },
  {
    "id": "meer",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-nature"
    },
    "frequencyRank": 540,
    "source": "frequency-list",
    "word": "Meer",
    "article": "das",
    "plural": "Meere",
    "translation": "sea"
  },
  {
    "id": "luft",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-nature"
    },
    "frequencyRank": 541,
    "source": "frequency-list",
    "word": "Luft",
    "article": "die",
    "translation": "air"
  },
  {
    "id": "feuer",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-nature"
    },
    "frequencyRank": 542,
    "source": "frequency-list",
    "word": "Feuer",
    "article": "das",
    "plural": "Feuer",
    "translation": "fire"
  },
  {
    "id": "hund",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-animal"
    },
    "frequencyRank": 543,
    "source": "frequency-list",
    "word": "Hund",
    "article": "der",
    "plural": "Hunde",
    "translation": "dog"
  },
  {
    "id": "katze",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-animal"
    },
    "frequencyRank": 544,
    "source": "frequency-list",
    "word": "Katze",
    "article": "die",
    "plural": "Katzen",
    "translation": "cat"
  },
  {
    "id": "vogel",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-animal"
    },
    "frequencyRank": 545,
    "source": "frequency-list",
    "word": "Vogel",
    "article": "der",
    "plural": "Vögel",
    "translation": "bird"
  },
  {
    "id": "pferd",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-animal"
    },
    "frequencyRank": 546,
    "source": "frequency-list",
    "word": "Pferd",
    "article": "das",
    "plural": "Pferde",
    "translation": "horse"
  },
  {
    "id": "geld",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-money"
    },
    "frequencyRank": 547,
    "source": "frequency-list",
    "word": "Geld",
    "article": "das",
    "translation": "money"
  },
  {
    "id": "euro",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-money"
    },
    "frequencyRank": 548,
    "source": "frequency-list",
    "word": "Euro",
    "article": "der",
    "plural": "Euro",
    "translation": "euro"
  },
  {
    "id": "preis",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-money"
    },
    "frequencyRank": 549,
    "source": "frequency-list",
    "word": "Preis",
    "article": "der",
    "plural": "Preise",
    "translation": "price"
  },
  {
    "id": "telefon",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 550,
    "source": "frequency-list",
    "word": "Telefon",
    "article": "das",
    "plural": "Telefone",
    "translation": "telephone"
  },
  {
    "id": "nachricht",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 552,
    "source": "frequency-list",
    "word": "Nachricht",
    "article": "die",
    "plural": "Nachrichten",
    "translation": "message"
  },
  {
    "id": "brief",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 553,
    "source": "frequency-list",
    "word": "Brief",
    "article": "der",
    "plural": "Briefe",
    "translation": "letter"
  },
  {
    "id": "e-mail",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 554,
    "source": "frequency-list",
    "word": "E-Mail",
    "article": "die",
    "plural": "E-Mails",
    "translation": "email"
  },
  {
    "id": "sprache",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-communication"
    },
    "frequencyRank": 557,
    "source": "frequency-list",
    "word": "Sprache",
    "article": "die",
    "plural": "Sprachen",
    "translation": "language"
  },
  {
    "id": "idee",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 558,
    "source": "frequency-list",
    "word": "Idee",
    "article": "die",
    "plural": "Ideen",
    "translation": "idea"
  },
  {
    "id": "problem",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 559,
    "source": "frequency-list",
    "word": "Problem",
    "article": "das",
    "plural": "Probleme",
    "translation": "problem"
  },
  {
    "id": "leben-noun",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-quality"
    },
    "frequencyRank": 560,
    "source": "frequency-list",
    "word": "Leben",
    "article": "das",
    "plural": "Leben",
    "translation": "life"
  },
  {
    "id": "welt",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-place"
    },
    "frequencyRank": 561,
    "source": "frequency-list",
    "word": "Welt",
    "article": "die",
    "plural": "Welten",
    "translation": "world"
  },
  {
    "id": "musik",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-object"
    },
    "frequencyRank": 562,
    "source": "frequency-list",
    "word": "Musik",
    "article": "die",
    "translation": "music"
  },
  {
    "id": "foto",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-object"
    },
    "frequencyRank": 563,
    "source": "frequency-list",
    "word": "Foto",
    "article": "das",
    "plural": "Fotos",
    "translation": "photo"
  },
  {
    "id": "farbe",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-color"
    },
    "frequencyRank": 564,
    "source": "frequency-list",
    "word": "Farbe",
    "article": "die",
    "plural": "Farben",
    "translation": "color"
  },
  {
    "id": "licht",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-object"
    },
    "frequencyRank": 565,
    "source": "frequency-list",
    "word": "Licht",
    "article": "das",
    "plural": "Lichter",
    "translation": "light"
  },
  {
    "id": "geschenk",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-object"
    },
    "frequencyRank": 567,
    "source": "frequency-list",
    "word": "Geschenk",
    "article": "das",
    "plural": "Geschenke",
    "translation": "gift"
  },
  {
    "id": "gefuehl",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 568,
    "source": "frequency-list",
    "word": "Gefühl",
    "article": "das",
    "plural": "Gefühle",
    "translation": "feeling"
  },
  {
    "id": "angst",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 569,
    "source": "frequency-list",
    "word": "Angst",
    "article": "die",
    "plural": "Ängste",
    "translation": "fear"
  },
  {
    "id": "liebe",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 570,
    "source": "frequency-list",
    "word": "Liebe",
    "article": "die",
    "translation": "love"
  },
  {
    "id": "glueck",
    "type": "noun",
    "topicIds": [
      "wortschatz-1000"
    ],
    "partOfSpeech": "noun",
    "image": {
      "kind": "icon",
      "icon": "category-emotion"
    },
    "frequencyRank": 571,
    "source": "frequency-list",
    "word": "Glück",
    "article": "das",
    "translation": "luck, happiness"
  }
];
