# Deutsch mit Tineiya

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
  (`NounCard | VerbCard | VocabCard | SentenceCard`) so new card types can be
  added without touching existing ones.
- `verbs.ts` — the 15 separable verbs digitized from Tineiya's notebook, each
  with a full present-tense conjugation (used by the conjugation and
  separable-position drills).
- `nouns.ts` — curated cards for the Nomen & Artikel / Alltag & Zeit / im
  Café / Zahlen topics.
- `frequencyWords.ts` — a curated ~500-word A1/A2 frequency-ranked pool
  (bulk everyday vocabulary), excluding anything already covered by the
  curated topics above. The progress screen displays this against a fixed
  target of 1000 (`FREQUENCY_LIST_TARGET` in `cards.ts`) — the list is meant
  to keep growing toward that; see below.
- `passages.ts` — the full text of Tineiya's four TikTok scripts (Mein Tag,
  Mein Zuhause, Über mich, Mein Leben), kept verbatim for the "read full
  passage" view — separate from the flashcards pulled from them.
- `tiktokVocab.ts` — vocabulary and two extra separable verbs
  (`nachdenken`, `rausgehen`) extracted from those four scripts, one topic
  per script. Words that recur across scripts (malen, Musik hören, Ideen,
  Zimmer, Kunst, Deutsch lernen, Freizeit, YouTube-Videos schauen, …) are
  deliberately re-added as their own card per topic — `lib/repeats.ts`
  flags the later ones as "you've seen this before" rather than
  deduplicating them away.
- `coreSentences.ts` — 2-3 `SentenceCard`s per TikTok topic worth
  memorizing as a whole sentence, mixed into that topic's session.
- `grammarDrills.ts` — hand-authored `'word-order'` drills (pick the
  correctly-ordered sentence) for the grammar point each script actually
  demonstrates (verb-second order, dative case, weil-clauses, indirect
  questions). Keyed by the core-sentence card id they attach to; looked up
  before the generic per-card-type drill logic in `lib/drills.ts`.
- `a1Sentences.ts` — a generic ~100-sentence A1 bank (greetings, time,
  questions, shopping, directions), independent of the personal TikTok
  content, one topic per category.
- `topics.ts` — the topic list shown on the home screen, grouped into
  sections (`TopicGroup`: notebook / tiktok / grammar / a1-sentences) for
  display.

### Extending it

- **New topic**: add an entry to `topics.ts` (with a `group`), then add
  cards with that `topicId` anywhere in `data/`.
- **New card type**: add a variant to the `Card` union in `types.ts`, teach
  `Flashcard.tsx` how to render it, and (optionally) `drills.ts` how to quiz
  it.
- **New drill kind**: add to `DrillKind` in `types.ts` and either add a
  generator function in `lib/drills.ts` (mechanical, derived from card
  data) or hand-author entries in `grammarDrills.ts` (bespoke, keyed by
  card id) — see the `'word-order'` kind for an example of the latter.
- **Grow the 1000-word list**: append more `NounCard | VocabCard` entries to
  `frequencyWords.ts` (same shape as the existing ones). Check new words
  against the curated topic files first to avoid duplicates.
- **New TikTok script**: add its text to `passages.ts`, extracted cards to
  `tiktokVocab.ts`, 2-3 `SentenceCard`s to `coreSentences.ts`, and its topic
  id to `TRACKED_TOPIC_ORDER` in `lib/repeats.ts` (in posting order) so
  repeat-word detection includes it.
- **Real photos instead of icons**: `CardImage` already supports a `photo`
  variant (`{ kind: 'photo', src, alt }`) alongside `icon` — swap a card's
  `image` field, no schema change needed.
- **More speaking-practice topics**: `SpeakSession.tsx` already works for
  any topic — it just filters that topic's cards down to `SentenceCard`s.
  Add `SentenceCard`s to any topic and a "Practice speaking →" link appears
  for it automatically (see `hasSpeakingPractice` in `Home.tsx`/`Session.tsx`).

## Progress tracking

`src/lib/progress.tsx` is a small React context backed by `localStorage`
(`deutsch-mit-tineiya:progress:v1`). A card counts as "learned" after two
correct drill answers. There's no streak mechanic by design — `daysActive`
is tracked quietly for the progress screen only.

## Pronunciation

Every sound button plays a **pre-generated MP3** from `public/audio/`,
recorded once at build time with a real neural German voice (Microsoft's
free "Read aloud" engine — the same one behind Edge, no API key, no
account) via `npm run generate-audio`. This is what makes pronunciation
consistent for every visitor once deployed: it doesn't depend on what
voices happen to be installed on their OS or browser.

- **How the lookup works**: `lib/text.ts`'s `audioKeyForText()` hashes the
  spoken text (FNV-1a, pure JS, no crypto API) to a filename —
  `public/audio/<hash>.mp3` — so there's no separate manifest to keep in
  sync; the same function runs in both the generation script and the app.
- **Regenerating**: `npm run generate-audio` walks every card, skips any
  `<hash>.mp3` that already exists, and only fetches what's missing — so
  it's cheap to re-run after adding a handful of new cards. The full corpus
  (~740 unique words/sentences) takes a few minutes the first time.
- **Fallback**: if a clip is missing (new card, generation script not yet
  run), the sound button falls back to the browser's built-in
  `speechSynthesis` — lower quality and dependent on the visitor's own
  German voice, but never silent.
- **Changing the voice**: edit `VOICE` in `scripts/generate-audio.mjs`
  (any `de-DE-*Neural` voice works) and delete `public/audio/` before
  re-running to regenerate everything with the new voice.

## Speaking practice (`SpeakSession.tsx`, `lib/voice.ts`)

Phase 2 from the brief: a "say this in German" mode for `SentenceCard`s
(currently the TikTok core sentences and the A1 sentence bank — see
`hasSpeakingPractice` in `Home.tsx`), reachable via a "Practice speaking →"
link wherever a topic has sentence cards.

- **How it works**: the browser's free built-in `SpeechRecognition` API
  transcribes what's said (no backend, no API key), which is then compared
  against the target sentence with a normalized Levenshtein similarity
  score (`textSimilarity()` in `lib/voice.ts`, threshold
  `SPOKEN_MATCH_THRESHOLD` = 0.82) — a text/grammar check, not a
  pronunciation score. Seeing the raw transcript next to the target still
  gives indirect pronunciation feedback: if speech recognition mis-hears a
  word, that's usually a sign it wasn't said clearly.
- **Browser support**: solid in Chrome and Edge, unsupported in Firefox and
  inconsistent in Safari. `speechRecognitionSupported()` gates the mic UI;
  unsupported browsers get a "reveal the sentence" self-check instead of a
  dead end.
- **Requires HTTPS** (or localhost) — a Web Speech API / secure-context
  requirement, satisfied automatically by GitHub Pages/Vercel/Netlify and
  by `npm run dev`.
- **Pronunciation scoring** (actually grading how *well* something was
  said, not just what was said) would need a paid API like Azure
  Pronunciation Assessment — out of scope for a free static site unless
  Tineiya brings her own key later.
