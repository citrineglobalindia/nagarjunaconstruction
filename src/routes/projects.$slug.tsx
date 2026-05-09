import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Calendar, Wallet, Bed, ArrowLeft } from "lucide-react";
import { InquiryDialog } from "@/components/inquiry-dialog";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="container-luxe py-40 text-center">
      <h1 className="font-display text-4xl">Residence not found</h1>
      <Link to="/projects" className="btn-gold mt-8 inline-flex">View all projects</Link>
    </div>
  ),
});

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

  const gallery = (project.gallery as string[]) || [];
  const amenities = (project.amenities as string[]) || [];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden bg-[color:var(--navy)]">
        <img src={project.hero_image ?? ""} alt={project.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)]/90 via-[color:var(--navy)]/30 to-[color:var(--navy)]/40" />
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

            {/* Gallery */}
            {gallery.length > 0 && (
              <div className="mt-16">
                <p className="eyebrow"><span className="gold-rule" />Gallery</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {gallery.map((src, i) => (
                    <div key={i} className={`overflow-hidden bg-muted ${i === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
                      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="mt-16">
                <p className="eyebrow"><span className="gold-rule" />Amenities</p>
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-3">
                  {amenities.map((a) => (
                    <div key={a} className="flex items-center gap-3 border-b border-border py-3 text-sm">
                      <span className="h-1 w-1 rounded-full bg-gold" /> {a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="border border-[color:var(--navy)]/15 bg-card p-8">
              <p className="eyebrow"><span className="gold-rule" />Key Facts</p>
              <dl className="mt-6 space-y-5 text-sm">
                <Fact icon={MapPin} label="Location" value={project.location} />
                <Fact icon={Calendar} label="Handover" value={project.handover_date ?? "TBA"} />
                <Fact
                  icon={Wallet}
                  label="Starting Price"
                  value={project.price_from ? `AED ${(Number(project.price_from) / 1_000_000).toFixed(2)}M` : "On Request"}
                />
                <Fact
                  icon={Bed}
                  label="Bedrooms"
                  value={project.bedrooms_min && project.bedrooms_max ? `${project.bedrooms_min} – ${project.bedrooms_max}` : "Various"}
                />
              </dl>
              <InquiryDialog
                projectId={project.id}
                projectName={project.name}
                source="project-detail"
                trigger={<button className="btn-gold mt-8 w-full">Register Interest</button>}
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
