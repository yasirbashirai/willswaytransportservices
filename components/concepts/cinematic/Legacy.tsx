"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import CountUp from "@/components/CountUp";
import { markets, services, site } from "@/lib/site";
import { IconArrow } from "@/components/icons";

// Cinematic split: tall photo that unmasks on scroll + the family story and honest metrics
export default function Legacy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(30% 20% 30% 20% round 40px)", "inset(0% 0% 0% 0% round 28px)"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  const stats = [
    { n: site.legacyYears, s: "", l: "Years of family transport legacy" },
    { n: 24, s: "/7", l: "Phone line, every day" },
    { n: markets.filter((m) => m.name.endsWith("County")).length, s: "", l: "California counties covered" },
    { n: services.length, s: "", l: "Specialized move types" },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-emerald/20 blur-[120px]" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative">
          <motion.div style={{ clipPath: clip }} className="relative aspect-[4/5] overflow-hidden">
            <motion.div style={{ scale: imgScale }} className="absolute inset-0">
              <Image src="/images/fleet/tractor-staging-lot.jpg" alt="Tractor-trailer staged on an open lot" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
            <p className="absolute bottom-6 left-6 right-6 font-condensed text-[12px] uppercase tracking-[.28em] text-white/70">Founded {site.founded} · San Fernando Valley, CA</p>
          </motion.div>
          <span
            aria-hidden
            className="pointer-events-none absolute -left-3 -top-24 z-10 font-display text-[160px] font-black leading-none text-transparent lg:-left-10 lg:-top-32 lg:text-[220px]"
            style={{ WebkitTextStroke: "2px rgba(212,171,32,.6)" }}
          >
            30
          </span>
        </div>

        <div>
          <p className="eyebrow eyebrow-light">{site.tagline}</p>
          <h2 className="mt-4 text-4xl font-black uppercase leading-[.95] text-white sm:text-5xl lg:text-[64px]">
            New name on the door.<br /><span className="text-gold-grad">Thirty years</span> behind the wheel.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/70">
            Wills Way Transport Services LLC was founded in 2026 to carry forward our father&apos;s 30-year transportation business, using transportation assets inherited from his established operation. We are a carrier, not a broker: the team that answers your call is the team responsible for your move.
          </p>

          <dl className="mt-10 grid grid-cols-2 border-t border-white/10">
            {stats.map((m, i) => (
              <div key={m.l} className={`border-b border-white/10 py-6 ${i % 2 ? "pl-6 border-l" : "pr-6"}`}>
                <dd className="font-display text-5xl font-black text-gold-grad lg:text-6xl"><CountUp to={m.n} suffix={m.s} /></dd>
                <dt className="mt-2 text-[14px] font-semibold text-white/70">{m.l}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-condensed text-[13px] uppercase tracking-[.2em] text-white/50">
            {site.credentials.slice(0, 3).map((c) => <span key={c.label}><span className="text-gold">{c.label}</span> {c.value}</span>)}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/about" className="btn-gold">Our Story <IconArrow /></Link>
            <a href={site.phoneHref} className="btn-ghost">Talk to us 24/7</a>
          </div>
        </div>
      </div>
    </section>
  );
}
