import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  MapPin, ChevronRight, ChevronLeft, X, Download, Play, Phone, MessageCircle,
  Building2, Layers, Home, IndianRupee, Plus, Minus,
} from "lucide-react";
import { InquiryDialog } from "@/components/inquiry-dialog";
import { BrochureDialog } from "@/components/brochure-dialog";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-white pt-40 pb-20 text-center">
      <h1 className="font-display text-4xl text-[color:var(--pv-blue)]">Project not found</h1>
      <Link to="/projects" className="mt-8 inline-flex bg-[color:var(--pv-blue)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">
        View all projects
      </Link>
    </div>
  ),
});

/* ================================================================
   Puravankara-style Project Details
   Color system (scoped to this page via inline style on root <div>):
     --pv-blue:    deep brand blue (nav / headings / CTAs)
     --pv-blue-2:  hover / accent
     --pv-soft:    very light blue tint surface
     --pv-line:    hairline border
   ================================================================ */

function formatPriceShort(v: number | null) {
  if (!v) return "On Request";
  if (v >= 10_000_000) return `${(v / 10_000_000).toFixed(2)} Cr*`;
  return `${(v / 100_000).toFixed(2)} L*`;
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

  if (isLoading)
    return <div className="min-h-screen bg-white pt-40 text-center text-sm uppercase tracking-[0.2em] text-slate-500">Loading…</div>;
  if (!project) return null;

  const gallery = ((project.gallery as string[]) || []).filter(Boolean);
  const amenities = (project.amenities as string[]) || [];
  const bhkRange =
    project.bedrooms_min && project.bedrooms_max
      ? project.bedrooms_min === project.bedrooms_max
        ? `${project.bedrooms_min} BHK`
        : `${project.bedrooms_min}, ${project.bedrooms_max} BHK`
      : "Various";

  return (
    <div
      className="bg-white text-slate-700"
      style={
        {
          ["--pv-blue" as any]: "#1B3A6B",
          ["--pv-blue-2" as any]: "#27518F",
          ["--pv-soft" as any]: "#F4F7FB",
          ["--pv-line" as any]: "#E3E8EF",
        } as React.CSSProperties
      }
    >
      {/* ============== HERO ============== */}
      <section className="relative h-[100vh] min-h-[640px] w-full overflow-hidden bg-[color:var(--pv-blue)]">
        {project.hero_image && (
          <img src={project.hero_image} alt={project.name} className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-16 md:px-16 md:pb-20">
          <h1 className="font-display text-5xl font-light text-white md:text-7xl">{project.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">
            Near {project.location} | {bhkRange}
            {project.price_from ? ` | ${formatPriceShort(project.price_from as number)} Onwards*` : ""}
          </p>
        </div>
        <div className="absolute bottom-4 left-6 text-[10px] uppercase tracking-[0.3em] text-white/60 md:left-16">
          Artistic Impression
        </div>
      </section>

      {/* ============== BREADCRUMB ============== */}
      <div className="border-b border-[color:var(--pv-line)] bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-5 text-xs text-slate-500 md:px-10">
          <Link to="/" className="hover:text-[color:var(--pv-blue)]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/projects" className="hover:text-[color:var(--pv-blue)]">Residential</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-700">{project.location}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-[color:var(--pv-blue)]">{project.name}</span>
        </div>
      </div>

      {/* ============== OVERVIEW ============== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div className="overflow-hidden">
              <img
                src={project.hero_image ?? gallery[0]}
                alt={project.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl font-normal text-[color:var(--pv-blue)] md:text-4xl">
                {project.name}
              </h2>
              <h3 className="mt-3 font-display text-2xl font-light text-slate-700 md:text-3xl">
                {project.type} Living in {project.location}
              </h3>
              <p className="mt-7 text-base leading-[1.85] text-slate-600">
                {project.description ||
                  `A thoughtfully crafted residential development in ${project.location}, designed around space, light, and a sense of community. Every residence balances modern interiors with generous outdoor amenities for a complete lifestyle experience.`}
              </p>
              <BrochureDialog
                projectId={project.id}
                projectName={project.name}
                brochureUrl={project.brochure_url}
                trigger={
                  <button className="mt-9 inline-flex items-center gap-2 border border-[color:var(--pv-blue)] bg-transparent px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--pv-blue)] transition-colors hover:bg-[color:var(--pv-blue)] hover:text-white">
                    <Download className="h-4 w-4" /> Download Brochure
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============== KEY FEATURES ============== */}
      <section className="bg-[color:var(--pv-soft)] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading eyebrow="Key Features" title="A holistic community to call home" />
          <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-[1.85] text-slate-600">
            {project.name} sits across landscaped grounds with generous open spaces, multiple clubhouses, and 40+ lifestyle
            amenities — designed to nurture a thriving, multi-generational community.
          </p>
          <div className="mt-14 grid grid-cols-2 gap-px bg-[color:var(--pv-line)] md:grid-cols-4">
            <Stat icon={Home} value={bhkRange} label="Apartments" />
            <Stat
              icon={IndianRupee}
              value={project.price_from ? `₹ ${formatPriceShort(project.price_from as number).replace("*", "")}` : "On Request"}
              label="Onwards*"
            />
            <Stat icon={Building2} value="21" label="Towers" />
            <Stat icon={Layers} value="S+12" label="Floors" />
          </div>
        </div>
      </section>

      {/* ============== PROJECT TOUR ============== */}
      <ProjectTour project={project} gallery={gallery} />

      {/* ============== AMENITIES ============== */}
      {amenities.length > 0 && <Amenities amenities={amenities} cover={project.hero_image ?? gallery[0]} />}

      {/* ============== UNIT PLANS ============== */}
      <UnitPlans project={project} />

      {/* ============== GALLERY ============== */}
      {gallery.length > 0 && <Gallery images={gallery} />}

      {/* ============== LOCATION ADVANTAGES ============== */}
      <LocationAdvantages location={project.location} />

      {/* ============== PROJECT PROGRESS ============== */}
      <section className="bg-[color:var(--pv-soft)] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
          <SectionHeading eyebrow="Project Progress" title="Track our construction milestones" centered />
          <a
            href={project.brochure_url || "#"}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-[color:var(--pv-blue)] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[color:var(--pv-blue-2)]"
          >
            View Construction Status <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ============== EMI CALCULATOR ============== */}
      <EMICalculator />

      {/* ============== FAQs ============== */}
      <FAQs project={project} bhkRange={bhkRange} />

      {/* ============== PROJECT OVERVIEW FOOTER ============== */}
      <section className="bg-[color:var(--pv-blue)] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70">
            Project Overview
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-4">
            <OverviewItem label="RERA No" value="TN/29/Building/0008/2023" />
            <OverviewItem label="Project Status" value={project.status} />
            <OverviewItem label="Development Size" value="55 Acres Approx." />
            <OverviewItem label="Possession Date" value={project.handover_date ?? "31-12-2026"} />
          </div>
        </div>
      </section>

      {/* ============== STICKY ENQUIRE / CONTACT (mobile + side) ============== */}
      <SideCTA project={project} />
    </div>
  );
}

/* ================================================================
   Subcomponents
   ================================================================ */

function SectionHeading({
  eyebrow,
  title,
  centered = true,
}: {
  eyebrow: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h3 className="font-display text-xl font-medium text-[color:var(--pv-blue)] md:text-2xl">{eyebrow}</h3>
      <h2 className="mt-2 font-display text-2xl font-light text-slate-700 md:text-[28px]">{title}</h2>
    </div>
  );
}

function Stat({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 bg-white px-4 py-12 text-center">
      <Icon className="h-8 w-8 text-[color:var(--pv-blue)]" strokeWidth={1.4} />
      <div className="font-display text-2xl text-[color:var(--pv-blue)] md:text-3xl">{value}</div>
      <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">{label}</div>
    </div>
  );
}

function OverviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">{label}</p>
      <p className="mt-3 font-display text-lg text-white">{value}</p>
    </div>
  );
}

