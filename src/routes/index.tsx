import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronDown, Award, Globe2, Diamond, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { StatCounter } from "@/components/stat-counter";
import { InquiryDialog } from "@/components/inquiry-dialog";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { data: featured = [] } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("slug,name,location,type,status,price_from,hero_image")
        .eq("featured", true)
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-[color:var(--navy)]">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=80"
          alt="Luxury skyline"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy)]/70 via-[color:var(--navy)]/30 to-[color:var(--navy)]/85" />

        <div className="container-luxe relative z-10 flex h-full flex-col justify-center text-cream">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-px w-20 origin-left bg-gold"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-[11px] uppercase tracking-[0.4em] text-gold"
          >
            Nagarjuna Corporation · Live & Let-live
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
            className="mt-6 max-w-4xl font-display text-[3.25rem] leading-[1.02] tracking-tight text-cream md:text-7xl"
          >
            Iconic Living.<br />Crafted for the Few.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-cream/80"
          >
            A curated portfolio of branded residences, private villas and skyline towers across Dubai, the Maldives and London.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/projects" className="btn-gold">Explore Projects</Link>
            <InquiryDialog source="hero" trigger={<button className="btn-outline-gold">Book a Consultation</button>} />
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/60"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </section>

      {/* FEATURED */}
      <section className="bg-background py-24 md:py-32">
        <div className="container-luxe">
          <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
            <SectionHeading
              eyebrow="Featured Developments"
              title="A portfolio of singular addresses"
              subtitle="Each residence is conceived with restraint, executed with precision, and reserved for those who appreciate the rarest of homes."
            />
            <Link to="/projects" className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--navy)] underline-offset-8 hover:underline">
              View All Projects →
            </Link>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => <ProjectCard key={p.slug} {...p} />)}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[color:var(--navy)] py-24">
        <div className="container-luxe grid grid-cols-2 gap-12 md:grid-cols-4">
          <StatCounter value={28} suffix="+" label="Years of Excellence" />
          <StatCounter value={142} label="Projects Delivered" />
          <StatCounter value={9} label="Countries" />
          <StatCounter value={48000} suffix="+" label="Homes Handed Over" />
        </div>
      </section>

      {/* WHY INVEST */}
      <section className="bg-background py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            align="center"
            eyebrow="Why Invest With Us"
            title="The hallmark of a legacy developer"
          />
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: "Award-Winning Design", text: "Collaborations with the world's most respected architects and ateliers." },
              { icon: Globe2, title: "Global Footprint", text: "Strategic addresses across 9 countries and 4 continents." },
              { icon: Diamond, title: "Tangible Value", text: "Branded residences with proven appreciation and rental yields." },
              { icon: ShieldCheck, title: "Trusted Custodian", text: "Three decades of on-time delivery and discreet white-glove service." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="border-t border-[color:var(--navy)]/15 pt-6"
              >
                <f.icon className="h-7 w-7 text-gold" strokeWidth={1.4} />
                <h3 className="mt-5 font-display text-xl text-[color:var(--navy)]">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="relative h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[color:var(--navy)]/75" />
        <div className="container-luxe relative z-10 flex h-full flex-col items-center justify-center text-center text-cream">
          <p className="eyebrow"><span className="gold-rule" />Begin Your Journey</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl md:text-5xl">A private viewing, by invitation only.</h2>
          <InquiryDialog source="cta-strip" trigger={<button className="btn-gold mt-8">Request Your Invitation</button>} />
        </div>
      </section>
    </>
  );
}
