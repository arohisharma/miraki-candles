// Deterministic positions so server and client render identically.
const EMBERS = Array.from({ length: 24 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 2 + ((i * 5) % 4),
  duration: 9 + ((i * 7) % 10),
  delay: -((i * 5) % 14),
  drift: ((i * 13) % 50) - 25,
}));

export default function Embers({ count = 18, className = "" }: { count?: number; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {EMBERS.slice(0, count).map((e, i) => (
        <span
          key={i}
          className="ember"
          style={
            {
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
              "--drift": `${e.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
