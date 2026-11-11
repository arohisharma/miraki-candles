import { products } from "@/data/products";

const NOTES = Array.from(new Set(products.flatMap((p) => p.notes)));

export default function Marquee() {
  const row = [...NOTES, ...NOTES];
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-5" aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((n, i) => (
              <span key={i} className="flex items-center font-serif text-2xl italic text-muted sm:text-3xl">
                <span className="px-6 sm:px-9">{n}</span>
                <span className="text-sm not-italic text-gold">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
