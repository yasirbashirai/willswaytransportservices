import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { audiences, site } from "@/lib/site";
import { IconArrow, IconBuilding, IconChat, IconFactory, IconFile, IconHardHat, IconRoute, IconTruck } from "@/components/icons";

// Concept C static sections: section heading, audiences, legacy filmstrip, process ribbon.

export function EdHeading({ num, kicker, title, intro, dark = false }: { num: string; kicker: string; title: React.ReactNode; intro?: string; dark?: boolean }) {
  return (
    <div className={`grid gap-6 border-b pb-8 lg:grid-cols-[110px_1.2fr_.8fr] lg:items-end ${dark ? "border-white/15" : "border-ink/15"}`}>
      <Reveal><span className={`font-display text-6xl font-black leading-none lg:text-7xl ${dark ? "text-white/10" : "text-ink/10"}`}>{num}</span></Reveal>
      <Reveal delay={0.05}>
        <p className={`eyebrow ${dark ? "eyebrow-light" : ""}`}>{kicker}</p>
        <h2 className={`mt-4 text-[34px] font-black leading-[1.02] tracking-[-.03em] sm:text-5xl lg:text-[56px] ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      </Reveal>
      {intro && <Reveal delay={0.1}><p className={`text-[17px] leading-8 ${dark ? "text-white/60" : "text-steel"}`}>{intro}</p></Reveal>}
    </div>
  );
}

/* ---------- Who we move for: three tall cards, three treatments ---------- */
export function EdAudiences() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {/* 1. Ink card with outlined numeral */}
      <Reveal className="h-full">
        <article className="group relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-[2rem] bg-ink p-8 text-white">
          <span className="pointer-events-none absolute -right-3 -top-4 font-display text-[170px] font-black leading-none text-transparent [-webkit-text-stroke:2px_rgba(212,171,32,.35)]">01</span>
          <IconBuilding className="relative h-9 w-9 text-gold" />
          <div className="relative mt-auto">
            <h3 className="text-3xl font-black text-white">{audiences[0].title}</h3>
            <p className="mt-3 leading-7 text-white/65">{audiences[0].text}</p>
            <div className="mt-6 flex flex-wrap gap-2">{audiences[0].tags.map((t) => <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-[12.5px] font-semibold text-white/80">{t}</span>)}</div>
          </div>
        </article>
      </Reveal>

      {/* 2. Gold gradient card */}
      <Reveal delay={0.08} className="h-full">
        <article className="relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-[2rem] p-8 text-ink" style={{ background: "linear-gradient(150deg,#f2d25c 0%,#d4ab20 55%,#a6840f 100%)" }}>
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(135deg,rgba(1,1,1,.18)_0_2px,transparent_2px_14px)] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
          <div className="relative flex items-center justify-between">
            <IconFactory className="h-9 w-9" />
            <span className="font-display text-6xl font-black text-ink/15">02</span>
          </div>
          <div className="relative mt-auto">
            <h3 className="text-3xl font-black">{audiences[1].title}</h3>
            <p className="mt-3 leading-7 text-ink/75">{audiences[1].text}</p>
            <div className="mt-6 flex flex-wrap gap-2">{audiences[1].tags.map((t) => <span key={t} className="rounded-full bg-ink/90 px-3 py-1 text-[12.5px] font-semibold text-gold-light">{t}</span>)}</div>
          </div>
        </article>
      </Reveal>

      {/* 3. Photo card */}
      <Reveal delay={0.16} className="h-full">
        <article className="group relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-[2rem] p-8 text-white">
          <Image src="/images/fleet/white-semi-on-road.jpg" alt="White semi truck on the road" fill sizes="(min-width:1024px) 30vw, 100vw" className="object-cover object-top transition duration-[1.2s] group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/25" />
          <div className="relative flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur"><IconHardHat className="h-6 w-6 text-gold" /></span>
            <span className="font-display text-6xl font-black text-white/20">03</span>
          </div>
          <div className="relative mt-auto">
            <h3 className="text-3xl font-black text-white">{audiences[2].title}</h3>
            <p className="mt-3 leading-7 text-white/75">{audiences[2].text}</p>
            <div className="mt-6 flex flex-wrap gap-2">{audiences[2].tags.map((t) => <span key={t} className="rounded-full bg-white/15 px-3 py-1 text-[12.5px] font-semibold backdrop-blur">{t}</span>)}</div>
          </div>
        </article>
      </Reveal>
    </div>
  );
}

/* ---------- Legacy filmstrip (the one dark band) ---------- */
const FRAMES = [
  { k: "30 years", t: "Our father's business", d: "Three decades of hauling built the knowledge and the equipment we start with." },
  { k: "2026", t: "Wills Way is founded", d: "We formed the company to carry that legacy forward, on inherited, established assets." },
  { k: "Today", t: "Mobile office & modular", d: "Focused on mobile offices, modular structures and related equipment across SoCal." },
];

function Sprockets() {
  return <div className="h-4 w-full [background-image:radial-gradient(circle,rgba(255,255,255,.22)_3px,transparent_3.5px)] [background-size:22px_16px] [background-position:center]" />;
}

export function EdLegacy() {
  return (
    <div className="grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr]">
      <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <Image src="/images/fleet/tractor-staging-lot.jpg" alt="Tractor-trailer staged on an open lot" fill sizes="(min-width:1024px) 36vw, 90vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent" />
          <p className="absolute bottom-6 left-6 font-condensed text-[12px] uppercase tracking-[.25em] text-white/70">Fig. 02 · The legacy, still rolling</p>
        </div>
        <div className="absolute -right-3 -top-3 h-full w-full -z-0 rounded-[2rem] border border-gold/40" />
      </Reveal>

      <div>
        <Reveal>
          <blockquote className="relative">
            <span aria-hidden="true" className="absolute -left-2 -top-16 font-display text-[160px] font-black leading-none text-gold/25">&ldquo;</span>
            <p className="relative font-display text-[26px] font-extrabold leading-[1.25] tracking-tight text-white sm:text-[34px]">
              Transportation is often one part of a larger construction or modular building schedule. Our job is dependable transportation and <span className="text-gold-grad">direct communication</span>, so your projects keep moving.
            </p>
            <footer className="mt-6 font-condensed text-[13px] uppercase tracking-[.22em] text-white/50">The Wills Way family · {site.displayAddress}</footer>
          </blockquote>
        </Reveal>

        {/* Filmstrip */}
        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-2xl bg-[#151515] ring-1 ring-white/10">
            <Sprockets />
            <ol className="grid gap-px bg-white/10 sm:grid-cols-3">
              {FRAMES.map((f, i) => (
                <li key={f.k} className="relative bg-[#1b1b1c] p-6">
                  <span className="font-condensed text-[11px] uppercase tracking-[.25em] text-white/35">Frame {i + 1}</span>
                  <p className="mt-2 font-display text-3xl font-black text-gold-grad">{f.k}</p>
                  <p className="mt-2 font-display text-[16px] font-bold text-white">{f.t}</p>
                  <p className="mt-1.5 text-[13.5px] leading-6 text-white/55">{f.d}</p>
                </li>
              ))}
            </ol>
            <Sprockets />
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
          <Link href="/about" className="btn-gold">Read Our Story <IconArrow /></Link>
          <span className="inline-flex items-center rounded-full border border-white/15 px-5 font-condensed text-[13px] uppercase tracking-[.2em] text-white/70">USDOT {site.credentials[0].value} · CA # {site.credentials[1].value}</span>
        </Reveal>
      </div>
    </div>
  );
}

/* ---------- Process ribbon ---------- */
const STEPS = [
  { icon: IconFile, t: "Request", d: "Unit, route and timing via the form, or call 24/7." },
  { icon: IconRoute, t: "Route & permits", d: "Equipment, site access and oversize needs reviewed." },
  { icon: IconChat, t: "Confirmed plan", d: "A pickup window and one direct point of contact." },
  { icon: IconTruck, t: "Moved & placed", d: "Delivered and positioned with your site contact." },
];

export function EdProcess() {
  return (
    <div className="relative">
      {/* the ribbon */}
      <div className="absolute left-0 right-0 top-[38px] hidden h-[10px] lg:block" style={{ background: "linear-gradient(90deg,#f2d25c,#d4ab20 55%,#a6840f)", clipPath: "polygon(0 0,100% 0,98.5% 100%,0 100%)" }} />
      <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.t} delay={i * 0.1} className="group">
            <div className="relative flex items-center gap-4 lg:block">
              <span className="relative z-10 grid h-[86px] w-[86px] shrink-0 place-items-center rounded-full border-[6px] border-[#f6f4ee] bg-ink text-gold shadow-xl transition duration-500 group-hover:-translate-y-1.5">
                <s.icon className="h-8 w-8" />
              </span>
            </div>
            <p className="mt-6 font-condensed text-[12px] uppercase tracking-[.25em] text-gold-deep">Step 0{i + 1}</p>
            <h3 className="mt-1 text-2xl font-black tracking-tight">{s.t}</h3>
            <p className="mt-2 max-w-[260px] leading-7 text-steel">{s.d}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
