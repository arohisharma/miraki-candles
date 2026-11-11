import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-5xl">Contact</h1>
      <p className="mt-3 text-muted">Questions, custom orders or wholesale? Say hello.</p>
      {/* Form is not wired up yet — needs a server action or email service. */}
      <form className="mt-10 space-y-5">
        {[
          { id: "name", label: "Name", type: "text" },
          { id: "email", label: "Email", type: "email" },
        ].map((f) => (
          <div key={f.id}>
            <label htmlFor={f.id} className="text-sm text-muted">{f.label}</label>
            <input
              id={f.id}
              name={f.id}
              type={f.type}
              className="mt-1 w-full border border-border bg-transparent px-3 py-2 outline-none focus:border-accent"
            />
          </div>
        ))}
        <div>
          <label htmlFor="message" className="text-sm text-muted">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="mt-1 w-full border border-border bg-transparent px-3 py-2 outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="bg-accent px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-accent-dark"
        >
          Send
        </button>
      </form>
    </div>
  );
}
