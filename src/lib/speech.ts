// Pronunciation via the browser's built-in speech synthesis — free, no
// backend, works offline once the voice is downloaded. Silently does
// nothing on browsers without support (button stays visible but inert).

export function speakGerman(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  const germanVoice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith('de'));
  if (germanVoice) utterance.voice = germanVoice;
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
