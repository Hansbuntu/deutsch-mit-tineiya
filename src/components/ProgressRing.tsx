export function ProgressRing({ value, max, size = 84 }: { value: number; max: number; size?: number }) {
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const fraction = max > 0 ? Math.min(value / max, 1) : 0;
  // Keep a sliver visible at 0 so the ring reads as a gauge, not an empty circle.
  const shown = Math.max(fraction, 0.015);

  return (
    <svg className="ring" viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${value} of ${max}`}>
      <circle className="ring-track" cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} />
      <circle
        className="ring-fill"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - shown)}
      />
    </svg>
  );
}
