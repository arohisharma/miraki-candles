import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/shop" className="text-sm text-muted hover:text-foreground">
        ← Back to shop
      </Link>
      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <div
          className="aspect-square rounded-sm"
          style={{ backgroundColor: product.color }}
          aria-hidden
        />
        <div>
          <h1 className="text-5xl">{product.name}</h1>
          <p className="mt-2 text-muted">{product.tagline}</p>
          <p className="mt-6 text-2xl">{formatPrice(product.price)}</p>
          <p className="mt-6 leading-relaxed">{product.description}</p>
          <dl className="mt-8 space-y-2 text-sm">
            <div className="flex gap-4"><dt className="w-24 text-muted">Size</dt><dd>{product.size}</dd></div>
            <div className="flex gap-4"><dt className="w-24 text-muted">Burn time</dt><dd>{product.burnTime}</dd></div>
            <div className="flex gap-4"><dt className="w-24 text-muted">Notes</dt><dd>{product.notes.join(" · ")}</dd></div>
          </dl>
          <AddToCartButton slug={product.slug} />
        </div>
      </div>
    </div>
  );
}
