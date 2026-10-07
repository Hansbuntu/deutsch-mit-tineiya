// Installing the app (PWA): Chrome, Edge and Android offer an install prompt the
// app can trigger from its own button; iPhone and iPad only install from Safari's
// Share → Add to Home Screen, so there the app shows those steps instead.
// Imported from main.tsx so the browser's install event is caught however early it fires.

import { useEffect, useReducer } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferred: BeforeInstallPromptEvent | null = null;
let installedThisVisit = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

// Kept, not prevented — the browser can still show its own install hint too.
window.addEventListener('beforeinstallprompt', (event) => {
  deferred = event as BeforeInstallPromptEvent;
  notify();
});
window.addEventListener('appinstalled', () => {
  deferred = null;
  installedThisVisit = true;
  notify();
});

/** Running as the installed app (from the home screen), not in a browser tab. */
export const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

/** iPhone/iPad — including iPads that report themselves as a Mac. */
const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

/** Safari on a Mac, which installs from File → Add to Dock. */
const isMacSafari = () =>
  !isIOS() && /Macintosh/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && !/Chrome|Chromium|Edg|Firefox/.test(navigator.userAgent);

export interface InstallState {
  installed: boolean;
  /** The browser has an install prompt ready (Chrome, Edge, Android). */
  canPrompt: boolean;
  /** Installs only through Share → Add to Home Screen. */
  ios: boolean;
  /** Installs only through File → Add to Dock. */
  macSafari: boolean;
  /** Open the browser's install prompt; true if the learner installed. */
  promptInstall: () => Promise<boolean>;
}

export function useInstall(): InstallState {
  const [, rerender] = useReducer((n: number) => n + 1, 0);
  useEffect(() => {
    listeners.add(rerender);
    return () => {
      listeners.delete(rerender);
    };
  }, []);

  return {
    installed: installedThisVisit || isStandalone(),
    canPrompt: deferred !== null,
    ios: isIOS(),
    macSafari: isMacSafari(),
    promptInstall: async () => {
      const event = deferred;
      if (!event) return false;
      deferred = null; // a prompt can only be shown once
      await event.prompt();
      const { outcome } = await event.userChoice;
      notify();
      return outcome === 'accepted';
    },
  };
}
