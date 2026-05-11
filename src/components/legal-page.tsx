import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export type LegalSection = { heading: string; body: ReactNode };

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="bg-white text-slate-700">
      {/* Hero */}
      <section className="bg-[color:var(--navy)] pt-36 pb-20 text-cream md:pt-44 md:pb-28">
        <div className="container-luxe">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl font-light md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-base text-cream/80 md:text-lg">{intro}</p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-cream/55">Last updated · {updated}</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-border bg-white">
        <div className="container-luxe flex items-center gap-2 py-5 text-xs text-slate-500">
          <Link to="/" className="hover:text-[color:var(--navy)]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-[color:var(--navy)]">{title}</span>
        </div>
      </div>

      {/* Body */}
      <section className="py-20 md:py-24">
        <div className="container-luxe grid gap-14 lg:grid-cols-[240px_1fr]">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--navy)]">On this page</p>
              <ul className="mt-5 space-y-3 text-sm">
                {sections.map((s, i) => (
                  <li key={i}>
                    <a
                      href={`#section-${i}`}
                      className="block border-l-2 border-border pl-4 text-slate-500 transition-colors hover:border-[color:var(--navy)] hover:text-[color:var(--navy)]"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <div className="max-w-3xl">
            {sections.map((s, i) => (
              <section key={i} id={`section-${i}`} className="scroll-mt-28 border-b border-border pb-10 pt-2 first:pt-0 last:border-0">
                <h2 className="font-display text-2xl text-[color:var(--navy)] md:text-3xl">{s.heading}</h2>
                <div className="mt-5 space-y-4 text-[15px] leading-[1.85] text-slate-600">
                  {typeof s.body === "string" ? <p>{s.body}</p> : s.body}
                </div>
              </section>
            ))}

            <div className="mt-14 border border-border bg-[color:var(--cream)] p-8">
              <p className="font-display text-xl text-[color:var(--navy)]">Questions about this policy?</p>
              <p className="mt-2 text-sm text-slate-600">
                Reach out to our team and we&apos;ll respond within two business days.
              </p>
              <Link
                to="/contact"
                className="mt-5 inline-flex bg-[color:var(--navy)] px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-[color:var(--navy)]/90"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
