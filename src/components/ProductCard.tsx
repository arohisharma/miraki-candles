import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import ProductMedia from "./ProductMedia";
import QuickAdd from "./QuickAdd";

export default function ProductCard({ product, badge, flush }: { product: Product; badge?: string; flush?: boolean }) {
  const href = `/shop/${product.slug}`;
  return (
    <div className="group">
      <div className={`relative overflow-hidden bg-stone ${flush ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
        <Link href={href} aria-label={product.name} data-cursor="View" className="absolute inset-0">
          <ProductMedia product={product} />
        </Link>
        {badge && (
          <span className="pointer-events-none absolute left-3 top-3 bg-paper px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-accent">
            {badge}
          </span>
        )}
        <QuickAdd
          slug={product.slug}
          label={`Add to bag — ${formatPrice(product.price)}`}
          className="absolute inset-x-3 bottom-3 translate-y-2 bg-paper/95 py-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink opacity-0 backdrop-blur transition-all duration-500 ease-pour hover:bg-ink hover:text-paper focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100"
        />
      </div>
      <Link href={href} className={flush ? "flex flex-col items-center gap-1 px-3 py-5 text-center" : "mt-4 flex items-baseline justify-between gap-4"}>
        <h3 className="text-xl leading-tight">
          <span className="link link-quiet">{product.name}</span>
        </h3>
        <span className="text-sm tabular-nums">{formatPrice(product.price)}</span>
      </Link>
    </div>
  );
}
