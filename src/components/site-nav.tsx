import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, Search, Phone } from "lucide-react";
import { InquiryDialog } from "./inquiry-dialog";

type NavChild = { to: string; label: string; description?: string };
type NavLink = { to: string; label: string; children?: NavChild[] };

const leftLinks: NavLink[] = [
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
];

const rightLinks: NavLink[] = [
  { to: "/projects", label: "Projects" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact Us" },
];

const allLinks = [...leftLinks, ...rightLinks];

const EASE = [0.22, 1, 0.36, 1] as const;

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  const isActive = (l: NavLink) =>
    l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);

  const renderLink = (l: NavLink) => {
    const active = isActive(l);
    return (
      <li
        key={l.to}
        className="relative"
        onMouseEnter={() => setHovered(l.label)}
      >
        <Link
          to={l.to}
          className={`group relative inline-flex items-center gap-1 px-3 py-2 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors ${
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
          <span
            className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ${
              active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </Link>

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
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[color:var(--navy)]/90 shadow-[0_1px_0_0_color-mix(in_oklab,var(--gold)_25%,transparent)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Left cluster: Menu icon + left links */}
        <div className="hidden items-center gap-6 lg:flex">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-cream transition-colors hover:text-gold"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em]">Menu</span>
            <span className="ml-1 h-px w-8 bg-gold/60" />
          </button>
          <nav onMouseLeave={() => setHovered(null)}>
            <ul className="flex items-center gap-1">
              {leftLinks.map(renderLink)}
            </ul>
          </nav>
        </div>

        {/* Mobile: menu button left */}
        <button onClick={() => setOpen(!open)} className="text-cream lg:hidden" aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>

        {/* Centered Brand */}
        <Link to="/" className="flex items-center justify-center">
          <span className="font-display text-2xl tracking-[0.2em] text-cream md:text-3xl">
            NAGARJUNA
          </span>
        </Link>

        {/* Right cluster: right links + icons */}
        <div className="hidden items-center justify-end gap-6 lg:flex">
          <nav onMouseLeave={() => setHovered(null)}>
            <ul className="flex items-center gap-1">
              {rightLinks.map(renderLink)}
            </ul>
          </nav>
          <div className="flex items-center gap-3 border-l border-cream/15 pl-5">
            <button
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold hover:text-gold"
            >
              <Search className="h-4 w-4" />
            </button>
            <InquiryDialog
              trigger={
                <button
                  aria-label="Contact"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold hover:text-gold"
                >
                  <Phone className="h-4 w-4" />
                </button>
              }
            />
          </div>
        </div>

        {/* Mobile spacer (right side) */}
        <span className="lg:hidden" />
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
              {allLinks.map((l) => {
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
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
