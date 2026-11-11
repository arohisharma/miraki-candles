import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Contact" };

const field =
  "mt-1 w-full border-0 border-b border-border bg-transparent px-0 py-2 text-lg outline-none transition-colors duration-500 focus:border-gold";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Say hello"
        subtitle="Questions, custom orders or wholesale? We'd love to hear from you."
      />
      <div className="mx-auto max-w-xl px-6 py-20">
        {/* Form is not wired up yet — needs a server action or email service. */}
        <Reveal>
          <form className="space-y-8">
            <div>
              <label htmlFor="name" className="text-xs uppercase tracking-[0.25em] text-muted">Name</label>
              <input id="name" name="name" type="text" className={field} />
            </div>
            <div>
              <label htmlFor="email" className="text-xs uppercase tracking-[0.25em] text-muted">Email</label>
              <input id="email" name="email" type="email" className={field} />
            </div>
            <div>
              <label htmlFor="message" className="text-xs uppercase tracking-[0.25em] text-muted">Message</label>
              <textarea id="message" name="message" rows={5} className={field} />
            </div>
            <button type="submit" className="btn">Send message</button>
          </form>
        </Reveal>
      </div>
    </>
  );
}
