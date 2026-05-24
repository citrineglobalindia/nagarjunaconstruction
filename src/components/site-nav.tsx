import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";


type MenuChild = { label: string; to: string };
type MenuItem = { label: string; to?: string; children?: MenuChild[] };

const menuItems: MenuItem[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  {
    label: "Residential",
    children: [
      { label: "Ongoing Projects", to: "/projects?type=residential-ongoing" },
      { label: "Completed Projects", to: "/projects?type=residential-completed" },
      { label: "Upcoming Projects", to: "/projects?type=residential-upcoming" },
    ],
  },
  {
    label: "Commercial",
    children: [
      { label: "Ongoing Projects", to: "/projects?type=commercial-ongoing" },
      { label: "Completed Projects", to: "/projects?type=commercial-completed" },
    ],
  },
  { label: "Land Enquiry", to: "/contact?topic=land" },
  {
    label: "Media",
    children: [
      { label: "News", to: "/blogs?cat=news" },
      { label: "Press Releases", to: "/blogs?cat=press" },
      { label: "Gallery", to: "/blogs?cat=gallery" },
    ],
  },
  { label: "Blog", to: "/blogs" },
  { label: "Channel Partners", to: "/contact?topic=channel-partner" },
  { label: "Sustainability", to: "/about/vision-mission" },
  { label: "Leadership", to: "/about/team" },
  {
    label: "Purva Experiences",
    children: [
      { label: "Lifestyle", to: "/blogs?cat=lifestyle" },
      { label: "Events", to: "/blogs?cat=events" },
    ],
  },
  { label: "Investors", to: "/about/company" },
  { label: "Payments & Refunds", to: "/contact?topic=payments" },
  { label: "NRI Corner", to: "/contact?topic=nri" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (to?: string) => {
    if (!to) return false;
    const path = to.split("?")[0];
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border/60 bg-background/92 shadow-sm backdrop-blur-xl"
            : "bg-gradient-to-b from-background/90 via-background/55 to-transparent"
        }`}
      >
        <div className="container-luxe grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.28em] text-foreground transition-colors hover:text-primary"
              aria-label="Open navigation menu"
            >
              <span className="flex h-11 w-11 items-center justify-center border border-border bg-background/80 transition-colors hover:border-primary/40">
                <Menu className="h-4 w-4" />
              </span>
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>

          <Link to="/" className="flex items-center justify-center">
            <span className="font-display text-2xl tracking-[0.2em] text-foreground md:text-3xl">
              NAGARJUNA
            </span>
          </Link>

          <div className="flex justify-end" />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] overflow-hidden"
          >
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease }}
              className="absolute inset-y-0 left-0 flex w-[86vw] max-w-[340px] flex-col bg-[#1c1c1c] text-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
                <span className="font-display text-lg tracking-[0.18em]">NAGARJUNA</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center text-white/70 transition-colors hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-2">
                <ul>
                  {menuItems.map((item, idx) => {
                    const hasChildren = Boolean(item.children?.length);
                    const isExpanded = expanded === item.label;
                    const active =
                      isActive(item.to) ||
                      item.children?.some((c) => isActive(c.to));

                    return (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 + idx * 0.025, ease }}
                        className="border-b border-white/[0.06]"
                      >
                        {hasChildren ? (
                          <button
                            type="button"
                            onClick={() => setExpanded(isExpanded ? null : item.label)}
                            className={`flex w-full items-center justify-between px-6 py-3.5 text-left text-[15px] tracking-wide transition-colors ${
                              active ? "text-primary" : "text-white/90 hover:text-white"
                            }`}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`h-4 w-4 text-white/50 transition-transform duration-300 ${
                                isExpanded ? "rotate-180 text-primary" : ""
                              }`}
                            />
                          </button>
                        ) : (
                          <Link
                            to={item.to!}
                            onClick={() => setOpen(false)}
                            className={`block px-6 py-3.5 text-[15px] tracking-wide transition-colors ${
                              active ? "text-primary" : "text-white/90 hover:text-white"
                            }`}
                          >
                            {item.label}
                          </Link>
                        )}

                        <AnimatePresence initial={false}>
                          {hasChildren && isExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease }}
                              className="overflow-hidden bg-black/25"
                            >
                              {item.children!.map((child) => {
                                const childActive = isActive(child.to);
                                return (
                                  <li key={child.label}>
                                    <Link
                                      to={child.to}
                                      onClick={() => setOpen(false)}
                                      className={`block py-2.5 pl-10 pr-6 text-[13px] tracking-wide transition-colors ${
                                        childActive
                                          ? "text-primary"
                                          : "text-white/65 hover:text-white"
                                      }`}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
