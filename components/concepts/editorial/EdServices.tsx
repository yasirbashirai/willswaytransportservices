"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import ServiceArt from "@/components/ServiceArt";
import { services } from "@/lib/site";
import { IconArrow } from "@/components/icons";

// Editorial services index: big numbered rows; on desktop a preview card
// (service illustration + typical use) follows the cursor while hovering a row.
export default function EdServices() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 28 });
  const y = useSpring(my, { stiffness: 260, damping: 28 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left + 28);
    my.set(e.clientY - r.top - 120);
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setHover(null)} className="relative">
      <ol className="border-t-2 border-ink">
        {services.map((s, i) => (
          <li key={s.slug} onMouseEnter={() => setHover(i)}>
            <Link
              href={`/contact?service=${s.slug}#quote`}
              className="group relative grid grid-cols-[48px_1fr_auto] items-center gap-4 border-b border-ink/15 py-6 transition-colors sm:grid-cols-[80px_1fr_auto] lg:grid-cols-[110px_1.3fr_1fr_auto] lg:py-8"
            >
              {/* gold wash slides in on hover */}
              <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-gold/15 via-gold/5 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              <span className="relative font-condensed text-lg text-gold-deep sm:text-2xl">{String(i + 1).padStart(2, "0")}</span>
              <span className="relative">
                <span className="block font-display text-[22px] font-extrabold leading-tight tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl lg:text-[40px]">{s.title}</span>
                <span className="mt-1 block text-[14px] text-steel lg:hidden">{s.use}</span>
              </span>
              <span className="relative hidden text-[15px] leading-6 text-steel lg:block">{s.use}</span>
              <span className="relative grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-ink transition duration-500 group-hover:rotate-[-45deg] group-hover:border-ink group-hover:bg-ink group-hover:text-gold sm:h-14 sm:w-14">
                <IconArrow className="h-5 w-5" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {/* Cursor-follow preview (desktop, motion allowed) */}
      {!reduce && (
        <motion.div style={{ x, y }} className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[340px] lg:block">
          <AnimatePresence>
            {hover !== null && (
              <motion.div
                key={hover}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="absolute overflow-hidden rounded-3xl bg-gradient-to-br from-graphite to-ink p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)]"
              >
                <ServiceArt art={services[hover].art} className="h-auto w-full" />
                <p className="mt-2 font-condensed text-[11px] uppercase tracking-[.2em] text-gold">Typical use</p>
                <p className="text-[13.5px] leading-snug text-white/80">{services[hover].use}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