/* -------------------- Project Tour -------------------- */
function ProjectTour({ project, gallery }: { project: any; gallery: string[] }) {
  const [tab, setTab] = useState<"walk" | "lifestyle">("walk");
  const cover = tab === "walk" ? project.hero_image : gallery[0] ?? project.hero_image;
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Project Tour" title="Take a closer look" />
        <div className="mt-10 flex justify-center gap-2">
          <TabBtn active={tab === "walk"} onClick={() => setTab("walk")}>Walkthrough</TabBtn>
          <TabBtn active={tab === "lifestyle"} onClick={() => setTab("lifestyle")}>Lifestyle Video</TabBtn>
        </div>
        <div className="relative mt-10 aspect-video w-full overflow-hidden bg-slate-200">
          {cover && <img src={cover} alt="Tour cover" className="absolute inset-0 h-full w-full object-cover" />}
          <div className="absolute inset-0 grid place-items-center bg-black/25">
            <button className="grid h-20 w-20 place-items-center rounded-full bg-white/90 text-[color:var(--pv-blue)] shadow-2xl transition-transform hover:scale-110">
              <Play className="ml-1 h-8 w-8 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-7 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors ${
        active
          ? "bg-[color:var(--pv-blue)] text-white"
          : "bg-transparent text-[color:var(--pv-blue)] hover:bg-[color:var(--pv-blue)]/5"
      }`}
    >
      {children}
    </button>
  );
}

function TabGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 flex justify-center">
      <div className="inline-flex items-center gap-1 rounded-full border border-[color:var(--pv-line)] bg-white p-1">
        {children}
      </div>
    </div>
  );
}

/* -------------------- Amenities -------------------- */
function Amenities({ amenities, cover }: { amenities: string[]; cover?: string }) {
  const [tab, setTab] = useState<"indoor" | "outdoor">("indoor");
  const [active, setActive] = useState(0);
  const list = useMemo(() => {
    const half = Math.ceil(amenities.length / 2);
    return tab === "indoor" ? amenities.slice(0, half) : amenities.slice(half);
  }, [amenities, tab]);

  useEffect(() => setActive(0), [tab]);
  const current = list[active] ?? amenities[0];

  return (
    <section className="bg-[color:var(--pv-soft)] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Project Amenities" title="Premium amenities" />
        <div className="mt-10 flex justify-center gap-2">
          <TabBtn active={tab === "indoor"} onClick={() => setTab("indoor")}>Indoor</TabBtn>
          <TabBtn active={tab === "outdoor"} onClick={() => setTab("outdoor")}>Outdoor</TabBtn>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
            {cover && (
              <motion.img
                key={current}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={cover}
                alt={current}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="font-display text-2xl text-white">{current}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[color:var(--pv-line)]">
            {list.slice(0, 8).map((a, i) => (
              <button
                key={a}
                onClick={() => setActive(i)}
                className={`flex flex-col items-center gap-3 px-4 py-7 text-center transition-colors ${
                  active === i ? "bg-[color:var(--pv-blue)] text-white" : "bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-full ${
                    active === i ? "bg-white/15" : "bg-[color:var(--pv-soft)]"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${active === i ? "bg-white" : "bg-[color:var(--pv-blue)]"}`} />
                </span>
                <span className="text-[12px] font-medium">{a}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Unit Plans -------------------- */
function UnitPlans({ project }: { project: any }) {
  const [tab, setTab] = useState<"master" | "unit">("master");
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Unit Plans" title="Well-planned apartment layouts" />
        <div className="mt-10 flex justify-center gap-2">
          <TabBtn active={tab === "master"} onClick={() => setTab("master")}>Master Plan</TabBtn>
          <TabBtn active={tab === "unit"} onClick={() => setTab("unit")}>Unit Plan</TabBtn>
        </div>
        <div className="mt-10 aspect-[16/9] overflow-hidden bg-[color:var(--pv-soft)]">
          {project.hero_image && (
            <img src={project.hero_image} alt="Plan" className="h-full w-full object-cover opacity-90" />
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Gallery (lightbox) -------------------- */
function Gallery({ images }: { images: string[] }) {
  const [tab, setTab] = useState<"interior" | "exterior">("interior");
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
    <section className="bg-[color:var(--pv-soft)] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Gallery" title="A glimpse of life at its best" />
        <div className="mt-10 flex justify-center gap-2">
          <TabBtn active={tab === "interior"} onClick={() => setTab("interior")}>Interior</TabBtn>
          <TabBtn active={tab === "exterior"} onClick={() => setTab("exterior")}>Exterior</TabBtn>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="group relative aspect-[4/3] overflow-hidden bg-slate-200"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[color:var(--pv-blue)]/0 transition-colors group-hover:bg-[color:var(--pv-blue)]/25" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6"
            onClick={() => setActive(null)}
          >
            <button onClick={(e) => { e.stopPropagation(); setActive(null); }} className="absolute right-6 top-6 text-white">
              <X className="h-7 w-7" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActive(((active ?? 0) - 1 + images.length) % images.length); }}
              className="absolute left-6 text-white"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <motion.img
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={images[active]}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-[92vw] object-contain"
            />
            <button
              onClick={(e) => { e.stopPropagation(); setActive(((active ?? 0) + 1) % images.length); }}
              className="absolute right-6 text-white"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* -------------------- Location Advantages -------------------- */
function LocationAdvantages({ location }: { location: string }) {
  const groups = [
    {
      title: "Transportation",
      items: [
        ["Main Road", "5 mins"],
        ["Railway Station", "15 mins"],
        ["Metro Station", "20 mins"],
        ["International Airport", "30 mins"],
      ],
    },
    {
      title: "Educational Institutions",
      items: [
        ["Global School", "5 mins"],
        ["International School", "10 mins"],
        ["Public School", "15 mins"],
        ["University", "20 mins"],
      ],
    },
    {
      title: "Healthcare",
      items: [
        ["Memorial Hospital", "10 mins"],
        ["Multi-speciality Hospital", "15 mins"],
        ["Maternity Cradle", "20 mins"],
        ["Health City", "20 mins"],
      ],
    },
    {
      title: "Business & Commercial Hubs",
      items: [
        ["IT SEZ", "20 mins"],
        ["Infocity", "20 mins"],
        ["Tidel Park", "30 mins"],
        ["Industrial Estate", "30 mins"],
      ],
    },
    {
      title: "Retail, Shopping & Entertainment",
      items: [
        ["Reliance Smart", "5 mins"],
        ["Phoenix Marketcity", "20 mins"],
        ["Grand Square Mall", "20 mins"],
        ["Marina Mall", "25 mins"],
      ],
    },
    {
      title: "Culture & Green Spaces",
      items: [
        ["Marshland", "5 mins"],
        ["Forest Reserve", "15 mins"],
        ["Beach", "35 mins"],
        ["Heritage Temple", "40 mins"],
      ],
    },
  ];

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Social Infrastructure" title={`Location advantages — ${location}`} />
        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title} className="border-l-2 border-[color:var(--pv-blue)] pl-6">
              <h4 className="font-display text-lg text-[color:var(--pv-blue)]">{g.title}</h4>
              <ul className="mt-5 space-y-3 text-sm">
                {g.items.map(([n, t]) => (
                  <li key={n} className="flex items-center justify-between border-b border-dashed border-[color:var(--pv-line)] pb-3">
                    <span className="text-slate-700">{n}</span>
                    <span className="font-medium text-[color:var(--pv-blue)]">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- EMI Calculator -------------------- */
function EMICalculator() {
  const [amount, setAmount] = useState(2_000_000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  const emi =
    monthlyRate === 0
      ? amount / months
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const total = emi * months;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="EMI Calculator" title="Calculate your EMI" />
        <p className="mx-auto mt-5 max-w-3xl text-center text-xs text-slate-500">
          *The EMI and interest shown here is indicative. Connect with our sales manager for tailored solutions.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-10 border border-[color:var(--pv-line)] bg-[color:var(--pv-soft)] p-8 md:p-10">
            <Slider label="Loan Amount" value={amount} min={500_000} max={20_000_000} step={100_000}
              format={(v) => `₹ ${fmt(v).replace("₹", "").trim()}`} onChange={setAmount} />
            <Slider label="Rate of Interest" value={rate} min={2} max={20} step={0.1}
              format={(v) => `${v.toFixed(1)} %`} onChange={setRate} />
            <Slider label="Tenure" value={years} min={1} max={30} step={1}
              format={(v) => `${v} Years`} onChange={setYears} />
          </div>
          <div className="bg-[color:var(--pv-blue)] p-10 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">Selected Scheme</p>
            <p className="mt-2 text-sm text-white/80">🇮🇳 INR (₹)</p>

            <div className="mt-10 space-y-7">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">Total amount</p>
                <p className="mt-1 font-display text-3xl">{fmt(total)}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">Your EMI</p>
                <p className="mt-1 font-display text-3xl">
                  {fmt(emi)} <span className="text-sm font-normal text-white/70">/ month</span>
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">Loan Amount</p>
                <p className="mt-1 font-display text-2xl">{fmt(amount)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label, value, min, max, step, format, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number;
  format: (v: number) => string; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-end justify-between">
        <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</label>
        <span className="font-display text-xl text-[color:var(--pv-blue)]">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-4 w-full accent-[color:var(--pv-blue)]"
      />
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.18em] text-slate-400">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

/* -------------------- FAQs -------------------- */
function FAQs({ project, bhkRange }: { project: any; bhkRange: string }) {
  const faqs = [
    {
      q: `What types of apartments are available at ${project.name}?`,
      a: `${project.name} offers a range of ${bhkRange} residences with contemporary design, modern kitchens, spacious interiors and generous balconies designed for sophisticated urban living.`,
    },
    {
      q: "What amenities are included with the apartments?",
      a: "Residents enjoy access to two clubhouses, sports facilities, landscaped gardens, a dedicated yoga room, multiple sports courts and expansive green open spaces designed for a complete lifestyle experience.",
    },
    {
      q: `How is the connectivity and location advantage near ${project.location}?`,
      a: `${project.location} is one of the fastest-growing residential corridors with excellent connectivity to major IT hubs, business districts, schools, hospitals and shopping centres, with upcoming metro connectivity.`,
    },
    {
      q: "Are financing options available?",
      a: "Yes — we work with leading banks and financial institutions to provide competitive home loan options with attractive interest rates and flexible payment schedules.",
    },
    {
      q: "What is the construction quality and delivery timeline?",
      a: "The project maintains the highest standards of construction quality with premium materials and modern building techniques, delivered on schedule as a RERA-registered development.",
    },
    {
      q: "How can I schedule a site visit?",
      a: "Contact our sales team to arrange a personalised tour at your preferred time. Our consultants will showcase apartment configurations, amenities and walk you through the booking process end-to-end.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[color:var(--pv-soft)] py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
        <div className="mt-12 divide-y divide-[color:var(--pv-line)] border-y border-[color:var(--pv-line)] bg-white">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8"
                >
                  <span className="font-display text-base text-[color:var(--pv-blue)] md:text-lg">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center border border-[color:var(--pv-blue)] text-[color:var(--pv-blue)]">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-[1.85] text-slate-600 md:px-8">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Floating side / mobile CTA -------------------- */
function SideCTA({ project }: { project: any }) {
  return (
    <>
      {/* Desktop side rail */}
      <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <InquiryDialog
          projectId={project.id}
          projectName={project.name}
          source="side-rail"
          trigger={
            <button
              className="origin-bottom-right -rotate-90 bg-[color:var(--pv-blue)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white shadow-xl transition-colors hover:bg-[color:var(--pv-blue-2)]"
              style={{ transformOrigin: "100% 100%" }}
            >
              Enquire Now
            </button>
          }
        />
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-[color:var(--pv-line)] bg-white shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.18)] lg:hidden">
        <a
          href="tel:+910000000000"
          className="flex items-center justify-center gap-2 border-r border-[color:var(--pv-line)] py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--pv-blue)]"
        >
          <Phone className="h-4 w-4" /> Call us
        </a>
        <a
          href="https://wa.me/910000000000?text=Hi"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-[color:var(--pv-blue)] py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
      <div aria-hidden className="h-16 lg:hidden" />
    </>
  );
}
