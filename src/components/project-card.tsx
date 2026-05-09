import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { InquiryDialog } from "./inquiry-dialog";

export type ProjectCardProps = {
  slug: string;
  name: string;
  location: string;
  type: string;
  status: string;
  price_from: number | null;
  hero_image: string | null;
  bedrooms_min?: number | null;
  bedrooms_max?: number | null;
  id?: string;
};

function formatPrice(v: number | null) {
  if (!v) return "Price On Request";
  if (v >= 10_000_000) return `${(v / 10_000_000).toFixed(2)} Cr Onwards*`;
  return `${Math.round(v / 100_000)} Lakhs Onwards*`;
}

function formatUnit(min?: number | null, max?: number | null, type?: string) {
  if (min && max) return min === max ? `${min} BHK` : `${min} – ${max} BHK`;
  return type ?? "Various";
}

export function ProjectCard(p: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group flex flex-col bg-card shadow-[0_2px_24px_-8px_rgba(10,26,47,0.12)] transition-shadow duration-500 hover:shadow-[0_12px_40px_-12px_rgba(10,26,47,0.25)]"
    >
      {/* Image */}
      <Link to="/projects/$slug" params={{ slug: p.slug }} className="relative block overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={p.hero_image ?? ""}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
          />
        </div>
        {/* Status ribbon — Puravankara style notch */}
        <div className="absolute -bottom-px right-6 flex items-center">
          <span className="relative bg-[color:var(--navy)] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream">
            <span className="absolute -top-2 left-0 h-2 w-3 bg-[color:var(--navy)] [clip-path:polygon(0_100%,100%_100%,100%_0)] opacity-70" />
            {p.status}
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col px-7 pb-7 pt-8">
        <Link to="/projects/$slug" params={{ slug: p.slug }}>
          <h3 className="font-display text-[1.7rem] leading-tight text-[color:var(--navy)] transition-colors group-hover:text-gold">
            {p.name}
          </h3>
        </Link>
        <p className="mt-3 text-sm text-foreground/75">
          {p.type} in {p.location}
        </p>

        <div className="mt-7 grid grid-cols-2 gap-6">
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-wider text-[color:var(--navy)]">Price</div>
            <div className="mt-1.5 text-sm text-foreground/85">{formatPrice(p.price_from)}</div>
          </div>
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-wider text-[color:var(--navy)]">Unit Size</div>
            <div className="mt-1.5 text-sm text-foreground/85">{formatUnit(p.bedrooms_min, p.bedrooms_max, p.type)}</div>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
          <InquiryDialog
            projectId={p.id}
            projectName={p.name}
            source="card-site-visit"
            trigger={
              <button className="border border-[color:var(--navy)] bg-[color:var(--navy)] px-4 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-transparent hover:text-[color:var(--navy)]">
                Book a Site Visit
              </button>
            }
          />
          <InquiryDialog
            projectId={p.id}
            projectName={p.name}
            source="card-enquire"
            trigger={
              <button className="border border-[color:var(--navy)] bg-[color:var(--navy)] px-4 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-transparent hover:text-[color:var(--navy)]">
                Enquire Now
              </button>
            }
          />
        </div>
      </div>
    </motion.article>
  );
}
