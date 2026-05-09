import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { X } from "lucide-react";

export function InquiryDialog({
  trigger,
  projectId,
  projectName,
  source = "general",
}: {
  trigger: ReactNode;
  projectId?: string | null;
  projectName?: string;
  source?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      project_id: projectId ?? null,
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      country: String(fd.get("country") || ""),
      message: String(fd.get("message") || ""),
      source,
    };
    const { error } = await supabase.from("inquiries").insert(payload);
    setLoading(false);
    if (error) {
      toast.error("Could not submit. Please try again.");
      return;
    }
    toast.success("Thank you. A private advisor will be in touch shortly.");
    setOpen(false);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xl border-0 bg-[color:var(--navy)] p-0 text-cream sm:rounded-none">
        <DialogTitle className="sr-only">Register Interest</DialogTitle>
        <button onClick={() => setOpen(false)} className="absolute right-5 top-5 text-cream/60 hover:text-gold">
          <X className="h-5 w-5" />
        </button>
        <div className="p-10">
          <p className="eyebrow"><span className="gold-rule" />Private Enquiry</p>
          <h3 className="mt-3 font-display text-3xl text-cream">
            {projectName ? `Register interest — ${projectName}` : "Begin your private consultation"}
          </h3>
          <p className="mt-2 text-sm text-cream/65">A senior advisor will respond within 24 hours.</p>

          <form onSubmit={onSubmit} className="mt-8 grid gap-5">
            <Field name="name" label="Full Name" required />
            <div className="grid gap-5 md:grid-cols-2">
              <Field name="email" type="email" label="Email" required />
              <Field name="phone" label="Phone" />
            </div>
            <Field name="country" label="Country of Residence" />
            <Field name="message" label="Message" textarea />
            <button disabled={loading} className="btn-gold mt-2 w-full disabled:opacity-60">
              {loading ? "Sending…" : "Submit Enquiry"}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ name, label, type = "text", required, textarea }: { name: string; label: string; type?: string; required?: boolean; textarea?: boolean }) {
  const cls = "w-full bg-transparent border-0 border-b border-cream/25 py-3 text-cream placeholder-cream/40 outline-none focus:border-gold transition-colors";
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.24em] text-cream/55">{label}{required && <span className="text-gold"> *</span>}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={3} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}
