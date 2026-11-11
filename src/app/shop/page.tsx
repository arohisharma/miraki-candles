import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-5xl">Shop</h1>
      <p className="mt-3 text-muted">All candles are hand-poured to order.</p>
      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
