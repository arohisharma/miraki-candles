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
        eyebrow={`The collection — ${products.length} candles`}
        title="Shop"
        subtitle="Every candle is poured to order, by hand, in small batches."
      />
      <div className="mx-auto max-w-[90rem] px-5 pb-28 sm:px-10">
        <div className="grid gap-x-6 gap-y-14 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
