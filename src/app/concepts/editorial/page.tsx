import type { Metadata } from "next";
import Link from "next/link";
import EdHero from "@/components/concepts/editorial/EdHero";
import EdServices from "@/components/concepts/editorial/EdServices";
import { EdAudiences, EdHeading, EdLegacy, EdProcess } from "@/components/concepts/editorial/EdSections";
import ServiceMap from "@/components/home/ServiceMap";
import Faq from "@/components/Faq";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import { allFaqs } from "@/lib/faqs";
import { services, site } from "@/lib/site";
import { IconArrow, IconPhone } from "@/components/icons";

// Homepage CONCEPT C: "Premium Editorial, Light". Review-only route, not indexed.
export const metadata: Metadata = {
  title: "Concept C · Premium Editorial",
  robots: { index: false },
};

const homeFaqs = [allFaqs[0], allFaqs[3], allFaqs[5], allFaqs[8]];

export default function EditorialConcept() {
  return (
    <div className="bg-[#f6f4ee]">
      {/* 1. Hero */}
      <EdHero />

      {/* Running ticker in editorial caps */}
      <div className="overflow-hidden border-y-2 border-ink bg-[#f6f4ee] py-4">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-[22px] font-black uppercase tracking-tight text-ink">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12" aria-hidden={k === 1}>
              {services.map((s) => (
                <span key={s.slug} className="flex items-center gap-12">{s.title}<span className="text-gold">✦</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Services index */}
      <section id="services" className="py-24 lg:py-32">
        <div className="container-x">
          <EdHeading num="01" kicker="The services" title={<>Eight moves. <span className="text-gold-grad">One</span> specialist carrier.</>} intro="Hover a service to preview it, click to start a quote. Every move type is built around mobile offices and modular units, not general freight." />
          <div className="mt-6"><EdServices /></div>
          <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-steel">Not sure which fits your move? We will tell you.</p>
            <Link href="/services" className="inline-flex items-center gap-2 font-display font-extrabold text-ink underline decoration-gold decoration-[3px] underline-offset-[6px]">All service details <IconArrow /></Link>
          </Reveal>
        </div>
      </section>

      {/* 3. Who we move for */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <EdHeading num="02" kicker="Who we move for" title={<>Built for B2B schedules, not one-off hauls.</>} intro="Rental fleets, factories and jobsites run on dates. We plan every move around yours." />
          <div className="mt-12"><EdAudiences /></div>
        </div>
      </section>

      {/* 4. Legacy (the single dark band) */}
      <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:calc(100%/12)_100%]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-emerald/25 blur-[110px]" />
        <div className="container-x relative">
          <EdHeading dark num="03" kicker={site.tagline} title={<>A new company. A <span className="text-gold-grad">30-year</span> head start.</>} />
          <div className="mt-14"><EdLegacy /></div>
        </div>
      </section>

      {/* 5. Process ribbon */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <EdHeading num="04" kicker="How a move works" title={<>Four steps. One direct line.</>} intro="No call centers, no hand-offs. The team that quotes your move is the team that runs it." />
          <div className="mt-16"><EdProcess /></div>
        </div>
      </section>

      {/* 6. Coverage */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <EdHeading num="05" kicker="Coverage" title={<>Rooted in the Valley. Moving across California.</>} intro="Five primary markets around the San Fernando Valley, with extended California coverage by quote. Tap an area to quote a move there." />
          <div className="mt-14"><ServiceMap /></div>
        </div>
      </section>

      {/* 7. FAQ preview */}
      <section className="py-24 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Straight answers</p>
            <h2 className="mt-4 text-[34px] font-black leading-[1.02] tracking-[-.03em] sm:text-5xl">Before you book, ask us anything.</h2>
            <p className="mt-5 text-lg leading-8 text-steel">Or skip the reading and call. Someone picks up 24 hours a day.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.phoneHref} className="btn-dark"><IconPhone className="h-4 w-4 text-gold" /> {site.phone}</a>
              <Link href="/faq" className="inline-flex items-center gap-2 px-2 font-bold text-ink hover:text-gold-deep">All FAQs <IconArrow /></Link>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,.4)] sm:p-10"><Faq items={homeFaqs} /></Reveal>
        </div>
      </section>

      {/* 8. Quote */}
      <QuoteSection title="Your unit. Our road. Let's plan the move." />
    </div>
  );
}
