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

// Display labels mapped to underlying DB status values
const STATUS_FILTERS: { label: string; values: string[] }[] = [
  { label: "Ongoing", values: ["Under Construction"] },
  { label: "Completed", values: ["Ready"] },
  { label: "Upcoming", values: ["Off-Plan"] },
];
const STATUSES = STATUS_FILTERS.map((s) => s.label);

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
      if (search.status) {
        const filter = STATUS_FILTERS.find((s) => s.label === search.status);
        if (filter && !filter.values.includes(p.status)) return false;
      }
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
