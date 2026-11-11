import Image from "next/image";
import type { Product } from "@/data/products";

/** Fills its (relatively positioned, sized) parent with the product photo, or a quiet placeholder. */
export default function ProductMedia({
  product,
  sizes,
  priority,
}: {
  product: Product;
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
        className="object-cover transition-transform duration-[1600ms] ease-pour group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-stone px-4 text-center font-serif text-xl italic text-muted">
      {product.name}
    </div>
  );
}
