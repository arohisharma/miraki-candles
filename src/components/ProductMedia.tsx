import Image from "next/image";
import type { Product } from "@/data/products";
import CandleVisual from "./CandleVisual";
import Embers from "./Embers";

type Variant = "card" | "page" | "thumb";

const candleWidth: Record<Variant, string> = {
  card: "w-[58%]",
  page: "w-[55%]",
  thumb: "w-14",
};

/**
 * Fills its (relatively positioned, sized) parent with the product photo,
 * or the illustrated candle when no photo has been added yet.
 */
export default function ProductMedia({
  product,
  variant = "card",
  sizes,
  priority,
}: {
  product: Product;
  variant?: Variant;
  sizes?: string;
  priority?: boolean;
}) {
  if (product.image) {
    return (
      <>
        <Image
          src={product.image}
          alt={`${product.name} candle`}
          fill
          sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          priority={priority}
          className="object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-pour)] group-hover:scale-105"
        />
        {variant !== "thumb" && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent" />
        )}
      </>
    );
  }

  return (
    <>
      {variant !== "thumb" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(201,166,107,0.3),transparent_62%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
          <Embers count={variant === "page" ? 14 : 6} />
        </>
      )}
      <div className="relative flex h-full w-full items-center justify-center">
        <CandleVisual
          color={product.color}
          name={variant === "thumb" ? undefined : product.name}
          className={`${variant === "thumb" ? "" : "candle-float "}${candleWidth[variant]} transition-transform duration-700 [transition-timing-function:var(--ease-pour)] group-hover:scale-105`}
        />
      </div>
    </>
  );
}
