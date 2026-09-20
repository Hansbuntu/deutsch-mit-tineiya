# Deutsch mit Tineiya

A personal German-learning web app for Tineiya (A1, working toward A2). It is
not a Duolingo replacement — it covers what Duolingo doesn't: sentence
structure, conjugation patterns, and content built from her own study
material (a handwritten notebook of separable verbs and the four German
scripts she has posted on TikTok).

- **Live:** https://hansbuntu.github.io/deutsch-mit-tineiya/
- **Repo:** https://github.com/Hansbuntu/deutsch-mit-tineiya

It is a static site — no backend, no database, no API keys. Progress lives in
the browser's `localStorage`; content lives in `src/data/*.ts`; pronunciation
audio is pre-generated MP3 files served alongside the app. It is free to host
and deploys to GitHub Pages on every push to `main`.

## What's in it

| Screen | Route | What it does |
|---|---|---|
| Home | `/` | Topic tiles in four sections (your notebook, your TikTok scripts, grammar & vocabulary, common A1 sentences) with card counts and progress. Tiles link out to "Read full passage →" and "Practice speaking →" where they apply. |
| Flashcard session | `/thema/:topicId` | Image-first cards (noun article badge, separable-verb prefix highlighted in the example sentence, DE + EN example, sound button). Verbs, nouns, and the core sentences with a grammar drill also get a multiple-choice drill built from the card just shown; other cards show the card alone. |
| Full passage | `/thema/:topicId/passage` | One of the four TikTok scripts as continuous text, for reading and memorizing the way it's practiced for posting. |
| Speaking practice | `/thema/:topicId/sprechen` | Shows an English prompt, you say the German sentence, and it's checked against the target. |
| Practice generator | `/generieren` | Random full-sentence practice filtered by level and source, in Flip or Type mode. |
| Progress | `/fortschritt` | Quiet stats: days active, cards total, notebook pages digitized, progress through the frequency list, and per-topic learned counts. |

There is deliberately no streak mechanic — the app is meant to be dipped into
casually, not a daily obligation.

### Drills

Multiple choice, never typing. Four kinds:

- **conjugation** — fill in the conjugated verb form (regular and stem-changing:
  fangen → fängst/fängt, fahren → fährst/fährt, nehmen → nimmst/nimmt)
- **separable-position** — fill in the separated prefix at the end of the sentence
- **article** — der / die / das
- **word-order** — pick the correctly ordered sentence (verb-second, dative
  after prepositions, `weil` clauses, indirect questions)

A card counts as "learned" after two correct answers.

## Content

767 cards in 15 topics:

| Group | Topics | Cards |
|---|---|---|
| From your notebook | Separable Verbs | 15 |
| Your TikTok scripts | Mein Tag, Mein Zuhause, Über mich, Mein Leben | 63 vocabulary cards + 12 core sentences |
| Grammar & vocabulary | Nouns & Articles, Everyday & Time, At the Café, Numbers, Top 1000 Words | 50 curated + 527 frequency-list words |
| Common A1 sentences | Greetings & Introductions, Time & Daily Life, Asking Questions, Shopping & Ordering, Directions | 100 sentences (20 each) |

