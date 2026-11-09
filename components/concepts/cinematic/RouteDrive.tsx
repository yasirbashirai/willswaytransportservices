"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { IconChat, IconFile, IconRoute, IconTruck } from "@/components/icons";
import { useCinematic } from "./useCine";

const STEPS = [
  { t: 0.14, icon: IconFile, title: "Request", text: "Send the unit, route and timing, or call us 24/7." },
  { t: 0.39, icon: IconRoute, title: "Route & permit check", text: "We review equipment, site access, route and permits." },
  { t: 0.64, icon: IconChat, title: "Confirmed schedule", text: "A clear plan, a pickup window, one direct contact." },
  { t: 0.89, icon: IconTruck, title: "Moved & positioned", text: "Picked up, delivered and placed with your site contact." },
];

const ROAD = "M -40 250 C 160 250, 240 110, 440 130 S 720 300, 920 230 S 1200 90, 1440 140";

// Tractor pulling a mobile office, drawn facing right, origin at the hitch / road line
function Rig() {
  return (
    <g>
      <ellipse cx="-60" cy="2" rx="96" ry="6" fill="rgba(0,0,0,.45)" />
      {/* mobile office */}
      <rect x="-150" y="-50" width="108" height="40" rx="3" fill="#f4f4f1" stroke="#010101" strokeWidth="2" />
      <rect x="-140" y="-42" width="20" height="13" rx="1.5" fill="#d4ab20" />
      <rect x="-70" y="-42" width="20" height="13" rx="1.5" fill="#d4ab20" />
      <rect x="-103" y="-44" width="14" height="34" rx="1.5" fill="none" stroke="#62666d" strokeWidth="1.6" />
      <rect x="-150" y="-17" width="108" height="4" fill="#d4ab20" />
      <circle cx="-118" cy="-6" r="7" fill="#010101" /><circle cx="-102" cy="-6" r="7" fill="#010101" />
      <path d="M-42 -14h10" stroke="#010101" strokeWidth="3" />
      {/* tractor (emerald, like the Wills Way trucks) */}
      <path d="M-34 -10v-26h22l9-14h16c5 0 8 3 8 7v33z" fill="#0d6b4e" stroke="#010101" strokeWidth="2" strokeLinejoin="round" />
      <path d="M-1 -48h12v14H-8z" fill="#bfe3d6" stroke="#010101" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="15" y="-24" width="6" height="10" rx="1" fill="#d4ab20" />
      <circle cx="-22" cy="-6" r="7.5" fill="#010101" /><circle cx="-22" cy="-6" r="2.5" fill="#d4ab20" />
      <circle cx="10" cy="-6" r="7.5" fill="#010101" /><circle cx="10" cy="-6" r="2.5" fill="#d4ab20" />
      {/* headlight beam */}
      <path d="M23 -20 L90 -34 L90 -2 Z" fill="url(#beam)" />
    </g>
  );
}

