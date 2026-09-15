// Pre-generates one MP3 per unique word/sentence spoken by the app's sound
// buttons, using Microsoft's free neural TTS (the same engine behind Edge's
// "Read aloud" — no API key, no account). Run this whenever new cards are
// added: `npm run generate-audio`. Already-generated files are skipped, so
// it's safe (and fast) to re-run after adding just a few cards.
//
// Output goes to public/audio/<hash>.mp3, where <hash> is
// audioKeyForText(spokenText) from src/lib/text.ts — the same function the
// running app uses to look up which clip to play, so the mapping never
// needs a separate manifest file.

import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { allCards } from '../src/data/cards.ts';
import { speakableText, audioKeyForText } from '../src/lib/text.ts';

const VOICE = 'de-DE-KatjaNeural';
const CONCURRENCY = 6;
const MAX_ATTEMPTS = 3;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'audio');
mkdirSync(outDir, { recursive: true });

const uniqueTexts = new Map(); // key -> text
for (const card of allCards) {
  const text = speakableText(card).trim();
  if (!text) continue;
  uniqueTexts.set(audioKeyForText(text), text);
}

const jobs = [...uniqueTexts.entries()].filter(([key]) => !existsSync(path.join(outDir, `${key}.mp3`)));

console.log(`${uniqueTexts.size} unique clips needed, ${jobs.length} missing — generating...`);

async function generateOne(text) {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const { audioStream } = await tts.toStream(text);
  const chunks = [];
  for await (const chunk of audioStream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

async function worker(queue, failures) {
  while (queue.length > 0) {
    const [key, text] = queue.shift();
    let lastErr;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const buf = await generateOne(text);
        writeFileSync(path.join(outDir, `${key}.mp3`), buf);
        process.stdout.write('.');
        lastErr = null;
        break;
      } catch (err) {
        lastErr = err;
        await new Promise((r) => setTimeout(r, 300 * attempt));
      }
    }
    if (lastErr) {
      failures.push({ key, text, error: String(lastErr) });
      process.stdout.write('x');
    }
  }
}

const queue = [...jobs];
const failures = [];
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue, failures)));

console.log(`\nDone. ${jobs.length - failures.length}/${jobs.length} generated.`);
if (failures.length > 0) {
  console.log(`${failures.length} failed:`);
  for (const f of failures) console.log(`  "${f.text}" (${f.key}): ${f.error}`);
  process.exitCode = 1;
}