527 of the 767 cards carry a full example sentence, which is the pool the
practice generator draws from (220 at A1, 307 at A2 — see
[Practice generator](#practice-generator)).

## Stack

Vite + React + TypeScript, `react-router-dom` with `HashRouter` (so routing
works on static hosts with no server-side rewrites). Fonts: Fraunces (German
words and headings), IBM Plex Sans (everything else), IBM Plex Mono (generator
controls). Design follows `reference/design-reference.html`: warm parchment
background, ink-navy text, sage green as the structural accent, mustard gold
as the single highlight.

## Running locally

```bash
npm install
npm run dev
```

| Script | Does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check (`tsc -b`) then build static files to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | oxlint |
| `npm run generate-audio` | Generate any missing pronunciation clips (needs internet; see [Pronunciation](#pronunciation)) |

`vite.config.ts` sets `base: './'` so the build works from any subpath (a
GitHub Pages project page, a Vercel/Netlify root, or straight from disk).

## Deploying

Live on GitHub Pages. `.github/workflows/deploy-pages.yml` builds and deploys
on every push to `main` (Pages source is set to "GitHub Actions"). Any static
host also works: import the repo, framework preset "Vite", build command
`npm run build`, output directory `dist`, no environment variables.

## Project structure

```
src/
  App.tsx, main.tsx        routes + providers
  index.css                the whole design system (one global stylesheet)
  data/                    all content and the data model (see below)
  lib/
    progress.tsx           localStorage-backed progress context
    drills.ts              builds multiple-choice drills from cards
    repeats.ts             "you've seen this before" across TikTok topics
    speech.ts              plays pre-generated audio, falls back to speechSynthesis
    voice.ts               SpeechRecognition wrapper + text similarity
    practice.ts            sentenceOf(), word-level diff, answer checking
    level.ts               derives an A1/A2 level for a card
    text.ts                shared helpers (shuffle, audio filename hash, ...)
  components/              Flashcard, DrillPanel, SentenceFlipCard, TypeCheckCard,
                           SoundButton, SceneIcon (hand-drawn SVG icons), Masthead
  pages/                   Home, Session, Passage, SpeakSession, Generator, Progress
public/audio/              1,130 pre-generated MP3 pronunciation clips (~16 MB)
scripts/generate-audio.mjs builds those clips
reference/                 original build brief + design reference (archived)
.github/workflows/         GitHub Pages deploy
```

## Data model (`src/data/`)

- `types.ts` — the shapes. `Card` is a discriminated union
  (`NounCard | VerbCard | VocabCard | SentenceCard`) so new card types can be
  added without touching existing ones. `Drill`, `Topic`, `Passage`, and the
  `CefrLevel` type live here too.
- `verbs.ts` — the 15 separable verbs from Tineiya's notebook, each with a full
  present-tense conjugation (feeds the conjugation and separable-position
  drills).
- `nouns.ts` — curated cards for Nouns & Articles, Everyday & Time, At the Café,
  and Numbers.
- `frequencyWords.ts` — 527 A1/A2 everyday words ranked by frequency, minus
  anything already in the curated topics. Words ranked 251+ (the A2 tier)
  each carry a hand-written example sentence; the top 250 are bare words. The
  progress screen measures this against a fixed target of 1000
  (`FREQUENCY_LIST_TARGET` in `cards.ts`).
- `passages.ts` — the four TikTok scripts, verbatim, for the passage view.
- `tiktokVocab.ts` — vocabulary extracted from those scripts, one topic per
  script, plus two extra separable verbs (`nachdenken`, `rausgehen`). Words that
  recur across scripts (malen, Musik hören, Ideen, Zimmer, Kunst, Deutsch
  lernen, Freizeit, YouTube-Videos schauen, …) are deliberately kept as their
  own card in each topic; `lib/repeats.ts` flags the later ones as "you've seen
  this before" rather than deduplicating them.
- `coreSentences.ts` — 2–3 whole sentences per script worth memorizing,
  mixed into that topic's session.
- `grammarDrills.ts` — hand-authored `word-order` drills for the grammar each
  script demonstrates, keyed by the core-sentence card they attach to and
  looked up before the generic drill logic in `lib/drills.ts`.
- `a1Sentences.ts` — 100 generic A1 sentences in five categories, independent
  of the personal TikTok content.
- `topics.ts` — the topic list, grouped into the four home-screen sections.
- `cards.ts` — assembles everything into `allCards` and exposes lookups.

### Extending it

- **New topic:** add it to `topics.ts` (with a `group`), then add cards that
  reference its id anywhere in `data/`.
- **New card type:** add a variant to the `Card` union, teach `Flashcard.tsx` to
  render it, and optionally `drills.ts` to quiz it.
- **New drill kind:** add to `DrillKind`, then either write a generator in
  `lib/drills.ts` (mechanical, derived from card data) or hand-author entries
  in `grammarDrills.ts` (bespoke, keyed by card id).
- **More words:** append `NounCard | VocabCard` entries to `frequencyWords.ts`
  and check them against the curated files for duplicates. Give a card an
  `example` and it automatically joins the generator's pool.
- **New TikTok script:** add the text to `passages.ts`, extracted cards to
  `tiktokVocab.ts`, 2–3 `SentenceCard`s to `coreSentences.ts`, and its topic id
  to `TRACKED_TOPIC_ORDER` in `lib/repeats.ts` (in posting order).
- **After adding any cards:** run `npm run generate-audio` so their
  pronunciation is pre-generated.
- **Real photos instead of icons:** `CardImage` already has a
  `{ kind: 'photo', src, alt }` variant — swap a card's `image`, no schema
  change.
- **Speaking practice for a new topic:** add `SentenceCard`s to it; the
  "Practice speaking →" link appears automatically.

## Progress tracking

`lib/progress.tsx` is a small React context over `localStorage` (key
`deutsch-mit-tineiya:progress:v1`). It records cards seen, correct drill
answers, and the dates the app was opened (`daysActive`, shown quietly — never
as a streak). Nothing leaves the device.

## Pronunciation

Every sound button plays a **pre-generated MP3** from `public/audio/`, made
once with a neural German voice (Microsoft's free "Read aloud" engine via
`npm run generate-audio` — no API key, no account). That's what keeps
pronunciation identical for every visitor: it doesn't depend on which voices
happen to be installed on their device.

- **What's covered:** every card's headword/infinitive/sentence *and* its full
  example sentence (the generator plays those) — 1,130 clips, about 16 MB.
- **Lookup:** `audioKeyForText()` in `lib/text.ts` hashes the spoken text
  (FNV-1a, pure JS) to a filename, `public/audio/<hash>.mp3`. The same function
  runs in the generation script and in the app, so there's no manifest to keep
  in sync.
- **Regenerating:** the script skips clips that already exist and only fetches
  what's missing, so re-running after adding cards is quick.
- **Fallback:** if a clip is missing, the sound button falls back to the
  browser's built-in `speechSynthesis` — lower quality and dependent on the
  visitor's own German voice, but never silent.
- **Changing the voice:** edit `VOICE` in `scripts/generate-audio.mjs` (any
  `de-DE-*Neural` voice), delete `public/audio/`, and re-run.

## Speaking practice (`SpeakSession.tsx`, `lib/voice.ts`)

A "say this in German" mode for `SentenceCard`s (the TikTok core sentences and
the A1 sentence bank).

- The browser's built-in `SpeechRecognition` transcribes what's said (free, no
  backend), and the transcript is compared to the target with a normalized
  Levenshtein similarity (`SPOKEN_MATCH_THRESHOLD` = 0.82). This checks the
  words and grammar, not pronunciation quality — though a mis-heard word in the
  transcript is a useful hint that something wasn't said clearly.
- **Support:** solid in Chrome and Edge, missing in Firefox, patchy in Safari.
  Unsupported browsers get a "reveal the sentence" self-check instead of a dead
  end. Needs HTTPS or localhost (GitHub Pages and `npm run dev` both qualify).
- Real pronunciation *scoring* would need a paid API (e.g. Azure Pronunciation
  Assessment) — out of scope for a free static site.

## Practice generator

`/generieren`, inspired by terminal-lingo.com. It shows **one full sentence at
a time**, text only (no image), drawn from the same card pool as everything
else — no separate dataset.

- **Pool:** only cards that have a real sentence — a `SentenceCard`, or any
  card with a hand-written `example` (`sentenceOf()` in `lib/practice.ts`).
  Bare words never appear. That's 527 cards today.
- **Level (All / A1 / A2):** derived, not stored — `cardLevel()` in
  `lib/level.ts` uses `frequencyRank` for the frequency list (rank ≤250 → A1,
  otherwise A2) and treats all other content as A1. This is an approximation,
  not a formal CEFR audit.
- **Source:** All, or one of the four topic groups. "Your TikTok scripts"
  generates sentences from Tineiya's own texts.
- **Direction:** EN → DE or DE → EN.
- **Mode:**
  - *Flip* shows only the prompt; "▶ Reveal translation" shows the answer so
    you can check yourself. The sound button only appears once the German text
    is on screen, so audio can't give away an unrevealed answer.
  - *Type* takes a typed or spoken answer (same mic as speaking practice) and
    grades it two ways: a lenient overall verdict (`isCloseEnough`, similarity
    ≥ 0.9) plus an exact word-by-word diff (`wordDiff`, longest common
    subsequence) showing which words matched, which were missed, and what was
    written instead.
- **Generate** picks the next random card; changing level or source also draws
  a fresh one. Changing direction or mode re-presents the current card.
- Flip records a card as seen; Type records correct answers toward "learned".
- Styling is intentionally a little different from the rest of the app (dark
  terminal-style control bar, monospace type, `// LABEL` tags) but stays inside
  the ink/sage/gold palette.

## Known gaps

- The frequency list is 527 words, not the 1,000 the progress screen counts
  against.
- Level tagging is a heuristic; there is no B1+ content (the `CefrLevel` type
  allows it).
- The 220 top-ranked frequency words have no example sentences, so they aren't
  in the generator's pool.
- Bulk vocabulary shares category icons (star, clock, house, …) rather than
  having a picture per word.
- No pronunciation scoring, and speech recognition is Chrome/Edge only.

## Reference

`reference/` archives the original build brief and the design reference HTML.
The brief there predates the Tineiya-specific TikTok and A1-sentence sections;
this README describes the app as it currently stands.
