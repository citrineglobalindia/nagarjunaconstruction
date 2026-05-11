import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export const Route = createFileRoute("/blogs")({
  component: BlogsPage,
  head: () => ({
    meta: [
      { title: "Journal — Nagarjuna Corporation" },
      { name: "description", content: "Essays on architecture, design and the craft of home-making." },
      { property: "og:title", content: "Journal — Nagarjuna Corporation" },
      { property: "og:description", content: "Essays on architecture, design and the craft of home-making." },
    ],
  }),
});

const posts = [
  {
    slug: "the-anatomy-of-a-skyline-residence",
    title: "The anatomy of a skyline residence",
    excerpt: "How proportion, glazing and orientation define a tower that ages with grace.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    category: "Architecture",
    date: "May 04, 2026",
    readTime: "6 min",
  },
  {
    slug: "branded-residences-explained",
    title: "Why branded residences keep their value",
    excerpt: "An honest look at the economics behind hospitality-led homes.",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
    category: "Investment",
    date: "Apr 19, 2026",
    readTime: "8 min",
  },
  {
    slug: "the-quiet-luxury-of-restraint",
    title: "The quiet luxury of restraint",
    excerpt: "On materials, light and the discipline of leaving things out.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    category: "Design",
    date: "Mar 28, 2026",
    readTime: "5 min",
  },
  {
    slug: "designing-for-the-monsoon",
    title: "Designing for the monsoon",
    excerpt: "Lessons from coastal estates that endure decades of weather.",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    category: "Craft",
    date: "Mar 11, 2026",
    readTime: "7 min",
  },
  {
    slug: "the-rise-of-the-private-villa",
    title: "The rise of the private villa",
    excerpt: "Why the most discerning buyers are returning to ground-up homes.",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
    category: "Market",
    date: "Feb 22, 2026",
    readTime: "6 min",
  },
];

function BlogsPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="relative h-[44vh] min-h-[360px] overflow-hidden bg-[color:var(--navy)] pt-20">
        <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2200&q=80" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy)]/50 to-[color:var(--navy)]/95" />
        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-12">
          <SectionHeading invert eyebrow="The Journal" title="Essays on architecture & home-making" />
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container-luxe">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group grid gap-10 border border-[color:var(--navy)]/15 bg-card md:grid-cols-2"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted md:aspect-auto">
              <img src={featured.img} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center px-8 py-10 md:px-12">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-gold">
                <span>{featured.category}</span>
                <span className="h-px w-6 bg-gold/60" />
                <span>{featured.date}</span>
              </div>
              <h3 className="mt-5 font-display text-3xl leading-tight text-[color:var(--navy)] md:text-4xl">{featured.title}</h3>
              <p className="mt-5 leading-relaxed text-foreground/80">{featured.excerpt}</p>
              <Link
                to="/blogs"
                className="mt-8 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.24em] text-[color:var(--navy)] transition-colors hover:text-gold"
              >
                Read essay <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col border border-[color:var(--navy)]/15 bg-card"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img src={post.img} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col px-7 py-7">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-gold">
                    <span>{post.category}</span>
                    <span className="h-px w-5 bg-gold/60" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl leading-tight text-[color:var(--navy)] transition-colors group-hover:text-gold">{post.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">{post.excerpt}</p>
                  <div className="mt-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{post.date}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
