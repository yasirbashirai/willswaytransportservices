"use client";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import DispatchBoard from "./DispatchBoard";
import { site } from "@/lib/site";
import { IconArrow, IconClock, IconPhone, IconShield, IconTruck } from "@/components/icons";

// Concept B hero: headline + 2 CTAs left, sample "move board" UI right, over the golden-hour fleet photo
export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 140]);
  const fade = (d: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: d, ease: [0.2, 0.8, 0.2, 1] as const },
  });

  return (
    <section className="relative isolate overflow-hidden bg-ink pb-16 pt-36 text-white lg:pb-24 lg:pt-44">
      <motion.div style={{ y }} className="absolute inset-0 -z-20">
        <Image src="/images/fleet/golden-hour-fleet-yard.jpg" alt="Tractors staged in a Southern California yard at golden hour" fill preload sizes="100vw" quality={85} className="object-cover object-[100%_60%]" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#010101_0%,rgba(1,1,1,.92)_38%,rgba(1,1,1,.45)_70%,rgba(1,1,1,.25)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      {/* blueprint grid + scan line */}
      <div className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(90deg,black,transparent_75%)]" />
      {!reduce && <div className="cmd-scan pointer-events-none absolute inset-x-0 -z-10 h-40 bg-gradient-to-b from-transparent via-[#d4ab20]/[.07] to-transparent" />}

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div>
          <motion.div {...fade(0.05)} className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[.06] py-1.5 pl-1.5 pr-4 text-[12.5px] font-semibold text-white/80 backdrop-blur">
            <span className="rounded-full bg-gradient-to-r from-gold-light to-gold px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-ink">Est. 2026</span>
            Carrying forward a 30-year family transport legacy
          </motion.div>

          <motion.h1 {...fade(0.15)} className="mt-7 text-[42px] font-black leading-[1] tracking-[-.02em] text-white sm:text-6xl lg:text-[72px]">
            Your units.
            <br />Our trucks.
            <br /><span className="text-gold-grad">One direct line.</span>
          </motion.h1>

          <motion.p {...fade(0.25)} className="mt-7 max-w-xl text-lg leading-8 text-white/70">
            Mobile office, construction trailer and modular building transportation across Los Angeles, the San Fernando Valley and Southern California. Built for rental fleets, manufacturers and contractors.
          </motion.p>

          <motion.div {...fade(0.35)} className="mt-9 flex flex-wrap gap-3">
            <a href="#quote" className="btn-gold !px-7 !py-4 !text-base">Get a Free Quote <IconArrow /></a>
            <a href={site.phoneHref} className="btn-ghost !px-7 !py-4 !text-base"><IconPhone className="h-4 w-4 text-gold" /> {site.phone}</a>
          </motion.div>

          <motion.dl {...fade(0.45)} className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[.04] backdrop-blur">
            {[
              { i: IconTruck, k: "Model", v: "Carrier" },
              { i: IconShield, k: "USDOT", v: site.credentials[0].value },
              { i: IconClock, k: "Dispatch", v: "24 / 7" },
            ].map((s) => (
              <div key={s.k} className="px-4 py-4 sm:px-5">
                <dt className="flex items-center gap-1.5 font-condensed text-[11px] uppercase tracking-[.2em] text-white/45"><s.i className="h-3.5 w-3.5 text-gold" />{s.k}</dt>
                <dd className="mt-1 font-display text-[15px] font-extrabold text-white sm:text-lg">{s.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 40, rotateX: reduce ? 0 : 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ transformPerspective: 1200 }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[#d4ab20]/20 blur-3xl" />
          <DispatchBoard />
        </motion.div>
      </div>

      <style>{`
        @keyframes cmd-scan { 0% { top: -10rem } 100% { top: 100% } }
        .cmd-scan { animation: cmd-scan 7s linear infinite; }
      `}</style>
    </section>
  );
}
