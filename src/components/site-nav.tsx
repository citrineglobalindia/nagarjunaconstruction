import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { InquiryDialog } from "./inquiry-dialog";

const links = [
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[color:var(--navy)]/85 shadow-[0_1px_0_0_color-mix(in_oklab,var(--gold)_20%,transparent)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-cream">
          <span className="font-display text-2xl tracking-tight text-cream">Nagarjuna</span>
          <span className="hidden text-[10px] uppercase tracking-[0.32em] text-gold sm:inline">Corporation</span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[11px] font-medium uppercase tracking-[0.24em] text-cream/85 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <button
            onClick={() => setLang(lang === "EN" ? "AR" : lang === "AR" ? "ZH" : "EN")}
            className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-cream/80 hover:text-gold"
          >
            <Globe className="h-3.5 w-3.5" /> {lang}
          </button>
          <InquiryDialog trigger={<button className="btn-gold !py-3 !px-6">Register Interest</button>} />
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-cream">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-cream/10 bg-[color:var(--navy)]">
          <div className="container-luxe flex flex-col gap-5 py-6">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm uppercase tracking-[0.24em] text-cream">
                {l.label}
              </Link>
            ))}
            <InquiryDialog trigger={<button className="btn-gold mt-2 w-full">Register Interest</button>} />
          </div>
        </div>
      )}
    </header>
  );
}
