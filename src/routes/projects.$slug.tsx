import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  MapPin, Calendar, Wallet, Bed, ArrowLeft, X, ChevronLeft, ChevronRight, Download,
  Dumbbell, Waves, Trees, Shield, Car, Wifi, Utensils, Sparkles,
  Users, Baby, Building2, FlowerIcon, Check,
} from "lucide-react";
import { InquiryDialog } from "@/components/inquiry-dialog";
import { BrochureDialog } from "@/components/brochure-dialog";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="container-luxe py-40 text-center">
      <h1 className="font-display text-4xl">Residence not found</h1>
      <Link to="/projects" className="btn-gold mt-8 inline-flex">View all projects</Link>
    </div>
  ),
});

const AMENITY_ICONS: Record<string, any> = {
  gym: Dumbbell, fitness: Dumbbell,
  pool: Waves, swim: Waves, beach: Waves,
  garden: Trees, landscape: Trees, park: Trees,
  security: Shield, concierge: Shield,
  parking: Car, valet: Car,
  wifi: Wifi, lounge: Sofa(),
  dining: Utensils, restaurant: Utensils,
  spa: Sparkles, wellness: Sparkles,
  club: Users, community: Users,
  kids: Baby, children: Baby, play: Baby,
  business: Building2, lobby: Building2,
  yoga: FlowerIcon,
};
function Sofa() { return Users; }

function iconFor(name: string) {
  const key = Object.keys(AMENITY_ICONS).find((k) => name.toLowerCase().includes(k));
  return key ? AMENITY_ICONS[key] : Sparkles;
}

