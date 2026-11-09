"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { markets } from "@/lib/site";
import { IconArrow, IconPin } from "../icons";

// Schematic Southern California coverage map. Nodes are placed by real lat/long,
// routes radiate from the San Fernando Valley home base. Hover / tap a node for details.

const LON0 = -120.8, LAT0 = 35.75, K = 130;
const project = (lat: number, lon: number) => [(lon - LON0) * K, (LAT0 - lat) * K] as const;
// Areas north of the map frame (Fresno, other CA) are pinned to the top edge
const px = (lat: number, lon: number) => {
  const [x, y] = project(lat, lon);
  return [Math.max(40, x), Math.max(22, y)] as const;
};

const NODES: Record<string, [number, number]> = {
  "San Fernando Valley": [34.22, -118.45],
  "Los Angeles County": [33.98, -118.2],
  "Santa Clarita / Antelope Valley": [34.6, -118.25],
  "Ventura County": [34.3, -119.1],
  "Orange County": [33.72, -117.82],
  "San Diego County": [32.85, -117.05],
  "Riverside County": [33.85, -117.2],
  "San Bernardino County": [34.3, -117.15],
  "Kern County": [35.35, -119.02],
  "Fresno County": [36.72, -119.78],
  "Other California destinations": [36.3, -120.9],
};

// Rough California coastline (Monterey Bay to the Mexico border) for orientation only
const COAST = [
  [36.95, -121.9], [36.6, -121.9], [36.2, -121.7], [35.65, -121.2], [35.35, -120.85], [34.9, -120.65], [34.55, -120.6], [34.45, -120.45],
  [34.42, -119.7], [34.27, -119.29], [34.05, -118.95], [34.03, -118.68], [34.0, -118.5], [33.8, -118.4], [33.74, -118.28], [33.75, -118.15],
  [33.6, -117.9], [33.46, -117.7], [33.2, -117.38], [32.95, -117.26], [32.7, -117.17], [32.53, -117.12],
].map(([a, o]) => project(a, o));
const coastPath = "M" + COAST.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L");
const oceanPath = `${coastPath} L0 ${COAST[COAST.length - 1][1].toFixed(1)} L0 0 Z`;

export default function ServiceMap() {
  const [sel, setSel] = useState("San Fernando Valley");
  const hub = px(...NODES["San Fernando Valley"]);
  const m = markets.find((x) => x.name === sel)!;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr]">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-[#fbfaf6] p-3 shadow-[0_30px_60px_-40px_rgba(0,0,0,.4)]">
        <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-label="Map of Wills Way service area across Southern California">
          <defs>
            <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.1" fill="#d9d5c8" /></pattern>
          </defs>
          <rect x="0" y="0" width="560" height="420" fill="url(#dots)" />
          <path d={oceanPath} fill="#eef1f2" />
          <path d={coastPath} fill="none" stroke="#c9c4b4" strokeWidth="1.5" />
          <text x="60" y="380" fill="#9aa0a8" fontSize="11" letterSpacing="3" fontFamily="Arial">PACIFIC OCEAN</text>

          {/* Routes */}
          {markets.map((mk) => {
            if (mk.name === "San Fernando Valley") return null;
            const [x, y] = px(...NODES[mk.name]);
            const on = sel === mk.name;
            const cx = (hub[0] + x) / 2, cy = Math.min(hub[1], y) - 30;
            return (
              <path key={mk.name} d={`M${hub[0]} ${hub[1]} Q${cx} ${cy} ${x} ${y}`} fill="none"
                stroke={mk.tier === "primary" ? "#d4ab20" : "#9aa0a8"} strokeWidth={on ? 3 : 1.6}
                strokeDasharray={mk.tier === "primary" ? "0" : "5 6"} opacity={on ? 1 : 0.55} className={mk.tier === "extended" ? "animate-dash" : ""} />
            );
          })}

          {/* Nodes */}
          {markets.map((mk) => {
            const [x, y] = px(...NODES[mk.name]);
            const on = sel === mk.name;
            const isHub = mk.name === "San Fernando Valley";
            return (
              <g key={mk.name} transform={`translate(${x} ${y})`} className="cursor-pointer" onMouseEnter={() => setSel(mk.name)} onClick={() => setSel(mk.name)} role="button" tabIndex={0} aria-label={mk.name} onFocus={() => setSel(mk.name)}>
                {(on || isHub) && <circle r="16" fill={isHub ? "#d4ab20" : "#010101"} opacity=".14"><animate attributeName="r" values="8;20;8" dur="2.4s" repeatCount="indefinite" /></circle>}
                <circle r={isHub ? 9 : 6.5} fill={mk.tier === "primary" ? (isHub ? "#010101" : "#d4ab20") : "#fff"} stroke={isHub ? "#d4ab20" : mk.tier === "primary" ? "#010101" : "#62666d"} strokeWidth={isHub ? 3 : 2} />
                <text x={x > 420 ? -12 : 12} y="4" textAnchor={x > 420 ? "end" : "start"} fontSize={on ? 13 : 11.5} fontWeight={on || isHub ? 800 : 600} fill={on ? "#010101" : "#34373c"} fontFamily="Arial, sans-serif">
                  {(project(...NODES[mk.name])[1] < 0 ? "↑ " : "") + mk.name.replace(" County", "").replace(" destinations", "")}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-4 rounded-full bg-white/90 px-4 py-2 text-[12px] font-semibold text-graphite shadow backdrop-blur">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-ink" /> Primary market</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full border-2 border-steel bg-white" /> By quote</span>
        </div>
      </div>

      <div>
        <AnimatePresence mode="wait">
          <motion.div key={sel} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }} className="card p-7">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-wider ${m.tier === "primary" ? "bg-gold/15 text-gold-deep" : "bg-fog text-steel"}`}>
              <IconPin className="h-3.5 w-3.5" /> {m.tier === "primary" ? "Primary market" : "Extended / by quote"}
            </span>
            <h3 className="mt-4 text-2xl font-extrabold">{m.name}</h3>
            <p className="mt-2 text-steel">{m.note} Mobile office transportation, modular building moves, jobsite relocations and rental returns.</p>
            <Link href={`/contact?area=${encodeURIComponent(m.name)}#quote`} className="btn-dark mt-6">Quote a move here <IconArrow /></Link>
          </motion.div>
        </AnimatePresence>
        <div className="mt-5 flex flex-wrap gap-2">
          {markets.map((mk) => (
            <button key={mk.name} onClick={() => setSel(mk.name)} className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition ${sel === mk.name ? "border-ink bg-ink text-white" : mk.tier === "primary" ? "border-gold/50 bg-gold/10 text-ink hover:border-gold" : "border-line bg-white text-steel hover:border-steel"}`}>
              {mk.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
