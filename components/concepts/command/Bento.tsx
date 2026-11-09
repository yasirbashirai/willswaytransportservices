import Image from "next/image";
import Link from "next/link";
import ServiceArt from "@/components/ServiceArt";
import Reveal from "@/components/Reveal";
import { services, site } from "@/lib/site";
import { IconArrow, IconPhone } from "@/components/icons";

// Bento grid of all 8 services: varied tile sizes, dark/light/photo/gold tiles, hover depth
const S = Object.fromEntries(services.map((s) => [s.art, s]));
const num = (slug: string) => String(services.findIndex((s) => s.slug === slug) + 1).padStart(2, "0");

// Small line illustrations for the light tiles
function Mini({ kind }: { kind: "relocate" | "factory" | "overflow" | "return" }) {
  const g = "#d4ab20", k = "#010101";
  return (
    <svg viewBox="0 0 160 70" className="h-16 w-auto" aria-hidden="true">
      {kind === "relocate" && (<>
        <path d="M14 50 C 50 10, 100 70, 146 24" fill="none" stroke={g} strokeWidth="2.5" strokeDasharray="5 6" className="animate-dash" />
        <circle cx="14" cy="50" r="6" fill={k} /><circle cx="146" cy="24" r="6" fill="none" stroke={k} strokeWidth="2.5" />
        <rect x="64" y="28" width="30" height="16" rx="2" fill="#fff" stroke={k} strokeWidth="2" />
      </>)}
      {kind === "factory" && (<>
        <path d="M10 60V32l16 10V32l16 10V18h10l4 42z" fill="none" stroke={k} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M66 46h46" stroke={g} strokeWidth="2.5" strokeDasharray="5 6" className="animate-dash" /><path d="m106 40 8 6-8 6" fill="none" stroke={g} strokeWidth="2.5" />
        <path d="M150 30c0 10-12 22-12 22s-12-12-12-22a12 12 0 0 1 24 0z" fill="none" stroke={k} strokeWidth="2.2" /><circle cx="138" cy="30" r="4" fill={g} />
      </>)}
      {kind === "overflow" && (<>
        {[0, 1, 2].map((i) => <rect key={i} x={20 + i * 14} y={36 - i * 12} width="70" height="22" rx="3" fill="#fff" stroke={i === 2 ? g : k} strokeWidth="2" opacity={1 - i * 0.2} />)}
        <path d="M124 22v26M111 35h26" stroke={g} strokeWidth="3" strokeLinecap="round" />
      </>)}
      {kind === "return" && (<>
        <path d="M120 20a40 22 0 1 0 6 30" fill="none" stroke={g} strokeWidth="2.5" strokeDasharray="5 6" className="animate-dash" />
        <path d="m118 44 9 7-11 3" fill="none" stroke={g} strokeWidth="2.5" />
        <rect x="58" y="26" width="40" height="20" rx="2" fill="#fff" stroke={k} strokeWidth="2" />
      </>)}
    </svg>
  );
}

function LightTile({ art, kind, delay }: { art: string; kind: "relocate" | "factory" | "overflow" | "return"; delay: number }) {
  const s = S[art];
  return (
    <Reveal delay={delay} className="h-full">
      <Link href={`/services#${s.slug}`} className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.6rem] border border-line bg-white p-6 shadow-[0_20px_50px_-35px_rgba(0,0,0,.35)] transition duration-500 hover:-translate-y-1.5 hover:border-gold/70 hover:shadow-[0_30px_60px_-30px_rgba(212,171,32,.45)]">
        <div className="flex items-start justify-between">
          <span className="font-condensed text-[13px] tracking-[.2em] text-gold-deep">{num(s.slug)}</span>
          <Mini kind={kind} />
        </div>
        <div>
          <h3 className="text-[19px] font-extrabold leading-tight">{s.title}</h3>
          <p className="mt-1.5 text-[14px] leading-6 text-steel">{s.short}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-ink opacity-60 transition group-hover:opacity-100">Details <IconArrow className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
        </div>
      </Link>
    </Reveal>
  );
}

