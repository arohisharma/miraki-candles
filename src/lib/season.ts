import { unsplash } from "./unsplash";

/**
 * The site's seasonal theme. Switch to "default" after the holidays to return to the
 * everyday look. Everything seasonal (palette, snow, banner, copy, photos) follows this.
 */
export type Season = "default" | "winter";
export const SEASON: Season = "winter";

export type Ritual = {
  title: string;
  line: string;
  body: string;
  pair: string;
  image: string;
  alt: string;
};

type SeasonContent = {
  hero: {
    label: string;
    labelRight: string;
    line1: string;
    accentWord: string;
    copy: string;
    image: string;
    alt: string;
  };
  statement: { label: string; text: string };
  ritualsHeading: { before: string; accent: string };
  rituals: Ritual[];
  band: { before: string; accent: string; cta: string };
  footer: { before: string; accent: string };
  banner?: { text: string; cta: string; href: string };
  teaser?: {
    label: string;
    title: string;
    accent: string;
    copy: string;
    notes: string[];
    image: string;
    alt: string;
  };
};

// All photos are Unsplash stock, standing in until Miraki has its own.
const CONTENT: Record<Season, SeasonContent> = {
  default: {
    hero: {
      label: "Handmade candles",
      labelRight: "Soy wax — Small batches",
      line1: "Light a little",
      accentWord: "calm",
      copy: "Candles poured by hand in small batches. For the gift you actually want to give, the book you cannot put down, and the bath nobody is allowed to interrupt.",
      image: unsplash("photo-1669334388727-9a3437e12fa2", 2000),
      alt: "A lit candle glowing in a ribbed glass",
    },
    statement: {
      label: "Why we make them",
      text: "A candle is a small permission. To stop. To sit down. To let the evening be about nothing in particular.",
    },
    ritualsHeading: { before: "Made for the moments you keep for", accent: "yourself" },
    rituals: [
      {
        title: "The gift",
        line: "Some things are easier to give than to say.",
        body: "A candle says I thought about you, and I want your evenings to be soft. Each one leaves us boxed and finished by hand, ready to be handed over.",
        pair: "diwali-gift-box",
        image: unsplash("photo-1603897076223-17f346f02a03"),
        alt: "A candle being wrapped with twine as a gift",
      },
      {
        title: "A night of reading",
        line: "One chapter becomes four.",
        body: "The house goes quiet. The page turns gold. Somewhere past midnight you look up, and the flame is still keeping your place.",
        pair: "rose-petal-jar",
        image: unsplash("photo-1695755117860-da93d1aaf96b"),
        alt: "An open book and a lit candle on a blanket",
      },
      {
        title: "The long bath",
        line: "Door closed. Water hot. Phone in another room.",
        body: "Twenty minutes that belong to no one but you. Steam on the mirror, a slow scent in the air, and nothing at all to do.",
        pair: "ocean-daisy-jar",
        image: unsplash("photo-1615224572974-ed13e9ab0312"),
        alt: "A bathtub surrounded by lit candles",
      },
    ],
    band: { before: "Find the one that feels like", accent: "home", cta: "Shop candles" },
    footer: { before: "Poured by hand,", accent: "moments" },
  },

  winter: {
    hero: {
      label: "The winter edit",
      labelRight: "Winter collection — dropping soon",
      line1: "Light a little",
      accentWord: "warmth",
      copy: "Hand-poured candles for the longest nights of the year. For the gift under the tree, the first snow, and the table everyone comes home to.",
      image: unsplash("photo-1607838658695-2eb904803901", 2000),
      alt: "A lit candle among pine branches",
    },
    statement: {
      label: "Why winter",
      text: "When the days run short, a small flame does a big job. It makes the dark feel like an invitation instead of an ending.",
    },
    ritualsHeading: { before: "Made for the season of", accent: "coming home" },
    rituals: [
      {
        title: "The gift",
        line: "The one they open first.",
        body: "Wrapped in paper and ribbon, it says I know you, and I want your winter to be soft. Each Miraki candle is boxed by hand, ready for the tree.",
        pair: "diwali-gift-box",
        image: unsplash("photo-1573853019548-c38efdbc2f09"),
        alt: "Gifts wrapped in brown paper with red ribbon",
      },
      {
        title: "The first snow",
        line: "Nobody is going anywhere today.",
        body: "Frost on the glass, a blanket on the sofa, and a candle on the sill. The world outside goes white and quiet, and inside it is warm and gold.",
        pair: "rose-petal-jar",
        image: unsplash("photo-1640095889747-2090ee12fa7d"),
        alt: "A lit candle on a windowsill in winter light",
      },
      {
        title: "Christmas Eve",
        line: "Everyone at one table.",
        body: "Plates that do not match, a story told for the hundredth time, and candles burning low as the night goes long. This is the one you will remember.",
        pair: "ocean-daisy-jar",
        image: unsplash("photo-1608306680588-ef9108144c76"),
        alt: "A Christmas table set with red candles and flowers",
      },
    ],
    band: { before: "Give the gift of a slow", accent: "winter", cta: "Shop gifts" },
    footer: { before: "Poured by hand,", accent: "winter nights" },
    banner: {
      text: "The Miraki Winter Collection is dropping soon",
      cta: "Be the first to know",
      href: "/contact",
    },
    teaser: {
      label: "Coming soon",
      title: "The Winter",
      accent: "Collection",
      copy: "Pine, clove, cinnamon and snow. A small run of candles poured for the season, arriving before Christmas. Want to know the moment it drops? Send us a note.",
      notes: ["Pine", "Clove", "Cinnamon", "Snow"],
      image: unsplash("photo-1733127040689-0e8a2823e391", 1800),
      alt: "A green candle beside pine branches",
    },
  },
};

export const season = CONTENT[SEASON];
