import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProjectCard } from "@/components/project-card";
import ShaderHero from "@/components/ui/animated-shader-hero";

const searchSchema = z.object({
  type: z.string().optional(),
  status: z.string().optional(),
  bedrooms: z.string().optional(),
});

export const Route = createFileRoute("/projects/")({
  validateSearch: zodValidator(searchSchema),
  component: ProjectsPage,
});

const TYPES = ["Apartment", "Villa", "Townhouse", "Branded Residence", "Hotel"];
// Display labels mapped to underlying DB status values
const STATUS_FILTERS: { label: string; values: string[] }[] = [
  { label: "Ongoing", values: ["Under Construction"] },
  { label: "Completed", values: ["Ready"] },
  { label: "Upcoming", values: ["Off-Plan"] },
];
const STATUSES = STATUS_FILTERS.map((s) => s.label);
const BEDROOMS = ["1+", "2+", "3+", "4+", "5+"];

function ProjectsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/projects" });

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id,slug,name,location,type,status,bedrooms_min,bedrooms_max,price_from,hero_image")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (search.type && p.type !== search.type) return false;
      if (search.status && p.status !== search.status) return false;
      if (search.bedrooms) {
        const min = parseInt(search.bedrooms);
        if ((p.bedrooms_min ?? 0) < min) return false;
      }
      return true;
    });
  }, [projects, search]);

  function setFilter(key: keyof typeof search, value: string | undefined) {
    navigate({ search: (prev: Record<string, string | undefined>) => ({ ...prev, [key]: value || undefined }) });
  }

  return (
    <>
      <ShaderHero
        trustBadge={{ text: "The Nagarjuna Collection", icons: [<Sparkles className="h-3.5 w-3.5" key="s" />] }}
        headline={{ line1: "Iconic Living.", line2: "Crafted for the Few." }}
        subtitle="From serene retreats to skyline towers, every address is selected with intention — a private portfolio of residences for those who value rarity over scale."
        buttons={{
          primary: { text: "Explore Residences", onClick: () => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" }) },
          secondary: { text: "Private Consultation", onClick: () => navigate({ to: "/contact" }) },
        }}
        className="pt-24"
      />


      {/* Status filter pills */}
      <section className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-luxe py-6">
          <LayoutGroup id="status-pills">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <StatusPill active={!search.status} onClick={() => setFilter("status", undefined)}>All</StatusPill>
              {STATUSES.map((s) => (
                <StatusPill key={s} active={search.status === s} onClick={() => setFilter("status", s)}>
                  {s}
                </StatusPill>
              ))}
            </div>
          </LayoutGroup>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.18em]">
            <FilterSelect label="Type" value={search.type} options={TYPES} onChange={(v) => setFilter("type", v)} />
            <FilterSelect label="Bedrooms" value={search.bedrooms} options={BEDROOMS} onChange={(v) => setFilter("bedrooms", v)} />
            {(search.type || search.status || search.bedrooms) && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => navigate({ search: {} })}
                className="text-gold hover:underline"
              >
                Clear
              </motion.button>
            )}
            <motion.span
              key={filtered.length}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-muted-foreground"
            >
              {filtered.length} {filtered.length === 1 ? "residence" : "residences"}
            </motion.span>
          </div>
        </div>
      </section>

      <section id="collection" className="bg-background py-16 md:py-24 scroll-mt-24">
        <div className="container-luxe">
          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1,2,3,4,5,6].map(i => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.1 }}
                  className="aspect-[4/5] bg-muted"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-24 text-center text-muted-foreground"
            >
              No residences match your selection.
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${search.status}-${search.type}-${search.bedrooms}`}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
                }}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((p) => <ProjectCard key={p.slug} {...p} />)}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value?: string; options: string[]; onChange: (v: string | undefined) => void }) {
  return (
    <div className="relative">
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || undefined)}
        className="appearance-none border border-border bg-transparent px-4 py-2.5 pr-10 text-xs uppercase tracking-[0.18em] text-[color:var(--navy)] focus:border-gold focus:outline-none"
      >
        <option value="">{label}: All</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold">▾</span>
    </div>
  );
}

function StatusPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={`relative min-w-[150px] border border-[color:var(--navy)] px-8 py-3 text-[14px] font-medium tracking-wide transition-colors ${
        active ? "text-cream" : "text-[color:var(--navy)] hover:bg-[color:var(--navy)]/5"
      }`}
    >
      {active && (
        <motion.span
          layoutId="active-pill"
          className="absolute inset-0 bg-[color:var(--navy)]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative">{children}</span>
    </motion.button>
  );
}
