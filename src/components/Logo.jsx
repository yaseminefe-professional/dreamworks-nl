export const LOGO_VIEWBOX = "0 0 120 100";

export const LOGO_ROOF_PATH =
  "M12,88 L12,70 L28,70 L28,52 L44,52 L44,34 L52,34 L60,12 L68,34 L76,34 L76,52 L92,52 L92,70 L108,70 L108,88 Z";

export function LogoMark({ className }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} fill="currentColor" aria-hidden="true">
      <path d={LOGO_ROOF_PATH} />
    </svg>
  );
}
