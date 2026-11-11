import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import ProductMedia from "@/components/ProductMedia";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import { formatPrice, getProduct, products } from "@/data/products";

const ARCH = "rounded-t-full rounded-b-[2.5rem]";

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
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <Link href="/shop" className="link-underline text-xs font-medium uppercase tracking-[0.22em] text-muted hover:text-ink">
          ← Back to shop
        </Link>

        <div className="mt-10 grid gap-14 md:grid-cols-2 md:items-center lg:gap-24">
          <Reveal className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full opacity-70 blur-3xl"
              style={{ backgroundColor: product.tint }}
            />
            <Tilt max={6} rounded={ARCH} className="relative mx-auto max-w-md">
              <div className={`bg-ivory p-2 shadow-[0_50px_90px_-35px_rgba(51,34,28,0.55)] ${ARCH}`}>
                <div
                  className={`group relative aspect-[3/4] overflow-hidden ${ARCH}`}
                  style={{ backgroundColor: product.tint }}
                >
                  <ProductMedia product={product} sizes="(min-width: 768px) 28rem, 100vw" priority />
                </div>
              </div>
            </Tilt>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">{product.mood} · {product.size}</p>
              <h1 className="mt-3 text-6xl leading-[0.95] sm:text-7xl">{product.name}</h1>
              <p className="mt-4 font-serif text-2xl italic text-clay">{product.tagline}</p>
              <p className="mt-6 text-3xl">{formatPrice(product.price)}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{product.description}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {product.notes.map((n) => (
                  <li
                    key={n}
                    className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em]"
                    style={{ backgroundColor: product.tint }}
                  >
                    {n}
                  </li>
                ))}
              </ul>
              <dl className="mt-8 grid max-w-md grid-cols-2 gap-4 border-y border-line py-5">
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted">Size</dt>
                  <dd className="mt-1 font-serif text-2xl">{product.size}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted">Burn time</dt>
                  <dd className="mt-1 font-serif text-2xl">{product.burnTime}</dd>
                </div>
              </dl>
              <AddToCartButton slug={product.slug} />
            </Reveal>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-10">
        <Reveal>
          <h2 className="text-center text-5xl sm:text-6xl">
            You may also <span className="italic text-clay">love</span>
          </h2>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-5xl gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
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
