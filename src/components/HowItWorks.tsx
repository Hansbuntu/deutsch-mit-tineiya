import { useState } from 'react';
import { Icon, type UiIconName } from './Icon';

const STEPS: { icon: UiIconName; title: string; text: string }[] = [
  {
    icon: 'sparkles',
    title: 'Today’s pick',
    text: 'Each visit suggests one thing to do — picked from your mistakes, the skills you haven’t used lately and what you haven’t tried. “Something else” shows another idea.',
  },
  {
    icon: 'cards',
    title: 'Study a topic',
    text: 'Cards come with a quick question. Answer right twice and a card counts as learned; get one wrong and you try again until it’s right.',
  },
  {
    icon: 'repeat',
    title: 'Review',
    text: 'What you’ve studied comes back to be checked — tomorrow, then in three days, then a week. Anything you missed comes first.',
  },
  {
    icon: 'mic',
    title: 'Speak and listen',
    text: 'Tap the mic, say the sentence, tap Done. Listening practice plays German for you to write down.',
  },
  {
    icon: 'chart',
    title: 'Your progress',
    text: 'See what you’ve done on the Progress page — and back it up there, so it’s never lost.',
  },
];

export function HowItWorksList() {
  return (
    <ol className="how-list">
      {STEPS.map((step) => (
        <li key={step.title}>
          <span className="how-icon" aria-hidden="true">
            <Icon name={step.icon} />
          </span>
          <span>
            <strong>{step.title}</strong>
            <span>{step.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

const DONE_KEY = 'deutsch-mit-tineiya:welcome-done';

function welcomeDone(): boolean {
  try {
    return localStorage.getItem(DONE_KEY) === '1';
  } catch {
    return false;
  }
}

/** First-visit welcome on Home: how the app works, until it's dismissed. */
export function Welcome() {
  const [open, setOpen] = useState(() => !welcomeDone());
  if (!open) return null;

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(DONE_KEY, '1');
    } catch {
      // not remembered — it shows again next time, which is harmless
    }
  };

  return (
    <section className="section rise-2" aria-labelledby="welcome-title">
      <div className="surface welcome-card">
        <div className="welcome-head">
          <h2 className="section-title" id="welcome-title">
            Willkommen — here’s how it works
          </h2>
          <button type="button" className="btn btn-primary btn-sm" onClick={dismiss}>
            Got it
          </button>
        </div>
        <HowItWorksList />
      </div>
    </section>
  );
}
