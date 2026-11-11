import Embers from "./Embers";
import Reveal from "./Reveal";
import WaxDrip from "./WaxDrip";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-sunset relative overflow-hidden rounded-b-[2.5rem] text-ivory sm:rounded-b-[4rem]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="aurora left-[-10%] top-[0%] h-[30rem] w-[30rem] bg-[#f2a83b]/55" />
        <span className="aurora right-[-10%] top-[-20%] h-[32rem] w-[32rem] bg-[#e2557f]/60" style={{ animationDelay: "-7s" }} />
      </div>
      <Embers count={12} />
      <WaxDrip className="absolute inset-x-0 top-0 z-20" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-20 pt-40 text-center sm:pb-24 sm:pt-56">
        <Reveal>
          <p className="eyebrow text-ivory/85!">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="mt-5 text-6xl leading-[0.95] sm:text-8xl">{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.24}>
            <p className="mx-auto mt-6 max-w-md text-lg text-ivory/90">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
