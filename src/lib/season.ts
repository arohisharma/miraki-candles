import { unsplash } from "./unsplash";

/**
 * The site's seasonal theme. Switch to "default" after the holidays to return to the
 * everyday look. Everything seasonal (palette, snow, banner, copy, photos) follows this.
 */
export type Season = "default" | "winter";
export const SEASON: Season = "winter";

export type Ritual = {
  /** One big word, shown huge over the photo. */
  word: string;
  line: string;
  pair: string;
  image: string;
  alt: string;
};

type SeasonContent = {
  hero: { label: string; line1: string; accentWord: string; copy: string; image: string; alt: string };
  statement: { before: string; accent: string };
  rituals: Ritual[];
  values: string[];
  band: { before: string; accent: string; cta: string };
  footer: { before: string; accent: string };
  banner?: { text: string; short: string; cta: string; href: string };
  teaser?: { label: string; title: string; accent: string; notes: string[]; image: string; alt: string };
};

// All photos are Unsplash stock, standing in until Miraki has its own.
const CONTENT: Record<Season, SeasonContent> = {
  default: {
    hero: {
      label: "Handmade candles",
      line1: "Light a little",
      accentWord: "calm",
      copy: "Hand-poured candles for the quiet moments.",
      image: unsplash("photo-1669334388727-9a3437e12fa2", 2000),
      alt: "A lit candle glowing in a ribbed glass",
    },
    statement: { before: "Small flames,", accent: "slow evenings." },
    rituals: [
      {
        word: "Gift.",
        line: "Easier to give than to say.",
        pair: "diwali-gift-box",
        image: unsplash("photo-1603897076223-17f346f02a03", 2000),
        alt: "A candle being wrapped with twine as a gift",
      },
      {
        word: "Read.",
        line: "One chapter becomes four.",
        pair: "rose-petal-jar",
        image: unsplash("photo-1695755117860-da93d1aaf96b", 2000),
        alt: "An open book and a lit candle on a blanket",
      },
      {
        word: "Soak.",
        line: "Door closed. Phone elsewhere.",
        pair: "ocean-daisy-jar",
        image: unsplash("photo-1615224572974-ed13e9ab0312", 2000),
        alt: "A bathtub surrounded by lit candles",
      },
    ],
    values: ["Soy wax", "Hand-poured", "Small batches", "Made to gift"],
    band: { before: "Find the one that feels like", accent: "home", cta: "Shop candles" },
    footer: { before: "Poured by hand,", accent: "moments" },
  },

  winter: {
    hero: {
      label: "The Winter Edit",
      line1: "Light a little",
      accentWord: "warmth",
      copy: "Hand-poured candles for the longest nights of the year.",
      image: unsplash("photo-1607838658695-2eb904803901", 2000),
      alt: "A lit candle among pine branches",
    },
    statement: { before: "Short days.", accent: "Long, golden nights." },
    rituals: [
      {
        word: "Gift.",
        line: "The one they open first.",
        pair: "diwali-gift-box",
        image: unsplash("photo-1573853019548-c38efdbc2f09", 2000),
        alt: "Gifts wrapped in brown paper with red ribbon",
      },
      {
        word: "Snow.",
        line: "Nobody is going anywhere today.",
        pair: "rose-petal-jar",
        image: unsplash("photo-1640095889747-2090ee12fa7d", 2000),
        alt: "A lit candle on a windowsill in winter light",
      },
      {
        word: "Together.",
        line: "Everyone at one table.",
        pair: "ocean-daisy-jar",
        image: unsplash("photo-1608306680588-ef9108144c76", 2000),
        alt: "A Christmas table set with red candles and flowers",
      },
    ],
    values: ["Soy wax", "Hand-poured", "Small batches", "Made to gift"],
    band: { before: "Give the gift of a slow", accent: "winter", cta: "Shop gifts" },
    footer: { before: "Poured by hand,", accent: "winter nights" },
    banner: {
      text: "The Miraki Winter Collection is dropping soon",
      short: "Winter Collection — dropping soon",
      cta: "Be the first to know",
      href: "/contact",
    },
    teaser: {
      label: "Dropping soon",
      title: "The Winter",
      accent: "Collection",
      notes: ["Pine", "Clove", "Cinnamon", "Snow"],
      image: unsplash("photo-1733127040689-0e8a2823e391", 2400),
      alt: "A green candle beside pine branches",
    },
  },
};

export const season = CONTENT[SEASON];