// Scroll-linked route: the rig drives the road as you scroll, lighting up each step it passes.
export default function RouteDrive() {
  const cine = useCinematic();
  const section = useRef<HTMLElement>(null);
  const road = useRef<SVGPathElement>(null);
  const rig = useRef<SVGGElement>(null);
  const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  const [p, setP] = useState(0);

  const { scrollYProgress } = useScroll({ target: section, offset: cine ? ["start start", "end end"] : ["start 75%", "end 45%"] });
  const prog = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  // Milestone dot positions along the road
  useEffect(() => {
    const el = road.current;
    if (!el) return;
    const L = el.getTotalLength();
    setPts(STEPS.map((s) => { const q = el.getPointAtLength(L * s.t); return { x: q.x, y: q.y }; }));
  }, []);

  // Move + rotate the rig along the path
  const place = (v: number) => {
    const el = road.current, g = rig.current;
    if (!el || !g) return;
    const L = el.getTotalLength();
    const d = Math.min(Math.max(v, 0.02), 0.995) * L;
    const a = el.getPointAtLength(d), b = el.getPointAtLength(Math.min(L, d + 4));
    const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    g.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${ang})`);
  };
  useMotionValueEvent(prog, "change", (v) => { place(v); setP(v); });
  useEffect(() => place(prog.get()));

  const scene = (
    <div className="relative">
      <svg viewBox="0 0 1400 360" className="h-auto w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="beam" x1="0" x2="1"><stop offset="0" stopColor="#f2d25c" stopOpacity=".55" /><stop offset="1" stopColor="#f2d25c" stopOpacity="0" /></linearGradient>
          <linearGradient id="trail" x1="0" x2="1"><stop offset="0" stopColor="#a6840f" /><stop offset=".5" stopColor="#d4ab20" /><stop offset="1" stopColor="#f2d25c" /></linearGradient>
        </defs>
        {/* road bed */}
        <path d={ROAD} fill="none" stroke="#1d1f22" strokeWidth="58" strokeLinecap="round" />
        <path d={ROAD} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="62" strokeLinecap="round" strokeDasharray="1 0" style={{ mixBlendMode: "screen" }} />
        <path ref={road} d={ROAD} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="2.5" strokeDasharray="18 16" />
        {/* travelled distance */}
        <motion.path d={ROAD} fill="none" stroke="url(#trail)" strokeWidth="5" strokeLinecap="round" style={{ pathLength: prog }} />
        {/* milestones */}
        {pts.map((q, i) => {
          const on = p >= STEPS[i].t - 0.02;
          return (
            <g key={i} transform={`translate(${q.x} ${q.y})`}>
              <circle r={on ? 26 : 18} fill={on ? "#d4ab20" : "#111213"} stroke={on ? "#f2d25c" : "rgba(255,255,255,.3)"} strokeWidth="2" style={{ transition: "all .4s" }} />
              <text y="6" textAnchor="middle" fontSize="17" fontWeight="800" fill={on ? "#010101" : "#fff"} fontFamily="Montserrat, Arial">{i + 1}</text>
            </g>
          );
        })}
        <g ref={rig}><g transform="translate(0 -14)"><Rig /></g></g>
      </svg>

      {/* step cards, anchored to the milestones on desktop */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:block">
        {STEPS.map((s, i) => {
          const on = p >= s.t - 0.02;
          const q = pts[i];
          const above = i % 2 === 1;
          return (
            <div
              key={s.title}
              className={`rounded-2xl border p-5 transition duration-500 lg:absolute lg:w-[230px] lg:-translate-x-1/2 ${on ? "border-gold/60 bg-white/[.07] opacity-100" : "border-white/10 bg-white/[.02] opacity-60 lg:opacity-35"}`}
              style={q && cine ? { left: `clamp(120px, ${(q.x / 1400) * 100}%, calc(100% - 120px))`, top: above ? undefined : `${((q.y + 46) / 360) * 100}%`, bottom: above ? `${100 - ((q.y - 46) / 360) * 100}%` : undefined } : undefined}
            >
              <div className="flex items-center gap-3">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${on ? "bg-gold text-ink" : "bg-white/10 text-white/70"}`}><s.icon className="h-5 w-5" /></span>
                <h3 className="font-display text-[17px] font-extrabold leading-tight text-white">{s.title}</h3>
              </div>
              <p className="mt-2.5 text-[13.5px] leading-6 text-white/65">{s.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );

  const head = (
    <div className="container-x flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="eyebrow eyebrow-light">How a move works</p>
        <h2 className="mt-3 text-4xl font-black uppercase leading-[.95] text-white sm:text-5xl lg:text-6xl">
          From first call<br /><span className="text-gold-grad">to final placement.</span>
        </h2>
      </div>
      <p className="max-w-sm text-white/60">Four steps and one direct line of communication. Keep scrolling and watch the move happen.</p>
    </div>
  );

  if (!cine) {
    return (
      <section ref={section} className="relative overflow-hidden bg-coal py-20 text-white">
        {head}
        <div className="container-x mt-10">{scene}</div>
      </section>
    );
  }

  return (
    <section ref={section} className="relative bg-coal text-white" style={{ height: "260vh" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative">{head}</div>
        <div className="relative mx-auto mt-6 w-full max-w-[1400px] px-6 py-24">{scene}</div>
      </div>
    </section>
  );
}
