import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export type ProjectCardProps = {
  slug: string;
  name: string;
  location: string;
  type: string;
  status: string;
  price_from: number | null;
  hero_image: string | null;
};

export function ProjectCard(p: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group"
    >
      <Link to="/projects/$slug" params={{ slug: p.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={p.hero_image ?? ""}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)]/85 via-transparent to-transparent" />
          <div className="absolute left-5 top-5">
            <span className="inline-flex items-center bg-[color:var(--gold)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--navy)]">
              {p.status}
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-gold">
              <MapPin className="h-3 w-3" /> {p.location}
            </p>
            <h3 className="mt-2 font-display text-2xl leading-tight">{p.name}</h3>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-cream/60">Starting from</div>
                <div className="font-display text-xl text-cream">
                  {p.price_from ? `AED ${(p.price_from / 1_000_000).toFixed(2)}M` : "POA"}
                </div>
              </div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Discover →
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
