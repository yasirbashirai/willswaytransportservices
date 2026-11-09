import type { Metadata } from "next";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import { allFaqs, faqGroups } from "@/lib/faqs";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { IconPhone } from "@/components/icons";

export const metadata: Metadata = {
  title: "FAQ | Mobile Office & Modular Building Transportation",
  description:
    "Answers about mobile office transportation, construction trailer moves, oversize permits, service areas and scheduling with Wills Way Transport Services in Southern California.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(allFaqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])} />
      <PageHero
        eyebrow="FAQ"
        title={<>Questions, <span className="text-gold-grad">answered plainly.</span></>}
        intro="Everything you need to know about moving mobile offices, construction trailers and modular units with Wills Way."
        image="/images/fleet/tractor-trailer-highway.jpg"
        imageAlt="Tractor-trailer driving on a desert highway"
        crumbs={[{ name: "Home", href: "/" }, { name: "FAQ" }]}
      />

      <section className="py-24">
        <div className="container-x grid gap-14 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <nav aria-label="FAQ topics" className="flex flex-wrap gap-2 lg:flex-col">
              {faqGroups.map((g) => (
                <a key={g.title} href={`#${g.title.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="rounded-full border border-line px-4 py-2 text-[14px] font-semibold text-graphite transition hover:border-gold hover:bg-gold/10 lg:rounded-xl">
                  {g.title}
                </a>
              ))}
            </nav>
            <div className="mt-8 hidden rounded-3xl bg-ink p-6 text-white lg:block">
              <p className="font-display text-lg font-bold">Still have a question?</p>
              <p className="mt-1 text-[14px] text-white/60">Our line is open 24/7.</p>
              <a href={site.phoneHref} className="btn-gold mt-4 w-full !text-[14px]"><IconPhone /> {site.phone}</a>
            </div>
          </aside>
          <div className="space-y-14">
            {faqGroups.map((g) => (
              <Reveal key={g.title}>
                <section id={g.title.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-32">
                  <h2 className="text-3xl font-extrabold">{g.title}</h2>
                  <div className="mt-4"><Faq items={g.items} /></div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection title="Ready when you are." />
    </>
  );
}
