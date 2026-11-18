import Link from "next/link";
import { season } from "@/lib/season";
import { winterProducts } from "@/data/products";
import ShopByMoment from "./ShopByMoment";
import { WinterCovers } from "./WinterCollection";

/** "New collection, just dropped": a quiet heading, then the winter covers edge to edge. */
export default function JustDropped() {
  const d = season.drop;

  return (
    <section aria-label="New collection" className="bg-paper">
      <div className="mx-auto flex max-w-[90rem] items-end justify-between gap-6 px-5 pb-8 pt-20 sm:px-10 sm:pb-10 sm:pt-28">
        <h2 className="flex items-center gap-3 text-3xl leading-none tracking-[-0.02em] sm:gap-4 sm:text-5xl">
          <span className="relative flex h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5">
            <span className="hotspot-ring absolute inset-0 rounded-full bg-accent" />
            <span className="relative h-full w-full rounded-full bg-accent" />
          </span>
          <span>
            {d.title} <em className="text-accent">{d.accent}</em>
          </span>
        </h2>
        <Link href="/winter" className="link hidden shrink-0 text-sm sm:block" data-cursor="Shop">
          {d.cta} →
        </Link>
      </div>
      <WinterCovers />
      <ShopByMoment products={winterProducts} viewAllHref="/winter" />
    </section>
  );
}
