/**
 * A gauge ring. `value` fills in gold; the optional `secondary` (e.g. words
 * practised but not yet learned) shows as a lighter band underneath, so the ring
 * moves from the first practice rather than only once something is learned.
 */
export function ProgressRing({
  value,
  max,
  secondary,
  size = 84,
}: {
  value: number;
  max: number;
  secondary?: number;
  size?: number;
}) {
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const fractionOf = (n: number) => (max > 0 ? Math.min(n / max, 1) : 0);
  // Keep a sliver visible at 0 so the ring reads as a gauge, not an empty circle.
  const shown = Math.max(fractionOf(value), 0.015);
  const label = secondary !== undefined ? `${value} of ${max} learned, ${secondary} practised` : `${value} of ${max}`;

  const arc = (className: string, fraction: number) => (
    <circle
      className={className}
      cx={size / 2}
      cy={size / 2}
      r={radius}
      fill="none"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeDasharray={circumference}
      strokeDashoffset={circumference * (1 - fraction)}
    />
  );

  return (
    <svg className="ring" viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label}>
      <circle className="ring-track" cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} />
      {secondary !== undefined && secondary > 0 && arc('ring-secondary', Math.max(fractionOf(secondary), 0.015))}
      {arc('ring-fill', shown)}
    </svg>
  );
}
