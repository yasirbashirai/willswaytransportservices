"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { IconArrow, IconPhone } from "@/components/icons";

// Interactive "Unit size → move requirements" configurator.
// Uses California's 8'6" (102 in) legal width as the reference line; guidance is general, not a permit decision.

type Size = { id: string; label: string; w: number; l: number; svc: string; kind: string; level: 0 | 1 | 2 | 3; permit: string; lead: string; note: string };

const SIZES: Size[] = [
  { id: "8x20", label: "8x20", w: 8, l: 20, svc: "mobile-office-transportation", kind: "Mobile office", level: 0, permit: "Typically no width permit", lead: "Standard scheduling", note: "Height and length are still checked for the route." },
  { id: "8x32", label: "8x24–8x32", w: 8, l: 30, svc: "mobile-office-transportation", kind: "Mobile office", level: 0, permit: "Typically no width permit", lead: "Standard scheduling", note: "Longer units need more turning room on site." },
  { id: "10x40", label: "10x40", w: 10, l: 40, svc: "mobile-office-transportation", kind: "Wide mobile office", level: 1, permit: "Oversize permit required", lead: "Allow extra lead time for permits", note: "Route is planned around permit conditions." },
  { id: "12x60", label: "12x60", w: 12, l: 60, svc: "modular-building-transportation", kind: "Modular section", level: 2, permit: "Oversize permit; travel-time limits may apply", lead: "Plan ahead: permit + route review", note: "Escort vehicles may be required depending on route." },
  { id: "14x70", label: "14 ft+", w: 14, l: 66, svc: "modular-building-transportation", kind: "Wide modular section", level: 3, permit: "Oversize permit; escorts may be required", lead: "Longest lead time; route review first", note: "Share exact dimensions incl. eaves and overhangs." },
];

const LEGAL = 8.5;
const LEVEL = ["Standard load", "Oversize", "Oversize +", "Superwide"];

