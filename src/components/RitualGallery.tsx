import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/data/products";
import { season } from "@/lib/season";

/** Three moments, edge to edge and flush with the collection above. Hover leans into one. */
export default function RitualGallery() {
  return (
    <section aria-label="Moments" className="flex flex-col md:h-[min(46rem,88vh)] md:flex-row">
      {season.rituals.map((r, i) => {
        const product = getProduct(r.pair);
        const word = r.word.replace(".", "");
        return (
          <Link
            key={r.word}
            href={product ? `/shop/${product.slug}` : "/shop"}
            data-cursor="Shop"
            className="group relative block h-[26rem] overflow-hidden bg-stone transition-[flex-grow] duration-[900ms] ease-pour md:h-auto md:flex-[1_1_0%] md:hover:flex-[1.3_1_0%]"
          >
            <Image
              src={r.image}
              alt={r.alt}
              fill
              sizes="(min-width: 768px) 34vw, 100vw"
              className="object-cover transition-transform duration-[1600ms] ease-pour group-hover:scale-[1.04]"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#2a0f16]/45 via-transparent to-[#2a0f16]/10" />
            <span className="absolute left-5 top-6 rotate-180 font-serif text-5xl leading-none text-paper [writing-mode:vertical-rl] sm:left-6 sm:text-6xl">
              {word}
            </span>
            <span className="absolute bottom-6 left-5 rounded-full bg-paper px-6 py-3 text-[0.78rem] text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-paper sm:left-6">
              Shop {word.toLowerCase()}
            </span>
          </Link>
        );
      })}
    </section>
  );
}
