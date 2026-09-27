import type { ReactElement } from 'react';

// Interface icons (navigation, actions, states). Distinct from SceneIcon,
// which draws the illustrative pictures on cards.
export type UiIconName =
  | 'home'
  | 'sparkles'
  | 'chart'
  | 'sun'
  | 'moon'
  | 'arrow-right'
  | 'arrow-left'
  | 'chevron-right'
  | 'book-open'
  | 'mic'
  | 'volume'
  | 'check'
  | 'x'
  | 'refresh'
  | 'eye'
  | 'calendar'
  | 'cards'
  | 'target'
  | 'trophy'
  | 'info'
  | 'lightbulb'
  | 'type'
  | 'flip'
  | 'notebook';

const paths: Record<UiIconName, ReactElement> = {
  home: (
    <>
      <path d="M4 11.2 12 4.5l8 6.7" />
      <path d="M6 9.8V19.5h12V9.8" />
      <path d="M10 19.5v-5h4v5" />
    </>
  ),
  sparkles: (
    <>
      <path d="M11 3.5l1.7 4.6 4.6 1.7-4.6 1.7L11 16.1l-1.7-4.6-4.6-1.7 4.6-1.7z" />
      <path d="M18.5 14.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
  chart: (
    <>
      <path d="M5 19.5v-7M11 19.5V5M17 19.5v-10" />
      <path d="M3 19.5h18" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.8v2M12 19.2v2M4.5 4.5l1.4 1.4M18.1 18.1l1.4 1.4M2.8 12h2M19.2 12h2M4.5 19.5l1.4-1.4M18.1 5.9l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.3A8 8 0 1 1 9.7 4a6.3 6.3 0 0 0 10.3 10.3z" />,
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-left': <path d="M19 12H5M11 6l-6 6 6 6" />,
  'chevron-right': <path d="m9.5 6 6 6-6 6" />,
  'book-open': (
    <>
      <path d="M12 6.6C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5c-3.5-.5-6.5 0-8.5 1.6z" />
      <path d="M12 6.6v12.9" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
    </>
  ),
  volume: (
    <>
      <path d="M11 5 6.5 8.8H3.5v6.4h3L11 19z" />
      <path d="M15.3 8.7a4.8 4.8 0 0 1 0 6.6M18.2 5.8a9 9 0 0 1 0 12.4" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  x: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  refresh: (
    <>
      <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
      <path d="M19.5 4.5v4.8h-4.8" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  cards: (
    <>
      <rect x="3" y="7.5" width="13" height="13" rx="2.5" />
      <path d="M8 4h10.5A2.5 2.5 0 0 1 21 6.5V17" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5.5a4 4 0 0 1-8 0z" />
      <path d="M8 6H5.5a2.5 2.5 0 0 0 2.6 4M16 6h2.5a2.5 2.5 0 0 1-2.6 4" />
      <path d="M12 13.5V17M9 20.5h6M10 17h4v3.5h-4z" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.8v.1" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z" />
    </>
  ),
  type: <path d="M5 7V5h14v2M12 5v14M9 19h6" />,
  flip: (
    <>
      <path d="M4.5 12a7.5 7.5 0 0 1 13-5.1M19.5 12a7.5 7.5 0 0 1-13 5.1" />
      <path d="M18 3.5v4h-4M6 20.5v-4h4" />
    </>
  ),
  notebook: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M9 3v18M12.5 8h3.5M12.5 12h3.5" />
    </>
  ),
};

export function Icon({ name, className }: { name: UiIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
