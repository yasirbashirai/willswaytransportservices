"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { markets, services, site } from "@/lib/site";
import { IconArrow, IconClock, IconPhone, IconShield, IconTruck } from "@/components/icons";

const EASE = [0.76, 0, 0.24, 1] as const;

// Cinematic hero: the golden-hour fleet opens like a film frame (clip-path reveal),
// a mega-type headline rises line by line, and a quick-quote bar docks at the bottom.
export default function CineHero() {
  const router = useRouter();
  const [svc, setSvc] = useState(services[0].slug);
  const [area, setArea] = useState("");
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 900], [0, 140]);
  const imgScale = useTransform(scrollY, [0, 900], [1, 1.1]);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ service: svc, ...(area ? { area } : {}) });
    router.push(`/contact?${q.toString()}#quote`);
  };

  const lines = [
    { t: "We move the", cls: "text-white" },
    { t: "offices that", cls: "text-white" },
    { t: "run the jobsite.", cls: "text-gold-grad" },
  ];

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      {/* Cinematic frame: the golden-hour fleet opens from a small window to full bleed */}
      <motion.div
        initial={{ clipPath: "inset(30% 34% 30% 34% round 28px)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
        transition={{ duration: 1.7, delay: 0.25, ease: EASE }}
        className="absolute inset-0 -z-10"
      >
        <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
          <Image
            src="/images/fleet/golden-hour-fleet-yard.jpg"
            alt="Wills Way tractors staged in a Southern California yard at golden hour"
            fill
            preload
            quality={85}
            sizes="100vw"
            className="object-cover object-[88%_55%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/55 to-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/60" />
      </motion.div>
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:linear-gradient(90deg,black,transparent_55%)]" />

      {/* viewfinder marks */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className="pointer-events-none absolute inset-x-5 bottom-5 top-32 hidden sm:block lg:inset-x-8 lg:top-36">
        <span className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-gold/70" />
        <span className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-gold/70" />
        <span className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2 border-gold/70" />
        <span className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-gold/70" />
        <span className="absolute right-12 top-2 font-condensed text-[11px] uppercase tracking-[.3em] text-white/60"><span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-red-500 align-middle" />Rec · {site.tagline}</span>
      </motion.div>

      <div className="container-x relative flex flex-1 flex-col justify-end pb-10 pt-40 lg:pb-12 lg:pt-44">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center gap-x-5 gap-y-2 font-condensed text-[12.5px] uppercase tracking-[.28em] text-white/60"
        >
          <span className="text-gold">Mobile office &amp; modular transportation</span>
          <span className="hidden h-px w-10 bg-white/30 sm:block" />
          <span>Southern California · Est. {site.founded}</span>
        </motion.p>

        <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1fr_330px]">
          <h1 className="font-display font-black uppercase leading-[.9] tracking-[-.03em]">
            {lines.map((l, i) => (
              <span key={l.t} className="block overflow-hidden pb-[.06em]">
                <motion.span
                  className={`block text-[10.4vw] sm:text-[9vw] lg:text-[clamp(56px,6.6vw,112px)] ${l.cls}`}
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease: EASE }}
                >
                  {l.t}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 }} className="pb-2">
            <p className="text-[16px] leading-7 text-white/75">
              A family-owned carrier moving mobile offices, construction trailers and modular structures for rental companies, manufacturers and contractors.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href="#quote" className="btn-gold !py-4">Get a Free Quote <IconArrow /></a>
              <a href={site.phoneHref} className="btn-ghost !py-4"><IconPhone className="h-4 w-4 text-gold" /> Call 24/7 {site.phone}</a>
            </div>
          </motion.div>
        </div>

        {/* Docked quick quote */}
        <motion.form
          onSubmit={go}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.25, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mt-10 grid gap-3 rounded-[1.6rem] border border-white/15 bg-ink/60 p-4 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-5 lg:grid-cols-[auto_1fr_1fr_auto] lg:items-center"
        >
          <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="px-2 lg:pr-4">
            <p className="font-condensed text-[12px] uppercase tracking-[.24em] text-gold">Instant move check</p>
            <p className="font-display text-lg font-extrabold">Start in 2 clicks</p>
          </div>
          <select aria-label="What are we moving?" value={svc} onChange={(e) => setSvc(e.target.value)} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-[15px] text-white outline-none focus:border-gold [&>option]:text-ink">
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </select>
          <select aria-label="Delivering to" value={area} onChange={(e) => setArea(e.target.value)} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-[15px] text-white outline-none focus:border-gold [&>option]:text-ink">
            <option value="">Delivering to (county / area)</option>
            {markets.map((m) => <option key={m.name} value={m.name}>{m.name}{m.tier === "extended" ? " (by quote)" : ""}</option>)}
          </select>
          <button className="btn-gold !py-3.5">Check My Move <IconArrow /></button>
        </motion.form>

        {/* credentials strip */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-[13px] font-semibold text-white/60"
        >
          <li className="flex items-center gap-2"><IconShield className="h-4 w-4 text-gold" /> USDOT {site.credentials[0].value}</li>
          <li className="flex items-center gap-2"><IconShield className="h-4 w-4 text-gold" /> CA MCP {site.credentials[2].value}</li>
          <li className="flex items-center gap-2"><IconClock className="h-4 w-4 text-gold" /> Open 24 / 7</li>
          <li className="flex items-center gap-2"><IconTruck className="h-4 w-4 text-gold" /> Carrier, not a broker</li>
        </motion.ul>
      </div>
    </section>
  );
}
