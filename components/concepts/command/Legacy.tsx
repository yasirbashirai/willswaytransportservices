import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { audiences, site } from "@/lib/site";
import { IconArrow, IconCheck } from "@/components/icons";

// Credibility band: photo-backed legacy story, honest timeline, who we serve
export default function Legacy() {
  const steps = [
    { y: "30 yrs", t: "Our father's transportation business", d: "Decades of hauling, relationships and equipment." },
    { y: "2026", t: "Wills Way is founded", d: "Carrying the legacy forward with inherited assets." },
    { y: "Now", t: "Mobile office & modular focus", d: "Dependable moves, direct communication." },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-white lg:py-32">
      <Image src="/images/fleet/tractor-staging-lot.jpg" alt="Tractor-trailer staged on an open lot" fill sizes="100vw" className="-z-20 object-cover object-[50%_35%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(1,1,1,.97)_0%,rgba(1,1,1,.9)_45%,rgba(1,1,1,.55)_100%)]" />
      <div className="pointer-events-none absolute -right-8 top-1/2 -z-10 -translate-y-1/2 select-none font-display text-[38vw] font-black leading-none text-white/[.035] lg:text-[440px]">30</div>

      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal><p className="eyebrow eyebrow-light">{site.tagline}</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-.02em] text-white sm:text-[54px]">A new company with <span className="text-gold-grad">30 years</span> behind the wheel.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-8 text-white/70">
              Wills Way Transport Services LLC was founded in 2026 to carry forward our father&apos;s 30-year transportation business, using transportation assets inherited from his established operation. We know transportation is one part of a bigger schedule, so we keep it dependable and keep you informed.
            </p>
          </Reveal>
        </div>

        {/* Timeline rail */}
        <ol className="relative mt-14 grid gap-4 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-[#d4ab20] via-[#d4ab20]/40 to-transparent md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.y} as="li" delay={i * 0.1} className="relative">
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-[#d4ab20]/50 bg-ink font-condensed text-[13px] font-semibold text-gold">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-5 font-display text-3xl font-black text-gold-grad">{s.y}</p>
              <h3 className="mt-1 text-lg font-extrabold text-white">{s.t}</h3>
              <p className="mt-1 text-[14.5px] text-white/55">{s.d}</p>
            </Reveal>
          ))}
        </ol>

        {/* Who we serve */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[.05] p-6 backdrop-blur transition hover:border-[#d4ab20]/60 hover:bg-white/[.08]">
                <h3 className="text-xl font-extrabold text-white">{a.title}</h3>
                <p className="mt-2 text-[14.5px] leading-6 text-white/60">{a.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {a.tags.map((t) => <li key={t} className="flex items-center gap-1.5 rounded-full bg-white/[.07] px-3 py-1 text-[12px] font-semibold text-white/80"><IconCheck className="h-3 w-3 text-gold" />{t}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-3">
          <Link href="/about" className="btn-gold">Our Story <IconArrow /></Link>
          <div className="flex flex-wrap gap-2">
            {site.credentials.slice(0, 3).map((c) => (
              <span key={c.label} className="rounded-full border border-white/15 px-3.5 py-2 font-mono text-[12px] text-white/70">{c.label} {c.value}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
