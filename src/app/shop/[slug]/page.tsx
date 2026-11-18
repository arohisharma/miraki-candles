import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import ProductMedia from "@/components/ProductMedia";
import Reveal from "@/components/Reveal";
import { formatPrice, getProduct, products } from "@/data/products";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.tagline}. ${product.description}`,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: `${product.name} — Miraki`,
      description: product.tagline,
      images: product.image ? [{ url: product.image, alt: `${product.name} candle` }] : undefined,
    },
  };
}

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  // Structured data so search engines can show price and availability.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? [product.image.startsWith("http") ? product.image : `${SITE_URL}${product.image}`] : undefined,
    brand: { "@type": "Brand", name: "Miraki" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/shop/${product.slug}`,
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };

  const details = [
    ["Size", product.size],
    ["Burn time", product.burnTime],
    ["Scent", product.notes.join(", ")],
    ["Mood", product.mood],
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto max-w-[90rem] px-5 pb-24 pt-8 sm:px-10">
        <Link href="/shop" className="link link-quiet label">← Shop</Link>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="md:sticky md:top-24 md:self-start">
            <div className="group relative aspect-[4/5] overflow-hidden bg-stone">
              <ProductMedia product={product} sizes="(min-width: 768px) 50vw, 100vw" priority />
            </div>
            {product.gallery && product.gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {product.gallery.slice(1).map((src, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden bg-stone">
                    <Image src={src} alt={`${product.name}, photo ${i + 2}`} fill sizes="20vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </Reveal>

          <div className="md:py-10">
            <Reveal>
              <p className="label">{product.mood}</p>
              <h1 className="mt-4 text-6xl leading-[0.9] tracking-[-0.03em] sm:text-8xl">
                {product.name}
              </h1>
              <p className="mt-4 font-serif text-lg italic sm:text-xl">{product.tagline}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">{product.description}</p>
              <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
                <span className="font-serif text-3xl">{formatPrice(product.price)}</span>
                <AddToCartButton slug={product.slug} />
              </div>
              <dl className="mt-12">
                {details.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-t border-line py-4 text-sm">
                    <dt className="label">{k}</dt>
                    <dd className="text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[90rem] px-5 pb-28 sm:px-10">
        <Reveal className="border-t border-line pt-10">
          <h2 className="text-5xl tracking-[-0.03em] sm:text-6xl">You may also like</h2>
        </Reveal>
        <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
