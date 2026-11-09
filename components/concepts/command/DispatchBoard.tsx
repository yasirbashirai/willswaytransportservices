"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Illustrative "move board" UI shown in the hero. Clearly labelled as a SAMPLE:
// these are example moves showing how we track a job, not real customer data.

type Ticket = { id: string; unit: string; from: string; to: string; status: "Scheduled" | "In transit" | "Permit review" | "Placed"; pct: number; eta: string };

const TICKETS: Ticket[] = [
  { id: "SAMPLE-01", unit: "8x24 Mobile Office", from: "Sun Valley", to: "Santa Clarita", status: "In transit", pct: 64, eta: "ETA 10:40" },
  { id: "SAMPLE-02", unit: "12x60 Modular Section", from: "Factory yard", to: "Irvine", status: "Permit review", pct: 28, eta: "Route check" },
  { id: "SAMPLE-03", unit: "10x40 Site Office", from: "Burbank jobsite", to: "North Hills yard", status: "Scheduled", pct: 12, eta: "Tue 07:00" },
  { id: "SAMPLE-04", unit: "8x20 Ground-Level Office", from: "Van Nuys", to: "Oxnard", status: "Placed", pct: 100, eta: "Delivered" },
  { id: "SAMPLE-05", unit: "Yard transfer × 3 units", from: "North Hills", to: "Ontario", status: "Scheduled", pct: 8, eta: "Batch move" },
  { id: "SAMPLE-06", unit: "8x32 Mobile Office", from: "Lancaster", to: "Palmdale jobsite", status: "In transit", pct: 81, eta: "ETA 14:15" },
];

const TONE: Record<Ticket["status"], string> = {
  "In transit": "bg-[#d4ab20]/15 text-[#f2d25c] ring-[#d4ab20]/40",
  "Permit review": "bg-white/10 text-white/80 ring-white/20",
  Scheduled: "bg-[#19936c]/15 text-[#5fd3a8] ring-[#19936c]/40",
  Placed: "bg-white text-[#010101] ring-white",
};

export default function DispatchBoard() {
  const reduce = useReducedMotion();
  const [start, setStart] = useState(0);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Los_Angeles" });
    setClock(fmt());
    const c = setInterval(() => setClock(fmt()), 30000);
    if (reduce) return () => clearInterval(c);
    const t = setInterval(() => setStart((s) => (s + 1) % TICKETS.length), 3200);
    return () => { clearInterval(t); clearInterval(c); };
  }, [reduce]);

  const visible = [0, 1, 2].map((k) => TICKETS[(start + k) % TICKETS.length]);
  const lead = visible[0];

  return (
    <div className="relative overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#0b0b0c]/70 shadow-[0_40px_90px_-30px_rgba(0,0,0,.9)] backdrop-blur-2xl">
      {/* top gold hairline */}
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#d4ab20] to-transparent" />

      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-white/20" /><i className="h-2.5 w-2.5 rounded-full bg-white/20" /><i className="h-2.5 w-2.5 rounded-full bg-[#d4ab20]" /></span>
          <span className="font-condensed text-[12px] uppercase tracking-[.22em] text-white/70">Move Board</span>
          <span className="rounded-md border border-white/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/50">Sample</span>
        </div>
        <div className="flex items-center gap-2 text-[11.5px] text-white/50">
          <span className="relative flex h-2 w-2"><span className="absolute inset-0 animate-ping rounded-full bg-[#19936c] opacity-70" /><span className="relative h-2 w-2 rounded-full bg-[#19936c]" /></span>
          Dispatch line 24/7 <span className="font-mono text-white/70">{clock} PT</span>
        </div>
      </div>

      {/* Mini route map for the lead ticket */}
      <div className="relative border-b border-white/10 px-5 py-4">
        <svg viewBox="0 0 400 110" className="h-auto w-full" aria-hidden="true">
          <defs>
            <pattern id="db-grid" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="rgba(255,255,255,.06)" /></pattern>
            <linearGradient id="db-route" x1="0" x2="1"><stop offset="0" stopColor="#f2d25c" /><stop offset="1" stopColor="#a6840f" /></linearGradient>
          </defs>
          <rect width="400" height="110" fill="url(#db-grid)" rx="10" />
          <path id="db-path" d="M40 80 C 120 80, 150 24, 230 30 S 330 70, 362 34" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="6" strokeLinecap="round" />
          <path d="M40 80 C 120 80, 150 24, 230 30 S 330 70, 362 34" fill="none" stroke="url(#db-route)" strokeWidth="2.5" strokeDasharray="6 7" strokeLinecap="round">
            {!reduce && <animate attributeName="stroke-dashoffset" from="0" to="-26" dur="1.2s" repeatCount="indefinite" />}
          </path>
          <circle cx="40" cy="80" r="6" fill="#010101" stroke="#d4ab20" strokeWidth="2.5" />
          <circle cx="362" cy="34" r="6" fill="#d4ab20" />
          <g>
            <circle r="7" fill="#f2d25c" opacity=".25">{!reduce && <animate attributeName="r" values="5;12;5" dur="1.8s" repeatCount="indefinite" />}</circle>
            <circle r="4.5" fill="#f2d25c" />
            {!reduce ? (
              <animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#db-path" /></animateMotion>
            ) : null}
          </g>
        </svg>
        <AnimatePresence mode="wait">
          <motion.div key={lead.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 flex items-center justify-between text-[12px]">
            <span className="font-semibold text-white/85">{lead.from}</span>
            <span className="font-condensed uppercase tracking-[.2em] text-[#d4ab20]">{lead.unit}</span>
            <span className="font-semibold text-white/85">{lead.to}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ticket list */}
      <ul className="relative space-y-2 p-4">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((t, i) => (
            <motion.li
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: i === 0 ? 1 : 0.78, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className={`rounded-2xl border p-3.5 ${i === 0 ? "border-[#d4ab20]/40 bg-white/[.07]" : "border-white/10 bg-white/[.03]"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-display text-[14px] font-bold text-white">{t.unit}</p>
                  <p className="truncate text-[12px] text-white/55">{t.from} <span className="text-[#d4ab20]">→</span> {t.to}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider ring-1 ${TONE[t.status]}`}>{t.status}</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-[#f2d25c] to-[#a6840f]" initial={{ width: 0 }} animate={{ width: `${t.pct}%` }} transition={{ duration: 1.2, ease: "easeOut" }} />
                </div>
                <span className="w-20 text-right font-mono text-[11px] text-white/50">{t.eta}</span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <p className="border-t border-white/10 px-5 py-3 text-[11px] text-white/40">Illustrative board showing how moves are tracked. Example data only.</p>
    </div>
  );
}
