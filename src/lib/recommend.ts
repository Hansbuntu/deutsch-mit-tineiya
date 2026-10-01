// "Today's pick" — one recommended thing to do, chosen from how the learner has
// actually been practising, so opening the app isn't always "continue where you
// left off". Every candidate gets a score from the learner's own data; picks shown
// recently are pushed down, so each visit surfaces something different.

import type { UiIconName } from '../components/Icon';
import { cardsForTopic } from '../data/cards';
import { passageForTopic } from '../data/passages';
import { topics } from '../data/topics';
import type { Topic } from '../data/types';
import type { ActivityKind, ActivityRecord, CardProgress, TopicProgress } from './progress';
import { hasSpeaking } from './speaking';

export interface TodayPick {
  /** Stable id, so the same suggestion can be recognised across visits. */
  id: string;
  title: string;
  /** Why this was picked — always grounded in the learner's own data. */
  reason: string;
  action: string;
  to: string;
  icon: UiIconName;
  minutes: number;
  score: number;
}

export interface RecommendInput {
  topicProgress: (topicId: string) => TopicProgress;
  recordFor: (cardId: string) => CardProgress | undefined;
  activity: Partial<Record<ActivityKind, ActivityRecord>>;
  /** Already offered as "where you left off", so not picked again. */
  continueTopicId: string;
  frequencyPractised: number;
  todayISO: string;
}

const FREQUENCY_TOPIC = 'wortschatz-1000';
const FREQUENCY_TARGET = 1000;

function daysBetween(fromISO: string, toISO: string): number {
  const [a, b] = [fromISO, toISO].map((iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).getTime();
  });
  return Math.round((b - a) / 86_400_000);
}

const SKILLS: { kind: ActivityKind; noun: string }[] = [
  { kind: 'speaking', noun: 'speaking' },
  { kind: 'listening', noun: 'listening' },
  { kind: 'writing', noun: 'writing' },
  { kind: 'reading', noun: 'reading' },
];

type SkillTarget = Pick<TodayPick, 'title' | 'to' | 'icon' | 'minutes'>;

/** Where a neglected skill is best practised right now. */
function skillTarget(kind: ActivityKind, input: RecommendInput): SkillTarget | null {
  const tiktok = topics.filter((t) => t.group === 'tiktok');
  const started = (t: Topic) => input.topicProgress(t.id).done > 0;
  switch (kind) {
    case 'speaking': {
      const continueTopic = topics.find((t) => t.id === input.continueTopicId);
      const topic =
        (continueTopic && hasSpeaking(continueTopic.id) ? continueTopic : undefined) ??
        tiktok.find((t) => started(t) && hasSpeaking(t.id)) ??
        tiktok.find((t) => hasSpeaking(t.id));
      return topic
        ? { title: `Speak it out: ${topic.name}`, to: `/thema/${topic.id}/sprechen`, icon: 'mic', minutes: 4 }
        : null;
    }
    case 'listening': {
      const fromScripts = tiktok.some(started);
      return {
        title: fromScripts ? 'Listen to your own scripts' : 'Listening practice',
        to: fromScripts ? '/generieren?mode=listen&source=tiktok' : '/generieren?mode=listen',
        icon: 'volume',
        minutes: 4,
      };
    }
    case 'writing':
      return { title: 'Write a few sentences', to: '/generieren?mode=type', icon: 'type', minutes: 5 };
    case 'reading': {
      const topic = tiktok.find((t) => t.id === input.continueTopicId) ?? tiktok.find(started) ?? tiktok[0];
      return topic && passageForTopic(topic.id)
        ? { title: `Read your script: ${topic.name}`, to: `/thema/${topic.id}/passage`, icon: 'book-open', minutes: 3 }
        : null;
    }
    default:
      return null;
  }
}

