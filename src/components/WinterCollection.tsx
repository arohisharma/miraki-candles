import Image from "next/image";
import Link from "next/link";
import { winterCovers, winterGiftBoxes } from "@/data/products";

/** Four cover photos, edge to edge. */
export function WinterCovers() {
  return (
    <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
      {winterCovers.map((src, i) => (
        <div key={src} className="relative aspect-[3/4] overflow-hidden bg-stone lg:aspect-[9/14]">
          <Image
            src={src}
            alt={`The Miraki winter collection, photo ${i + 1}`}
            fill
            priority={i < 2}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/** The winter gift boxes, edge to edge. */
export function WinterGiftBoxes() {
  return (
    <section aria-label="Winter gift boxes" className="bg-paper">
      <div className="flex items-end justify-between gap-6 px-5 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-16">
        <h2 className="text-3xl leading-none tracking-[-0.02em] sm:text-5xl">
          Winter gift boxes, <em className="text-accent">ready to give.</em>
        </h2>
        <Link href="/winter" className="link hidden shrink-0 text-sm sm:block">
          See the collection →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-3 lg:grid-cols-6">
        {winterGiftBoxes.map((g) => (
          <div key={g.image} className="group relative aspect-[4/5] overflow-hidden bg-stone">
            <Image
              src={g.image}
              alt={g.alt}
              fill
              sizes="(min-width: 1024px) 17vw, (min-width: 768px) 34vw, 50vw"
              className="object-cover transition-transform duration-[1600ms] ease-pour group-hover:scale-[1.05]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
