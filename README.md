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
| Home | `/` | A hero with "continue where you left off" and an at-a-glance panel (frequency-list ring, days active, cards learned), the notebook verbs as a feature banner, then topic tiles in three more sections (your TikTok scripts, grammar & vocabulary, common A1 sentences) with progress bars and "Read passage" / "Speak" shortcuts where they apply. |
| Flashcard session | `/thema/:topicId` | Image-first cards (noun article badge, separable-verb prefix highlighted in the example sentence, DE + EN example, sound button). Verbs, nouns, and the core sentences with a grammar drill also get a multiple-choice drill built from the card just shown; other cards show the card alone. |
| Full passage | `/thema/:topicId/passage` | One of the four TikTok scripts as continuous text, for reading and memorizing the way it's practiced for posting. |
| Speaking practice | `/thema/:topicId/sprechen` | Shows an English prompt; tap the mic, say the German sentence, tap **Done**, and it's checked against the target. |
| Review | `/wiederholen` | Spaced review of cards you've studied — missed ones first — in Flip (self-graded) or Type mode. Home shows "N cards to review today" and the tab carries a count. See [Review](#review). |
| Practice generator | `/generieren` | Random full-sentence practice filtered by level and source, in Flip or Type mode. |
| Word list | `/woerter` | Every word in the app (about 1,100, deduplicated) — search German or English, filter by der/die/das, verbs or other, sort by frequency or A–Z, tap for the example sentence, play the audio. |
| Progress | `/fortschritt` | Quiet stats: progress through the frequency list (ring), days active, cards learned out of the total, notebook pages digitized, a per-topic progress row for every topic, and "Save all audio" for offline use. |

There is deliberately no streak mechanic — the app is meant to be dipped into
casually, not a daily obligation.

### Keyboard shortcuts

| Where | Keys |
|---|---|
| Flashcard session | `←` / `→` previous / next card · `1`–`3` answer the drill · `Enter` try again after a miss |
| Speaking practice | `Space` or `Enter` = Done while listening · `Enter` try again after a miss |
| Review | `Space` or `Enter` reveal · `1` didn't know it · `2` knew it · `N` or `→` next card (Type mode) |
| Practice generator | `Space` or `Enter` reveal (Flip mode) · `Enter` try again after a miss (Type mode) · `N` or `→` next sentence |

Shortcuts are ignored while typing in a field, and the on-screen key hints are
hidden on touch devices.

### Drills

Multiple choice, never typing. Four kinds:

- **conjugation** — fill in the conjugated verb form (regular and stem-changing:
  fangen → fängst/fängt, fahren → fährst/fährt, nehmen → nimmst/nimmt)
- **separable-position** — fill in the separated prefix at the end of the sentence
- **article** — der / die / das
- **word-order** — pick the correctly ordered sentence (verb-second, dative
  after prepositions, `weil` clauses, indirect questions)

A card counts as "learned" after two correct answers.

**Correcting mistakes.** After a wrong answer — in a drill, speaking practice,
or the generator's Type mode — the correction is shown with a **Try again**
button that goes back to the question with the answer hidden (drill options
reshuffled) until it's answered correctly. Only the first attempt counts
toward progress and the review schedule, so fixing a mistake never makes a
card look learned early.

## Content

1,240 cards in 15 topics:

| Group | Topics | Cards |
|---|---|---|
| From your notebook | Separable Verbs | 15 |
| Your TikTok scripts | Mein Tag, Mein Zuhause, Über mich, Mein Leben | 63 vocabulary cards + 12 core sentences |
| Grammar & vocabulary | Nouns & Articles, Everyday & Time, At the Café, Numbers, Top 1000 Words | 50 curated + 1,000 frequency-list words |
| Common A1 sentences | Greetings & Introductions, Time & Daily Life, Asking Questions, Shopping & Ordering, Directions | 100 sentences (20 each) |

