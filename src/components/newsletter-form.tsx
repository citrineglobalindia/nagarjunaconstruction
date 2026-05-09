import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function NewsletterForm() {
  const [loading, setLoading] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    setLoading(false);
    if (error && !error.message.includes("duplicate")) {
      toast.error("Subscription failed.");
      return;
    }
    toast.success("Welcome to the inner circle.");
    (e.target as HTMLFormElement).reset();
  }
  return (
    <form onSubmit={onSubmit} className="flex items-center border-b border-cream/30 focus-within:border-gold">
      <input
        name="email"
        type="email"
        required
        placeholder="your@email.com"
        className="flex-1 bg-transparent py-3 text-sm text-cream placeholder-cream/40 outline-none"
      />
      <button disabled={loading} className="text-[11px] uppercase tracking-[0.24em] text-gold hover:text-cream disabled:opacity-50">
        {loading ? "…" : "Join"}
      </button>
    </form>
  );
}
