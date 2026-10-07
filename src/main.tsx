// Must stay the first import: adds the learner's own scripts before the app reads the content.
import './data/installUserScripts'
// Catches the browser's install prompt, which can fire before the app renders.
import './lib/install'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerServiceWorker } from './lib/offline'

registerServiceWorker()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
