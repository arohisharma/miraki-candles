import Reveal from "./Reveal";

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
    <section className="mx-auto max-w-[90rem] px-5 pb-12 pt-12 sm:px-10 sm:pb-16 sm:pt-20">
      <Reveal>
        <p className="label">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-[-0.03em]">
          {title}
        </h1>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">{subtitle}</p>
        </Reveal>
      )}
    </section>
  );
}
