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
  if (v >= 10_000_000) return `₹ ${(v / 10_000_000).toFixed(2)} Cr Onwards*`;
  return `₹ ${Math.round(v / 100_000)}.00 L Onwards*`;
}

function formatUnit(min?: number | null, max?: number | null, type?: string) {
  if (min && max) {
    const range = min === max ? `${min}` : `${min}, ${max}`;
    return `${range} BHK`;
  }
  return type ?? "Various";
}

export function ProjectCard(p: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group flex flex-col border border-[color:var(--navy)]/15 bg-card transition-shadow duration-500 hover:shadow-[0_18px_50px_-20px_rgba(10,26,47,0.25)]"
    >
      {/* Image with status ribbon */}
      <Link
        to="/projects/$slug"
        params={{ slug: p.slug }}
        className="relative block"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={p.hero_image ?? ""}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
          />
        </div>

        {/* Ribbon — protrudes off the right edge with a folded-corner notch */}
        <div className="pointer-events-none absolute -bottom-3 right-0 flex">
          <span className="relative bg-[color:var(--navy)] px-7 py-3 text-[12px] font-medium tracking-wide text-cream">
            {p.status}
            {/* folded triangle */}
            <span
              className="absolute -bottom-2 right-0 h-2 w-3 bg-[color:var(--navy)]/70"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
            />
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col px-7 pb-0 pt-8">
        <Link to="/projects/$slug" params={{ slug: p.slug }}>
          <h3 className="font-sans text-[1.65rem] font-normal leading-tight text-[color:var(--navy)] transition-colors group-hover:text-gold">
            {p.name}
          </h3>
        </Link>
        <p className="mt-3 text-[15px] text-foreground/80">
          {p.location}
        </p>

        <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-6 pb-8">
          <Stat label="Price" value={formatPrice(p.price_from)} />
          <Stat
            label={p.type === "Apartment" || p.type === "Branded Residence" ? "Residential Apartments" : "Unit Size"}
            value={formatUnit(p.bedrooms_min, p.bedrooms_max, p.type)}
          />
          {(p.bedrooms_min || p.bedrooms_max) && (
            <Stat label="Unit Size" value={`${600 + ((p.bedrooms_min ?? 1) - 1) * 200} Sq.ft. Onwards*`} />
          )}
        </div>

        {/* Twin CTAs flush to the bottom edge */}
        <div className="mt-auto grid grid-cols-2 gap-[2px] bg-[color:var(--navy)]/15 -mx-px -mb-px">
          <InquiryDialog
            projectId={p.id}
            projectName={p.name}
            source="card-site-visit"
            trigger={
              <button className="bg-[color:var(--navy)] px-4 py-4 text-[13px] font-medium tracking-wide text-cream transition-colors hover:bg-[color:var(--navy)]/90">
                Book a Site Visit
              </button>
            }
          />
          <InquiryDialog
            projectId={p.id}
            projectName={p.name}
            source="card-enquire"
            trigger={
              <button className="bg-[color:var(--navy)] px-4 py-4 text-[13px] font-medium tracking-wide text-cream transition-colors hover:bg-[color:var(--navy)]/90">
                Enquire Now
              </button>
            }
          />
        </div>
      </div>
    </motion.article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[15px] font-semibold text-[color:var(--navy)]">{label}</div>
      <div className="mt-1 text-[15px] text-foreground/85">{value}</div>
    </div>
  );
}
