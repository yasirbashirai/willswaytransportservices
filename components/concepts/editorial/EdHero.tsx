"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { markets, services, site } from "@/lib/site";
import { IconArrow, IconPhone, IconShield } from "@/components/icons";

// Concept C hero: light editorial split. Huge type, the logo's gold "swoosh" drawn under
// the brand name, a framed golden-hour photo with layered floating credential cards.

const ease = [0.2, 0.8, 0.2, 1] as const;

// Gold underline + upturn + slanted tick, borrowed from the Wills Way logo
export function Swoosh({ className = "", delay = 0.6 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 420 60" preserveAspectRatio="none" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ed-gold" x1="0" x2="1">
          <stop offset="0" stopColor="#f2d25c" />
          <stop offset=".55" stopColor="#d4ab20" />
          <stop offset="1" stopColor="#a6840f" />
        </linearGradient>
      </defs>
      <motion.path
        d="M6 46 L14 54 H372 Q386 54 386 40 V10"
        stroke="url(#ed-gold)" strokeWidth="9" strokeLinecap="square" strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay, ease }}
      />
      <motion.path
        d="M396 34 L414 8"
        stroke="url(#ed-gold)" strokeWidth="9" strokeLinecap="square"
        initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, delay: delay + 1, ease }}
      />
    </svg>
  );
}

