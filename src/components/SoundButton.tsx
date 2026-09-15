import { useEffect, useState } from 'react';
import { speakGerman, hasGermanVoice } from '../lib/speech';

export function SoundButton({ text, label }: { text: string; label: string }) {
  const [germanVoiceAvailable, setGermanVoiceAvailable] = useState(true);

  useEffect(() => {
    let cancelled = false;
    hasGermanVoice().then((available) => {
      if (!cancelled) setGermanVoiceAvailable(available);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <button
      type="button"
      className="sound"
      aria-label={`Listen to ${label}`}
      title={germanVoiceAvailable ? undefined : 'No German voice installed — add one for free in your system speech settings'}
      onClick={() => speakGerman(text)}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      </svg>
    </button>
  );
}
