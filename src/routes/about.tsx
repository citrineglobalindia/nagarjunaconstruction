import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({ meta: [{ title: "About — Nagarjuna Corporation" }] }),
});

function AboutPage() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[460px] overflow-hidden bg-[color:var(--navy)]">
        <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2200&q=80" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy)]/40 to-[color:var(--navy)]/90" />
        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-16">
          <SectionHeading invert eyebrow="About Nagarjuna" title="Three decades of crafting iconic homes" />
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-luxe grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow"><span className="gold-rule" />Our Story</p>
            <h2 className="mt-4 font-display text-4xl text-[color:var(--navy)]">Live & Let-live.</h2>
            <p className="mt-6 leading-relaxed text-foreground/85">
              Nagarjuna Corporation began with a single conviction: that a home should elevate the way one lives. Over three decades, we have shaped landmark addresses for an international community of discerning residents.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/85">
              Our portfolio spans branded residences, sky villas, beachfront estates and curated hotel-residences across the Gulf, Indian Ocean and Europe.
            </p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80" alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--navy)] py-24 text-cream">
        <div className="container-luxe">
          <p className="eyebrow"><span className="gold-rule" />Milestones</p>
          <div className="mt-10 grid gap-10 md:grid-cols-4">
            {[
              ["1996", "Founded in Hyderabad"],
              ["2008", "First international tower in Dubai"],
              ["2017", "Beachfront estates, Maldives"],
              ["2024", "Branded residences, Mayfair"],
            ].map(([y, t]) => (
              <div key={y as string} className="border-t border-cream/20 pt-6">
                <div className="font-display text-3xl text-gold">{y}</div>
                <div className="mt-2 text-sm text-cream/75">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
