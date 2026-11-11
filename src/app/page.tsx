import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Small-batch · Hand-poured</p>
          <h1 className="mt-6 text-5xl leading-tight sm:text-7xl">Light a little calm.</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Miraki candles are poured by hand in small batches using natural wax and carefully
            blended fragrance.
          </p>
          <Link
            href="/shop"
            className="mt-10 inline-block bg-accent px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-accent-dark"
          >
            Shop the collection
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-4xl">Favourites</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
