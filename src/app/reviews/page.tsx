import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import { ReviewForm } from "@/components/forms";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { IconLinkedIn, IconStar } from "@/components/icons";

export const metadata: Metadata = {
  title: "Customer Reviews | Wills Way Transport Services",
  description:
    "Read and leave reviews for Wills Way Transport Services LLC, a family-owned mobile office and modular building transportation company in Southern California.",
  alternates: { canonical: "/reviews" },
};

// Reviews are added here only after a real customer submits one and it is approved.
// Format: { name, company, rating, text, service }
const REVIEWS: { name: string; company: string; rating: number; text: string; service: string }[] = [];

// What every customer can hold us to (shown while reviews are being collected)
const STANDARDS = [
  { t: "On-time arrival windows", d: "We confirm a window and keep you updated if anything changes." },
  { t: "One direct contact", d: "You speak with the team responsible for your move." },
  { t: "Care with every unit", d: "Units are secured, moved and positioned with care." },
  { t: "Clear, honest answers", d: "On permits, timing and what is possible, before you book." },
];

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }])} />
      <PageHero
        eyebrow="Reviews"
        title={<>Earned one move <span className="text-gold-grad">at a time.</span></>}
        intro="We are a new company with a 30-year family legacy behind it. Every review on this page comes from a real customer."
        image="/images/fleet/white-tractor-front.jpg"
        imageAlt="White tractor-trailer on the road"
        crumbs={[{ name: "Home", href: "/" }, { name: "Reviews" }]}
      />

      <section className="py-24">
        <div className="container-x">
          {REVIEWS.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {REVIEWS.map((r, i) => (
                <Reveal key={r.name + i} delay={i * 0.05}>
                  <figure className="card h-full p-7">
                    <div className="flex gap-0.5 text-gold">{Array.from({ length: 5 }, (_, n) => <IconStar key={n} className="h-5 w-5" filled={n < r.rating} />)}</div>
                    <blockquote className="mt-4 leading-7 text-graphite">&ldquo;{r.text}&rdquo;</blockquote>
                    <figcaption className="mt-5 text-sm"><strong className="text-ink">{r.name}</strong> · {r.company} · {r.service}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
              <Reveal>
                <p className="eyebrow">Our standard</p>
                <h2 className="mt-4 text-4xl font-extrabold leading-tight">What our customers can hold us to.</h2>
                <p className="mt-4 text-lg leading-8 text-steel">We would rather show you real reviews than invent them. As customers share their experience, their words will appear here. Until then, this is the standard we work to on every move.</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex gap-1 text-gold">{Array.from({ length: 5 }, (_, n) => <IconStar key={n} className="h-7 w-7" filled={false} />)}</div>
                  <p className="text-sm font-semibold text-steel">Be one of our first reviewers</p>
                </div>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {STANDARDS.map((s, i) => (
                  <Reveal key={s.t} delay={i * 0.06}>
                    <div className="card h-full p-6">
                      <span className="font-display text-4xl font-black text-gold-grad">0{i + 1}</span>
                      <h3 className="mt-3 text-lg font-extrabold">{s.t}</h3>
                      <p className="mt-1.5 text-[15px] leading-6 text-steel">{s.d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-fog py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Leave a review</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight">Moved with us? Tell others how it went.</h2>
            <p className="mt-4 text-lg leading-8 text-steel">Your feedback helps other rental companies, manufacturers and contractors choose with confidence, and it helps us get better.</p>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-bold text-ink hover:text-gold-deep"><IconLinkedIn className="h-5 w-5 text-[#0a66c2]" /> Recommend us on LinkedIn</a>
          </Reveal>
          <Reveal delay={0.06}><ReviewForm /></Reveal>
        </div>
      </section>

      <QuoteSection title="Start the move you'll want to review." />
    </>
  );
}
