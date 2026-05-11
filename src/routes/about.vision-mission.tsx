import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Compass, Target, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/about/vision-mission")({
  component: VisionMissionPage,
  head: () => ({
    meta: [
      { title: "Vision & Mission — Nagarjuna Corporation" },
      { name: "description", content: "The principles that guide every Nagarjuna residence." },
      { property: "og:title", content: "Vision & Mission — Nagarjuna Corporation" },
      { property: "og:description", content: "The principles that guide every Nagarjuna residence." },
    ],
  }),
});

const pillars = [
  { icon: Compass, title: "Vision", text: "To craft the world's most considered residences — addresses that outlast trend and remain rare across generations." },
  { icon: Target, title: "Mission", text: "To deliver homes of singular architectural intent, built with uncompromising precision and reserved for those who value rarity over scale." },
  { icon: Sparkles, title: "Values", text: "Restraint over excess. Craft over volume. Longevity over fashion. Every decision is filtered through these three commitments." },
];

function VisionMissionPage() {
  return (
    <>
      <section className="relative h-[44vh] min-h-[360px] overflow-hidden bg-[color:var(--navy)] pt-20">
        <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2200&q=80" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy)]/50 to-[color:var(--navy)]/95" />
        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-12">
          <SectionHeading invert eyebrow="Principles" title="Vision & Mission" />
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="container-luxe grid gap-8 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="border border-[color:var(--navy)]/15 bg-card p-10"
            >
              <p.icon className="h-8 w-8 text-gold" />
              <h3 className="mt-6 font-display text-2xl text-[color:var(--navy)]">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-foreground/85">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[color:var(--navy)] py-24">
        <div className="container-luxe text-center">
          <p className="eyebrow justify-center text-gold/80"><span className="gold-rule" />A Promise</p>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl leading-tight text-cream md:text-4xl">
            "We do not build for the many. We build for the few who appreciate the difference between a house and a home of consequence."
          </h2>
          <p className="mt-6 text-[12px] uppercase tracking-[0.28em] text-cream/60">— Aarav Nagarjuna, Chairman</p>
        </div>
      </section>
    </>
  );
}