/** Every candidate for today, best first (before novelty is applied). */
export function candidatePicks(input: RecommendInput): TodayPick[] {
  const picks: TodayPick[] = [];
  const others = topics.filter((t) => t.id !== input.continueTopicId);
  const anythingStudied = topics.some((t) => input.topicProgress(t.id).done > 0);

  // 1. Weak spot: the topic with the most cards answered wrong last time.
  const weakest = others
    .map((topic) => ({
      topic,
      missed: cardsForTopic(topic.id).filter((c) => input.recordFor(c.id)?.lastCorrect === false).length,
    }))
    .filter(({ missed }) => missed >= 2)
    .sort((a, b) => b.missed - a.missed)[0];
  if (weakest) {
    picks.push({
      id: `weak:${weakest.topic.id}`,
      title: `Fix a weak spot: ${weakest.topic.name}`,
      reason: `You got ${weakest.missed} cards here wrong last time — another pass now makes them stick.`,
      action: 'Practise again',
      to: `/thema/${weakest.topic.id}`,
      icon: 'target',
      minutes: 5,
      score: 75 + 4 * Math.min(weakest.missed, 6),
    });
  }

  // 2. A skill left untouched — never tried, or not for a few days.
  for (const { kind, noun } of SKILLS) {
    const last = input.activity[kind]?.lastISO;
    const days = last ? daysBetween(last, input.todayISO) : null;
    if (days !== null && days < 3) continue;
    const target = skillTarget(kind, input);
    if (!target) continue;
    picks.push({
      id: `skill:${kind}`,
      ...target,
      reason:
        days === null
          ? `You haven't tried ${noun} practice yet — it trains a different part of your German.`
          : `Your last ${noun} practice was ${days} days ago. A few minutes keeps it balanced with the rest.`,
      action: 'Start',
      score: days === null ? (anythingStudied ? 64 : 40) : 50 + Math.min(days, 14) * 2,
    });
  }

  // 3. Almost there: a topic at least half done.
  for (const topic of others) {
    const p = input.topicProgress(topic.id);
    if (p.finished || p.total === 0 || p.done / p.total < 0.5) continue;
    const left = p.total - p.done;
    picks.push({
      id: `finish:${topic.id}`,
      title: `Finish ${topic.name}`,
      reason: `Only ${left} ${left === 1 ? 'card' : 'cards'} left — you're ${Math.round((p.done / p.total) * 100)}% through.`,
      action: 'Finish it',
      to: `/thema/${topic.id}`,
      icon: 'trophy',
      minutes: Math.max(2, Math.round(left / 3)),
      score: 60 + 25 * (p.done / p.total),
    });
  }

  // 4. Seen it all, learned little: go round once more.
  for (const topic of others) {
    const p = input.topicProgress(topic.id);
    if (!p.finished || p.learned / p.total >= 0.6) continue;
    picks.push({
      id: `lock:${topic.id}`,
      title: `Lock in ${topic.name}`,
      reason: `You've been through every card, but only ${p.learned} of ${p.total} are learned yet. One more round of drills locks them in.`,
      action: 'Go again',
      to: `/thema/${topic.id}`,
      icon: 'repeat',
      minutes: 6,
      score: 52,
    });
  }

  // 5. Something new: topics never opened, in course order.
  others
    .filter((t) => t.id !== FREQUENCY_TOPIC && input.topicProgress(t.id).done === 0)
    .slice(0, 3)
    .forEach((topic, i) => {
      const cards = input.topicProgress(topic.id).total;
      picks.push({
        id: `new:${topic.id}`,
        title: `Something new: ${topic.name}`,
        reason: `You haven't opened this one yet — ${cards} cards${topic.tagline ? `, ${topic.tagline}` : ''}.`,
        action: 'Take a look',
        to: `/thema/${topic.id}`,
        icon: 'sparkles',
        minutes: Math.max(3, Math.round(cards / 3)),
        score: (anythingStudied ? 58 : 70) - i * 4,
      });
    });

  // 6. Grow the vocabulary.
  if (input.continueTopicId !== FREQUENCY_TOPIC && input.frequencyPractised < FREQUENCY_TARGET && anythingStudied) {
    picks.push({
      id: 'words',
      title: 'Learn new everyday words',
      reason: `${(FREQUENCY_TARGET - input.frequencyPractised).toLocaleString('en')} of the 1,000 most common German words are still new to you.`,
      action: 'Learn words',
      to: `/thema/${FREQUENCY_TOPIC}`,
      icon: 'library',
      minutes: 5,
      score: 46,
    });
  }

  // One suggestion per topic — its best one — so "Something else" really is something else.
  const seenTopics = new Set<string>();
  return picks
    .sort((a, b) => b.score - a.score)
    .filter((pick) => {
      const topicId = pick.to.match(/^\/thema\/([^/]+)/)?.[1];
      if (!topicId || pick.id.startsWith('skill:')) return true;
      if (seenTopics.has(topicId)) return false;
      seenTopics.add(topicId);
      return true;
    });
}

// ---------------------------------------------------------------------------
// Novelty: remember what was suggested so each visit brings something different.
// ---------------------------------------------------------------------------

const HISTORY_KEY = 'deutsch-mit-tineiya:pick-history';
const SESSION_KEY = 'deutsch-mit-tineiya:pick';

interface Shown {
  id: string;
  dateISO: string;
}

function readHistory(): Shown[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]') as Shown[];
  } catch {
    return [];
  }
}

export function rememberShown(id: string, todayISO: string) {
  try {
    const history = [{ id, dateISO: todayISO }, ...readHistory().filter((h) => h.id !== id)].slice(0, 12);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    sessionStorage.setItem(SESSION_KEY, id);
  } catch {
    // storage blocked: picks just won't rotate as carefully
  }
}

/** The pick already chosen for this visit, so going back to Home doesn't reshuffle it. */
export function pickForThisVisit(): string | null {
  try {
    return sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

/** Small, stable per-day nudge so equal scores take turns instead of always tying the same way. */
function jitter(id: string, todayISO: string): number {
  let hash = 0;
  for (const ch of todayISO + id) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return Math.abs(hash) % 9;
}

/**
 * Candidates ranked for this visit: recently suggested picks drop (yesterday's and
 * today's earlier ones most), so returning brings something new.
 */
export function rankPicks(candidates: TodayPick[], todayISO: string): TodayPick[] {
  const history = readHistory();
  const adjusted = candidates.map((pick) => {
    const shown = history.find((h) => h.id === pick.id);
    const daysAgo = shown ? daysBetween(shown.dateISO, todayISO) : Infinity;
    const penalty = daysAgo <= 1 ? 35 : daysAgo <= 3 ? 15 : 0;
    return { pick, rank: pick.score - penalty + jitter(pick.id, todayISO) };
  });
  return adjusted.sort((a, b) => b.rank - a.rank).map((a) => a.pick);
}
