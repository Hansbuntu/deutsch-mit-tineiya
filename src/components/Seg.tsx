/**
 * Segmented control — a small radio group styled as joined buttons. Dark by default,
 * for the generator's console; `light` matches ordinary page surfaces.
 */
export function Seg<T extends string>({
  value,
  options,
  onChange,
  label,
  light = false,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  label: string;
  light?: boolean;
}) {
  return (
    <div className={`seg${light ? ' seg-light' : ''}`} role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          className={`seg-btn${value === o.value ? ' active' : ''}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
