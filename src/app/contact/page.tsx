import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Contact" };

const field =
  "mt-2 w-full border-0 border-b border-line bg-transparent px-0 py-3 text-lg outline-none transition-colors duration-500 focus:border-accent";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Say hello."
        subtitle="Questions, custom orders or wholesale. We would love to hear from you."
      />
      <div className="mx-auto max-w-[90rem] px-5 pb-28 sm:px-10">
        {/* Form is not wired up yet — needs a server action or email service. */}
        <Reveal className="max-w-2xl border-t border-line pt-12">
          <form className="space-y-10">
            <div>
              <label htmlFor="name" className="label">Name</label>
              <input id="name" name="name" type="text" className={field} />
            </div>
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input id="email" name="email" type="email" className={field} />
            </div>
            <div>
              <label htmlFor="message" className="label">Message</label>
              <textarea id="message" name="message" rows={4} className={field} />
            </div>
            <button type="submit" className="btn">Send message</button>
          </form>
        </Reveal>
      </div>
    </>
  );
}
