import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { site } from "@/lib/site";
import { IconArrow, IconPhone } from "./icons";

// Inner-page hero: dark split layout, headline + 2 CTAs left, framed photo right
export default function PageHero({
  eyebrow, title, intro, image, imageAlt, crumbs, children,
}: {
  eyebrow: string; title: React.ReactNode; intro: string; image?: string; imageAlt?: string;
  crumbs: { name: string; href?: string }[]; children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-40 text-white lg:pb-24 lg:pt-44">
      <div className="grid-lines absolute inset-0" />
      <div className="absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-emerald/25 blur-3xl" />

      <div className={`container-x relative grid items-center gap-12 ${image ? "lg:grid-cols-[1.1fr_.9fr]" : ""}`}>
        <div>
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-white/50">
            {crumbs.map((c, i) => (
              <span key={c.name} className="flex items-center gap-2">
                {c.href ? <Link href={c.href} className="hover:text-gold">{c.name}</Link> : <span className="text-white/80">{c.name}</span>}
                {i < crumbs.length - 1 && <span>/</span>}
              </span>
            ))}
          </nav>
          <Reveal><p className="eyebrow eyebrow-light">{eyebrow}</p></Reveal>
          <Reveal delay={0.05}><h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[58px]">{title}</h1></Reveal>
          <Reveal delay={0.1}><p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{intro}</p></Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#quote" className="btn-gold">Get a Quote <IconArrow /></a>
              <a href={site.phoneHref} className="btn-ghost"><IconPhone className="text-gold" /> {site.phone}</a>
            </div>
          </Reveal>
          {children}
        </div>
        {image && (
          <Reveal delay={0.1} className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-gold/30" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] shadow-2xl shadow-black/60">
              <Image src={image} alt={imageAlt ?? ""} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" preload />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
