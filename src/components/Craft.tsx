import Image from "next/image";
import { unsplash } from "@/lib/unsplash";
import Reveal from "./Reveal";

// PLACEHOLDER stock photos. Swap for the client's own studio photography before launch.
const steps = [
  { n: "01", title: "Melted", line: "Soy wax, warmed low and slow.", image: unsplash("photo-1677091508049-d8ae041b1582", 1000), alt: "Wax melting in a pot" },
  { n: "02", title: "Poured", line: "Into the mould, by hand.", image: unsplash("photo-1788537404964-cfa2d4d21fed", 1000), alt: "Wax being poured into a mould" },
  { n: "03", title: "Set", line: "Left to settle, then gently freed.", image: unsplash("photo-1711207354630-20b977c4bfc3", 1000), alt: "Set wax in moulds" },
  { n: "04", title: "Wrapped", line: "Boxed, with a bow.", image: unsplash("photo-1669913574933-4289cf92e05c", 1000), alt: "A gift box tied with a white bow" },
];

/** How a Miraki candle is made, from melted wax to a bow. */
export default function Craft() {
  return (
    <section aria-label="How it's made" className="bg-blush">
      <Reveal className="flex flex-col gap-3 px-5 pb-6 pt-12 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pb-8 sm:pt-16">
        <h2 className="text-3xl leading-none tracking-[-0.02em] sm:text-5xl">
          Poured slowly. <em className="text-accent">Wrapped with care.</em>
        </h2>
        <p className="text-sm text-muted">100% soy wax · hand-poured · small batches</p>
      </Reveal>

      <ol className="grid grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.n} className="group relative aspect-[3/4] overflow-hidden bg-stone">
            <Image
              src={s.image}
              alt={s.alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-[1800ms] ease-pour group-hover:scale-[1.05]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#2a0f16]/60 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-paper sm:p-6">
              <p className="text-xs tabular-nums text-paper/70">{s.n}</p>
              <p className="font-serif text-3xl leading-none sm:text-4xl">{s.title}</p>
              <p className="mt-2 hidden text-sm text-paper/85 sm:block">{s.line}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
