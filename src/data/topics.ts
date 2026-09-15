import type { Topic } from './types';

export const topics: Topic[] = [
  {
    id: 'trennbare-verben',
    name: 'Separable Verbs',
    tagline: 'from your notebook',
    featured: true,
  },
  { id: 'nomen-artikel', name: 'Nouns & Articles' },
  { id: 'alltag-zeit', name: 'Everyday & Time' },
  { id: 'im-cafe', name: 'At the Café' },
  { id: 'zahlen', name: 'Numbers' },
  { id: 'wortschatz-1000', name: 'Top 1000 Words' },
];

export const topicById = (id: string): Topic | undefined => topics.find((t) => t.id === id);
