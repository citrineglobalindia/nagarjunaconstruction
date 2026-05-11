import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { InquiryDialog } from "./inquiry-dialog";

type NavChild = { to: string; label: string; description?: string };
type NavLink = { to: string; label: string; children?: NavChild[] };

const links: NavLink[] = [
  { to: "/", label: "Home" },
  {
    to: "/about",
    label: "About Us",
    children: [
      { to: "/about/company", label: "About Company", description: "Three decades of singular intent" },
      { to: "/about/team", label: "Team", description: "The leadership behind every address" },
      { to: "/about/vision-mission", label: "Vision & Mission", description: "The principles that guide us" },
    ],
  },
  { to: "/projects", label: "Projects" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact Us" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [lang, setLang] = useState("EN");

  const isRTL = lang === "AR";

  useEffect(() => {
    const root = document.documentElement;
    root.dir = isRTL ? "rtl" : "ltr";
    root.lang = lang === "AR" ? "ar" : lang === "ZH" ? "zh" : "en";
    return () => {
      root.dir = "ltr";
      root.lang = "en";
    };
  }, [isRTL, lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  const isActive = (l: NavLink) =>
    l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[color:var(--navy)]/90 shadow-[0_1px_0_0_color-mix(in_oklab,var(--gold)_25%,transparent)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 text-cream">
          <span className="font-display text-2xl tracking-tight text-cream">Nagarjuna</span>
          <span className="hidden text-[10px] uppercase tracking-[0.32em] text-gold sm:inline">Corporation</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:block" onMouseLeave={() => setHovered(null)}>
          <ul className="flex items-center gap-1">
            {links.map((l) => {
              const active = isActive(l);
              return (
                <li
                  key={l.to}
                  className="relative"
                  onMouseEnter={() => setHovered(l.label)}
                >
                  <Link
                    to={l.to}
                    className={`group relative inline-flex items-center gap-1 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors ${
                      active ? "text-gold" : "text-cream hover:text-gold"
                    }`}
                  >
                    {l.label}
                    {l.children && (
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-300 ${
                          hovered === l.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    {/* Underline */}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>

                  {/* Dropdown */}
                  {l.children && (
                    <AnimatePresence>
                      {hovered === l.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.22, ease: EASE }}
                          className="absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 pt-4"
                        >
                          <div className="overflow-hidden border border-cream/15 bg-[color:var(--navy)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
                            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t border-cream/15 bg-[color:var(--navy)]" />
                            <ul>
                              {l.children.map((c, i) => (
                                <motion.li
                                  key={c.to}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: i * 0.05, ease: EASE }}
                                >
                                  <Link
                                    to={c.to}
                                    className="group/item block border-b border-cream/10 px-6 py-4 transition-colors last:border-0 hover:bg-cream/5"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-cream group-hover/item:text-gold">
                                        {c.label}
                                      </span>
                                      <span className="text-gold opacity-0 transition-opacity group-hover/item:opacity-100">→</span>
                                    </div>
                                    {c.description && (
                                      <p className="mt-1.5 text-[12px] text-cream/55">{c.description}</p>
                                    )}
                                  </Link>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right cluster */}
        <div className="hidden items-center gap-5 lg:flex">
          <button
            onClick={() => setLang(lang === "EN" ? "AR" : lang === "AR" ? "ZH" : "EN")}
            className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-cream/80 transition-colors hover:text-gold"
          >
            <Globe className="h-3.5 w-3.5" /> {lang}
          </button>
          <InquiryDialog trigger={<button className="btn-gold !py-3 !px-6">Register Interest</button>} />
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="text-cream lg:hidden" aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-t border-cream/10 bg-[color:var(--navy)] lg:hidden"
          >
            <div className="container-luxe flex flex-col gap-1 py-6">
              {links.map((l) => {
                const expanded = mobileExpanded === l.label;
                return (
                  <div key={l.to} className="border-b border-cream/10 last:border-0">
                    <div className="flex items-center justify-between">
                      <Link
                        to={l.to}
                        onClick={() => !l.children && setOpen(false)}
                        className="flex-1 py-4 text-sm uppercase tracking-[0.24em] text-cream"
                      >
                        {l.label}
                      </Link>
                      {l.children && (
                        <button
                          onClick={() => setMobileExpanded(expanded ? null : l.label)}
                          className="p-3 text-cream"
                          aria-label={`Toggle ${l.label} submenu`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              expanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {l.children && expanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="overflow-hidden"
                        >
                          {l.children.map((c) => (
                            <li key={c.to}>
                              <Link
                                to={c.to}
                                onClick={() => setOpen(false)}
                                className="block py-3 pl-6 text-[12px] uppercase tracking-[0.22em] text-cream/75 hover:text-gold"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <InquiryDialog trigger={<button className="btn-gold mt-4 w-full">Register Interest</button>} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
