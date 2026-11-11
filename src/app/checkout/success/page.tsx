import type { Metadata } from "next";
import Link from "next/link";
import ClearCart from "@/components/ClearCart";

export const metadata: Metadata = { title: "Order confirmed" };

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-center">
      <ClearCart />
      <p className="eyebrow">Order confirmed</p>
      <h1 className="mt-4 text-6xl leading-[0.95] sm:text-7xl">
        Thank <span className="italic text-clay">you</span>
      </h1>
      <p className="mt-5 text-lg text-muted">
        Your order is confirmed. A receipt is on its way to your email.
      </p>
      <Link href="/shop" className="btn mt-9">Keep shopping</Link>
    </div>
  );
}
