import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import ProductMedia from "./ProductMedia";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone">
        <ProductMedia product={product} />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-2xl leading-tight">
          <span className="link link-quiet">{product.name}</span>
        </h3>
        <span className="text-sm tabular-nums">{formatPrice(product.price)}</span>
      </div>
      <p className="mt-1 text-sm text-muted">{product.tagline}</p>
    </Link>
  );
}
