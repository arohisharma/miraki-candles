import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div
        className="aspect-square rounded-sm transition-opacity group-hover:opacity-90"
        style={{ backgroundColor: product.color }}
        aria-hidden
      />
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-xl">{product.name}</h3>
        <span className="text-sm text-muted">{formatPrice(product.price)}</span>
      </div>
      <p className="mt-1 text-sm text-muted">{product.tagline}</p>
    </Link>
  );
}
