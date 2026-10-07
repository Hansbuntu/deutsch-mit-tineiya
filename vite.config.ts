import { createHash } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Builds dist/sw.js from src/service-worker.js with this build's file list
 * baked in (so every screen works offline), and dist/audio-manifest.json
 * listing every pronunciation clip (for "Save all audio" on the Progress page).
 */
function serviceWorker(): Plugin {
  return {
    name: 'service-worker',
    apply: 'build',
    generateBundle(_options, bundle) {
      const clips = readdirSync('public/audio').filter((file) => file.endsWith('.mp3'))
      this.emitFile({ type: 'asset', fileName: 'audio-manifest.json', source: JSON.stringify(clips) })

      const built = Object.keys(bundle).filter((file) => !file.endsWith('.map'))
      const icons = readdirSync('public/icons').map((file) => `icons/${file}`)
      const shell = ['./', 'index.html', 'manifest.webmanifest', 'favicon.svg', 'audio-manifest.json', ...icons]
      const precache = [...new Set([...shell, ...built])]
      const template = readFileSync('src/service-worker.js', 'utf8')
      // Changes whenever a built file or the worker itself changes, so browsers pick up the new worker.
      const version = createHash('sha256').update(precache.join('\n')).update(template).update(clips.join()).digest('hex').slice(0, 12)
      const source = template
        .replace('__VERSION__', version)
        .replace('__PRECACHE__', JSON.stringify(precache))
      this.emitFile({ type: 'asset', fileName: 'sw.js', source })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), serviceWorker()],
})
