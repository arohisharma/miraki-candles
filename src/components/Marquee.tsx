import { products } from "@/data/products";

const NOTES = Array.from(new Set(products.flatMap((p) => p.notes)));

/** A slightly tilted ribbon of scent notes that overlaps the bottom of the hero. */
export default function Marquee() {
  return (
    <div className="relative z-20 -mt-9 overflow-hidden py-6" aria-hidden>
      <div className="-mx-6 -rotate-[1.5deg] bg-marigold py-4 shadow-[0_18px_40px_-18px_rgba(51,34,28,0.5)]">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {[...NOTES, ...NOTES].map((n, i) => (
                <span key={i} className="flex items-center font-serif text-2xl italic text-ink sm:text-3xl">
                  <span className="px-6 sm:px-8">{n}</span>
                  <span className="text-base not-italic text-ivory">✺</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
