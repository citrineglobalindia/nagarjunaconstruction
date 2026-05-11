import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/about/team")({
  component: TeamPage,
  head: () => ({
    meta: [
      { title: "Leadership Team — Nagarjuna Corporation" },
      { name: "description", content: "Meet the leadership shaping Nagarjuna's iconic addresses." },
      { property: "og:title", content: "Leadership Team — Nagarjuna Corporation" },
      { property: "og:description", content: "Meet the leadership shaping Nagarjuna's iconic addresses." },
    ],
  }),
});

const team = [
  { name: "Aarav Nagarjuna", role: "Chairman & Managing Director", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80" },
  { name: "Priya Menon", role: "Chief Executive Officer", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80" },
  { name: "Rahul Iyer", role: "Chief Design Officer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80" },
  { name: "Sana Khan", role: "Head of Sales & Investor Relations", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80" },
  { name: "Vikram Rao", role: "Director of Construction", img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=900&q=80" },
  { name: "Lara Pinto", role: "Head of Sustainability", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80" },
];

function TeamPage() {
  return (
    <>
      <section className="relative h-[44vh] min-h-[360px] overflow-hidden bg-[color:var(--navy)] pt-20">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=80" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy)]/50 to-[color:var(--navy)]/95" />
        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-12">
          <SectionHeading invert eyebrow="Leadership" title="The minds behind every address" />
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="container-luxe grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group border border-[color:var(--navy)]/15 bg-card"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img src={m.img} alt={m.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="px-6 py-6">
                <h3 className="font-display text-xl text-[color:var(--navy)]">{m.name}</h3>
                <p className="mt-2 text-[12px] uppercase tracking-[0.22em] text-gold">{m.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
