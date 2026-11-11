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
      <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-10 sm:py-32">
        <p className="label">Cart</p>
        <h1 className="mt-5 text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]">
          Nothing here <em className="text-accent">yet</em>.
        </h1>
        <Link href="/shop" className="btn mt-12">Shop candles</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[90rem] px-5 pb-28 pt-12 sm:px-10 sm:pt-20">
      <p className="label">Cart</p>
      <h1 className="mt-5 text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]">
        Almost <em className="text-accent">yours</em>.
      </h1>

      <div className="mt-14 grid gap-14 lg:grid-cols-12">
        <ul className="border-t border-line lg:col-span-8">
          {lines.map(({ product, quantity }) => (
            <li key={product.slug} className="flex gap-5 border-b border-line py-6">
              <Link
                href={`/shop/${product.slug}`}
                className="group relative block h-32 w-24 shrink-0 overflow-hidden bg-stone sm:h-36 sm:w-28"
                aria-label={product.name}
              >
                <ProductMedia product={product} sizes="112px" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link href={`/shop/${product.slug}`} className="font-serif text-3xl leading-none">
                      {product.name}
                    </Link>
                    <p className="mt-2 text-sm text-muted">{product.size}</p>
                  </div>
                  <span className="tabular-nums">{formatPrice(product.price * quantity)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-line">
                    <button
                      type="button"
                      onClick={() => setQuantity(product.slug, quantity - 1)}
                      className="h-9 w-9 transition-colors hover:bg-stone"
                      aria-label={`Decrease quantity of ${product.name}`}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(product.slug, quantity + 1)}
                      className="h-9 w-9 transition-colors hover:bg-stone"
                      aria-label={`Increase quantity of ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.slug)}
                    className="link link-quiet text-sm text-muted"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="lg:col-span-4">
          <div className="border-t border-ink pt-6 lg:sticky lg:top-24">
            <div className="flex items-baseline justify-between">
              <span className="label">Subtotal</span>
              <span className="font-serif text-5xl">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-3 text-sm text-muted">Shipping and taxes calculated at checkout.</p>
            <CheckoutButton items={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
