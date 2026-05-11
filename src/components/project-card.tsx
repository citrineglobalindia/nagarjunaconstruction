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

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, when: "beforeChildren", staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function ProjectCard(p: ProjectCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="group flex flex-col border border-[color:var(--navy)]/15 bg-card shadow-[0_2px_18px_-12px_rgba(10,26,47,0.2)] transition-shadow duration-500 hover:shadow-[0_24px_60px_-22px_rgba(10,26,47,0.35)]"
    >
      {/* Image with status ribbon */}
      <Link
        to="/projects/$slug"
        params={{ slug: p.slug }}
        className="relative block"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <motion.img
            src={p.hero_image ?? ""}
            alt={p.name}
            loading="lazy"
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE }}
            whileHover={{ scale: 1.07 }}
            className="h-full w-full object-cover"
          />
          {/* Subtle vignette on hover */}
          <motion.div
            className="absolute inset-0 bg-[color:var(--navy)]/0"
            whileHover={{ backgroundColor: "rgba(10,26,47,0.18)" }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Ribbon */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className="pointer-events-none absolute -bottom-3 right-0 flex"
        >
          <span className="relative bg-[color:var(--navy)] px-7 py-3 text-[12px] font-medium tracking-wide text-cream">
            {p.status}
            <span
              className="absolute -bottom-2 right-0 h-2 w-3 bg-[color:var(--navy)]/70"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
            />
          </span>
        </motion.div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col px-7 pb-0 pt-8">
        <Link to="/projects/$slug" params={{ slug: p.slug }}>
          <motion.h3
            variants={itemVariants}
            className="font-sans text-[1.65rem] font-normal leading-tight text-[color:var(--navy)] transition-colors group-hover:text-gold"
          >
            {p.name}
          </motion.h3>
        </Link>
        <motion.p variants={itemVariants} className="mt-3 text-[15px] text-foreground/80">
          {p.location}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-7 grid grid-cols-2 gap-x-6 gap-y-6 pb-8"
        >
          <Stat label="Price" value={formatPrice(p.price_from)} />
          <Stat
            label={p.type === "Apartment" || p.type === "Branded Residence" ? "Residential Apartments" : "Unit Size"}
            value={formatUnit(p.bedrooms_min, p.bedrooms_max, p.type)}
          />
          {(p.bedrooms_min || p.bedrooms_max) && (
            <Stat label="Unit Size" value={`${600 + ((p.bedrooms_min ?? 1) - 1) * 200} Sq.ft. Onwards*`} />
          )}
        </motion.div>

        {/* Twin CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-auto grid grid-cols-2 gap-[2px] bg-[color:var(--navy)]/15 -mx-px -mb-px"
        >
          <InquiryDialog
            projectId={p.id}
            projectName={p.name}
            source="card-site-visit"
            trigger={<CTAButton>Book a Site Visit</CTAButton>}
          />
          <InquiryDialog
            projectId={p.id}
            projectName={p.name}
            source="card-enquire"
            trigger={<CTAButton>Enquire Now</CTAButton>}
          />
        </motion.div>
      </div>
    </motion.article>
  );
}

function CTAButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ backgroundColor: "rgba(10,26,47,0.92)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="relative overflow-hidden bg-[color:var(--navy)] px-4 py-4 text-[13px] font-medium tracking-wide text-cream"
    >
      <motion.span
        className="absolute inset-0 origin-left bg-gold/20"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      <span className="relative">{children}</span>
    </motion.button>
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
