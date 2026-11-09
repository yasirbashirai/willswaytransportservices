import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import QuoteSection from "@/components/QuoteSection";
import { formatDate, getPost, posts, type Block } from "@/lib/posts";
import { services, site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { IconArrow, IconPhone } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

// Pre-render every article at build time
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date, images: [{ url: post.cover }] },
  };
}

// Renders one content block of an article
function BlockView({ b }: { b: Block }) {
  if ("h2" in b) return <h2>{b.h2}</h2>;
  if ("h3" in b) return <h3>{b.h3}</h3>;
  if ("ul" in b) return <ul>{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>;
  return <p>{b.p}</p>;
}

export default async function ArticlePage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const others = posts.filter((p) => p.slug !== post.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${site.url}${post.cover}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#business` },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }])} />

      <header className="relative overflow-hidden bg-ink pb-16 pt-40 text-white">
        <div className="grid-lines absolute inset-0" />
        <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
        <div className="container-x relative max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-[13px] text-white/50">
            <Link href="/" className="hover:text-gold">Home</Link> / <Link href="/blog" className="hover:text-gold">Blog</Link> / <span className="text-white/80">{post.category}</span>
          </nav>
          <p className="eyebrow eyebrow-light mt-8">{post.category}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-white/55">{formatDate(post.date)} · {post.readMins} min read · By {site.shortName} Transport Services</p>
        </div>
      </header>

      <div className="container-x relative -mt-2 max-w-5xl">
        <div className="relative -mt-0 aspect-[21/9] overflow-hidden rounded-[1.75rem] shadow-2xl">
          <Image src={post.cover} alt={post.coverAlt} fill sizes="(min-width:1024px) 64rem, 100vw" className="object-cover" preload />
        </div>
      </div>

      <div className="container-x grid max-w-6xl gap-14 py-16 lg:grid-cols-[1fr_300px]">
        <article className="prose-ww">
          {post.body.map((b, i) => <BlockView key={i} b={b} />)}
        </article>

        <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-3xl bg-ink p-7 text-white">
            <p className="font-condensed text-[13px] uppercase tracking-[.2em] text-gold">Need a move?</p>
            <p className="mt-2 font-display text-xl font-bold leading-snug">Get your unit checked and quoted.</p>
            <a href="#quote" className="btn-gold mt-5 w-full !text-[14px]">Get a Quote <IconArrow /></a>
            <a href={site.phoneHref} className="mt-3 flex items-center justify-center gap-2 text-[14px] font-bold text-white/80 hover:text-gold"><IconPhone className="h-4 w-4 text-gold" /> {site.phone}</a>
          </div>
          <div className="card p-6">
            <p className="font-condensed text-[13px] uppercase tracking-[.2em] text-gold-deep">Services</p>
            <ul className="mt-3 space-y-2 text-[14.5px]">
              {services.slice(0, 5).map((s) => <li key={s.slug}><Link href={`/services#${s.slug}`} className="font-semibold text-graphite hover:text-gold-deep">{s.title}</Link></li>)}
            </ul>
          </div>
        </aside>
      </div>

      {/* Related reading (text cards, so cover photos are not repeated) */}
      <section className="border-t border-line bg-fog py-16">
        <div className="container-x">
          <h2 className="text-2xl font-extrabold">Keep reading</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {others.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group card flex items-center gap-5 p-6 transition hover:border-gold/60">
                <span className="flex-1">
                  <span className="block font-condensed text-[12px] uppercase tracking-[.2em] text-gold-deep">{p.category}</span>
                  <span className="mt-1 block font-display text-lg font-bold leading-snug text-ink">{p.title}</span>
                </span>
                <IconArrow className="h-5 w-5 shrink-0 text-steel transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection />
    </>
  );
}
