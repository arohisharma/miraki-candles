import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import ProductMedia from "@/components/ProductMedia";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import { formatPrice, getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  return product ? { title: product.name, description: product.tagline } : {};
}

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/shop" className="link-underline text-xs uppercase tracking-[0.25em] text-muted hover:text-foreground">
          ← Back to shop
        </Link>

        <div className="mt-10 grid gap-14 md:grid-cols-2 md:items-center">
          <Reveal>
            <Tilt max={6} rounded="rounded-3xl">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-espresso shadow-[0_40px_80px_-30px_rgba(43,33,24,0.7)]">
                <ProductMedia
                  product={product}
                  variant="page"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              </div>
            </Tilt>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">{product.mood} · {product.size}</p>
              <h1 className="mt-3 text-5xl sm:text-7xl">{product.name}</h1>
              <p className="mt-3 font-serif text-2xl italic text-muted">{product.tagline}</p>
              <p className="mt-6 text-3xl">{formatPrice(product.price)}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md leading-relaxed text-muted">{product.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {product.notes.map((n) => (
                  <li key={n} className="rounded-full bg-surface px-4 py-1.5 text-xs uppercase tracking-[0.2em] ring-1 ring-gold/40">
                    {n}
                  </li>
                ))}
              </ul>
              <dl className="mt-8 grid max-w-md grid-cols-2 gap-4 border-y border-border py-5 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted">Size</dt>
                  <dd className="mt-1 font-serif text-xl">{product.size}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted">Burn time</dt>
                  <dd className="mt-1 font-serif text-xl">{product.burnTime}</dd>
                </div>
              </dl>
              <AddToCartButton slug={product.slug} />
            </Reveal>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <Reveal>
          <h2 className="text-center text-4xl sm:text-5xl">
            You may also <span className="italic text-accent">love</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
