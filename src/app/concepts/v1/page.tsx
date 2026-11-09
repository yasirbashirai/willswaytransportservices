import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import ServiceTabs from "@/components/home/ServiceTabs";
import ServiceMap from "@/components/home/ServiceMap";
import Process from "@/components/home/Process";
import CountUp from "@/components/CountUp";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import { audiences, markets, services, site } from "@/lib/site";
import { allFaqs } from "@/lib/faqs";
import { posts } from "@/lib/posts";
import { faqSchema } from "@/lib/schema";
import { IconArrow, IconBuilding, IconFactory, IconHardHat } from "@/components/icons";

const audienceIcons = [IconBuilding, IconFactory, IconHardHat];
const homeFaqs = [allFaqs[0], allFaqs[3], allFaqs[5], allFaqs[8]];

// Original v1 homepage, kept for reference (not indexed)
export const metadata: Metadata = { title: "Homepage v1 (original)", robots: { index: false } };

export default function HomeV1() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* 1. Hero */}
      <Hero />

      {/* Ticker: services + markets */}
      <div className="relative overflow-hidden border-y border-gold/30 bg-gold py-3.5">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-condensed text-[15px] font-medium uppercase tracking-[.18em] text-ink">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10" aria-hidden={k === 1}>
              {[...services.map((s) => s.title), ...markets.filter((m) => m.tier === "primary").map((m) => m.name)].map((t) => (
                <span key={t} className="flex items-center gap-10">{t}<span className="h-1.5 w-1.5 rotate-45 bg-ink" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Services: segmented and interactive */}
      <section id="services" className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald/20 blur-3xl" />
        <div className="container-x relative">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <p className="eyebrow eyebrow-light">What we move</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">Eight ways we keep your units, projects and rentals moving.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-8 text-white/65">
                Transportation is often one part of a larger construction or modular building schedule. Pick the move you need and see how we handle it.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-14"><ServiceTabs /></Reveal>
        </div>
      </section>

      {/* 3. Who we serve + infrastructure metrics */}
      <section className="relative py-24 lg:py-32">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">Built for B2B schedules</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">The carrier behind rental fleets, factories and jobsites.</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {audiences.map((a, i) => {
              const Icon = audienceIcons[i];
              return (
                <Reveal key={a.title} delay={i * 0.08}>
                  <div className="group card relative h-full overflow-hidden p-8 transition duration-500 hover:-translate-y-1.5 hover:border-gold/60">
                    <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-light to-gold-deep transition duration-500 group-hover:scale-x-100" />
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-gold transition duration-500 group-hover:bg-gold group-hover:text-ink"><Icon className="h-6 w-6" /></div>
                    <h3 className="mt-6 text-2xl font-extrabold">{a.title}</h3>
                    <p className="mt-3 leading-7 text-steel">{a.text}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {a.tags.map((t) => <span key={t} className="rounded-full bg-fog px-3 py-1 text-[12.5px] font-semibold text-graphite">{t}</span>)}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Infrastructure metrics: only verifiable numbers */}
          <Reveal delay={0.05} className="mt-8">
            <div className="relative grid overflow-hidden rounded-[1.75rem] bg-ink text-white sm:grid-cols-2 lg:grid-cols-4">
              <div className="grid-lines absolute inset-0" />
              {[
                { n: site.legacyYears, s: "", label: "Years of family transport legacy", sub: "Carried forward from our father's business" },
                { n: 24, s: "/7", label: "Phone line, every day", sub: site.phone },
                { n: markets.filter((m) => m.name.endsWith("County")).length, s: "", label: "California counties covered", sub: "5 primary markets + extended by quote" },
                { n: services.length, s: "", label: "Specialized move types", sub: "Mobile office to modular" },
              ].map((m, i) => (
                <div key={m.label} className={`relative p-8 ${i ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}>
                  <p className="font-display text-5xl font-black text-gold-grad lg:text-6xl"><CountUp to={m.n} suffix={m.s} /></p>
                  <p className="mt-3 font-display text-[15px] font-bold">{m.label}</p>
                  <p className="mt-1 text-[13px] text-white/50">{m.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Process */}
      <section className="relative overflow-hidden bg-fog py-24 lg:py-28">
        <div className="grid-lines-dark absolute inset-0" />
        <div className="container-x relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">How a move works</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Four steps. One direct line of communication.</h2>
          </Reveal>
          <div className="mt-16"><Process /></div>
          <Reveal className="mt-14 text-center">
            <a href="#quote" className="btn-gold">Start Step 1 Now <IconArrow /></a>
          </Reveal>
        </div>
      </section>

      {/* 5. Service area map */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <p className="eyebrow">Service area</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Rooted in the San Fernando Valley. Moving across California.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-8 text-steel">
                Mobile office transportation in Los Angeles, the San Fernando Valley and across Southern California, with extended coverage by quote. Tap any area to start a quote for it.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-14"><ServiceMap /></Reveal>
        </div>
      </section>

      {/* 6. Legacy / credibility */}
      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-emerald/15 to-transparent" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src="/images/fleet/tractor-staging-lot.jpg" alt="Tractor-trailer staged on an open lot" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-2 rounded-3xl bg-gold p-6 text-ink shadow-2xl sm:-right-6">
              <p className="font-display text-5xl font-black leading-none">30</p>
              <p className="mt-1 font-condensed text-[13px] uppercase tracking-[.18em]">Year family legacy</p>
            </div>
            <div className="absolute -left-2 top-8 rounded-2xl border border-white/15 bg-ink/70 px-5 py-4 backdrop-blur sm:-left-6">
              <p className="font-condensed text-[12px] uppercase tracking-[.2em] text-gold">Founded</p>
              <p className="font-display text-2xl font-extrabold">{site.founded}</p>
            </div>
          </Reveal>
          <div>
            <Reveal><p className="eyebrow eyebrow-light">{site.tagline}</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">A new company, carrying forward a 30-year transportation business.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-8 text-white/70">
                Wills Way Transport Services LLC was founded in 2026 to carry forward the legacy of our father&apos;s 30-year transportation business, using transportation assets inherited from his established operation.
              </p>
              <p className="mt-4 text-lg leading-8 text-white/70">
                Our objective is simple: dependable transportation and direct communication, so you can keep projects, installations and rental operations moving.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <dl className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {site.credentials.slice(0, 3).map((c) => (
                  <div key={c.label} className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                    <dt className="font-condensed text-[12px] uppercase tracking-[.2em] text-gold">{c.label}</dt>
                    <dd className="mt-1 font-display text-lg font-bold">{c.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/about" className="btn-gold">Our Story <IconArrow /></Link>
                <Link href="/services" className="btn-ghost">All Services</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. Quote (conversion) */}
      <QuoteSection image="/images/fleet/white-semi-on-road.jpg" imageAlt="White semi truck on a highway" />

      {/* FAQ + resources */}
      <section className="py-24 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <p className="eyebrow">Questions</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight">Straight answers before you book.</h2>
            </Reveal>
            <Reveal delay={0.05} className="mt-8"><Faq items={homeFaqs} /></Reveal>
            <Link href="/faq" className="mt-6 inline-flex items-center gap-2 font-bold text-ink hover:text-gold-deep">See all FAQs <IconArrow /></Link>
          </div>
          <div>
            <Reveal>
              <p className="eyebrow">Resources</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight">Guides for planning your next move.</h2>
            </Reveal>
            <div className="mt-8 grid gap-4">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <Link href={`/blog/${p.slug}`} className="group card flex items-center gap-5 p-6 transition hover:-translate-y-0.5 hover:border-gold/60">
                    <span className="font-display text-4xl font-black text-line transition group-hover:text-gold">0{i + 1}</span>
                    <span className="flex-1">
                      <span className="block font-condensed text-[12px] uppercase tracking-[.2em] text-gold-deep">{p.category}</span>
                      <span className="mt-1 block font-display text-lg font-bold leading-snug text-ink">{p.title}</span>
                    </span>
                    <IconArrow className="h-5 w-5 shrink-0 text-steel transition group-hover:translate-x-1 group-hover:text-gold-deep" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