1,220 of the 1,240 cards carry a full example sentence, which is the pool the
practice generator draws from (440 at A1, 780 at A2 — see
[Practice generator](#practice-generator)).

## Stack

Vite + React + TypeScript, `react-router-dom` with `HashRouter` (so routing
works on static hosts with no server-side rewrites). No UI library — the design
system is hand-written CSS in `src/index.css`.

## Design

The identity comes from `reference/design-reference.html` — warm parchment,
ink-navy text, sage green as the structural accent, mustard gold as the single
highlight — refined into a fuller system:

- **Tokens** at the top of `index.css`: layered surfaces (`--bg`,
  `--surface`, `--surface-raised`), a three-step ink scale, hairline borders,
  warm-tinted shadows, and a radius scale. Components use only tokens, so a
  theme is just a token swap.
- **Light and dark themes.** A toggle in the header sets `data-theme` on
  `<html>` and saves the choice; the first visit follows the OS setting. A
  small inline script in `index.html` applies it before first paint, so there
  is no flash. Logic lives in `lib/theme.ts`.
- **Type:** Fraunces for German words, headings and reading text (variable
  weight and optical size), IBM Plex Sans for the interface, IBM Plex Mono for
  labels, counters and the generator console.
- **Articles are colour-coded** as a memory aid — *der* ink-blue, *die*
  terracotta, *das* sage — in both themes.
- **Layout:** a sticky frosted header on desktop; on phones the nav moves to a
  bottom tab bar. Topic grids size themselves to their topic count (four
  across, or three-over-two for five) so rows are always full.
- **Motion** is limited to short entrance fades and hover lifts, and switches
  off under `prefers-reduced-motion`.
- **App icon:** `public/favicon.svg` (monogram with a gold dot), plus
  `public/manifest.webmanifest` so the site can be added to a phone's home
  screen.

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
GitHub Pages project page, a Vercel/Netlify root, or straight from disk). It
also generates the offline service worker — which only runs in production
builds, so test offline behaviour with `npm run build && npm run preview`, not
the dev server.

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
    voice.ts               SpeechRecognition sessions (tap Done to finish) + text similarity
    numbers.ts             spells digits out as words ("7:00" → "sieben Uhr") for answer checking
    practice.ts            sentenceOf(), word-level diff, answer checking
    review.ts              what a review asks for each card, round size
    offline.ts             registers the service worker, "Save all audio"
    level.ts               derives an A1/A2 level for a card
    theme.ts               light/dark theme switch
    lastTopic.ts           remembers the last topic for "Continue"
    keys.ts                shared keyboard-shortcut guard
    text.ts                shared helpers (shuffle, audio filename hash, ...)
  components/              Header (+ phone bottom nav), Flashcard, DrillPanel,
                           SentenceFlipCard, TypeCheckCard, SoundButton, ProgressRing,
                           Seg (segmented control), OfflineAudio, Icon (UI icons),
                           SceneIcon (card illustrations)
  pages/                   Home, Session, Passage, SpeakSession, Review, Generator,
                           Words, Progress (all but Home load on first visit)
  service-worker.js        offline support — a template vite.config.ts builds into dist/sw.js
public/audio/              2,276 pre-generated MP3 pronunciation clips (~33 MB)
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
- `frequencyWords.ts` — 1,000 A1/A2 everyday words ranked by frequency, minus
  anything already in the curated topics, each with a hand-written example
  sentence. Stored as one compact row per word
  (`[id, rank, word, article, translation, part of speech, icon, example DE,
  example EN, plural?]`) and expanded into cards at load — as full objects the
  list was almost half the app's download. Ids and ranks must stay stable
  (progress is keyed by id; rank ≤ 250 means A1). The progress screen measures
  against a target of 1000 (`FREQUENCY_LIST_TARGET` in `cards.ts`).
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
- **More words:** append a row to `frequencyWords.ts` with a new unique id and
  the next rank, and check the word against the curated files for duplicates.
  Anything with an example sentence automatically joins the generator's pool
  and the word list.
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
`deutsch-mit-tineiya:progress:v1`). Small extra keys hold the theme choice
(`deutsch-mit-tineiya:theme`), the last topic opened
(`deutsch-mit-tineiya:last-topic`) and the Review mode
(`deutsch-mit-tineiya:review-mode`). It records cards seen, correct answers,
each card's review schedule (below), and the dates the app was opened
(`daysActive`, shown quietly — never as a streak). Nothing leaves the device.

