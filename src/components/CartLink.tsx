"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { getProduct } from "@/data/products";
import { useCart } from "@/lib/cart-store";

export default function CartLink() {
  const count = useCart().reduce((n, i) => n + (getProduct(i.slug) ? i.quantity : 0), 0);

  return (
    <Link href="/cart" className="link-underline transition-colors hover:text-foreground">
      Cart
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 1.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 14 }}
          className="ml-1.5 inline-block rounded-full bg-gold px-1.5 text-[0.65rem] leading-5 text-espresso"
        >
          {count}
        </motion.span>
      )}
    </Link>
  );
}
