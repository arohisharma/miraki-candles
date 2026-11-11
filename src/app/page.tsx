import Link from "next/link";
import Embers from "@/components/Embers";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import MoodPicker from "@/components/MoodPicker";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import ScrollWords from "@/components/ScrollWords";
import WaxDrip from "@/components/WaxDrip";
import { products } from "@/data/products";

const values = [
  {
    title: "100% soy wax",
    text: "A clean, plant-based wax that burns slowly and evenly.",
    tint: "#fbe5bb",
    icon: <path d="M12 3c4 4 6 7 6 10a6 6 0 1 1-12 0c0-3 2-6 6-10Zm0 0v18" />,
  },
  {
    title: "Kind to your air",
    text: "A gentle, low-soot glow for the rooms you live and breathe in.",
    tint: "#dfe8d3",
    icon: <path d="M4 14c3-6 9-9 16-9-1 8-5 13-11 13-2 0-4-1-5-4Zm0 6c2-5 5-8 9-10" />,
  },
  {
    title: "Handmade with love",
    text: "Every flower is sculpted and every jar poured by hand, in small batches.",
    tint: "#f9d9e3",
    icon: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.500-7 10-7 10Z" />,
  },
  {
    title: "Perfect for gifting",
    text: "Boxed and finished with care, ready to hand to someone you love.",
    tint: "#d6e8f4",
    icon: (
      <>
        <rect x="4" y="10" width="16" height="10" rx="1.5" />
        <path d="M3 7h18v3H3zM12 7v13M12 7c-1.500-3-5-3-5-1s3 1 5 1Zm0 0c1.500-3 5-3 5-1s-3 1-5 1Z" />
      </>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* Collection */}
      <section className="mx-auto max-w-7xl px-6 pb-28 pt-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The collection</p>
          <h2 className="mt-4 text-5xl leading-[1.02] sm:text-7xl">
            Little sculptures that <span className="italic text-clay">glow</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-muted">
            Each one shaped, poured and finished by hand. No two are ever quite the same.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1} className={i % 2 === 1 ? "lg:mt-14" : ""}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 text-center" delay={0.1}>
          <Link href="/shop" className="btn">Shop all candles</Link>
        </Reveal>
      </section>

      <MoodPicker />

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The Miraki way</p>
          <h2 className="mt-4 text-5xl leading-[1.02] sm:text-7xl">
            Made slowly, <span className="italic text-clay">on purpose</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div
                className="group h-full rounded-[2rem] p-8 transition-transform duration-700 ease-pour hover:-translate-y-2"
                style={{ backgroundColor: v.tint }}
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-ivory transition-transform duration-700 ease-pour group-hover:rotate-12 group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-clay"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      {v.icon}
                    </svg>
                  </div>
                  <span className="font-serif text-4xl italic text-ink/25">0{i + 1}</span>
                </div>
                <h3 className="mt-10 text-3xl leading-tight">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/70">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story: lights up as you scroll */}
      <section className="mx-auto max-w-5xl px-6 pb-28 text-center">
        <p className="eyebrow">Our story</p>
        <ScrollWords
          className="mt-8 font-serif text-4xl leading-[1.15] sm:text-6xl"
          text="Miraki began with a simple belief: that the best moments are the slow ones. So we make candles the slow way, by hand, one small batch at a time."
        />
        <Reveal className="mt-10">
          <Link href="/about" className="link-underline text-sm font-medium uppercase tracking-[0.22em] text-clay">
            Read our story →
          </Link>
        </Reveal>
      </section>

      {/* Closing call to action */}
      <section className="bg-sunset relative mx-3 overflow-hidden rounded-[2.5rem] text-center text-ivory sm:mx-6 sm:rounded-[3.5rem]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="aurora left-[5%] top-[10%] h-[28rem] w-[28rem] bg-[#f2a83b]/55" />
          <span className="aurora right-[0%] top-[-10%] h-[30rem] w-[30rem] bg-[#e2557f]/60" style={{ animationDelay: "-8s" }} />
        </div>
        <Embers count={16} />
        <WaxDrip className="absolute inset-x-0 top-0 z-20" />
        <Reveal className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-44 sm:pb-32 sm:pt-60">
          <p className="eyebrow text-ivory/85!">Begin your ritual</p>
          <h2 className="mt-5 text-5xl leading-[0.98] sm:text-8xl">
            Make every evening feel like <span className="italic text-[#ffe2a8]">home.</span>
          </h2>
          <Link href="/shop" className="btn btn-light mt-10">Shop the collection</Link>
        </Reveal>
      </section>
    </>
  );
}
