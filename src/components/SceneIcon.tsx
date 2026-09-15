import type { ReactElement } from 'react';
import type { IconName } from '../data/types';

// Hand-drawn line icons in the same stroke style as the design reference
// (round caps/joins, ~2.2 stroke weight, currentColor). Dedicated icons
// exist for the 15 seed verbs and curated noun/topic cards; the bulk
// frequency-word pool reuses a small set of `category-*` fallbacks.
const paths: Record<IconName, ReactElement> = {
  'alarm-clock': (
    <>
      <circle cx="32" cy="34" r="18" />
      <path d="M32 24v10l7 6" />
      <path d="M22 10l-6 6" />
      <path d="M42 10l6 6" />
    </>
  ),
  sunrise: (
    <>
      <path d="M14 40h36" />
      <path d="M20 40a12 12 0 0 1 24 0" />
      <path d="M32 18v6" />
      <path d="M20 22l4 4" />
      <path d="M44 22l-4 4" />
    </>
  ),
  clapperboard: (
    <>
      <rect x="12" y="24" width="40" height="28" rx="2" />
      <path d="M12 24l6-10h30l-6 10" />
      <path d="M22 24l6-10" />
      <path d="M34 24l6-10" />
    </>
  ),
  'phone-call': (
    <>
      <rect x="22" y="10" width="18" height="44" rx="4" />
      <path d="M28 46h6" />
      <path d="M46 22a12 12 0 0 1 0 20" />
      <path d="M50 18a18 18 0 0 1 0 28" />
    </>
  ),
  'shopping-bag': (
    <>
      <path d="M18 24h28l-3 26a2 2 0 0 1-2 2H23a2 2 0 0 1-2-2z" />
      <path d="M24 24v-4a8 8 0 0 1 16 0v4" />
    </>
  ),
  'door-exit': (
    <>
      <rect x="14" y="12" width="20" height="40" rx="1" />
      <circle cx="28" cy="32" r="1.6" fill="currentColor" stroke="none" />
      <path d="M40 32h12" />
      <path d="M46 26l6 6-6 6" />
    </>
  ),
  'walk-together': (
    <>
      <circle cx="22" cy="18" r="5" />
      <path d="M14 46v-9a8 8 0 0 1 16 0v9" />
      <circle cx="42" cy="22" r="4.5" />
      <path d="M35 47v-8a7 7 0 0 1 14 0v8" />
    </>
  ),
  puzzle: (
    <>
      <rect x="16" y="16" width="32" height="32" rx="3" />
      <path d="M28 16v5a4 4 0 0 0 8 0v-5" />
      <path d="M48 28h-5a4 4 0 0 0 0 8h5" />
    </>
  ),
  'door-closed': (
    <>
      <rect x="18" y="12" width="28" height="40" rx="1" />
      <circle cx="38" cy="32" r="1.6" fill="currentColor" stroke="none" />
      <path d="M50 22l6 10-6 10" />
    </>
  ),
  'window-open': (
    <>
      <rect x="12" y="14" width="22" height="36" rx="1" />
      <path d="M23 14v36" />
      <path d="M34 18l16 6v20l-16 6" />
    </>
  ),
  train: (
    <>
      <rect x="16" y="14" width="32" height="26" rx="8" />
      <path d="M16 30h32" />
      <circle cx="24" cy="46" r="3" />
      <circle cx="40" cy="46" r="3" />
      <path d="M20 40l-4 6h32l-4-6" />
    </>
  ),
  'bus-enter': (
    <>
      <rect x="8" y="16" width="34" height="24" rx="3" />
      <path d="M8 26h34" />
      <circle cx="16" cy="46" r="3" />
      <circle cx="34" cy="46" r="3" />
      <path d="M50 24l8 4-8 4" />
      <path d="M58 28h-12" />
    </>
  ),
  'bus-exit': (
    <>
      <rect x="22" y="16" width="34" height="24" rx="3" />
      <path d="M22 26h34" />
      <circle cx="30" cy="46" r="3" />
      <circle cx="48" cy="46" r="3" />
      <path d="M14 24l-8 4 8 4" />
      <path d="M6 28h12" />
    </>
  ),
  'return-arrow': (
    <>
      <path d="M40 16a18 18 0 1 1 -13 5" />
      <path d="M21 11l6 10-11 1" />
    </>
  ),
  'trend-down': (
    <>
      <path d="M12 20l12 9 8-6 16 15" />
      <path d="M38 38l10 0" />
      <path d="M48 38l0 10" />
    </>
  ),
  newspaper: (
    <>
      <rect x="14" y="14" width="36" height="26" rx="2" />
      <path d="M14 20h36" />
      <path d="M20 28h10" />
      <path d="M20 33h16" />
    </>
  ),
  'coffee-cup': (
    <>
      <path d="M18 22h24v14a12 12 0 0 1-24 0z" />
      <path d="M42 26h4a6 6 0 0 1 0 12h-4" />
      <path d="M24 14c0 3-3 3-3 6" />
      <path d="M32 14c0 3-3 3-3 6" />
    </>
  ),
  croissant: (
    <>
      <path d="M14 42c3-16 15-24 26-24 6 0 10 3 12 7-9-2-17 2-21 10-3 6-3 13 0 18-11-1-20-6-17-11z" />
    </>
  ),
  clock: (
    <>
      <circle cx="32" cy="32" r="18" />
      <path d="M32 22v10l8 5" />
    </>
  ),
  house: (
    <>
      <path d="M14 32l18-16 18 16" />
      <path d="M18 28v22h28V28" />
      <path d="M27 50v-12h10v12" />
    </>
  ),
  book: (
    <>
      <path d="M32 20c-5-4-12-4-18-2v28c6-2 13-2 18 2 5-4 12-4 18-2V18c-6-2-13-2-18 2z" />
      <path d="M32 20v28" />
    </>
  ),
  table: (
    <>
      <path d="M12 24h40" />
      <path d="M16 24v26" />
      <path d="M48 24v26" />
      <path d="M12 24l4-8h32l4 8" />
    </>
  ),
  key: (
    <>
      <circle cx="22" cy="32" r="8" />
      <path d="M28 32h22" />
      <path d="M42 32v8" />
      <path d="M48 32v6" />
    </>
  ),
  bag: (
    <>
      <rect x="16" y="26" width="32" height="22" rx="3" />
      <path d="M24 26v-4a8 8 0 0 1 16 0v4" />
      <path d="M16 34h32" />
    </>
  ),
  bed: (
    <>
      <path d="M10 46V22a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6" />
      <path d="M10 34h44v12" />
      <path d="M10 46v4" />
      <path d="M54 46v4" />
      <circle cx="20" cy="26" r="3" />
    </>
  ),
  car: (
    <>
      <path d="M10 40v-6l6-10h20l8 10h6v6" />
      <circle cx="20" cy="42" r="4" />
      <circle cx="42" cy="42" r="4" />
      <path d="M10 40h6" />
      <path d="M44 40h6" />
    </>
  ),
  phone: (
    <>
      <rect x="22" y="10" width="20" height="44" rx="4" />
      <path d="M28 46h8" />
    </>
  ),
  money: (
    <>
      <rect x="10" y="20" width="44" height="24" rx="3" />
      <circle cx="32" cy="32" r="7" />
      <path d="M16 26v.1" />
      <path d="M48 38v.1" />
    </>
  ),
  calendar: (
    <>
      <rect x="12" y="16" width="40" height="34" rx="2" />
      <path d="M12 26h40" />
      <path d="M20 10v10" />
      <path d="M44 10v10" />
    </>
  ),
  sun: (
    <>
      <circle cx="32" cy="32" r="10" />
      <path d="M32 12v6M32 46v6M12 32h6M46 32h6M18 18l4 4M46 46l-4-4M46 18l-4 4M18 46l4-4" />
    </>
  ),
  menu: (
    <>
      <rect x="16" y="10" width="32" height="44" rx="2" />
      <path d="M22 20h20M22 28h20M22 36h12" />
    </>
  ),
  bill: (
    <>
      <path d="M18 10h28v44l-6-4-6 4-6-4-6 4-4-4z" />
      <path d="M24 20h16M24 28h16M24 36h10" />
    </>
  ),
  'category-person': (
    <>
      <circle cx="32" cy="22" r="8" />
      <path d="M18 50v-6a14 14 0 0 1 28 0v6" />
    </>
  ),
  'category-family': (
    <>
      <circle cx="22" cy="20" r="6" />
      <path d="M12 46v-6a10 10 0 0 1 20 0v6" />
      <circle cx="44" cy="24" r="5" />
      <path d="M36 46v-5a8 8 0 0 1 16 0v5" />
    </>
  ),
  'category-food': (
    <>
      <circle cx="32" cy="32" r="14" />
      <path d="M32 22v20" />
      <path d="M26 22v8a3 3 0 0 0 6 0v-8" />
    </>
  ),
  'category-drink': (
    <>
      <path d="M22 20h20l-3 26a3 3 0 0 1-3 3H28a3 3 0 0 1-3-3z" />
      <path d="M24 20V14h16v6" />
    </>
  ),
  'category-home': (
    <>
      <path d="M14 32l18-16 18 16" />
      <path d="M18 28v22h28V28" />
    </>
  ),
  'category-time': (
    <>
      <circle cx="32" cy="32" r="18" />
      <path d="M32 22v10l8 5" />
    </>
  ),
  'category-travel': (
    <>
      <rect x="16" y="22" width="32" height="24" rx="3" />
      <path d="M26 22v-4a6 6 0 0 1 12 0v4" />
      <path d="M16 32h32" />
    </>
  ),
  'category-nature': (
    <>
      <path d="M32 50V34" />
      <path d="M32 14a10 10 0 0 1 9 15 8 8 0 0 1-3 15H26a8 8 0 0 1-3-15 10 10 0 0 1 9-15z" />
    </>
  ),
  'category-weather': (
    <>
      <path d="M20 38a9 9 0 0 1 1-18 12 12 0 0 1 23 3 8 8 0 0 1-2 15z" />
    </>
  ),
  'category-body': (
    <>
      <circle cx="32" cy="20" r="8" />
      <path d="M20 48c0-10 5-16 12-16s12 6 12 16" />
    </>
  ),
  'category-clothing': (
    <>
      <path d="M22 14l10 6 10-6 8 8-6 6-2-2v26H24V26l-2 2-6-6z" />
    </>
  ),
  'category-work': (
    <>
      <rect x="14" y="24" width="36" height="22" rx="3" />
      <path d="M26 24v-4a6 6 0 0 1 12 0v4" />
      <path d="M14 34h36" />
    </>
  ),
  'category-communication': (
    <>
      <path d="M14 18h36v20H30l-8 8v-8h-8z" />
    </>
  ),
  'category-question': (
    <>
      <circle cx="32" cy="32" r="18" />
      <path d="M27 26a5 5 0 1 1 8 4c-2 1-3 3-3 6" />
      <path d="M32 42v.5" />
    </>
  ),
  'category-number': (
    <>
      <path d="M22 14l-4 36" />
      <path d="M42 14l-4 36" />
      <path d="M14 24h36" />
      <path d="M12 40h36" />
    </>
  ),
  'category-animal': (
    <>
      <circle cx="22" cy="26" r="3.5" />
      <circle cx="30" cy="18" r="3.5" />
      <circle cx="40" cy="20" r="3.5" />
      <circle cx="46" cy="28" r="3.5" />
      <path d="M33 34c9 0 13 6 13 11a6 6 0 0 1-9 5 13 13 0 0 0-11 0 6 6 0 0 1-9-5c0-5 4-11 12-11z" />
    </>
  ),
  'category-money': (
    <>
      <circle cx="32" cy="32" r="16" />
      <path d="M26 26h10M26 32h12M26 38h8" />
    </>
  ),
  'category-emotion': (
    <>
      <circle cx="32" cy="32" r="18" />
      <path d="M25 28h.1M39 28h.1" />
      <path d="M24 38c3 4 13 4 16 0" />
    </>
  ),
  'category-color': (
    <>
      <path d="M32 12a20 20 0 1 0 0 40c3 0 4-2 4-4s-1-3-1-5a4 4 0 0 1 4-4h4a8 8 0 0 0 8-8c0-11-9-19-19-19z" />
      <circle cx="24" cy="26" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="34" cy="20" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="42" cy="28" r="2.2" fill="currentColor" stroke="none" />
    </>
  ),
  'category-place': (
    <>
      <path d="M32 50s14-14 14-24a14 14 0 1 0-28 0c0 10 14 24 14 24z" />
      <circle cx="32" cy="26" r="5" />
    </>
  ),
  'category-action': (
    <>
      <path d="M34 10 18 36h12l-4 18 20-28H34z" />
    </>
  ),
  'category-object': (
    <>
      <path d="M32 12l18 10v20l-18 10-18-10V22z" />
      <path d="M14 22l18 10 18-10" />
      <path d="M32 32v20" />
    </>
  ),
  'category-quality': (
    <>
      <path d="M32 12l6 14 15 2-11 11 3 15-13-7-13 7 3-15-11-11 15-2z" />
    </>
  ),
  'category-music': (
    <>
      <circle cx="22" cy="46" r="6" />
      <circle cx="44" cy="42" r="6" />
      <path d="M28 46V16l22-4v30" />
    </>
  ),
};

export function SceneIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
