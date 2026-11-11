import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Contact" };

const field =
  "mt-2 w-full rounded-2xl border-0 bg-cream/70 px-5 py-4 text-lg outline-none ring-1 ring-transparent transition-all duration-500 placeholder:text-muted/60 focus:bg-ivory focus:ring-clay";
const label = "text-xs font-medium uppercase tracking-[0.22em] text-muted";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Say hello"
        subtitle="Questions, custom orders or wholesale? We'd love to hear from you."
      />
      <div className="mx-auto max-w-xl px-6 py-24">
        {/* Form is not wired up yet — needs a server action or email service. */}
        <Reveal>
          <form className="space-y-7">
            <div>
              <label htmlFor="name" className={label}>Name</label>
              <input id="name" name="name" type="text" className={field} />
            </div>
            <div>
              <label htmlFor="email" className={label}>Email</label>
              <input id="email" name="email" type="email" className={field} />
            </div>
            <div>
              <label htmlFor="message" className={label}>Message</label>
              <textarea id="message" name="message" rows={5} className={field} />
            </div>
            <button type="submit" className="btn">Send message</button>
          </form>
        </Reveal>
      </div>
    </>
  );
}
