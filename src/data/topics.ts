import type { Topic } from './types';

export const topics: Topic[] = [
  {
    id: 'trennbare-verben',
    name: 'trennbare Verben',
    tagline: 'aus deinem Heft',
    featured: true,
  },
  { id: 'nomen-artikel', name: 'Nomen & Artikel' },
  { id: 'alltag-zeit', name: 'Alltag & Zeit' },
  { id: 'im-cafe', name: 'im Café' },
  { id: 'zahlen', name: 'Zahlen' },
  { id: 'wortschatz-1000', name: 'die 1000 häufigsten Wörter' },
];

export const topicById = (id: string): Topic | undefined => topics.find((t) => t.id === id);
