import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import { formatDate, posts } from "@/lib/posts";
import { breadcrumbSchema } from "@/lib/schema";
import { IconArrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Blog | Mobile Office & Modular Transportation Guides",
  description:
    "Guides on mobile office transportation, oversize load permits in California, jobsite office relocation and overflow capacity for modular rental companies.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [lead, ...rest] = posts;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <PageHero
        eyebrow="Blog & guides"
        title={<>Know the move <span className="text-gold-grad">before it moves.</span></>}
        intro="Practical guides for modular rental companies, manufacturers and contractors planning mobile office and modular building transportation in California."
        crumbs={[{ name: "Home", href: "/" }, { name: "Blog" }]}
      />

      <section className="py-24">
        <div className="container-x">
          {/* Featured article */}
          <Reveal>
            <Link href={`/blog/${lead.slug}`} className="group grid overflow-hidden rounded-[1.75rem] border border-line bg-white transition hover:border-gold/60 lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                <Image src={lead.cover} alt={lead.coverAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="font-condensed text-[13px] uppercase tracking-[.2em] text-gold-deep">Featured · {lead.category}</p>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">{lead.title}</h2>
                <p className="mt-4 leading-7 text-steel">{lead.description}</p>
                <p className="mt-6 text-sm text-mist">{formatDate(lead.date)} · {lead.readMins} min read</p>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-ink">Read the guide <IconArrow className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link href={`/blog/${p.slug}`} className="group card block h-full overflow-hidden transition hover:-translate-y-1 hover:border-gold/60">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={p.cover} alt={p.coverAlt} fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1.5 font-condensed text-[12px] uppercase tracking-[.15em] text-gold backdrop-blur">{p.category}</span>
                  </div>
                  <div className="p-7">
                    <h2 className="text-xl font-extrabold leading-snug">{p.title}</h2>
                    <p className="mt-3 line-clamp-2 leading-7 text-steel">{p.description}</p>
                    <p className="mt-5 text-sm text-mist">{formatDate(p.date)} · {p.readMins} min read</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection />
    </>
  );
}
