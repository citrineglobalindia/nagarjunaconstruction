import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { StatCounter } from "@/components/stat-counter";

export const Route = createFileRoute("/about/company")({
  component: CompanyPage,
  head: () => ({
    meta: [
      { title: "About the Company — Nagarjuna Corporation" },
      { name: "description", content: "Three decades of crafting iconic, internationally renowned residences." },
      { property: "og:title", content: "About the Company — Nagarjuna Corporation" },
      { property: "og:description", content: "Three decades of crafting iconic, internationally renowned residences." },
    ],
  }),
});

const milestones = [
  { year: "1996", text: "Founded in Hyderabad with a single boutique residence." },
  { year: "2004", text: "Expanded to international markets across the Gulf." },
  { year: "2013", text: "Launched our flagship Branded Residence collection." },
  { year: "2021", text: "Crossed 48,000 homes handed over across 9 countries." },
  { year: "2025", text: "Recognised as one of Asia's top luxury developers." },
];

function CompanyPage() {
  return (
    <>
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden bg-[color:var(--navy)] pt-20">
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2200&q=80" alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy)]/40 to-[color:var(--navy)]/95" />
        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-14">
          <SectionHeading invert eyebrow="The Company" title="Three decades of singular intent" />
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="container-luxe grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow"><span className="gold-rule" />Our Story</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-[color:var(--navy)]">A house of architecture, not just construction.</h2>
            <p className="mt-6 leading-relaxed text-foreground/85">
              Nagarjuna Corporation was founded on a single conviction — a home should elevate the way one lives. Over three decades, that idea has shaped landmark addresses for an international community of discerning residents.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/85">
              Today our portfolio spans branded residences, sky villas, beachfront estates and curated hotel-residences across the Gulf, Indian Ocean and Europe — each conceived with restraint and executed with precision.
            </p>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
            alt="Nagarjuna development"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-[color:var(--navy)] py-20">
        <div className="container-luxe grid grid-cols-2 gap-12 md:grid-cols-4">
          <StatCounter value={28} suffix="+" label="Years of Excellence" />
          <StatCounter value={142} label="Projects Delivered" />
          <StatCounter value={9} label="Countries" />
          <StatCounter value={48000} suffix="+" label="Homes Handed Over" />
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading align="center" eyebrow="Milestones" title="A timeline of intent" />
          <ol className="mx-auto mt-16 max-w-3xl border-l border-[color:var(--navy)]/20">
            {milestones.map((m, i) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pb-12 pl-10"
              >
                <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-gold ring-4 ring-background" />
                <div className="font-display text-2xl text-gold">{m.year}</div>
                <p className="mt-2 text-foreground/85">{m.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
