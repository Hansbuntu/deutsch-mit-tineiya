# Deutsch mit Milan

A personal German flashcard and drill app — image-led vocabulary cards, pattern
drills for conjugation/separable verbs/articles, and a quiet progress view.
Static frontend, no backend: all progress is stored in the browser's
`localStorage`.

## Stack

Vite + React + TypeScript, `react-router-dom` (`HashRouter`, so routing works
on static hosts with no server-side rewrites). No database, no API — content
lives in `src/data/*.ts` and progress lives in `localStorage`.

## Running locally

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
```

Outputs static files to `dist/`. `vite.config.ts` sets `base: './'` so the
build works when served from any subpath (a GitHub Pages project page, a
Vercel/Netlify root, or opened straight from disk).

## Deploying

Any static host works — pick whichever is easiest:

- **GitHub Pages**: push this repo to GitHub, enable Pages → "GitHub
  Actions" as the source (Settings → Pages). The included workflow at
  `.github/workflows/deploy-pages.yml` builds and deploys on every push to
  `main`.
- **Vercel / Netlify**: import the repo, framework preset "Vite", build
  command `npm run build`, output directory `dist`. No environment
  variables needed.

## Data model (`src/data/`)

- `types.ts` — the card/topic/drill shapes. `Card` is a discriminated union
  (`NounCard | VerbCard | VocabCard`) so new card types can be added without
  touching existing ones.
- `verbs.ts` — the 15 separable verbs digitized from Milan's notebook, each
  with a full present-tense conjugation (used by the conjugation and
  separable-position drills).
- `nouns.ts` — curated cards for the Nomen & Artikel / Alltag & Zeit / im
  Café / Zahlen topics.
- `frequencyWords.ts` — a curated ~500-word A1/A2 frequency-ranked pool
  (bulk everyday vocabulary), excluding anything already covered by the
  curated topics above. The progress screen displays this against a fixed
  target of 1000 (`FREQUENCY_LIST_TARGET` in `cards.ts`) — the list is meant
  to keep growing toward that; see below.
- `topics.ts` — the topic list shown on the home screen.

### Extending it

- **New topic**: add an entry to `topics.ts`, then add cards with that
  `topicId` anywhere in `data/`.
- **New card type**: add a variant to the `Card` union in `types.ts`, teach
  `Flashcard.tsx` how to render it, and (optionally) `drills.ts` how to quiz
  it.
- **New drill kind**: add to `DrillKind` in `types.ts` and add a generator
  function in `lib/drills.ts`.
- **Grow the 1000-word list**: append more `NounCard | VocabCard` entries to
  `frequencyWords.ts` (same shape as the existing ones). Check new words
  against the curated topic files first to avoid duplicates.
- **Real photos instead of icons**: `CardImage` already supports a `photo`
  variant (`{ kind: 'photo', src, alt }`) alongside `icon` — swap a card's
  `image` field, no schema change needed.
- **Voice input (phase 2)**: not built yet. The data model doesn't assume
  multiple-choice-only, so a new `DrillKind` (e.g. `'speak'`) with a
  `SpeechRecognition`-backed screen can be added later without reshaping
  existing cards.

## Progress tracking

`src/lib/progress.tsx` is a small React context backed by `localStorage`
(`deutsch-mit-milan:progress:v1`). A card counts as "learned" after two
correct drill answers. There's no streak mechanic by design — `daysActive`
is tracked quietly for the progress screen only.

## Pronunciation

The sound button uses the browser's built-in `speechSynthesis` (German
voice, `de-DE`) — no audio files, no backend. It's a no-op on browsers
without speech synthesis support.
