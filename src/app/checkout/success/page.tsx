import type { Metadata } from "next";
import Link from "next/link";
import ClearCart from "@/components/ClearCart";

export const metadata: Metadata = { title: "Order confirmed" };

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-10 sm:py-32">
      <ClearCart />
      <p className="label">Order confirmed</p>
      <h1 className="mt-5 text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]">
        Thank <em className="text-accent">you</em>.
      </h1>
      <p className="mt-8 max-w-md text-lg text-muted">
        Your order is confirmed. A receipt is on its way to your email.
      </p>
      <Link href="/shop" className="btn mt-12">Keep shopping</Link>
    </div>
  );
}
