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
| Home | `/` | **Today's pick** — one recommended thing to do, chosen from your learning patterns, different each visit (see [Today's pick](#todays-pick)) — with "Where you left off" (due reviews, the topic in progress) beside it, the at-a-glance panel, "Up next" topics, the notebook banner, then every topic grouped (compact rows on phones). |
| Flashcard session | `/thema/:topicId` | Image-first cards (noun article badge, separable-verb prefix highlighted in the example sentence, DE + EN example, sound button). Verbs, nouns, and the core sentences with a grammar drill also get a multiple-choice drill built from the card just shown; other cards show the card alone. |
| Full passage | `/thema/:topicId/passage` | One of the four TikTok scripts as continuous text, for reading and memorizing the way it's practiced for posting. |
| Speaking practice | `/thema/:topicId/sprechen` | Shows an English prompt; tap the mic, say the German sentence, tap **Done**, and it's checked against the target. |
| Review | `/wiederholen` | Spaced review of cards you've studied — missed ones first — in Flip (self-graded) or Type mode. Home shows "N cards to review today" and the tab carries a count. See [Review](#review). |
| Practice generator | `/generieren` | Random full-sentence practice filtered by level and source, in Flip, Type or Listen (dictation) mode. `#/generieren?mode=listen` opens straight into listening — Home links to it as "Listening practice". |
| Script editor | `/skript/neu`, `/skript/:topicId` | Add a new TikTok script in the app — paste the German, type the English for each sentence, optionally list words to learn — and it becomes a topic with cards, drills, the passage, speaking and listening practice. Opened from the **Add a script** tile under Your TikTok scripts; every TikTok script's topic page — the four built-in ones included — has an **Edit script** button. See [Your own scripts](#your-own-scripts). |
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
| Practice generator | `Space` or `Enter` reveal (Flip mode) · `Enter` try again after a miss (Type and Listen modes) · `N` or `→` next sentence |

Shortcuts are ignored while typing in a field, and the on-screen key hints are
hidden on touch devices.

### Drills

Multiple choice, never typing. Eight kinds:

- **conjugation** — fill in the conjugated verb form (regular and stem-changing:
  fangen → fängst/fängt, fahren → fährst/fährt, nehmen → nimmst/nimmt)
- **separable-position** — fill in the separated prefix at the end of the sentence
- **article** — der / die / das
- **word-order** — pick the correctly ordered sentence (verb-second, dative
  after prepositions, `weil` clauses, indirect questions)
- **meaning** — "What does „schon“ mean?" for words with no grammar to drill
  (adverbs, adjectives, pronouns…), with wrong options drawn from words of the
  same kind — so the Top 1000 list can be learned in a session
- **auxiliary** — Perfekt: "Ich ___ nach Berlin gefahren." haben or sein?
- **participle** — Perfekt: "Ich habe Wasser ___." with a hand-picked trap form
  (getrunken / getrinkt / trinken)
- **missing-word** — "Fill the gap": a sentence with its longest word blanked,
  the wrong options taken from other sentences in the same topic. Used for any
  sentence card that has no other drill — the A1 sentences and every sentence
  of a script added in the app

While a drill asks about something the card shows — the English meaning, or
the article (and its example sentence) — the card hides it until you answer.

A card counts as "learned" after two correct answers. The "At a glance" ring
shows most-common words learned in gold, with words practised so far as a
lighter band, so it moves from the first practice.

**Correcting mistakes.** After a wrong answer — in a drill, speaking practice,
or the generator's Type mode — the correction is shown with a **Try again**
button that goes back to the question with the answer hidden (drill options
reshuffled) until it's answered correctly. Only the first attempt counts
toward progress and the review schedule, so fixing a mistake never makes a
card look learned early.

## Content

1,280 cards in 16 topics:

| Group | Topics | Cards |
|---|---|---|
| From your notebook | Separable Verbs | 15 |
| Your TikTok scripts | Mein Tag, Mein Zuhause, Über mich, Mein Leben | 63 vocabulary cards + 20 sentences (5 per script) |
| Grammar & vocabulary | Nouns & Articles, Everyday & Time, At the Café, Numbers, Past Tense (Perfekt), Top 1000 Words | 50 curated + 32 Perfekt sentences + 1,000 frequency-list words |
| Common A1 sentences | Greetings & Introductions, Time & Daily Life, Asking Questions, Shopping & Ordering, Directions | 100 sentences (20 each) |

1,260 of the 1,280 cards carry a full sentence, which is the pool the
practice generator draws from (448 at A1, 812 at A2 — see
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
- **Tab backdrop:** brand-coloured waves behind the top of every tab — Home's hero, and a band behind the header on Review, Generate, Words and Progress (topic, speaking and passage pages stay plain) — (`components/HeroBackdrop.tsx`,
  adapted from React Bits' GradientWaves — WebGL2 via `ogl`, MIT + Commons Clause). Sage and gold
  per theme, switching live with the theme toggle. Readability is guaranteed, not eyeballed: the
  waves' strength is capped (60%) and any text on the waves sits on a soft 60% page-colour wash (`.on-waves`, which also deepens the lightest grey and, in light mode, the red), so every text
  colour there clears WCAG AA even over the darkest wave colour (worked out per theme). Lower detail
  and pixel ratio on phones; pauses off-screen and in hidden tabs; a still frame with reduced
  motion; a static gradient where WebGL2 isn't available. The shader loads as its own chunk after
  Home renders.
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
| `npm run generate-icons` | Rebuild the app icons in `public/icons/` from `public/favicon.svg` (see [Installing the app](#installing-the-app-pwa)) |

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
    speaking.ts            which sentences each topic's speaking practice uses
    review.ts              what a review asks for each card, round size
    offline.ts             registers the service worker, "Save all audio", update prompt
    install.ts             install-the-app prompt (PWA) and iOS detection
    level.ts               derives an A1/A2 level for a card
    theme.ts               light/dark theme switch
    lastTopic.ts           remembers the last topic for "Continue"
    keys.ts                shared keyboard-shortcut guard
    text.ts                shared helpers (shuffle, audio filename hash, ...)
  components/              Header (+ phone bottom nav), Flashcard, DrillPanel,
                           SentenceFlipCard, TypeCheckCard, SoundButton, ProgressRing,
                           Seg (segmented control), OfflineAudio, InstallApp,
                           UpdatePrompt, Icon (UI icons),
                           SceneIcon (card illustrations)
  pages/                   Home, Session, Passage, SpeakSession, Review, Generator,
                           Words, Progress, ScriptEditor (all but Home load on first visit)
  service-worker.js        offline support — a template vite.config.ts builds into dist/sw.js
public/audio/              2,276 pre-generated MP3 pronunciation clips (~33 MB)
scripts/generate-audio.mjs builds those clips
scripts/generate-icons.mjs builds the app icons in public/icons/
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
- `passageSentences.ts` — two more lines per script, chosen for grammar and
  everyday phrasing worth saying aloud, so each script has five sentences
  (with its three core sentences) for the session and speaking practice. The
  German is word-for-word from `passages.ts`; ids carry the line's position.
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
- **New TikTok script:** the quickest way is in the app (Home → Add a script —
  see [Your own scripts](#your-own-scripts)). To build one in permanently, with
  pictures and studio audio: add the text to `passages.ts`, extracted cards to
  `tiktokVocab.ts`, 2–3 `SentenceCard`s to `coreSentences.ts`, and its topic id
  to `TRACKED_TOPIC_ORDER` in `lib/repeats.ts` (in posting order).
- **After adding any cards:** run `npm run generate-audio` so their
  pronunciation is pre-generated.
- **Real photos instead of icons:** `CardImage` already has a
  `{ kind: 'photo', src, alt }` variant — swap a card's `image`, no schema
  change.
- **Speaking practice for a new topic:** add `SentenceCard`s to it; the
  "Practice speaking →" link appears automatically.

## Your own scripts

New TikTok scripts can be added without touching the code: **Home → Your
TikTok scripts → Add a script** (`/skript/neu`).

- **What you enter:** a title, a picture, the German script (blank line between
  paragraphs; sentences split after . ! ?), the English for each sentence, and
  optionally words to learn (with der/die/das for nouns).
- **What it becomes:** a topic in Your TikTok scripts with a sentence card for
  every sentence that has English (each with a "Fill the gap" drill), a card for
  each listed word (nouns get der/die/das, other words "What does it mean?"),
  the full passage, speaking practice (the first five sentences), and entries in
  the practice generator and word list. It also joins the "you've seen this
  before" tracking across TikTok topics.
- **Editing:** the topic page has **Edit script**. Sentences you didn't change
  keep their progress — card ids come from a hash of the sentence text — so
  only an edited sentence starts fresh. Delete asks to confirm first.
- **The four built-in scripts** can be edited the same way. The edit is saved
  under the script's own topic id and applied on top of the original: its word
  cards, pictures, studio audio and grammar drills stay; the title, picture and
  passage change; a sentence taken out of the script loses its card, and a new
  or reworded sentence with English gets one. Instead of Delete there's
  **Restore original**, which drops the edit.
- **Where it's stored:** `localStorage` (`deutsch-mit-tineiya:my-scripts`), on
  this device only, and included in the progress backup — the backup is how it
  moves to another phone. A new script's unsaved draft is kept too, so leaving
  the page halfway doesn't lose it.
- **Pronunciation:** there are no pre-generated clips for these, so sound
  buttons use the device's own German voice (`speechSynthesis`). To get the
  studio voice, build the script in permanently (see [Extending it](#extending-it)).
- **How it works:** `data/userScripts.ts` turns each saved script into a topic,
  a passage and cards (or, for a built-in script, applies the edit to it);
  `data/installUserScripts.ts` adds them to the content
  lists before anything else loads (it's the first import in `main.tsx`).
  Saving reloads the app so every screen picks the change up.

## Progress tracking

`lib/progress.tsx` is a small React context over `localStorage` (key
`deutsch-mit-tineiya:progress:v1`). Small extra keys hold the theme choice
(`deutsch-mit-tineiya:theme`), the last topic opened
(`deutsch-mit-tineiya:last-topic`) and the Review mode
(`deutsch-mit-tineiya:review-mode`). It records cards seen, correct answers,
each card's review schedule (below), and the dates the app was opened
(`daysActive`, shown quietly — never as a streak). Nothing leaves the device.

**Backup** (`lib/backup.ts`, Progress page): because everything lives in this
browser, the Progress page can **download** a JSON backup or **copy a code**
(gzip + base64, prefixed `DMT1:` — a few KB, easy to paste into a note), and
**restore** from either on any device. A backup holds the progress plus the
small preferences (theme, last topic, review mode, Today's-pick history).
Restoring shows what's in the backup, asks before replacing this device's
progress, then reloads.

**Small helpers on the Progress page:** "cards practised this week"; a "How
this app works" explainer (the same one Home shows once to a first-time
visitor until "Got it", `deutsch-mit-tineiya:welcome-done`). In Review's Flip
mode the last grade can be taken back (**Undo** or `U`): the card's record and
the round go back exactly as they were.

**Topic progress** (`topicProgress()`): for each topic, how many cards have
been worked through (looked at in a session, answered, or spoken), how many are
learned, and whether it's **finished** (every card worked through). Home tiles,
the notebook banner, the topic page header and the Progress rows all read it,
so they update as you go. Reopening a topic deals the cards you haven't done
yet first, so you carry on where you stopped.

## Today's pick

Home's main card (`lib/recommend.ts`, `components/TodaysPick.tsx`) recommends one
thing to do, so opening the app isn't always "continue where you left off" —
that stays one tap away beside it. Every candidate is scored from the
learner's own data, and each carries a "why" in plain words:

| Candidate | When | Score |
|---|---|---|
| Fix a weak spot | a topic with 2+ cards answered wrong last time (most first) | 75 + 4 per miss |
| Finish a topic | at least half done, not finished | 60–85 by how close |
| A skill left untouched | speaking, listening, writing or reading never tried (64), or not for 3+ days (50 + 2/day) | 50–78 |
| Something new | the next three topics never opened, in course order | 58 / 54 / 50 (70… for a brand-new learner) |
| Lock in a topic | finished, but under 60% learned | 52 |
| Learn new words | Top 1000 list not complete | 46 |

The topic in "Where you left off" is never picked, and each topic appears once
(its best suggestion). **Something new each visit:** suggestions shown in the
last day drop 35 points (15 within three days), and a small per-day nudge breaks
ties, so a new visit (a new browser session) brings a different pick. Within a
visit it stays put; **Something else** steps through the rest of the ranking.
History lives in `deutsch-mit-tineiya:pick-history` (localStorage) and the
visit's pick in sessionStorage.

To know which skills were used when, the progress store now records practice
by kind (`activity` — flashcards, speaking, listening, writing, reading,
review) with a count and the last date: the topic page logs flashcards,
speaking practice logs speaking, the generator logs writing (Type) or
listening (Listen), opening a passage logs reading, and Review logs review.

## Past tense (Perfekt)

`data/perfekt.ts` — 32 A2 sentences: the common haben verbs, the sein verbs of
movement and change (gehen, fahren, fliegen, bleiben, aufstehen, umziehen…),
and Tineiya's "Mein Tag" script retold as yesterday ("Gestern bin ich um
sieben Uhr aufgestanden…"). They're `SentenceCard`s with a `perfekt` field
(the helper verb as used, the other helper in the same person, the
participle, a tempting wrong participle, the infinitive), which drives two
drills — haben or sein? and which participle? — alternating per card. The
card hides the German until answered; the topic page explains the rule; the
cards also feed speaking practice, the generator and Review. Cards can now
carry an explicit `level` (these are A2).

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
- **Updates:** a new deploy installs a new worker, which waits. If the app is
  open when it arrives (an installed app checks each time it's brought back to
  the front), a "new version is ready — Reload" prompt appears; Reload hands
  over to the new worker and reloads. If the waiting worker is found as the app
  opens, the page is already the new version (pages are network-first), so it
  takes over quietly.

## Installing the app (PWA)

The site installs as an app — its own home-screen icon, full screen, offline.

- **Manifest** (`public/manifest.webmanifest`): standalone display, the brand
  colours, PNG icons (192, 512, and a maskable 512 so Android can crop it to
  its own shape), and shortcuts — long-press the icon for Review, Listening
  practice or Add a TikTok script.
- **Icons** (`public/icons/`): rendered from `favicon.svg` by
  `npm run generate-icons` (`scripts/generate-icons.mjs`, using resvg). The
  full-bleed versions — maskable and the 180px `apple-touch-icon.png` — keep
  the mark inside the safe zone. They're precached with the rest of the app.
- **Install button** (`components/InstallApp.tsx`, `lib/install.ts`): Chrome,
  Edge and Android fire `beforeinstallprompt`; the app keeps it and offers an
  **Install** button. iPhone/iPad can only install from Safari's Share → Add to
  Home Screen, and Safari on a Mac from File → Add to Dock, so those get the
  steps instead. It's a card on the Progress page, and a hint on Home (not on
  the very first visit) that can be dismissed for good. Both disappear once
  the app is running installed.

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

A "say this in German" mode on every topic that has sentences
(`lib/speaking.ts`):

- **Sentence topics** use their sentences — a TikTok script's five key
  sentences in script order; an A1 topic's 20, shuffled.
- **Word topics** (Separable Verbs, Nouns & Articles, Everyday & Time, At the
  Café, Top 1000 Words) use the cards' example sentences, words not learned yet
  first, in rounds of 20 ("Next round" deals another). A right answer counts
  for the word the sentence belongs to.
- Numbers has no speaking — its cards are bare number words.

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
  Bare words never appear. That's 1,260 cards today.
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
  - *Listen* is dictation: the German sentence plays (it isn't shown) and you
    type or say what you heard, checked against the German the same way as
    Type, with the English meaning shown afterwards. **Play again** and
    **Slower** (70% speed, same pitch) replay it; Try again replays it too.
    Direction doesn't apply.
- **Generate** picks the next random card; changing level or source also draws
  a fresh one. Changing direction or mode re-presents the current card.
- Flip records a card as seen; Type and Listen record correct answers toward
  "learned".
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