export default function EdHero() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [svc, setSvc] = useState(services[0].slug);
  const [area, setArea] = useState("");
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 60]);
  const cardY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -50]);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ service: svc, ...(area ? { area } : {}) });
    router.push(`/contact?${q.toString()}#quote`);
  };
  const up = (d: number) => ({ initial: { opacity: 0, y: reduce ? 0 : 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease } });

  return (
    <section className="relative overflow-hidden bg-[#f6f4ee]">
      {/* Dark strip under the fixed glass header */}
      <div className="absolute inset-x-0 top-0 h-[114px] bg-ink" />
      {/* Editorial hairlines + paper grain */}
      <div className="pointer-events-none absolute inset-0 top-[114px] [background-image:linear-gradient(90deg,rgba(1,1,1,.06)_1px,transparent_1px)] [background-size:calc(100%/12)_100%] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="pointer-events-none absolute -right-48 top-40 h-[36rem] w-[36rem] rounded-full bg-gold/20 blur-[120px]" />

      <div className="container-x relative pb-10 pt-[150px] lg:pt-[170px]">
        {/* Masthead line */}
        <motion.div {...up(0)} className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink pb-3 font-condensed text-[12px] uppercase tracking-[.28em] text-graphite">
          <span>Vol. 01 · Est. {site.founded}</span>
          <span className="hidden sm:inline">Mobile Office &amp; Modular Transportation</span>
          <span>{site.displayAddress}</span>
        </motion.div>

        <div className="mt-10 grid items-start gap-12 lg:mt-14 lg:grid-cols-[1.18fr_.82fr] lg:gap-14">
          {/* Type column */}
          <div>
            <motion.p {...up(0.1)} className="eyebrow">{site.tagline}</motion.p>
            <motion.h1 {...up(0.18)} className="mt-5 text-[44px] font-black leading-[.98] tracking-[-.035em] text-ink sm:text-[64px] lg:text-[70px] xl:text-[78px]">
              Mobile offices &amp; modular units, moved the{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="text-gold-grad">Wills Way.</span>
                <Swoosh className="absolute -bottom-[.32em] left-0 h-[.42em] w-[105%]" />
              </span>
            </motion.h1>
            <motion.p {...up(0.3)} className="mt-10 max-w-xl text-lg leading-8 text-steel">
              A family-owned carrier in the San Fernando Valley, carrying forward a 30-year transportation business. We deliver, relocate and return mobile offices and modular structures for rental companies, manufacturers and contractors across Southern California.
            </motion.p>
            <motion.div {...up(0.4)} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#quote" className="btn-gold !px-7 !py-4 !text-base">Get a Free Quote <IconArrow /></a>
              <a href={site.phoneHref} className="btn-dark !px-7 !py-4 !text-base"><IconPhone className="h-4 w-4 text-gold" /> {site.phone}</a>
            </motion.div>
            <motion.dl {...up(0.5)} className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-ink/15 border-y border-ink/15 py-5">
              {[["30", "Year legacy"], ["24/7", "Phone line"], ["8", "Move types"]].map(([n, l]) => (
                <div key={l} className="px-4 first:pl-0">
                  <dt className="font-display text-3xl font-black text-ink sm:text-4xl">{n}</dt>
                  <dd className="mt-1 font-condensed text-[11.5px] uppercase tracking-[.2em] text-steel">{l}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Framed photo + floating cards */}
          <motion.div initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.2, ease }} className="relative mx-auto w-full max-w-[560px] lg:mt-6">
            <div className="absolute -right-3 -top-3 h-full w-full rounded-[2.2rem] border-2 border-gold/60" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] lg:aspect-[5/6] bg-ink shadow-[0_50px_90px_-40px_rgba(0,0,0,.55)]">
              <motion.div style={{ y: imgY }} className="absolute -inset-y-10 inset-x-0">
                <Image src="/images/fleet/golden-hour-fleet-yard.jpg" alt="Tractors staged in a Southern California yard at golden hour" fill preload sizes="(min-width:1024px) 150vw, 400vw" quality={85} className="object-cover object-[86%_center]" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <p className="absolute bottom-6 right-6 text-right font-condensed text-[12px] uppercase tracking-[.25em] text-white/80">Fig. 01 · Staged and ready</p>
            </div>

            {/* 24/7 dispatch card */}
            <motion.a href={site.phoneHref} style={{ y: cardY }} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.9, ease }}
              className="absolute -left-4 top-10 flex items-center gap-3 rounded-2xl bg-white/95 p-4 pr-5 shadow-[0_24px_50px_-20px_rgba(0,0,0,.45)] backdrop-blur sm:-left-12">
              <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-ink text-gold">
                <IconPhone className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-3 w-3"><span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-light" /><span className="relative h-3 w-3 rounded-full border-2 border-white bg-emerald-light" /></span>
              </span>
              <span>
                <span className="block font-condensed text-[11px] uppercase tracking-[.2em] text-steel">Dispatch · 24/7</span>
                <span className="block font-display text-[17px] font-extrabold text-ink">{site.phone}</span>
              </span>
            </motion.a>

            {/* USDOT badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.05, ease }}
              className="absolute -right-3 bottom-24 rounded-2xl bg-ink p-4 text-white shadow-2xl sm:-right-8">
              <span className="flex items-center gap-2 font-condensed text-[11px] uppercase tracking-[.2em] text-gold"><IconShield className="h-3.5 w-3.5" /> Licensed carrier</span>
              <span className="mt-1 block font-display text-lg font-extrabold">USDOT {site.credentials[0].value}</span>
              <span className="block text-[12px] text-white/50">CA MCP {site.credentials[2].value}</span>
            </motion.div>

            {/* Rotating legacy stamp */}
            <motion.div initial={{ opacity: 0, rotate: -40, scale: 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: 0.9, delay: 1.2, ease }}
              className="absolute -bottom-10 left-6 h-32 w-32 sm:-left-8 sm:h-36 sm:w-36">
              <div className="grid h-full w-full place-items-center rounded-full bg-gold shadow-[0_20px_40px_-15px_rgba(166,132,15,.8)]">
                <svg viewBox="0 0 120 120" className={`absolute inset-0 h-full w-full ${reduce ? "" : "animate-[spin_22s_linear_infinite]"}`} aria-hidden="true">
                  <defs><path id="ed-circle" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" /></defs>
                  <text fontSize="10.5" fontWeight="700" letterSpacing="3" fill="#010101" fontFamily="Arial, sans-serif">
                    <textPath href="#ed-circle">FAMILY LEGACY · EST. 2026 · </textPath>
                  </text>
                </svg>
                <span className="relative text-center leading-none text-ink">
                  <span className="block font-display text-[34px] font-black">30</span>
                  <span className="block font-condensed text-[10px] uppercase tracking-[.2em]">Years</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick move check bar */}
        <motion.form onSubmit={go} {...up(0.6)} className="relative mt-20 grid gap-3 rounded-[1.6rem] border border-ink/10 bg-white p-3 shadow-[0_30px_60px_-35px_rgba(0,0,0,.45)] md:grid-cols-[auto_1fr_1fr_auto] md:items-center md:gap-0 md:p-2.5">
          <div className="flex items-center gap-3 px-4 py-2 md:border-r md:border-line md:pr-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink font-condensed text-[13px] text-gold">GO</span>
            <span>
              <span className="block font-condensed text-[11px] uppercase tracking-[.22em] text-gold-deep">Instant move check</span>
              <span className="block font-display text-[15px] font-extrabold text-ink">Quote in 2 clicks</span>
            </span>
          </div>
          <label className="block px-4 md:border-r md:border-line">
            <span className="block font-condensed text-[11px] uppercase tracking-[.2em] text-steel">What are we moving?</span>
            <select value={svc} onChange={(e) => setSvc(e.target.value)} className="w-full bg-transparent py-1.5 font-display text-[15px] font-bold text-ink outline-none">
              {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
            </select>
          </label>
          <label className="block px-4">
            <span className="block font-condensed text-[11px] uppercase tracking-[.2em] text-steel">Delivering to</span>
            <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full bg-transparent py-1.5 font-display text-[15px] font-bold text-ink outline-none">
              <option value="">Select county / area</option>
              {markets.map((m) => <option key={m.name} value={m.name}>{m.name}{m.tier === "extended" ? " (by quote)" : ""}</option>)}
            </select>
          </label>
          <button className="btn-gold !rounded-2xl !px-7 !py-4">Check My Move <IconArrow /></button>
        </motion.form>
      </div>
    </section>
  );
}
