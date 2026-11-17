import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProduct } from "@/data/products";
import { season } from "@/lib/season";
import Reveal from "./Reveal";

/** Gifts by who you are giving to, each opening straight onto a candle. */
export default function GiftGuide() {
  const g = season.gifts;
  return (
    <section className="bg-blush">
      <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-10 sm:py-28">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl text-6xl leading-[0.9] tracking-[-0.03em] sm:text-8xl">
            {g.title} <em className="text-accent">{g.accent}</em>.
          </h2>
          <p className="label">✻ Gift-ready, always</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {g.items.map((item, i) => {
            const product = getProduct(item.pair);
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <Link href={product ? `/shop/${product.slug}` : "/shop"} className="group block" data-cursor="Gift">
                  <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[1600ms] ease-pour group-hover:scale-[1.05]"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute inset-x-5 bottom-5 text-paper">
                      <h3 className="text-3xl leading-tight">{item.title}</h3>
                      {product && (
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-paper/85">
                          {product.name} · {formatPrice(product.price)} →
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
