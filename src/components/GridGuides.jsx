const COLUMNS = 6;

export default function GridGuides() {
  return (
    <div className="grid-guides" aria-hidden="true">
      {Array.from({ length: COLUMNS + 1 }).map((_, i) => (
        <span key={i} className="grid-guides__line" style={{ left: `${(i / COLUMNS) * 100}%` }} />
      ))}
    </div>
  );
}