function formatPrice(v: number | null) {
  if (!v) return "On Request";
  if (v >= 10_000_000) return `₹${(v / 10_000_000).toFixed(2)} Cr*`;
  return `₹${Math.round(v / 100_000)} Lakhs*`;
}

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data: project, isLoading } = useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  if (isLoading) return <div className="container-luxe py-40 text-center text-muted-foreground">Loading…</div>;
  if (!project) return null;

  const gallery = ((project.gallery as string[]) || []).filter(Boolean);
  const fullGallery = project.hero_image ? [project.hero_image, ...gallery] : gallery;
  const amenities = (project.amenities as string[]) || [];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden bg-[color:var(--navy)]">
        <img src={project.hero_image ?? ""} alt={project.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)]/95 via-[color:var(--navy)]/35 to-[color:var(--navy)]/45" />
        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-16 text-cream">
          <Link to="/projects" className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-cream/70 hover:text-gold">
            <ArrowLeft className="h-3 w-3" /> Back to Collection
          </Link>
          <span className="inline-flex w-fit bg-gold px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--navy)]">
            {project.status}
          </span>
          <h1 className="mt-5 font-display text-5xl md:text-7xl">{project.name}</h1>
          <p className="mt-3 flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-gold">
            <MapPin className="h-4 w-4" /> {project.location}
          </p>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container-luxe grid gap-16 lg:grid-cols-[1fr_360px]">
          {/* Main */}
          <div>
            <p className="eyebrow"><span className="gold-rule" />Overview</p>
            <h2 className="mt-4 font-display text-3xl text-[color:var(--navy)] md:text-4xl">A sanctuary of considered living.</h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/85">{project.description}</p>

            {/* Gallery — lightbox grid */}
            {fullGallery.length > 0 && <Gallery images={fullGallery} />}

            {/* Amenities with icons */}
            {amenities.length > 0 && (
              <div className="mt-20">
                <p className="eyebrow"><span className="gold-rule" />World-Class Amenities</p>
                <h3 className="mt-3 font-display text-2xl text-[color:var(--navy)] md:text-3xl">Crafted for elevated living.</h3>
                <div className="mt-8 grid grid-cols-2 gap-px bg-border md:grid-cols-3 lg:grid-cols-4">
                  {amenities.map((a, i) => {
                    const Icon = iconFor(a);
                    return (
                      <motion.div
                        key={a}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.04 }}
                        className="flex flex-col items-center gap-3 bg-card px-4 py-8 text-center transition-colors hover:bg-muted"
                      >
                        <Icon className="h-7 w-7 text-gold" strokeWidth={1.4} />
                        <span className="text-sm font-medium text-[color:var(--navy)]">{a}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Floor Plans tabs */}
            <FloorPlans project={project} />

            {/* Payment Plan stepper */}
            <PaymentPlan />
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="border border-[color:var(--navy)]/15 bg-card p-8">
              <p className="eyebrow"><span className="gold-rule" />Key Facts</p>
              <dl className="mt-6 space-y-5 text-sm">
                <Fact icon={MapPin} label="Location" value={project.location} />
                <Fact icon={Calendar} label="Handover" value={project.handover_date ?? "TBA"} />
                <Fact icon={Wallet} label="Starting Price" value={formatPrice(project.price_from as number | null)} />
                <Fact
                  icon={Bed}
                  label="Configurations"
                  value={project.bedrooms_min && project.bedrooms_max ? `${project.bedrooms_min} – ${project.bedrooms_max} BHK` : "Various"}
                />
              </dl>
              <InquiryDialog
                projectId={project.id}
                projectName={project.name}
                source="project-detail"
                trigger={<button className="btn-gold mt-8 w-full">Register Interest</button>}
              />
              <InquiryDialog
                projectId={project.id}
                projectName={project.name}
                source="site-visit"
                trigger={
                  <button className="mt-3 w-full border border-[color:var(--navy)] bg-transparent px-4 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--navy)] transition-colors hover:bg-[color:var(--navy)] hover:text-cream">
                    Book a Site Visit
                  </button>
                }
              />
              <BrochureDialog
                projectId={project.id}
                projectName={project.name}
                brochureUrl={project.brochure_url}
                trigger={
                  <button className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-gold/60 bg-transparent px-4 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--navy)] transition-colors hover:bg-gold hover:text-[color:var(--navy)]">
                    <Download className="h-4 w-4" /> Download Brochure
                  </button>
                }
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Fact({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-0.5 h-4 w-4 text-gold" strokeWidth={1.4} />
      <div>
        <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</dt>
        <dd className="mt-1 font-display text-lg text-[color:var(--navy)]">{value}</dd>
      </div>
    </div>
  );
}

/* ---------------- Lightbox Gallery ---------------- */
function Gallery({ images }: { images: string[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, images.length]);

  return (
    <div className="mt-16">
      <p className="eyebrow"><span className="gold-rule" />Gallery</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden bg-muted ${i === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
          >
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[color:var(--navy)]/0 transition-colors duration-300 group-hover:bg-[color:var(--navy)]/30" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[color:var(--navy)]/95 p-6"
            onClick={() => setActive(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setActive(null); }}
              className="absolute right-6 top-6 text-cream hover:text-gold"
              aria-label="Close"
            >
              <X className="h-7 w-7" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActive(((active ?? 0) - 1 + images.length) % images.length); }}
              className="absolute left-6 text-cream hover:text-gold"
              aria-label="Previous"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={images[active]}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-[92vw] object-contain shadow-2xl"
            />
            <button
              onClick={(e) => { e.stopPropagation(); setActive(((active ?? 0) + 1) % images.length); }}
              className="absolute right-6 text-cream hover:text-gold"
              aria-label="Next"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-cream/70">
              {active + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Floor Plan Tabs ---------------- */
function FloorPlans({ project }: { project: any }) {
  const min = project.bedrooms_min ?? 2;
  const max = project.bedrooms_max ?? Math.max(min, 4);
  const configs = [];
  for (let b = min; b <= max; b++) {
    configs.push({
      label: `${b} BHK`,
      area: `${800 + (b - 1) * 320} – ${1100 + (b - 1) * 320} sq.ft`,
      image: project.hero_image,
    });
  }
  const [tab, setTab] = useState(0);
  const current = configs[tab];

  return (
    <div className="mt-20">
      <p className="eyebrow"><span className="gold-rule" />Floor Plans</p>
      <h3 className="mt-3 font-display text-2xl text-[color:var(--navy)] md:text-3xl">Choose your residence.</h3>

      <div className="mt-6 flex flex-wrap gap-0 border-b border-border">
        {configs.map((c, i) => (
          <button
            key={c.label}
            onClick={() => setTab(i)}
            className={`relative px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors ${
              tab === i ? "text-[color:var(--navy)]" : "text-muted-foreground hover:text-[color:var(--navy)]"
            }`}
          >
            {c.label}
            {tab === i && (
              <motion.span
                layoutId="floorplan-underline"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-gold"
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 border border-border bg-card p-6 md:grid-cols-[1.4fr_1fr] md:p-10">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {current?.image && (
            <img src={current.image} alt={`${current.label} floor plan`} className="h-full w-full object-cover opacity-90" />
          )}
          <div className="absolute inset-0 bg-[color:var(--cream)]/40 mix-blend-overlay" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-gold">Configuration</p>
          <h4 className="mt-2 font-display text-3xl text-[color:var(--navy)]">{current.label} Residence</h4>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between border-b border-border pb-3">
              <dt className="text-muted-foreground">Carpet Area</dt>
              <dd className="font-medium text-[color:var(--navy)]">{current.area}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <dt className="text-muted-foreground">Bedrooms</dt>
              <dd className="font-medium text-[color:var(--navy)]">{tab + min}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <dt className="text-muted-foreground">Bathrooms</dt>
              <dd className="font-medium text-[color:var(--navy)]">{tab + min}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Balconies</dt>
              <dd className="font-medium text-[color:var(--navy)]">{Math.max(1, tab)}</dd>
            </div>
          </dl>
          <InquiryDialog
            projectId={project.id}
            projectName={project.name}
            source={`floor-plan-${current.label}`}
            trigger={<button className="btn-gold mt-8 w-fit">Request Detailed Plan</button>}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Payment Plan Stepper ---------------- */
function PaymentPlan() {
  const steps = [
    { pct: "10%", label: "On Booking", note: "Reservation & paperwork" },
    { pct: "20%", label: "Within 30 Days", note: "Sale agreement signed" },
    { pct: "40%", label: "Construction Milestones", note: "Linked to build progress" },
    { pct: "30%", label: "On Handover", note: "Possession & registration" },
  ];
  return (
    <div className="mt-20">
      <p className="eyebrow"><span className="gold-rule" />Payment Plan</p>
      <h3 className="mt-3 font-display text-2xl text-[color:var(--navy)] md:text-3xl">A structured path to ownership.</h3>

      <div className="relative mt-12">
        {/* connector line */}
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" />
        <div className="grid gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center bg-[color:var(--navy)] text-cream">
                <Check className="h-5 w-5 text-gold" strokeWidth={2} />
              </div>
              <div className="mt-5">
                <div className="font-display text-3xl text-[color:var(--navy)]">{s.pct}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">{s.label}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
