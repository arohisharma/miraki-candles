import Link from "next/link";
import { season } from "@/lib/season";

export default function SeasonBanner() {
  if (!season.banner) return null;
  const { text, short, cta, href } = season.banner;
  return (
    <Link
      href={href}
      className="flex h-10 items-center justify-center gap-2 bg-band px-5 text-[0.66rem] font-medium uppercase tracking-[0.18em] text-paper"
    >
      <span className="text-paper/60">✻</span>
      <span className="sm:hidden">{short}</span>
      <span className="hidden sm:inline">
        {text} — <span className="underline underline-offset-4">{cta}</span>
      </span>
    </Link>
  );
}
