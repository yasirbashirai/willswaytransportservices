import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import ServiceArt from "@/components/ServiceArt";
import { markets, services, site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { IconArrow, IconCheck, IconPin } from "@/components/icons";

export const metadata: Metadata = {
  title: "Mobile Office, Construction Trailer & Modular Building Transportation Services",
  description:
    "Mobile office transportation, construction trailer transport, modular building transportation, jobsite office relocation, rental returns, yard repositioning and overflow capacity across Los Angeles and Southern California.",
  keywords: services.map((s) => s.keyword).concat(["Construction trailer movers", "Jobsite office relocation", "Mobile office delivery and placement"]),
  alternates: { canonical: "/services" },
};

// What shapes a quote: shown so customers know what to send (fewer back-and-forth emails)
const FACTORS = [
  { t: "Unit size & weight", d: "Width and height decide equipment and whether the move is oversize." },
  { t: "Pickup & delivery", d: "Distance, route and which market the destination falls in." },
  { t: "Permits & route", d: "Oversize units may need Caltrans or local permits and set travel times." },
  { t: "Site access", d: "Ground conditions, turning room and overhead clearance on both ends." },
  { t: "Timing", d: "Target date, flexibility and whether the move is time-sensitive." },
  { t: "Number of units", d: "Multiple units or batch yard moves can be scheduled together." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": services.map((s) => ({
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.body,
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "State", name: "California" },
    url: `${site.url}/services#${s.slug}`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />

      <PageHero
        eyebrow="Services"
        title={<>Transportation for mobile offices, <span className="text-gold-grad">modular buildings</span> and jobsite units.</>}
        intro="Eight specialized services for modular rental companies, manufacturers and contractors across Los Angeles, the San Fernando Valley and Southern California."
        image="/images/fleet/tractor-trailer-side.jpg"
        imageAlt="Tractor-trailer parked side-on under a clear blue sky"
        crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
      />

      {/* Sticky service index */}
      <nav aria-label="Service index" className="sticky top-[68px] z-30 border-b border-line bg-white/90 backdrop-blur-lg">
        <div className="container-x flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {services.map((s, i) => (
            <a key={s.slug} href={`#${s.slug}`} className="shrink-0 rounded-full border border-line px-4 py-2 text-[13px] font-semibold text-graphite transition hover:border-gold hover:bg-gold/10">
              <span className="mr-1.5 font-condensed text-gold-deep">{String(i + 1).padStart(2, "0")}</span>{s.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Service detail blocks */}
      <div className="py-12 lg:py-16">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section key={s.slug} id={s.slug} className="container-x scroll-mt-40 py-12 lg:py-16">
              <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Reveal>
                  {i === 0 ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(0,0,0,.5)]">
                      <Image src="/images/fleet/flatbed-tractor-trailer.jpg" alt="Tractor with a flatbed trailer ready for unit transport" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
                      <span className="absolute left-5 top-5 rounded-full bg-ink/80 px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-gold backdrop-blur">Most requested</span>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-graphite to-ink p-8">
                      <div className="grid-lines absolute inset-0 opacity-70" />
                      <ServiceArt art={s.art} className="relative h-auto w-full" />
                      <span className="absolute right-6 top-5 font-display text-6xl font-black text-white/[.06]">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  )}
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="eyebrow">{String(i + 1).padStart(2, "0")} · {s.use}</p>
                  <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{s.title}</h2>
                  <p className="mt-4 text-lg leading-8 text-steel">{s.body}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[15px] font-medium text-graphite">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold text-ink"><IconCheck className="h-3 w-3" /></span>{p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link href={`/contact?service=${s.slug}#quote`} className="btn-gold">Quote This Move <IconArrow /></Link>
                    <a href={site.phoneHref} className="font-bold text-ink underline decoration-gold decoration-2 underline-offset-4">or call {site.phone}</a>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      {/* What shapes your quote */}
      <section className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="grid-lines absolute inset-0" />
        <div className="container-x relative">
          <Reveal className="max-w-3xl">
            <p className="eyebrow eyebrow-light">Transparent quoting</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">What shapes the price of a move.</h2>
            <p className="mt-4 text-lg text-white/65">Send these details with your request and you will get a faster, more accurate quote.</p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FACTORS.map((f, i) => (
              <Reveal key={f.t} delay={i * 0.05}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/[.04] p-7 transition hover:border-gold/50 hover:bg-white/[.07]">
                  <span className="font-condensed text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-xl font-bold text-white">{f.t}</h3>
                  <p className="mt-2 leading-7 text-white/60">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Service area</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight">Mobile office movers for Los Angeles and Southern California.</h2>
            <p className="mt-4 text-lg leading-8 text-steel">
              Based in the San Fernando Valley, we provide mobile office transportation and commercial trailer transportation across our primary markets, with extended California coverage by quote.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {(["primary", "extended"] as const).map((tier) => (
              <Reveal key={tier} delay={tier === "extended" ? 0.08 : 0}>
                <div className={`h-full rounded-3xl p-7 ${tier === "primary" ? "bg-ink text-white" : "card"}`}>
                  <p className={`font-condensed text-[13px] uppercase tracking-[.2em] ${tier === "primary" ? "text-gold" : "text-gold-deep"}`}>{tier === "primary" ? "Primary markets" : "Extended / by quote"}</p>
                  <ul className="mt-5 space-y-3">
                    {markets.filter((m) => m.tier === tier).map((m) => (
                      <li key={m.name} className="flex items-center gap-2.5 font-semibold">
                        <IconPin className={`h-4 w-4 ${tier === "primary" ? "text-gold" : "text-steel"}`} /> {m.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection title="Tell us what needs to move." />
    </>
  );
}
