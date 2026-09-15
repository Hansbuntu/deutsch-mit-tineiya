# Build brief: Deutsch mit Milan

A personal web app to help me (Milan) learn German. I'm currently around A1,
working toward A2. I've been learning for a while, post videos about it on
TikTok, and have a 40+ day Duolingo streak — this app is not meant to replace
Duolingo, it's meant to cover what Duolingo doesn't: sentence structure,
conjugation patterns, and content built from my own study material.

It's for me alone right now, but built so it could support other users later
— don't paint the architecture into a corner, but don't build multi-user
infrastructure yet either.

## Hosting requirement

This needs to be free to host and viewable on the open web — something I can
deploy on GitHub Pages, Vercel, or Netlify's free tier. That means: prefer a
static frontend with no required backend server. Store my flashcard and
progress data client-side (e.g. localStorage, or a bundled JSON file I can
edit) rather than reaching for a database or paid hosting. If a lightweight
build step is useful (Vite, plain static React build, etc.) that's fine, as
long as the deployed result is static files.

## Design reference

A design reference HTML file is attached alongside this prompt
(`design-reference.html`). It shows the visual identity to follow: a warm
parchment background, deep ink-navy text, sage green as the structural
accent, mustard gold as the single highlight color, Fraunces for German
words/headings and IBM Plex Sans for everything else, plus the layout
patterns for the flashcard, topic grid, drills, and progress screens. Match
this styling rather than defaulting to generic UI patterns.

## Phase 1 — build this first

**Image-led flashcards**
- Each card centers on a picture, not a translation — image first, word
  second.
- Noun cards show the article (der/die/das) as a small badge next to the
  word, plus an example sentence in German and English, plus a
  pronunciation-audio button (can stub the actual audio for now).
- Verb cards show the infinitive, and for separable verbs, visually
  highlight the separated prefix in the example sentence (e.g. "Ich stehe
  früh **auf**.").
- Cards are tagged by topic so they can be studied in themed chunks.

**Seed content — my own separable verb cards (digitize these first)**

| Verb | Meaning | Example (DE) | Example (EN) | Note |
|---|---|---|---|---|
| aufstehen | to get up | Ich stehe jeden Morgen früh auf. | I get up early every morning. | |
| aufwachen | to wake up | Ich wache um 6 Uhr auf. | I wake up at 6. | |
| anfangen | to begin/start | Der Film fängt um 8 Uhr an. | The movie starts at 8. | stem change: fängst/fängt |
| anrufen | to call | Ich rufe meine Mutter an. | I call my mother. | |
| einkaufen | to shop | Ich kaufe heute ein. | I'm shopping today. | |
| ausgehen | to go out | Wir gehen am Samstag aus. | We're going out on Saturday. | |
| mitkommen | to come along | Kommst du mit? | Are you coming along? | |
| mitmachen | to participate/join in | Ich mache beim Spiel mit. | I participate in the game. | |
| zumachen | to close/shut | Ich mache die Tür zu. | I close the door. | |
| aufmachen | to open | Ich mache das Fenster auf. | I open the window. | |
| abfahren | to depart/leave | Der Zug fährt um 10 Uhr ab. | The train leaves at 10. | stem change: fährst/fährt |
| einsteigen | to get in/board | Ich steige in den Bus ein. | I get on the bus. | |
| aussteigen | to get out/get off | Ich steige an der nächsten Haltestelle aus. | I get off at the next stop. | |
| zurückkommen | to come back | Ich komme morgen zurück. | I come back tomorrow. | |
| abnehmen | to decrease/lose weight | Die Zahl nimmt ab. | The number is decreasing. | stem change: nimmst/nimmt |

Each of these also has a full present-tense conjugation (ich/du/er-sie-es/
wir/ihr/sie-Sie) — store the full conjugation per verb, not just the example
sentence, since it feeds the pattern drills below.

**Vocabulary base**
Beyond my handwritten cards, seed the app with a standard German top-1000 (or
top-2000) frequency word list, so there's a large pool of common everyday
vocabulary beyond what I've handwritten. Track progress against this list
(e.g. "64 of 1000 learned") as shown in the design reference's progress
screen.

**Pattern-recognition drills**
- Not typing-based — multiple choice / tap-to-select recognition of the
  correct pattern, as shown in the design reference.
- Cover: verb conjugation (regular + stem-changing verbs like
  fangen→fängst/fängt, fahren→fährst/fährt, nehmen→nimmst/nimmt), separable
  verb sentence structure, and noun gender/article.
- Drills should pull from the same set of words/verbs the person has already
  seen in flashcards that session, so vocab and grammar reinforce each other
  rather than feeling like separate systems.

**Screens to build**
1. Home / topic browse — grid of topic tiles (trennbare Verben, Nomen &
   Artikel, Alltag & Zeit, im Café, Zahlen, the 1000-word list), each showing
   card count / progress.
2. Flashcard session — image, word/verb, article or separable-prefix
   highlighting, example sentence (DE + EN), audio button, session progress
   indicator.
3. Pattern drill — multiple-choice fill-in-the-blank for conjugation,
   sentence structure, or article, drawn from the current session's cards.
4. Progress overview — simple stats: days active, total cards, notebook
   pages digitized, progress through the 1000-word list.

**Gamification — keep it light**
No aggressive daily-streak mechanic demanding constant engagement (I get
that from Duolingo already and don't want to duplicate it). A quiet,
passive stat (days active, cards learned) is fine as background information,
not a central hook. This should feel like something I can dip into casually
— e.g. while watching YouTube — not a demanding daily ritual.

**Visual learning**
Images matter more than text-to-text translation for how I learn — every
vocabulary card should be image-first. Style of image (real photo vs.
illustration) doesn't matter, just that there's always a visual anchor.

## Phase 2 — later, not now

Voice input: show a prompt or sentence pattern, let me speak the answer, and
check pronunciation and/or grammar. This is a meaningfully bigger technical
lift (speech recognition, pronunciation scoring) and should come after phase
1's core flashcard and drill system is solid. Don't build this yet — just
don't design phase 1's data model in a way that would block adding it later.

## Content pipeline

I have 15 handwritten flashcards (the separable verbs listed above) that
need digitizing as the seed content — treat them as the highest-priority
real data, with the frequency word list as the bulk filler around them.

## Notes on flexibility

This should grow with my learning rather than being rigid — keep the data
model (topics, card types, drill types) easy to extend, since I'll likely
add new topics, card types, or drill formats as I progress toward A2 and
beyond.
