import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";

export function SiteFooter() {
  return (
    <footer className="bg-[color:var(--navy)] text-cream">
      <div className="container-luxe py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="font-display text-3xl">Nagarjuna</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.32em] text-gold">Corporation · Live & Let-live</div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
              Crafting iconic residences for a discerning few across the world's most sought-after addresses.
            </p>
            <div className="mt-8 flex gap-4 text-cream/70">
              <a href="#" className="hover:text-gold"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-gold"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-gold"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="hover:text-gold"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          <FooterCol title="Company" items={[
            { to: "/about", label: "About" },
            { to: "/contact", label: "Careers" },
            { to: "/contact", label: "Press" },
          ]} />
          <FooterCol title="Discover" items={[
            { to: "/projects", label: "All Projects" },
            { to: "/projects", label: "Off-Plan", search: { status: "Upcoming" } },
            { to: "/projects", label: "Ready Now", search: { status: "Completed" } },
          ]} />

          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-gold">Newsletter</div>
            <p className="mt-4 text-sm text-cream/70">Private launches & investment insights.</p>
            <div className="mt-4"><NewsletterForm /></div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Nagarjuna Corporation. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gold">Privacy</Link>
            <Link to="/terms" className="hover:text-gold">Terms</Link>
            <Link to="/disclaimer" className="hover:text-gold">Disclaimer</Link>
            <Link to="/cookies" className="hover:text-gold">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterColItem = { to: string; label: string; search?: Record<string, string> };

function FooterCol({ title, items }: { title: string; items: FooterColItem[] }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.28em] text-gold">{title}</div>
      <ul className="mt-4 space-y-3 text-sm text-cream/75">
        {items.map((i, idx) => (
          <li key={idx}>
            <Link to={i.to} search={i.search} className="hover:text-gold">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
