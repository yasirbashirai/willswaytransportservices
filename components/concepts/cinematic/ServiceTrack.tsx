"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import ServiceArt from "@/components/ServiceArt";
import { services } from "@/lib/site";
import { IconArrow, IconCheck } from "@/components/icons";
import { useCinematic } from "./useCine";

// Pinned horizontal service track: vertical scroll drives 8 large panels sideways (desktop).
// Phones / reduced motion: a native swipe carousel with scroll-snap.
export default function ServiceTrack() {
  const cine = useCinematic();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const [active, setActive] = useState(0);

  // Measure how far the track must travel
  useEffect(() => {
    if (!cine) return;
    const measure = () => {
      if (track.current) setShift(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [cine]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -shift]);
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(services.length - 1, Math.floor(v * services.length))));

  const panel = (i: number) => {
    const s = services[i];
    return (
      <article
        key={s.slug}
        id={`svc-${s.slug}`}
        className="group relative flex h-full w-[84vw] shrink-0 snap-center flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-graphite via-coal to-ink p-7 sm:w-[70vw] sm:p-9 lg:w-[min(62vw,860px)] lg:flex-row lg:gap-10 lg:p-12"
      >
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-10 font-display text-[180px] font-black leading-none text-transparent lg:text-[260px]"
          style={{ WebkitTextStroke: "1.5px rgba(212,171,32,.22)" }}
        >
          {String(i + 1).padStart(2, "0")}
        </span>
        <div className="relative flex flex-1 flex-col">
          <p className="font-condensed text-[12.5px] uppercase tracking-[.26em] text-gold">Service {String(i + 1).padStart(2, "0")} / 08</p>
          <h3 className="mt-4 text-[30px] font-black uppercase leading-[.95] tracking-tight text-white sm:text-4xl lg:text-[44px]">{s.title}</h3>
          <p className="mt-4 text-[13px] font-semibold uppercase tracking-[.12em] text-white/45">Typical use · {s.use}</p>
          <p className="mt-4 max-w-md leading-7 text-white/70">{s.body}</p>
          <ul className="mt-5 grid gap-2">
            {s.points.slice(0, 3).map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-[14px] text-white/85">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><IconCheck className="h-3 w-3" /></span>{p}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            <Link href={`/contact?service=${s.slug}#quote`} className="btn-gold !py-3">Quote This Move <IconArrow /></Link>
          </div>
        </div>
        <div className="relative mt-6 hidden items-center lg:mt-0 lg:flex lg:w-[44%]">
          <div className="absolute inset-0 rounded-3xl bg-gold/[.04] ring-1 ring-white/5" />
          <ServiceArt art={s.art} className="relative h-auto w-full transition duration-700 group-hover:scale-[1.04]" />
        </div>
      </article>
    );
  };

  const header = (
    <div className="container-x flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="eyebrow eyebrow-light">What we move</p>
        <h2 className="mt-3 text-4xl font-black uppercase leading-[.95] text-white sm:text-5xl lg:text-6xl">
          Eight moves.<br /><span className="text-gold-grad">One specialist.</span>
        </h2>
      </div>
      {cine && (
        <div className="w-60">
          <div className="flex justify-between font-condensed text-[13px] tracking-[.2em] text-white/50">
            <span className="text-gold">{String(active + 1).padStart(2, "0")}</span><span>08</span>
          </div>
          <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/10">
            <motion.div style={{ width: bar }} className="h-full bg-gradient-to-r from-gold-light to-gold-deep" />
          </div>
          <p className="mt-2 text-right text-[12px] text-white/40">Scroll to drive through →</p>
        </div>
      )}
    </div>
  );

  if (!cine) {
    return (
      <section id="services" ref={section} className="relative bg-ink py-20 text-white">
        {header}
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8">
          {services.map((s, i) => <div key={s.slug} className="h-[560px] sm:h-[520px]">{panel(i)}</div>)}
        </div>
        <p className="mt-3 text-center text-[12px] uppercase tracking-[.2em] text-white/40">Swipe for all 8 services</p>
      </section>
    );
  }

  return (
    <section id="services" ref={section} className="relative bg-ink text-white" style={{ height: `${services.length * 70 + 60}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-24">
        <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-emerald/20 blur-3xl" />
        {header}
        <motion.div ref={track} style={{ x }} className="mt-10 flex h-[60vh] max-h-[560px] min-h-[460px] gap-6 pl-[max(1.25rem,calc((100vw-80rem)/2+2rem))] pr-[10vw] will-change-transform">
          {services.map((_, i) => panel(i))}
        </motion.div>
      </div>
    </section>
  );
}
