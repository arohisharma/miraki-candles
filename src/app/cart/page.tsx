"use client";

import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";
import ProductMedia from "@/components/ProductMedia";
import { formatPrice, getProduct } from "@/data/products";
import { removeFromCart, setQuantity, useCart } from "@/lib/cart-store";

export default function CartPage() {
  const cart = useCart();

  const lines = cart.flatMap((item) => {
    const product = getProduct(item.slug);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-28 text-center">
        <p className="eyebrow">Your cart</p>
        <h1 className="mt-4 text-6xl leading-[0.95] sm:text-7xl">
          Nothing here <span className="italic text-clay">yet</span>
        </h1>
        <p className="mt-5 text-lg text-muted">Find a candle you love.</p>
        <Link href="/shop" className="btn mt-9">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow">Your cart</p>
      <h1 className="mt-3 text-6xl leading-[0.95] sm:text-7xl">
        Almost <span className="italic text-clay">yours</span>
      </h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
        <ul className="space-y-4">
          {lines.map(({ product, quantity }) => (
            <li key={product.slug} className="flex gap-5 rounded-[1.75rem] bg-cream/60 p-4">
              <Link
                href={`/shop/${product.slug}`}
                className="group relative block h-28 w-24 shrink-0 overflow-hidden rounded-t-full rounded-b-2xl"
                style={{ backgroundColor: product.tint }}
                aria-label={product.name}
              >
                <ProductMedia product={product} thumb sizes="96px" />
              </Link>
              <div className="flex flex-1 flex-col justify-between gap-3 py-1 sm:flex-row sm:items-center">
                <div>
                  <Link href={`/shop/${product.slug}`} className="font-serif text-2xl">
                    {product.name}
                  </Link>
                  <p className="text-sm text-muted">
                    {product.size} · {formatPrice(product.price)}
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center rounded-full bg-ivory ring-1 ring-line">
                    <button
                      type="button"
                      onClick={() => setQuantity(product.slug, quantity - 1)}
                      className="h-9 w-9 rounded-full transition-colors hover:bg-cream"
                      aria-label={`Decrease quantity of ${product.name}`}
                    >
                      −
                    </button>
                    <span className="w-7 text-center text-sm" aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(product.slug, quantity + 1)}
                      className="h-9 w-9 rounded-full transition-colors hover:bg-cream"
                      aria-label={`Increase quantity of ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                  <span className="w-20 text-right font-medium">
                    {formatPrice(product.price * quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.slug)}
                    className="link-underline text-sm text-muted hover:text-ink"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="rounded-[2rem] bg-cream p-7">
          <div className="flex items-baseline justify-between">
            <span className="text-sm uppercase tracking-[0.2em] text-muted">Subtotal</span>
            <span className="font-serif text-4xl">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-2 text-sm text-muted">Shipping and taxes calculated at checkout.</p>
          <CheckoutButton items={cart} />
        </div>
      </div>
    </div>
  );
}
