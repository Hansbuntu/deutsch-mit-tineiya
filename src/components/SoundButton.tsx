import { Icon } from './Icon';
import { playPronunciation } from '../lib/speech';

export function SoundButton({ text, label }: { text: string; label: string }) {
  return (
    <button
      type="button"
      className="sound-btn"
      aria-label={`Listen to ${label}`}
      title="Listen"
      onClick={() => playPronunciation(text)}
    >
      <Icon name="volume" />
    </button>
  );
}
