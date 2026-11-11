import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import CandleVisual from "./CandleVisual";
import Embers from "./Embers";
import Tilt from "./Tilt";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <Tilt max={8}>
        <div className="relative overflow-hidden rounded-2xl bg-espresso shadow-[0_24px_50px_-24px_rgba(43,33,24,0.65)] transition-shadow duration-700 group-hover:shadow-[0_34px_70px_-22px_rgba(201,166,107,0.5)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(201,166,107,0.3),transparent_62%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
          <Embers count={6} />
          <div className="relative flex aspect-[4/5] items-center justify-center">
            <CandleVisual
              color={product.color}
              name={product.name}
              className="candle-float w-[58%] transition-transform duration-700 [transition-timing-function:var(--ease-pour)] group-hover:scale-105"
            />
          </div>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-3 whitespace-nowrap rounded-full border border-gold/50 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-gold-light opacity-0 transition-all duration-700 [transition-timing-function:var(--ease-pour)] group-hover:translate-y-0 group-hover:opacity-100">
            View candle
          </span>
        </div>
      </Tilt>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-2xl">{product.name}</h3>
        <span className="text-sm tracking-wide text-muted">{formatPrice(product.price)}</span>
      </div>
      <p className="mt-1 text-sm text-muted">{product.tagline}</p>
    </Link>
  );
}
