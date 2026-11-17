"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { formatPrice, getProduct } from "@/data/products";
import { closeBag, removeFromCart, setQuantity, useBagOpen, useCart } from "@/lib/cart-store";
import CheckoutButton from "./CheckoutButton";
import ProductMedia from "./ProductMedia";

const ease = [0.22, 1, 0.36, 1] as const;

/** Slide-out bag: opens after adding to bag or tapping Cart, so shoppers never leave the page. */
export default function CartDrawer() {
  const open = useBagOpen();
  const cart = useCart();
  const pathname = usePathname();
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const lines = cart.flatMap((item) => {
    const product = getProduct(item.slug);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);

  // Close when navigating to another page.
  useEffect(() => {
    closeBag();
  }, [pathname]);

  // Lock page scroll, move focus in, close on Escape, and give focus back afterwards.
  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBag();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
      returnFocus.current?.focus?.();
    };
  }, [open, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120]">
          <motion.button
            type="button"
            aria-label="Close bag"
            className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeBag}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <p className="font-serif text-2xl">
                Your bag {count > 0 && <span className="text-muted">({count})</span>}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={closeBag}
                className="label link link-quiet text-ink"
              >
                Close
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
                <p className="font-serif text-3xl">Your bag is empty.</p>
                <Link href="/shop" className="btn" onClick={closeBag}>
                  Shop candles
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6" data-lenis-prevent>
                  <AnimatePresence initial={false}>
                    {lines.map(({ product, quantity }) => (
                      <motion.li
                        key={product.slug}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.4, ease }}
                        className="flex gap-4 border-b border-line py-5"
                      >
                        <Link
                          href={`/shop/${product.slug}`}
                          className="group relative block h-24 w-20 shrink-0 overflow-hidden bg-stone"
                          aria-label={product.name}
                        >
                          <ProductMedia product={product} sizes="80px" />
                        </Link>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex justify-between gap-3">
                            <Link href={`/shop/${product.slug}`} className="font-serif text-lg leading-tight">
                              {product.name}
                            </Link>
                            <span className="text-sm tabular-nums">
                              {formatPrice(product.price * quantity)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-line text-sm">
                              <button
                                type="button"
                                onClick={() => setQuantity(product.slug, quantity - 1)}
                                className="h-8 w-8 transition-colors hover:bg-stone"
                                aria-label={`Decrease quantity of ${product.name}`}
                              >
                                −
                              </button>
                              <span className="w-7 text-center tabular-nums" aria-live="polite">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => setQuantity(product.slug, quantity + 1)}
                                className="h-8 w-8 transition-colors hover:bg-stone"
                                aria-label={`Increase quantity of ${product.name}`}
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(product.slug)}
                              className="link link-quiet text-xs text-muted"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="border-t border-line px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <span className="label">Subtotal</span>
                    <span className="font-serif text-3xl tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">Shipping and taxes calculated at checkout.</p>
                  <CheckoutButton items={cart} />
                  <button
                    type="button"
                    onClick={closeBag}
                    className="link link-quiet mx-auto mt-4 block text-xs uppercase tracking-[0.18em] text-muted"
                  >
                    Keep shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
