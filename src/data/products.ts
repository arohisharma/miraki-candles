export type Mood = "Cosy" | "Grounded" | "Fresh" | "Romantic";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // in USD
  size: string;
  burnTime: string;
  notes: string[];
  mood: Mood;
  color: string; // tint for the illustrated candle shown until a photo is added
  /** Path under /public, e.g. "/products/amber-dusk.jpg". When set, the photo replaces the illustration. */
  image?: string;
  featured?: boolean;
};

// Placeholder catalogue — replace with the client's real products.
export const products: Product[] = [
  {
    slug: "amber-dusk",
    name: "Amber Dusk",
    tagline: "Warm amber, vanilla and sandalwood",
    description:
      "A cosy evening candle with deep amber and soft vanilla, grounded by creamy sandalwood.",
    price: 28,
    size: "8 oz",
    burnTime: "45 hours",
    notes: ["Amber", "Vanilla", "Sandalwood"],
    mood: "Cosy",
    color: "#c98b5e",
    featured: true,
  },
  {
    slug: "fig-and-cedar",
    name: "Fig & Cedar",
    tagline: "Green fig leaf and smoky cedarwood",
    description: "Fresh, earthy and slightly sweet — like walking through an orchard at dusk.",
    price: 30,
    size: "8 oz",
    burnTime: "45 hours",
    notes: ["Fig leaf", "Cedarwood", "Musk"],
    mood: "Grounded",
    color: "#8a9a73",
    featured: true,
  },
  {
    slug: "sea-salt-jasmine",
    name: "Sea Salt & Jasmine",
    tagline: "Coastal air with night-blooming jasmine",
    description: "Bright, airy and floral, with a clean mineral edge.",
    price: 26,
    size: "8 oz",
    burnTime: "45 hours",
    notes: ["Sea salt", "Jasmine", "White tea"],
    mood: "Fresh",
    color: "#9fb4bd",
    featured: true,
  },
  {
    slug: "rose-and-oud",
    name: "Rose & Oud",
    tagline: "Velvet rose over smoky oud",
    description: "Rich and romantic, a luxurious scent for slow evenings.",
    price: 34,
    size: "10 oz",
    burnTime: "55 hours",
    notes: ["Rose", "Oud", "Patchouli"],
    mood: "Romantic",
    color: "#a8576a",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}
