import Link from "next/link";
import Logo from "./Logo";
import { markets, nav, services, site } from "@/lib/site";
import { posts } from "@/lib/posts";
import { IconClock, IconLinkedIn, IconMail, IconPhone, IconPin } from "./icons";

// Site-wide footer: contact, services, markets, credentials (strong local SEO signals)
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-x relative grid gap-12 pb-12 pt-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo variant="dark" className="h-12 w-auto" />
          <p className="mt-6 max-w-sm text-[15px] leading-7">
            Family-owned transportation for mobile offices, modular structures and related equipment across Southern California.
          </p>
          <p className="mt-4 font-condensed text-sm uppercase tracking-[.25em] text-gold">{site.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {site.credentials.slice(0, 3).map((c) => (
              <span key={c.label} className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-white/80">
                {c.label} {c.value}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          <div>
            <h3 className="font-condensed text-sm font-medium uppercase tracking-[.2em] text-white">Services</h3>
            <ul className="mt-5 space-y-2.5 text-[14.5px]">
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services#${s.slug}`} className="transition hover:text-gold">{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-condensed text-sm font-medium uppercase tracking-[.2em] text-white">Company</h3>
            <ul className="mt-5 space-y-2.5 text-[14.5px]">
              {nav.filter((n) => n.href !== "/").map((n) => (
                <li key={n.href}><Link href={n.href} className="transition hover:text-gold">{n.label}</Link></li>
              ))}
              {posts.slice(0, 2).map((p) => (
                <li key={p.slug}><Link href={`/blog/${p.slug}`} className="line-clamp-1 transition hover:text-gold">{p.short}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-condensed text-sm font-medium uppercase tracking-[.2em] text-white">Contact</h3>
            <ul className="mt-5 space-y-3.5 text-[14.5px]">
              <li><a href={site.phoneHref} className="flex items-center gap-2.5 font-semibold text-white hover:text-gold"><IconPhone className="h-4 w-4 text-gold" /> {site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-[13.5px] hover:text-gold"><IconMail className="h-4 w-4 shrink-0 text-gold" /> {site.email}</a></li>
              <li className="flex items-center gap-2.5"><IconPin className="h-4 w-4 text-gold" /> {site.displayAddress}</li>
              <li className="flex items-center gap-2.5"><IconClock className="h-4 w-4 text-gold" /> {site.hours}</li>
              <li><a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-gold"><IconLinkedIn className="h-4 w-4 text-gold" /> LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Markets line: keeps service-area names on every page */}
      <div className="container-x relative border-t border-white/10 py-6 text-[13px] leading-6 text-white/50">
        <span className="font-semibold text-white/70">Service area: </span>
        {markets.map((m) => m.name).join(" · ")}
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-6 text-[12.5px] text-white/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>USDOT {site.credentials[0].value} · CA # {site.credentials[1].value} · CA MCP {site.credentials[2].value}</p>
        </div>
      </div>
    </footer>
  );
}
