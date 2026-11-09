import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import { ContactForm } from "@/components/forms";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { IconClock, IconLinkedIn, IconMail, IconPhone, IconPin } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact & Request a Quote | Mobile Office Transportation",
  description:
    "Request a quote for mobile office, construction trailer or modular building transportation in Southern California. Call (213) 222-5870, open 24/7, or email info@willswaytransportation.com.",
  alternates: { canonical: "/contact" },
};

const CARDS = [
  { icon: IconPhone, label: "Call 24/7", value: site.phone, href: site.phoneHref },
  { icon: IconMail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: IconPin, label: "Based in", value: site.displayAddress },
  { icon: IconClock, label: "Hours", value: site.hours },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s get your unit <span className="text-gold-grad">moving.</span></>}
        intro="Request a quote below, call our 24/7 line or send us a message. Every request is reviewed by our team, not a bot."
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
      >
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => {
            const inner = (
              <>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold text-ink"><c.icon className="h-5 w-5" /></span>
                <span className="mt-4 block font-condensed text-[12px] uppercase tracking-[.2em] text-white/50">{c.label}</span>
                <span className="mt-1 block break-words font-display text-[14px] font-bold text-white">{c.value}</span>
              </>
            );
            return (
              <Reveal key={c.label} delay={0.2 + i * 0.06}>
                {c.href ? (
                  <a href={c.href} className="block h-full rounded-3xl border border-white/10 bg-white/[.05] p-6 transition hover:border-gold/60">{inner}</a>
                ) : (
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[.05] p-6">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </PageHero>

      <QuoteSection />

      <section className="py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <p className="eyebrow">General questions</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight">Not a quote? Send us a message.</h2>
              <p className="mt-4 text-lg leading-8 text-steel">Partnerships, recurring lanes, overflow capacity or anything else. Or reach {site.contact.name} directly at <a className="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-bold text-ink hover:text-gold-deep"><IconLinkedIn className="h-5 w-5 text-[#0a66c2]" /> Follow us on LinkedIn</a>
            </Reveal>
            <Reveal delay={0.08} className="mt-8 overflow-hidden rounded-3xl border border-line">
              <iframe
                title="Wills Way Transport Services service area: North Hills, San Fernando Valley"
                src="https://www.google.com/maps?q=North+Hills,+CA+91343&z=11&output=embed"
                className="h-72 w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
          <Reveal delay={0.05}><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
