const STORAGE_KEY = 'deutsch-mit-tineiya:last-topic';

export function getLastTopicId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setLastTopicId(topicId: string) {
  try {
    localStorage.setItem(STORAGE_KEY, topicId);
  } catch {
    // storage unavailable — "continue" just falls back to the default topic
  }
}
