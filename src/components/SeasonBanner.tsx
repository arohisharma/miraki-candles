import Link from "next/link";
import { season } from "@/lib/season";

export default function SeasonBanner() {
  if (!season.banner) return null;
  const { text, cta, href } = season.banner;
  return (
    <div className="bg-band px-5 py-2.5 text-center text-[0.7rem] font-medium uppercase tracking-[0.18em] text-paper">
      <span className="mr-1.5 text-paper/60">✻</span>
      {text}
      <span className="hidden sm:inline">
        {" — "}
        <Link href={href} className="link link-quiet">
          {cta}
        </Link>
      </span>
    </div>
  );
}
