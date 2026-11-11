import Image from "next/image";
import type { Product } from "@/data/products";
import CandleVisual from "./CandleVisual";

/**
 * Fills its (relatively positioned, sized) parent with the product photo,
 * or an illustrated candle when no photo has been added yet.
 */
export default function ProductMedia({
  product,
  thumb,
  sizes,
  priority,
}: {
  product: Product;
  thumb?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={`${product.name} candle`}
        fill
        sizes={sizes ?? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
        priority={priority}
        style={{ objectPosition: product.imagePosition }}
        className="object-cover transition-transform duration-[1400ms] ease-pour group-hover:scale-[1.06]"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-ink">
      <CandleVisual
        color={product.color}
        name={thumb ? undefined : product.name}
        className={thumb ? "w-12" : "candle-float w-[52%]"}
      />
    </div>
  );
}
