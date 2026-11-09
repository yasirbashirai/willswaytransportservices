"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Giant outlined type that slides in opposite directions as you scroll
export default function MegaMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  const b = useTransform(scrollYProgress, [0, 1], ["-35%", "5%"]);
  const row = "font-display text-[18vw] font-black uppercase leading-[.92] tracking-[-.04em] whitespace-nowrap lg:text-[13vw]";
  return (
    <div ref={ref} className="relative overflow-hidden bg-ink py-16 lg:py-24" aria-label="A legacy that keeps moving">
      <motion.p style={{ x: a, WebkitTextStroke: "2px rgba(212,171,32,.85)" }} className={`${row} text-transparent`} aria-hidden>
        A legacy that keeps · A legacy that keeps ·
      </motion.p>
      <motion.p style={{ x: b }} className={`${row} text-gold-grad`} aria-hidden>
        moving · keeps moving · keeps moving ·
      </motion.p>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
