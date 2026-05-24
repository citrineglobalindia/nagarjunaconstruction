import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
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

type SideItem = { label: string; to?: string; children?: { label: string; to: string }[] };

const sideMenu: SideItem[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about", children: [
    { label: "About Company", to: "/about/company" },
    { label: "Team", to: "/about/team" },
    { label: "Vision & Mission", to: "/about/vision-mission" },
  ]},
  { label: "Residential", to: "/projects", children: [
    { label: "All Projects", to: "/projects" },
    { label: "Ongoing", to: "/projects" },
    { label: "Completed", to: "/projects" },
  ]},
  { label: "Commercial", to: "/projects", children: [
    { label: "Office Spaces", to: "/projects" },
    { label: "Retail", to: "/projects" },
  ]},
  
  { label: "Media", to: "/blogs", children: [
    { label: "News", to: "/blogs" },
    { label: "Press Releases", to: "/blogs" },
  ]},
  { label: "Blog", to: "/blogs" },
  { label: "Channel Partners", to: "/contact" },
  { label: "Career", to: "/contact" },
  { label: "Contact Us", to: "/contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [sideExpanded, setSideExpanded] = useState<string | null>(null);

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
          : "bg-gradient-to-b from-[color:var(--navy)]/75 via-[color:var(--navy)]/40 to-transparent backdrop-blur-[2px]"
      }`}
    >
      <div className="container-luxe grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Left: Menu button */}
        <div className="flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-cream transition-colors hover:text-gold"
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.28em] sm:inline">Menu</span>
            <span className="ml-1 hidden h-px w-8 bg-gold/60 sm:inline-block" />
          </button>
        </div>

        {/* Centered Brand */}
        <Link to="/" className="flex items-center justify-center">
          <span className="font-display text-2xl tracking-[0.2em] text-cream md:text-3xl">
            NAGARJUNA
          </span>
        </Link>

        {/* Right spacer */}
        <span />
      </div>

      {/* Side drawer (left) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="fixed left-0 top-0 z-50 flex h-screen w-[320px] flex-col bg-[#1a1a1a] text-cream shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-cream/10 px-6 py-5">
                <span className="font-display text-lg tracking-[0.2em] text-cream">MENU</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="text-cream transition-colors hover:text-gold"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-2">
                <ul>
                  {sideMenu.map((item) => {
                    const expanded = sideExpanded === item.label;
                    const active = item.to && (item.to === "/" ? pathname === "/" : pathname.startsWith(item.to));
                    return (
                      <li key={item.label} className="border-b border-cream/5">
                        <div className="flex items-center justify-between pr-3">
                          <Link
                            to={item.to ?? "/"}
                            onClick={() => !item.children && setOpen(false)}
                            className={`flex-1 px-6 py-3.5 text-[14px] font-medium tracking-wide transition-colors ${
                              active ? "text-gold" : "text-cream hover:text-gold"
                            }`}
                          >
                            {item.label}
                          </Link>
                          {item.children && (
                            <button
                              onClick={() => setSideExpanded(expanded ? null : item.label)}
                              aria-label={`Toggle ${item.label}`}
                              className="p-2 text-cream/70 hover:text-gold"
                            >
                              <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                            </button>
                          )}
                        </div>
                        <AnimatePresence>
                          {item.children && expanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: EASE }}
                              className="overflow-hidden bg-black/30"
                            >
                              {item.children.map((c) => (
                                <li key={c.label}>
                                  <Link
                                    to={c.to}
                                    onClick={() => setOpen(false)}
                                    className="block px-10 py-2.5 text-[13px] text-cream/70 hover:text-gold"
                                  >
                                    {c.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}
