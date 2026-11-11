import type { Metadata } from "next";
import Link from "next/link";
import ClearCart from "@/components/ClearCart";

export const metadata: Metadata = { title: "Order confirmed" };

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <ClearCart />
      <h1 className="text-5xl">Thank you!</h1>
      <p className="mt-4 text-muted">
        Your order is confirmed. A receipt is on its way to your email.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block bg-accent px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-accent-dark"
      >
        Keep shopping
      </Link>
    </div>
  );
}
