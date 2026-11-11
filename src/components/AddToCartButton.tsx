"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { addToCart } from "@/lib/cart-store";

export default function AddToCartButton({ slug }: { slug: string }) {
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => {
          addToCart(slug);
          setAdded(true);
        }}
        className="btn w-full sm:w-auto sm:min-w-64"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={added ? "added" : "add"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {added ? "Added to cart ✓" : "Add to cart"}
          </motion.span>
        </AnimatePresence>
      </button>
      <p className="mt-3 h-5 text-sm text-muted" aria-live="polite">
        {added && (
          <>
            <Link href="/cart" className="link-underline text-foreground">
              View your cart →
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
