"use client";

import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";
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
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-5xl">Your cart is empty</h1>
        <p className="mt-4 text-muted">Find a scent you love.</p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-accent px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-accent-dark"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-5xl">Your cart</h1>

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {lines.map(({ product, quantity }) => (
          <li key={product.slug} className="flex gap-5 py-6">
            <Link
              href={`/shop/${product.slug}`}
              className="h-24 w-24 shrink-0 rounded-sm"
              style={{ backgroundColor: product.color }}
              aria-label={product.name}
            />
            <div className="flex flex-1 flex-col justify-between sm:flex-row">
              <div>
                <Link href={`/shop/${product.slug}`} className="font-serif text-xl">
                  {product.name}
                </Link>
                <p className="text-sm text-muted">
                  {product.size} · {formatPrice(product.price)}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-6 sm:mt-0">
                <div className="flex items-center border border-border">
                  <button
                    type="button"
                    onClick={() => setQuantity(product.slug, quantity - 1)}
                    className="px-3 py-1 hover:bg-surface"
                    aria-label={`Decrease quantity of ${product.name}`}
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(product.slug, quantity + 1)}
                    className="px-3 py-1 hover:bg-surface"
                    aria-label={`Increase quantity of ${product.name}`}
                  >
                    +
                  </button>
                </div>
                <span className="w-20 text-right">{formatPrice(product.price * quantity)}</span>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.slug)}
                  className="text-sm text-muted underline hover:text-foreground"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 ml-auto max-w-xs">
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-1 text-sm text-muted">Shipping and taxes calculated at checkout.</p>
        <CheckoutButton items={cart} />
      </div>
    </div>
  );
}
