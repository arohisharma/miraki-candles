import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import ProductMedia from "./ProductMedia";
import Tilt from "./Tilt";

const ARCH = "rounded-t-full rounded-b-[1.75rem]";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <Tilt max={7} rounded={ARCH}>
        <div
          className={`relative aspect-[3/4] overflow-hidden shadow-[0_30px_60px_-32px_rgba(51,34,28,0.5)] transition-shadow duration-700 group-hover:shadow-[0_44px_80px_-30px_rgba(200,100,60,0.6)] ${ARCH}`}
          style={{ backgroundColor: product.tint }}
        >
          <ProductMedia product={product} />
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-4 whitespace-nowrap rounded-full bg-ivory px-5 py-2 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-ink opacity-0 shadow-lg transition-all duration-700 ease-pour group-hover:translate-y-0 group-hover:opacity-100">
            View candle →
          </span>
        </div>
      </Tilt>
      <div className="mt-6 text-center">
        <p className="eyebrow">{product.mood}</p>
        <h3 className="mt-2 text-2xl sm:text-[1.7rem]">{product.name}</h3>
        <p className="mt-1 text-sm text-muted">{product.tagline}</p>
        <p className="mt-3 text-sm font-medium tracking-wide">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
