"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ServiceArt from "../ServiceArt";
import { services } from "@/lib/site";
import { IconArrow, IconCheck } from "../icons";

// Interactive service segmentation: pick a move type on the left, details + illustration on the right
export default function ServiceTabs() {
  const [i, setI] = useState(0);
  const s = services[i];
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
      <ul className="-mx-5 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:grid lg:overflow-visible" role="tablist" aria-label="Services">
        {services.map((x, n) => {
          const on = n === i;
          return (
            <li key={x.slug} className="shrink-0 lg:shrink">
              <button
                role="tab"
                aria-selected={on}
                onClick={() => setI(n)}
                onMouseEnter={() => setI(n)}
                className={`group relative flex w-full items-center gap-3 overflow-hidden whitespace-nowrap rounded-2xl border px-4 py-3 text-left transition lg:gap-4 lg:whitespace-normal lg:border-0 lg:px-5 lg:py-4 ${on ? "border-gold/50 bg-white/[.07]" : "border-white/10 hover:bg-white/[.04]"}`}
              >
                {on && <motion.span layoutId="svc-bar" className="absolute inset-y-3 left-0 hidden w-1 rounded-full bg-gold lg:block" />}
                <span className={`font-condensed text-sm tabular-nums ${on ? "text-gold" : "text-white/35"}`}>{String(n + 1).padStart(2, "0")}</span>
                <span className={`flex-1 font-display text-[14px] font-bold lg:text-[17px] ${on ? "text-white" : "text-white/60 group-hover:text-white/85"}`}>{x.title}</span>
                <IconArrow className={`hidden h-4 w-4 transition lg:block ${on ? "translate-x-0 text-gold opacity-100" : "-translate-x-2 opacity-0"}`} />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="relative min-h-[520px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-graphite to-ink p-7 sm:p-9">
        <div className="grid-lines absolute inset-0 opacity-60" />
        <AnimatePresence mode="wait">
          <motion.div key={s.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="relative">
            <p className="font-condensed text-[13px] uppercase tracking-[.2em] text-gold">Typical use</p>
            <p className="mt-1 text-white/70">{s.use}</p>
            <ServiceArt art={s.art} className="my-4 h-auto w-full max-w-[460px]" />
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">{s.title}</h3>
            <p className="mt-3 max-w-xl leading-7 text-white/70">{s.body}</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14.5px] text-white/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><IconCheck className="h-3 w-3" /></span>{p}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/contact?service=${s.slug}#quote`} className="btn-gold">Quote This Move <IconArrow /></Link>
              <Link href={`/services#${s.slug}`} className="btn-ghost">Service Details</Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
