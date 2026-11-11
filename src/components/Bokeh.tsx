// Soft out-of-focus fairy lights. Deterministic so server and client match.
const LIGHTS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 41 + 7) % 100,
  top: (i * 29 + 13) % 100,
  size: 36 + ((i * 23) % 100),
  duration: 7 + ((i * 3) % 7),
  delay: -((i * 2) % 9),
  bx: ((i * 17) % 60) - 30,
  by: -(10 + ((i * 11) % 40)),
}));

export default function Bokeh({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {LIGHTS.map((l, i) => (
        <span
          key={i}
          className="bokeh"
          style={
            {
              left: `${l.left}%`,
              top: `${l.top}%`,
              width: l.size,
              height: l.size,
              animationDuration: `${l.duration}s`,
              animationDelay: `${l.delay}s`,
              "--bx": `${l.bx}px`,
              "--by": `${l.by}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
