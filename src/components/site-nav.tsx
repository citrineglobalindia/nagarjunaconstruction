import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { InquiryDialog } from "./inquiry-dialog";

type MenuChild = {
  label: string;
  to: string;
};

type MenuItem = {
  label: string;
  to?: string;
  description?: string;
  children?: MenuChild[];
};

const menuGroups: { title: string; items: MenuItem[] }[] = [
  {
    title: "Overview",
    items: [
      { label: "Home", to: "/", description: "Return to the main experience." },
      {
        label: "About Us",
        to: "/about",
        description: "Company story, team and brand philosophy.",
        children: [
          { label: "About Company", to: "/about/company" },
          { label: "Team", to: "/about/team" },
          { label: "Vision & Mission", to: "/about/vision-mission" },
        ],
      },
    ],
  },
  {
    title: "Explore",
    items: [
      { label: "Projects", to: "/projects", description: "Browse current residential collections." },
      { label: "Blogs", to: "/blogs", description: "Stories, launches and market updates." },
      { label: "Contact Us", to: "/contact", description: "Reach the Nagarjuna team directly." },
    ],
  },
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

  const initialExpanded = useMemo(() => {
    const match = menuGroups
      .flatMap((group) => group.items)
      .find((item) => item.children?.some((child) => pathname.startsWith(child.to)));

    return match?.label ?? null;
  }, [pathname]);

  useEffect(() => {
    if (!expanded) {
      setExpanded(initialExpanded);
    }
  }, [expanded, initialExpanded]);

  const isItemActive = (item: MenuItem) => {
    if (item.to && (item.to === "/" ? pathname === "/" : pathname.startsWith(item.to))) {
      return true;
    }

    return item.children?.some((child) => pathname.startsWith(child.to)) ?? false;
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
            className="fixed inset-0 z-[70]"
          >
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-foreground/45 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: -32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -32, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="absolute inset-y-0 left-0 flex w-full max-w-[min(92vw,580px)] flex-col border-r border-border bg-background text-foreground"
            >
              <div className="border-b border-border/80 px-6 py-5 sm:px-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                      Navigation
                    </p>
                    <h2 className="mt-3 font-display text-2xl tracking-[0.14em] text-foreground">
                      NAGARJUNA
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                      A simple way to move across the brand, projects and contact pages.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex h-11 w-11 items-center justify-center border border-border bg-background text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[minmax(0,1fr)_220px]">
                <nav className="min-h-0 overflow-y-auto px-6 py-6 sm:px-8">
                  {menuGroups.map((group, groupIndex) => (
                    <motion.section
                      key={group.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: groupIndex * 0.06, ease }}
                      className={groupIndex === 0 ? "" : "mt-8"}
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <span className="h-px w-8 bg-primary/45" />
                        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                          {group.title}
                        </p>
                      </div>

                      <ul className="space-y-2">
                        {group.items.map((item) => {
                          const active = isItemActive(item);
                          const hasChildren = Boolean(item.children?.length);
                          const isExpanded = expanded === item.label;

                          return (
                            <li key={item.label} className="border-b border-border/70 pb-2">
                              <div className="flex items-start gap-3">
                                <Link
                                  to={item.to ?? item.children?.[0]?.to ?? "/"}
                                  onClick={() => !hasChildren && setOpen(false)}
                                  className="group flex min-w-0 flex-1 flex-col py-3"
                                >
                                  <div className="flex items-center justify-between gap-4">
                                    <span
                                      className={`font-display text-[1.15rem] tracking-[0.04em] transition-colors ${
                                        active ? "text-primary" : "text-foreground group-hover:text-primary"
                                      }`}
                                    >
                                      {item.label}
                                    </span>
                                    {active && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                                  </div>
                                  {item.description && (
                                    <span className="mt-1 pr-6 text-sm leading-6 text-muted-foreground">
                                      {item.description}
                                    </span>
                                  )}
                                </Link>

                                {hasChildren && (
                                  <button
                                    type="button"
                                    onClick={() => setExpanded(isExpanded ? null : item.label)}
                                    aria-label={`Toggle ${item.label} submenu`}
                                    className={`mt-3 flex h-9 w-9 items-center justify-center border transition-colors ${
                                      isExpanded
                                        ? "border-primary/45 bg-primary/8 text-primary"
                                        : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-primary"
                                    }`}
                                  >
                                    <ChevronDown
                                      className={`h-4 w-4 transition-transform duration-300 ${
                                        isExpanded ? "rotate-180" : ""
                                      }`}
                                    />
                                  </button>
                                )}
                              </div>

                              <AnimatePresence initial={false}>
                                {hasChildren && isExpanded && (
                                  <motion.ul
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.24, ease }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mb-2 ml-1 border-l border-border pl-5">
                                      {item.children?.map((child) => {
                                        const childActive = pathname.startsWith(child.to);

                                        return (
                                          <li key={child.to} className="list-none">
                                            <Link
                                              to={child.to}
                                              onClick={() => setOpen(false)}
                                              className={`flex items-center justify-between gap-4 py-3 text-sm tracking-[0.08em] transition-colors ${
                                                childActive
                                                  ? "text-primary"
                                                  : "text-muted-foreground hover:text-foreground"
                                              }`}
                                            >
                                              <span>{child.label}</span>
                                              {childActive && <span className="h-px w-8 bg-primary/60" />}
                                            </Link>
                                          </li>
                                        );
                                      })}
                                    </div>
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.section>
                  ))}
                </nav>

                <aside className="flex flex-col justify-between border-t border-border/80 bg-muted/25 px-6 py-6 md:border-l md:border-t-0">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Contact</p>
                    <div className="mt-5 space-y-4 text-sm">
                      <a
                        href="tel:+914040000000"
                        className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Phone className="h-4 w-4 text-primary" />
                        <span>+91 40 4000 0000</span>
                      </a>
                      <a
                        href="mailto:info@nagarjuna.example"
                        className="flex items-center gap-3 break-all text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Mail className="h-4 w-4 text-primary" />
                        <span>info@nagarjuna.example</span>
                      </a>
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                        <span>Banjara Hills, Hyderabad</span>
                      </div>
                    </div>
                  </div>

                  <InquiryDialog
                    source="menu"
                    trigger={
                      <button type="button" className="btn-gold mt-8 w-full">
                        Enquire Now
                      </button>
                    }
                  />
                </aside>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}