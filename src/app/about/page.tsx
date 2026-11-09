import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { IconChat, IconCheck, IconClose, IconRoute, IconShield, IconTruck } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us | Family-Owned Mobile Office Transportation Company",
  description:
    "Wills Way Transport Services LLC is a family-owned carrier in the San Fernando Valley, founded in 2026 to carry forward a 30-year family transportation business. Mobile office and modular transportation across Southern California.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  { year: "30 years", title: "Our father's transportation business", text: "Three decades of hauling built the knowledge, relationships and equipment that our company stands on." },
  { year: "2026", title: "Wills Way Transport Services is founded", text: "We formed Wills Way to carry that legacy forward, using transportation assets inherited from his established operation." },
  { year: "Today", title: "Focused on mobile offices & modular", text: "We specialize in moving mobile offices, modular structures and related equipment throughout Southern California." },
];

const PILLARS = [
  { icon: IconTruck, title: "Dependable transportation", text: "We show up when we say we will, with the right equipment for the unit." },
  { icon: IconChat, title: "Direct communication", text: "You talk to the people running your move, not a call center." },
  { icon: IconRoute, title: "Honest answers", text: "If a date, route or permit is tight, we tell you upfront. No oversized promises." },
  { icon: IconShield, title: "Operating properly", text: `Active USDOT ${site.credentials[0].value} and California carrier credentials.` },
];

const COMPARE = [
  ["Operates its own transportation equipment", true, false],
  ["Specializes in mobile offices & modular units", true, false],
  ["You speak directly with the team moving your unit", true, false],
  ["Family-owned, San Fernando Valley based", true, false],
  ["Honest go / no-go on tight timelines", true, false],
] as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About Wills Way"
        title={<>A legacy that <span className="text-gold-grad">keeps moving.</span></>}
        intro="Wills Way Transport Services LLC is a family-owned transportation company specializing in the movement of mobile offices, modular structures and related equipment throughout Southern California."
        image="/images/fleet/dispatch-office.jpg"
        imageAlt="Bright modern office reception where moves are coordinated"
        crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
      />

      {/* Story + timeline */}
      <section className="py-24 lg:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">New name on the door. Thirty years behind the wheel.</h2>
            <p className="mt-6 text-lg leading-8 text-steel">
              Founded in 2026, Wills Way Transport Services LLC carries forward the legacy of our father&apos;s 30-year transportation business, utilizing transportation assets inherited from his established operation.
            </p>
            <p className="mt-4 text-lg leading-8 text-steel">
              We understand that transportation is often one part of a larger construction or modular building schedule. Our objective is to provide dependable transportation and direct communication so customers can keep projects, installations and rental operations moving.
            </p>
          </Reveal>
          <ol className="relative space-y-6 border-l-2 border-line pl-8">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} as="li" delay={i * 0.1} className="relative">
                <span className="absolute -left-[42px] top-1 grid h-5 w-5 place-items-center rounded-full border-4 border-white bg-gold shadow" />
                <div className="card p-7">
                  <p className="font-display text-3xl font-black text-gold-grad">{t.year}</p>
                  <h3 className="mt-2 text-xl font-extrabold">{t.title}</h3>
                  <p className="mt-2 leading-7 text-steel">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Fleet band */}
      <section className="relative h-[440px] overflow-hidden lg:h-[520px]">
        <Image src="/images/fleet/fleet-lineup-yard.jpg" alt="Row of tractors lined up in a truck yard" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent" />
        <div className="container-x relative flex h-full items-center">
          <Reveal className="max-w-xl text-white">
            <p className="eyebrow eyebrow-light">Asset-based carrier</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">Our own equipment. Direct accountability.</h2>
            <p className="mt-4 text-lg text-white/75">We are a carrier, not a broker. When you book with us, the team that answers the phone is the team responsible for your move.</p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-fog py-24 lg:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">How we work</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Four commitments on every move.</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div className="group card h-full p-7 transition duration-500 hover:-translate-y-1.5">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-gold transition group-hover:bg-gold group-hover:text-ink"><p.icon className="h-6 w-6" /></div>
                  <h3 className="mt-6 text-xl font-extrabold">{p.title}</h3>
                  <p className="mt-2 leading-7 text-steel">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Carrier vs broker comparison */}
      <section className="py-24 lg:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Why Wills Way</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight">Working with a specialist carrier vs. a generic broker.</h2>
            <p className="mt-4 text-lg leading-8 text-steel">Mobile offices and modular units are not general freight. Here is the difference a focused, family-run carrier makes.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-3xl border border-line">
              <div className="grid grid-cols-[1fr_110px_110px] bg-ink px-6 py-4 text-[13px] font-bold uppercase tracking-wider text-white">
                <span />
                <span className="text-center text-gold">Wills Way</span>
                <span className="text-center text-white/50">Generic broker</span>
              </div>
              {COMPARE.map(([label, a, b]) => (
                <div key={label} className="grid grid-cols-[1fr_110px_110px] items-center border-t border-line px-6 py-4 even:bg-fog/60">
                  <span className="text-[15px] font-semibold text-ink">{label}</span>
                  <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-gold text-ink">{a ? <IconCheck className="h-4 w-4" /> : <IconClose className="h-4 w-4" />}</span>
                  <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-line text-steel">{b ? <IconCheck className="h-4 w-4" /> : <IconClose className="h-4 w-4" />}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Credentials */}
      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-ink p-8 text-white sm:p-12">
              <div className="grid-lines absolute inset-0" />
              <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
                <div>
                  <p className="eyebrow eyebrow-light">Credentials</p>
                  <h2 className="mt-4 text-3xl font-extrabold text-white">Licensed and registered to operate in California.</h2>
                  <p className="mt-3 text-white/60">Contact: {site.contact.name} · <a className="hover:text-gold" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
                </div>
                <dl className="grid grid-cols-2 gap-3">
                  {site.credentials.map((c) => (
                    <div key={c.label} className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
                      <dt className="font-condensed text-[12px] uppercase tracking-[.2em] text-gold">{c.label}</dt>
                      <dd className="mt-1 font-display text-xl font-bold">{c.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <QuoteSection title="Put a 30-year legacy to work on your next move." />
    </>
  );
}
