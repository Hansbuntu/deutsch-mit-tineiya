import type { Topic, TopicGroup } from './types';

// TRACKED_TOPIC_ORDER in lib/repeats.ts depends on the tiktok topics being
// added in the same chronological order they were posted (one per week) —
// keep that in sync if this list changes.
export const topics: Topic[] = [
  {
    id: 'trennbare-verben',
    name: 'Separable Verbs',
    tagline: 'from your notebook',
    featured: true,
    group: 'notebook',
    icon: 'alarm-clock',
  },
  { id: 'mein-tag', name: 'Mein Tag', tagline: 'your TikTok script', group: 'tiktok', icon: 'sun' },
  { id: 'mein-zuhause', name: 'Mein Zuhause', tagline: 'your TikTok script', group: 'tiktok', icon: 'house' },
  { id: 'ueber-mich', name: 'Über mich', tagline: 'your TikTok script', group: 'tiktok', icon: 'category-person' },
  {
    id: 'mein-leben',
    name: 'Mein Leben',
    tagline: 'your TikTok script · in progress',
    group: 'tiktok',
    icon: 'category-color',
  },
  { id: 'nomen-artikel', name: 'Nouns & Articles', group: 'grammar', icon: 'book' },
  { id: 'alltag-zeit', name: 'Everyday & Time', group: 'grammar', icon: 'clock' },
  { id: 'im-cafe', name: 'At the Café', group: 'grammar', icon: 'coffee-cup' },
  { id: 'zahlen', name: 'Numbers', group: 'grammar', icon: 'category-number' },
  { id: 'wortschatz-1000', name: 'Top 1000 Words', group: 'grammar', icon: 'newspaper' },
  { id: 'a1-greetings', name: 'Greetings & Introductions', group: 'a1-sentences', icon: 'category-communication' },
  { id: 'a1-time', name: 'Time & Daily Life', group: 'a1-sentences', icon: 'calendar' },
  { id: 'a1-questions', name: 'Asking Questions', group: 'a1-sentences', icon: 'category-question' },
  { id: 'a1-shopping', name: 'Shopping & Ordering', group: 'a1-sentences', icon: 'shopping-bag' },
  { id: 'a1-directions', name: 'Directions', group: 'a1-sentences', icon: 'category-place' },
];

export const topicById = (id: string): Topic | undefined => topics.find((t) => t.id === id);

/** Which section (notebook/tiktok/grammar/a1-sentences) a card's first topic belongs to. */
export const groupForTopicId = (topicId: string): TopicGroup | undefined => topicById(topicId)?.group;

export const TOPIC_GROUP_LABELS: Record<TopicGroup, string> = {
  notebook: 'From your notebook',
  tiktok: 'Your TikTok scripts',
  grammar: 'Grammar & vocabulary',
  'a1-sentences': 'Common A1 sentences',
};

export const TOPIC_GROUP_DESCRIPTIONS: Record<TopicGroup, string> = {
  notebook: 'Digitized from your handwritten flashcards.',
  tiktok: 'Each script you posted, turned into cards, core sentences and grammar drills.',
  grammar: 'Articles, everyday words, numbers and the most common words in German.',
  'a1-sentences': 'High-frequency phrases worth drilling until they come out automatically.',
};

export const TOPIC_GROUP_ORDER: TopicGroup[] = ['notebook', 'tiktok', 'grammar', 'a1-sentences'];
