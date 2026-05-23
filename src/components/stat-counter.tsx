import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export function StatCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2.4, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, value, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="font-display text-5xl text-gold md:text-6xl">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-[0.28em] text-cream/65">{label}</div>
    </motion.div>
  );
}
