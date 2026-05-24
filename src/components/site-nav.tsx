import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { InquiryDialog } from "./inquiry-dialog";
import menuFeature from "@/assets/menu-feature.jpg";



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

type SideChild = { label: string; to: string };
type SideItem = { label: string; to?: string; children?: SideChild[] };
type SideSection = { title: string; items: SideItem[] };

const sideSections: SideSection[] = [
  {
    title: "Discover",
    items: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about", children: [
        { label: "About Company", to: "/about/company" },
        { label: "Team", to: "/about/team" },
        { label: "Vision & Mission", to: "/about/vision-mission" },
      ]},
    ],
  },
  {
    title: "Properties",
    items: [
      { label: "Residential", to: "/projects", children: [
        { label: "All Projects", to: "/projects" },
        { label: "Ongoing", to: "/projects" },
        { label: "Completed", to: "/projects" },
      ]},
      { label: "Commercial", to: "/projects", children: [
        { label: "Office Spaces", to: "/projects" },
        { label: "Retail", to: "/projects" },
      ]},
    ],
  },
  {
    title: "Engage",
    items: [
      { label: "Media", to: "/blogs", children: [
        { label: "News", to: "/blogs" },
        { label: "Press Releases", to: "/blogs" },
      ]},
      { label: "Blog", to: "/blogs" },
      { label: "Channel Partners", to: "/contact" },
      { label: "Career", to: "/contact" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
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

      {/* Full-screen luxe menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex"
          >
            {/* Backdrop */}
            <div
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Panel */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              exit={{ clipPath: "inset(0 100% 0 0)" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative z-10 flex h-full w-full bg-[#0a0a0a] text-cream"
            >
              {/* Decorative gold orbs */}
              <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_70%)] blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_10%,transparent),transparent_70%)] blur-3xl" />

              {/* LEFT — Navigation */}
              <div className="relative flex h-full w-full flex-col lg:w-3/5">
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col"
                  >
                    <span className="text-[10px] uppercase tracking-[0.5em] text-gold">— Explore</span>
                    <span className="mt-1 font-display text-sm tracking-[0.3em] text-cream/60">NAGARJUNA CONSTRUCTION</span>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="group relative flex h-12 w-12 items-center justify-center border border-cream/20 text-cream transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
                  >
                    <X className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
                  </motion.button>
                </div>

                {/* Nav list */}
                <nav className="relative flex-1 overflow-y-auto px-6 pb-8 md:px-12">
                  <ul className="mx-auto max-w-2xl">
                    {sideMenu.map((item, idx) => {
                      const expanded = sideExpanded === item.label;
                      const active = item.to && (item.to === "/" ? pathname === "/" : pathname.startsWith(item.to));
                      const num = String(idx + 1).padStart(2, "0");
                      return (
                        <motion.li
                          key={item.label}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.35 + idx * 0.05, ease: EASE }}
                          className="group/item border-b border-cream/10"
                        >
                          <div className="relative flex items-center">
                            <Link
                              to={item.to ?? "/"}
                              onClick={() => !item.children && setOpen(false)}
                              className={`relative flex flex-1 items-baseline gap-5 py-4 md:py-5 transition-colors ${
                                active ? "text-gold" : "text-cream hover:text-gold"
                              }`}
                            >
                              <span className="font-display text-[11px] tracking-[0.3em] text-gold/70">
                                {num}
                              </span>
                              <span className="font-display text-[28px] font-light leading-none tracking-tight md:text-[40px]">
                                {item.label}
                              </span>
                              <ArrowUpRight className="ml-auto h-5 w-5 -translate-x-3 self-center opacity-0 transition-all duration-500 group-hover/item:translate-x-0 group-hover/item:opacity-100 md:h-6 md:w-6" />
                            </Link>
                            {item.children && (
                              <button
                                onClick={() => setSideExpanded(expanded ? null : item.label)}
                                aria-label={`Toggle ${item.label}`}
                                className="ml-2 flex h-10 w-10 items-center justify-center text-cream/50 transition-colors hover:text-gold"
                              >
                                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180 text-gold" : ""}`} />
                              </button>
                            )}
                          </div>
                          {/* Animated gold underline on hover */}
                          <div className="h-px w-0 bg-gold transition-all duration-500 group-hover/item:w-full" />

                          <AnimatePresence>
                            {item.children && expanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: EASE }}
                                className="overflow-hidden"
                              >
                                <div className="ml-10 my-3 grid grid-cols-1 gap-1 border-l border-gold/30 pl-6 sm:grid-cols-2">
                                  {item.children.map((c, ci) => (
                                    <motion.div
                                      key={c.label}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3, delay: ci * 0.05 }}
                                    >
                                      <Link
                                        to={c.to}
                                        onClick={() => setOpen(false)}
                                        className="group/sub flex items-center gap-3 py-2 text-[12px] uppercase tracking-[0.2em] text-cream/60 transition-colors hover:text-gold"
                                      >
                                        <span className="h-px w-4 bg-cream/30 transition-all duration-300 group-hover/sub:w-8 group-hover/sub:bg-gold" />
                                        {c.label}
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.li>
                      );
                    })}
                  </ul>

                  {/* Bottom contact strip */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
                    className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 border-t border-cream/10 pt-8 sm:grid-cols-3"
                  >
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-gold/70">Call</div>
                      <a href="tel:+919999999999" className="mt-1.5 flex items-center gap-2 font-display text-sm tracking-wide text-cream hover:text-gold">
                        <Phone className="h-3.5 w-3.5" /> +91 99999 99999
                      </a>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-gold/70">Write</div>
                      <a href="mailto:hello@nagarjuna.com" className="mt-1.5 flex items-center gap-2 font-display text-sm tracking-wide text-cream hover:text-gold">
                        <Mail className="h-3.5 w-3.5" /> hello@nagarjuna.com
                      </a>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-gold/70">Visit</div>
                      <div className="mt-1.5 flex items-center gap-2 font-display text-sm tracking-wide text-cream">
                        <MapPin className="h-3.5 w-3.5" /> Hyderabad, India
                      </div>
                    </div>
                  </motion.div>
                </nav>
              </div>

              {/* RIGHT — Feature image pane (desktop) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative hidden h-full w-2/5 overflow-hidden border-l border-cream/10 lg:block"
              >
                <motion.img
                  src={menuFeature}
                  alt="Featured project"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.5, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
                <div className="absolute inset-x-0 bottom-0 p-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.4em] text-gold">Featured Address</span>
                    <h3 className="mt-3 font-display text-3xl font-light leading-tight text-cream">
                      Where architecture<br />meets aspiration.
                    </h3>
                    <Link
                      to="/projects"
                      onClick={() => setOpen(false)}
                      className="mt-6 inline-flex items-center gap-3 border-b border-gold pb-1 text-[11px] uppercase tracking-[0.3em] text-gold transition-all hover:gap-5"
                    >
                      Explore Projects <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="mt-8 flex items-center gap-3"
                  >
                    {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
                      <a key={i} href="#" className="flex h-9 w-9 items-center justify-center border border-cream/25 text-cream/80 transition-all hover:border-gold hover:bg-gold hover:text-navy">
                        <Icon className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </header>
  );
}

