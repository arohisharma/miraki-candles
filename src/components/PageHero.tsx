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
    <>
      <section className="relative overflow-hidden bg-espresso text-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,166,107,0.25),transparent_62%)]" />
        <Embers count={10} />
        <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-16 text-center sm:pt-24">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="mt-5 text-5xl sm:text-7xl">{title}</h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.24}>
              <p className="mx-auto mt-5 max-w-md text-lg text-background/65">{subtitle}</p>
            </Reveal>
          )}
        </div>
      </section>
      <WaxDrip />
    </>
  );
}