function DarkTile({ art, delay, className = "" }: { art: "modular" | "yard"; delay: number; className?: string }) {
  const s = S[art];
  return (
    <Reveal delay={delay} className={`h-full ${className}`}>
      <Link href={`/services#${s.slug}`} className="group relative grid h-full overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-graphite to-ink p-7 text-white transition duration-500 hover:-translate-y-1.5 sm:grid-cols-[1fr_1.1fr] sm:items-center">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative">
          <span className="font-condensed text-[13px] tracking-[.2em] text-gold">{num(s.slug)}</span>
          <h3 className="mt-2 text-2xl font-extrabold text-white">{s.title}</h3>
          <p className="mt-2 text-[14.5px] leading-6 text-white/60">{s.use}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-gold">Details <IconArrow className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
        </div>
        <ServiceArt art={art} className="relative -mb-4 mt-2 hidden h-auto w-full transition duration-700 group-hover:scale-[1.04] sm:block" />
      </Link>
    </Reveal>
  );
}

export default function Bento() {
  const mo = S.office;
  const ts = S.clock;
  return (
    <section id="services" className="bg-white pb-24 lg:pb-32">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">Service catalog</p>
            <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-.02em] sm:text-[54px]">Eight move types.<br />One accountable carrier.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-8 text-steel">Transportation is often one part of a larger construction or modular schedule. Pick the move that matches yours.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(230px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Hero tile: photo */}
          <Reveal className="md:col-span-2 lg:row-span-2">
            <Link href={`/services#${mo.slug}`} className="group relative block h-full min-h-[420px] overflow-hidden rounded-[1.6rem]">
              <Image src="/images/fleet/white-semi-on-road.jpg" alt="White semi truck on the highway" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition duration-[1.2s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
              <span className="absolute left-6 top-6 rounded-full bg-gold px-3.5 py-1.5 text-[11.5px] font-black uppercase tracking-wider text-ink">Most requested</span>
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                <span className="font-condensed text-[13px] tracking-[.2em] text-gold">01</span>
                <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">{mo.title}</h3>
                <p className="mt-3 max-w-md text-white/75">{mo.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[13.5px] font-bold backdrop-blur transition group-hover:bg-gold group-hover:text-ink">Explore service <IconArrow className="h-4 w-4" /></span>
              </div>
            </Link>
          </Reveal>

          <DarkTile art="modular" delay={0.05} className="md:col-span-2" />
          <LightTile art="relocate" kind="relocate" delay={0.08} />
          <LightTile art="factory" kind="factory" delay={0.12} />
          <LightTile art="overflow" kind="overflow" delay={0.06} />
          <LightTile art="return" kind="return" delay={0.1} />
          <DarkTile art="yard" delay={0.14} className="md:col-span-2" />

          {/* Gold strip: time-sensitive */}
          <Reveal delay={0.08} className="md:col-span-2 lg:col-span-4">
            <div className="relative flex h-full flex-col items-start justify-between gap-6 overflow-hidden rounded-[1.6rem] p-8 text-ink sm:flex-row sm:items-center sm:p-10" style={{ background: "linear-gradient(120deg,#f2d25c 0%,#d4ab20 55%,#a6840f 100%)" }}>
              <div className="absolute -right-10 -top-16 font-display text-[220px] font-black leading-none text-ink/[.06]">08</div>
              <div className="relative">
                <span className="font-condensed text-[13px] tracking-[.2em]">08 · {ts.use}</span>
                <h3 className="mt-2 text-3xl font-black sm:text-4xl">{ts.title}</h3>
                <p className="mt-2 max-w-xl text-ink/75">{ts.body}</p>
              </div>
              <a href={site.phoneHref} className="btn-dark relative shrink-0 !px-7 !py-4 !text-base"><IconPhone className="h-4 w-4 text-gold" /> Call {site.phone}</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
