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
  },
  {
    id: 'mein-tag',
    name: 'Mein Tag',
    tagline: 'your TikTok script',
    group: 'tiktok',
  },
  {
    id: 'mein-zuhause',
    name: 'Mein Zuhause',
    tagline: 'your TikTok script',
    group: 'tiktok',
  },
  {
    id: 'ueber-mich',
    name: 'Über mich',
    tagline: 'your TikTok script',
    group: 'tiktok',
  },
  {
    id: 'mein-leben',
    name: 'Mein Leben',
    tagline: 'your TikTok script · in progress',
    group: 'tiktok',
  },
  { id: 'nomen-artikel', name: 'Nouns & Articles', group: 'grammar' },
  { id: 'alltag-zeit', name: 'Everyday & Time', group: 'grammar' },
  { id: 'im-cafe', name: 'At the Café', group: 'grammar' },
  { id: 'zahlen', name: 'Numbers', group: 'grammar' },
  { id: 'wortschatz-1000', name: 'Top 1000 Words', group: 'grammar' },
  { id: 'a1-greetings', name: 'Greetings & Introductions', group: 'a1-sentences' },
  { id: 'a1-time', name: 'Time & Daily Life', group: 'a1-sentences' },
  { id: 'a1-questions', name: 'Asking Questions', group: 'a1-sentences' },
  { id: 'a1-shopping', name: 'Shopping & Ordering', group: 'a1-sentences' },
  { id: 'a1-directions', name: 'Directions', group: 'a1-sentences' },
];

export const topicById = (id: string): Topic | undefined => topics.find((t) => t.id === id);

export const TOPIC_GROUP_LABELS: Record<TopicGroup, string> = {
  notebook: 'From your notebook',
  tiktok: 'Your TikTok scripts',
  grammar: 'Grammar & vocabulary',
  'a1-sentences': 'Common A1 sentences',
};

export const TOPIC_GROUP_ORDER: TopicGroup[] = ['notebook', 'tiktok', 'grammar', 'a1-sentences'];