## Review

`/wiederholen` (`pages/Review.tsx`, schedule in `lib/progress.tsx`). A light
Leitner system — no streaks, no daily quota:

- Seeing a card for the first time schedules its first review for **tomorrow**.
- A first-try correct answer anywhere (drill, speaking, generator, review)
  moves it up a box: next review in 1, 3, 7, 14, 30, then 60 days.
- A miss sends it back to box 0, **due again today**.
- The queue puts missed cards first, then the longest overdue. A round is up to
  20 cards; a card missed in the round comes back once more at the end of it,
  and getting it right then schedules it for tomorrow.
- **Flip** mode: English cue → recall → reveal → "Didn't know it" / "Knew it".
  **Type** mode: type or speak the German, with the same checking and Try again
  loop as the generator. Words are asked as words (nouns with their article —
  "der Tisch", not "Tisch"); sentences as sentences.
- The schedule fields on each card record are optional, so progress saved
  before Review existed still loads.

## Offline

`src/service-worker.js`, built into `dist/sw.js` by a small plugin in
`vite.config.ts` that bakes in this build's file list and a version hash.
Registered from `lib/offline.ts`, production builds only.

- Once visited, every screen opens with no connection. Pages are fetched
  network-first (a new deploy shows up immediately); code and styles are served
  from the cache (their filenames change whenever their contents do); Google
  Fonts are cached too.
- Audio clips are saved the first time they play. **Progress → Save all audio**
  downloads all of them (~33 MB) in one go, e.g. before a train ride. Clips
  live in their own cache that survives app updates (their names are content
  hashes, so they never go stale). Range requests are answered from the cache,
  which Safari needs for audio.
- Cache lookups ignore `Vary` — the preview server sends `Vary: Origin`, and
  without that the browser's module requests never matched the saved copies.

## Pronunciation

Every sound button plays a **pre-generated MP3** from `public/audio/`, made
once with a neural German voice (Microsoft's free "Read aloud" engine via
`npm run generate-audio` — no API key, no account). That's what keeps
pronunciation identical for every visitor: it doesn't depend on which voices
happen to be installed on their device.

- **What's covered:** every card's headword/infinitive/sentence *and* its full
  example sentence (the generator plays those) — 2,276 clips, about 33 MB.
  They can all be saved for offline use (see [Offline](#offline)).
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
- **Tap Done to finish.** The mic stays open (continuous recognition) until the
  learner taps Done — or Cancel, skips, leaves the page, or 30 seconds pass —
  and is released straight away, so it isn't picking up the room in between.
  Words appear live while speaking. Android's recognizer sometimes repeats
  earlier chunks cumulatively; those are merged into one transcript.
- **Numbers.** Recognizers write "sieben Uhr" as "7:00" and "dreiundzwanzig" as
  "23". `lib/numbers.ts` spells digits and clock times out as words (German or
  English) on both sides before comparing, and in the transcript shown.
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
  Bare words never appear. That's 1,220 cards today.
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

- Level tagging is a heuristic; there is no B1+ content (the `CefrLevel` type
  allows it).
- Number checking doesn't cover dates written as ordinals ("3. Mai"), decimal
  prices ("3,50") or years said the old way ("neunzehnhundertneunzig").
- Bulk vocabulary shares category icons (star, clock, house, …) rather than
  having a picture per word.
- No pronunciation scoring, and speech recognition is Chrome/Edge only.

## Reference

`reference/` archives the original build brief and the design reference HTML.
The brief there predates the Tineiya-specific TikTok and A1-sentence sections;
this README describes the app as it currently stands.
