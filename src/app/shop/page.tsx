import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="The collection"
        title="Shop"
        subtitle="Every candle is hand-poured to order, in small batches."
      />
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.1}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