export default function Configurator() {
  const [id, setId] = useState("12x60");
  const s = SIZES.find((x) => x.id === id)!;
  const over = Math.max(0, s.w - LEGAL);
  const ft = (n: number) => `${Math.floor(n)}'${Math.round((n % 1) * 12)}"`;

  // Rear view geometry (16 px per foot, centered at x=200)
  const K = 16, C = 200, uw = s.w * K;
  // Side view geometry (6 px per foot)
  const L = s.l * 6;

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-[#d4ab20]/10 blur-3xl" />
      <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#0d6b4e]/25 blur-3xl" />

      <div className="container-x relative">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <Reveal>
            <p className="eyebrow eyebrow-light">Move configurator</p>
            <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-.02em] text-white sm:text-[54px]">Pick your unit size. <span className="text-gold-grad">See what the move needs.</span></h2>
          </Reveal>
          <Reveal delay={0.08}><p className="text-lg leading-8 text-white/60">Width decides most of the plan. Anything wider than California&apos;s 8&apos;6&quot; legal width becomes an oversize load. Here&apos;s what that typically means for yours.</p></Reveal>
        </div>

        {/* Size selector */}
        <Reveal delay={0.05} className="mt-12">
          <div role="radiogroup" aria-label="Unit size" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
            {SIZES.map((x) => {
              const on = x.id === id;
              return (
                <button key={x.id} role="radio" aria-checked={on} onClick={() => setId(x.id)} className={`relative shrink-0 rounded-2xl border px-5 py-3.5 text-left transition ${on ? "border-[#d4ab20] bg-[#d4ab20]/10" : "border-white/12 bg-white/[.03] hover:border-white/30"}`}>
                  {on && <motion.span layoutId="cfg-on" className="absolute inset-x-4 -bottom-px h-[2px] rounded-full bg-[#d4ab20]" />}
                  <span className={`block font-display text-xl font-black ${on ? "text-white" : "text-white/70"}`}>{x.label}</span>
                  <span className="block text-[12px] text-white/45">{x.kind}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
          {/* Visual console */}
          <Reveal className="flex flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-b from-[#151618] to-[#0a0a0b] [&>*:nth-child(2)]:flex-1">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[.18em] text-white/40">
              <span>unit.profile / {s.label}</span>
              <span className={over ? "text-[#f2d25c]" : "text-[#5fd3a8]"}>{over ? `+${ft(over)} over legal` : "within legal width"}</span>
            </div>
            <div className="grid gap-6 p-5 sm:grid-cols-[.8fr_1.2fr] sm:items-end sm:p-7">
              {/* Rear view */}
              <div>
                <p className="font-condensed text-[11px] uppercase tracking-[.22em] text-white/40">Rear view · width</p>
                <svg viewBox="70 4 260 250" className="mt-2 h-auto w-full" role="img" aria-label={`${s.w} foot wide unit compared to 8 foot 6 inch legal width`}>
                  {/* lane */}
                  <rect x={C - 6 * K - 20} y="222" width={12 * K + 40} height="20" fill="rgba(255,255,255,.05)" />
                  <path d={`M${C - 6 * K} 222v22M${C + 6 * K} 222v22`} stroke="rgba(255,255,255,.35)" strokeWidth="3" strokeDasharray="6 5" />
                  {/* legal width lines */}
                  <path d={`M${C - LEGAL / 2 * K} 18V222M${C + LEGAL / 2 * K} 18V222`} stroke="#5fd3a8" strokeWidth="1.5" strokeDasharray="4 5" />
                  <text x={C} y="14" textAnchor="middle" fill="#5fd3a8" fontSize="11" fontFamily="ui-monospace,monospace">LEGAL 8&apos;6&quot;</text>
                  {/* unit */}
                  <motion.rect y="58" height="140" rx="4" fill="#1d1e21" stroke="#fff" strokeWidth="2.5" initial={false} animate={{ x: C - uw / 2, width: uw }} transition={{ type: "spring", stiffness: 140, damping: 18 }} />
                  {/* over-width zones */}
                  <motion.rect y="58" height="140" fill="url(#cfg-hatch)" initial={false} animate={{ x: C - uw / 2, width: Math.max(0, (s.w - LEGAL) / 2 * K) }} transition={{ type: "spring", stiffness: 140, damping: 18 }} />
                  <motion.rect y="58" height="140" fill="url(#cfg-hatch)" initial={false} animate={{ x: C + LEGAL / 2 * K, width: Math.max(0, (s.w - LEGAL) / 2 * K) }} transition={{ type: "spring", stiffness: 140, damping: 18 }} />
                  <defs>
                    <pattern id="cfg-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="rgba(212,171,32,.18)" /><path d="M0 0V8" stroke="#d4ab20" strokeWidth="3" /></pattern>
                  </defs>
                  {/* door + window */}
                  <rect x={C - 14} y="110" width="28" height="88" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2" />
                  {/* trailer deck + wheels */}
                  <rect x={C - 4.25 * K} y="198" width={8.5 * K} height="10" fill="#d4ab20" />
                  {[-1, 1].map((d) => <rect key={d} x={C + d * 3 * K - 12} y="208" width="24" height="16" rx="3" fill="#000" stroke="rgba(255,255,255,.5)" strokeWidth="2" />)}
                  {/* dimension */}
                  <motion.path stroke="#fff" strokeWidth="1.5" initial={false} animate={{ d: `M${C - uw / 2} 40H${C + uw / 2}M${C - uw / 2} 34v12M${C + uw / 2} 34v12` }} />
                  <rect x={C - 26} y="31" width="52" height="18" rx="9" fill="#010101" />
                  <text x={C} y="44" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800" fontFamily="Arial">{s.w} ft</text>
                </svg>
              </div>

              {/* Side view */}
              <div className="flex flex-col">
                <p className="font-condensed text-[11px] uppercase tracking-[.22em] text-white/40">Side view · length</p>
                <svg viewBox="90 60 540 190" className="mt-auto h-auto w-full" aria-hidden="true">
                  <path d="M10 236H630" stroke="rgba(255,255,255,.25)" strokeWidth="2" strokeDasharray="12 9" className="animate-dash" />
                  {/* cab */}
                  <g transform="translate(520 140)">
                    <path d="M0 76V20h44l14-20h22c8 0 12 4 12 10v66z" fill="#111213" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M50 8h24v24H40z" fill="rgba(212,171,32,.2)" stroke="#d4ab20" strokeWidth="2" />
                    <circle cx="20" cy="82" r="13" fill="#000" stroke="#fff" strokeWidth="2.5" /><circle cx="72" cy="82" r="13" fill="#000" stroke="#fff" strokeWidth="2.5" />
                  </g>
                  {/* unit + deck */}
                  <motion.rect y="114" height="92" rx="4" fill="#1d1e21" stroke="#fff" strokeWidth="2.5" initial={false} animate={{ x: 505 - L, width: L }} transition={{ type: "spring", stiffness: 120, damping: 18 }} />
                  <motion.rect y="206" height="8" fill="#d4ab20" initial={false} animate={{ x: 505 - L, width: L + 15 }} transition={{ type: "spring", stiffness: 120, damping: 18 }} />
                  <motion.g initial={false} animate={{ x: 505 - L + 30 }} transition={{ type: "spring", stiffness: 120, damping: 18 }}>
                    <circle cx="0" cy="223" r="12" fill="#000" stroke="#fff" strokeWidth="2.5" /><circle cx="30" cy="223" r="12" fill="#000" stroke="#fff" strokeWidth="2.5" />
                  </motion.g>
                  <motion.text y="166" textAnchor="middle" fill="rgba(255,255,255,.85)" fontSize="20" fontWeight="800" fontFamily="Arial" initial={false} animate={{ x: 505 - L / 2 }}>{s.l} ft</motion.text>
                  {s.level >= 1 && (
                    <motion.g key={s.id} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                      <rect x={505 - L / 2 - 64} y="80" width="128" height="22" rx="3" fill="#d4ab20" />
                      <text x={505 - L / 2} y="95.5" textAnchor="middle" fontSize="11" fontWeight="900" fill="#010101" fontFamily="Arial" letterSpacing="1.5">OVERSIZE LOAD</text>
                    </motion.g>
                  )}
                </svg>
              </div>
            </div>
            <dl className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
              {[
                ["Unit", `${s.w} × ${s.l} ft`],
                ["Legal width", "8'6\""],
                ["Over width", over ? ft(over) : "None"],
                ["Load class", LEVEL[s.level]],
              ].map(([k, v], i) => (
                <div key={k} className={`px-5 py-4 ${i ? "border-l border-white/10" : ""} ${i === 2 ? "border-l-0 border-t sm:border-l sm:border-t-0" : ""} ${i === 3 ? "border-t sm:border-t-0" : ""}`}>
                  <dt className="font-mono text-[10.5px] uppercase tracking-[.18em] text-white/40">{k}</dt>
                  <dd className={`mt-1 font-display text-lg font-extrabold ${k === "Over width" && over ? "text-[#f2d25c]" : "text-white"}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Readout */}
          <Reveal delay={0.08} className="flex flex-col rounded-[1.6rem] border border-white/10 bg-white/[.04] p-6 backdrop-blur sm:p-7">
            <p className="font-condensed text-[11.5px] uppercase tracking-[.22em] text-white/45">Move profile</p>
            <AnimatePresence mode="wait">
              <motion.div key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="flex flex-1 flex-col">
                <p className="mt-2 font-display text-3xl font-black text-white">{LEVEL[s.level]}</p>
                <div className="mt-4 flex gap-1.5" aria-label={`Complexity ${s.level + 1} of 4`}>
                  {[0, 1, 2, 3].map((n) => <span key={n} className={`h-2 flex-1 rounded-full ${n <= s.level ? (s.level === 0 ? "bg-[#19936c]" : "bg-gradient-to-r from-[#f2d25c] to-[#d4ab20]") : "bg-white/10"}`} />)}
                </div>
                <dl className="mt-6 space-y-4 text-[14.5px]">
                  {[
                    ["Width vs legal", over ? `${s.w} ft · ${ft(over)} over 8'6"` : `${s.w} ft · within 8'6"`],
                    ["Permits", s.permit],
                    ["Lead time", s.lead],
                    ["Good to know", s.note],
                  ].map(([k, v]) => (
                    <div key={k} className="border-b border-white/10 pb-3">
                      <dt className="text-[12px] uppercase tracking-wider text-white/40">{k}</dt>
                      <dd className="mt-0.5 font-semibold text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-auto pt-6">
                  <Link href={`/contact?service=${s.svc}#quote`} className="btn-gold w-full">Quote a {s.label} move <IconArrow /></Link>
                  <a href={site.phoneHref} className="mt-3 flex items-center justify-center gap-2 text-[13.5px] font-bold text-white/70 hover:text-gold"><IconPhone className="h-4 w-4 text-gold" /> or call {site.phone}</a>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
        <p className="mt-4 text-[12px] text-white/35">General guidance only. Every move is reviewed individually; permit and escort requirements depend on exact dimensions, route and jurisdiction.</p>
      </div>
    </section>
  );
}
