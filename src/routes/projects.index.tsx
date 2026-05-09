import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { supabase } from "@/integrations/supabase/client";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";

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
const STATUSES = ["Ready", "Off-Plan", "Under Construction"];
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
      <section className="bg-[color:var(--navy)] pb-16 pt-36 md:pt-44">
        <div className="container-luxe">
          <SectionHeading
            invert
            eyebrow="The Collection"
            title="Discover our world of residences"
            subtitle="From serene Maldivian retreats to skyline towers in Dubai and London, every address is selected with intention."
          />
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-luxe flex flex-wrap items-center gap-3 py-5">
          <FilterSelect label="Type" value={search.type} options={TYPES} onChange={(v) => setFilter("type", v)} />
          <FilterSelect label="Status" value={search.status} options={STATUSES} onChange={(v) => setFilter("status", v)} />
          <FilterSelect label="Bedrooms" value={search.bedrooms} options={BEDROOMS} onChange={(v) => setFilter("bedrooms", v)} />
          {(search.type || search.status || search.bedrooms) && (
            <button
              onClick={() => navigate({ search: {} })}
              className="ml-auto text-[11px] uppercase tracking-[0.22em] text-gold hover:underline"
            >
              Clear
            </button>
          )}
          <span className="ml-auto text-xs text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "residence" : "residences"}
          </span>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container-luxe">
          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-[4/5] animate-pulse bg-muted" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center text-muted-foreground">No residences match your selection.</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => <ProjectCard key={p.slug} {...p} />)}
            </div>
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
