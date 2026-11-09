"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { markets, services, site } from "@/lib/site";
import { IconArrow, IconClock, IconPhone, IconShield, IconTruck } from "../icons";

// Home hero: golden-hour fleet photo, headline, 2 CTAs and a quick "move check" starter
export default function Hero() {
  const router = useRouter();
  const [svc, setSvc] = useState(services[0].slug);
  const [area, setArea] = useState("");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  const scale = useTransform(scrollY, [0, 700], [1, 1.08]);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ service: svc, ...(area ? { area } : {}) });
    router.push(`/contact?${q.toString()}#quote`);
  };

  const fade = (d: number) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.2, 0.8, 0.2, 1] as const } });

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink pb-14 pt-40 text-white lg:items-center lg:pb-20">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <Image src="/images/fleet/golden-hour-fleet-yard.jpg" alt="Wills Way Transport tractors staged in a Southern California yard at golden hour" fill preload sizes="100vw" quality={85} className="object-cover object-[100%_60%]" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/60 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/10 to-ink/50" />
      <div className="grid-lines absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(90deg,black,transparent_60%)]" />

      <div className="container-x grid items-end gap-12 lg:grid-cols-[1.25fr_.75fr]">
        <div>
          <motion.p {...fade(0.05)} className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ink/50 px-4 py-2 text-[12.5px] font-semibold uppercase tracking-[.16em] text-gold-light backdrop-blur">
            <span className="relative flex h-2 w-2"><span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold" /><span className="relative h-2 w-2 rounded-full bg-gold" /></span>
            {site.tagline}
          </motion.p>
          <motion.h1 {...fade(0.15)} className="mt-6 text-[40px] font-black leading-[1.04] text-white sm:text-6xl lg:text-[64px]">
            Mobile Office &amp; Modular <span className="text-gold-grad">Transportation</span> Across Southern California.
          </motion.h1>
          <motion.p {...fade(0.25)} className="mt-6 max-w-xl text-lg leading-8 text-white/75">
            A family-owned carrier based in the San Fernando Valley. We move mobile offices, construction trailers and modular structures for rental companies, manufacturers and contractors, with direct communication from pickup to placement.
          </motion.p>
          <motion.div {...fade(0.35)} className="mt-9 flex flex-wrap gap-3">
            <a href="#quote" className="btn-gold !px-7 !py-4 !text-base">Get a Free Quote <IconArrow /></a>
            <a href={site.phoneHref} className="btn-ghost !px-7 !py-4 !text-base"><IconPhone className="text-gold" /> Call 24/7 {site.phone}</a>
          </motion.div>
          <motion.ul {...fade(0.45)} className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[13.5px] font-semibold text-white/75">
            <li className="flex items-center gap-2"><IconShield className="h-4 w-4 text-gold" /> USDOT {site.credentials[0].value}</li>
            <li className="flex items-center gap-2"><IconClock className="h-4 w-4 text-gold" /> Open 24 / 7</li>
            <li className="flex items-center gap-2"><IconTruck className="h-4 w-4 text-gold" /> Carrier, not a broker</li>
          </motion.ul>
        </div>

        {/* Quick move check */}
        <motion.form
          onSubmit={go}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative rounded-[1.75rem] border border-white/15 bg-white/[.07] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-7"
        >
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="font-condensed text-[13px] uppercase tracking-[.22em] text-gold">Instant Move Check</p>
          <p className="mt-2 font-display text-2xl font-extrabold leading-tight">Start your quote in 2 clicks.</p>
          <label className="mt-5 block">
            <span className="mb-1.5 block text-[12.5px] font-semibold text-white/60">What are we moving?</span>
            <select value={svc} onChange={(e) => setSvc(e.target.value)} className="w-full rounded-xl border border-white/15 bg-ink/60 px-4 py-3 text-[15px] text-white outline-none focus:border-gold">
              {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
            </select>
          </label>
          <label className="mt-3 block">
            <span className="mb-1.5 block text-[12.5px] font-semibold text-white/60">Delivering to</span>
            <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full rounded-xl border border-white/15 bg-ink/60 px-4 py-3 text-[15px] text-white outline-none focus:border-gold">
              <option value="">Select county / area</option>
              {markets.map((m) => <option key={m.name} value={m.name}>{m.name}{m.tier === "extended" ? " (by quote)" : ""}</option>)}
            </select>
          </label>
          <button className="btn-gold mt-5 w-full !py-4">Check My Move <IconArrow /></button>
          <p className="mt-3 text-center text-[12px] text-white/45">No obligation. Real people review every request.</p>
        </motion.form>
      </div>

      <Link href="#services" aria-label="Scroll to services" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[.3em] text-white/40 lg:flex">
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </Link>
    </section>
  );
}
