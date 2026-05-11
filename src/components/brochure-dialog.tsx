import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { X, Download, FileText } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
});

export function BrochureDialog({
  trigger,
  projectId,
  projectName,
  brochureUrl,
}: {
  trigger: ReactNode;
  projectId?: string | null;
  projectName: string;
  brochureUrl?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("inquiries").insert({
      project_id: projectId ?? null,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: `Brochure download — ${projectName}`,
      source: "brochure-download",
    });
    setLoading(false);

    if (error) {
      toast.error("Could not process your request. Please try again.");
      return;
    }

    if (!brochureUrl) {
      toast.success("Thank you. Our team will email the brochure shortly.");
      setOpen(false);
      return;
    }

    // Trigger download in a new tab so the dialog can close cleanly.
    const a = document.createElement("a");
    a.href = brochureUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.download = `${projectName.replace(/[^a-z0-9]+/gi, "-")}-brochure.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    toast.success("Your brochure is downloading.");
    setOpen(false);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg border-0 bg-[color:var(--navy)] p-0 text-cream sm:rounded-none">
        <DialogTitle className="sr-only">Download Brochure</DialogTitle>
        <button
          onClick={() => setOpen(false)}
          className="absolute right-5 top-5 text-cream/60 hover:text-gold"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="p-10">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-gold" strokeWidth={1.4} />
            <p className="eyebrow !mt-0"><span className="gold-rule" />Private Brochure</p>
          </div>
          <h3 className="mt-3 font-display text-3xl text-cream">{projectName}</h3>
          <p className="mt-2 text-sm text-cream/65">
            Share a few details and we will deliver the full residence brochure to you instantly.
          </p>

          <form onSubmit={onSubmit} className="mt-8 grid gap-5">
            <Field name="name" label="Full Name" required />
            <Field name="email" type="email" label="Email" required />
            <Field name="phone" label="Phone" />
            <button
              disabled={loading}
              className="btn-gold mt-2 inline-flex w-full items-center justify-center gap-2 disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              {loading ? "Preparing…" : "Download Brochure"}
            </button>
            <p className="text-[10px] uppercase tracking-[0.22em] text-cream/45">
              By submitting you agree to be contacted by our advisory team.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.24em] text-cream/55">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border-0 border-b border-cream/25 py-3 text-cream placeholder-cream/40 outline-none focus:border-gold transition-colors"
      />
    </label>
  );
}
