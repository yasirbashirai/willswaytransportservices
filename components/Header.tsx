"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";
import { IconArrow, IconClock, IconClose, IconMail, IconMenu, IconPhone, IconShield } from "./icons";

// Sticky header: utility bar (24/7, DOT, contact) + main nav that tightens on scroll
export default function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [path]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div className={`overflow-hidden bg-ink text-[12.5px] text-white/70 transition-all duration-300 ${scrolled ? "max-h-0" : "max-h-10"}`}>
        <div className="container-x flex h-9 items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><IconClock className="h-3.5 w-3.5 text-gold" /> Open {site.hours}</span>
            <span className="hidden items-center gap-1.5 sm:flex"><IconShield className="h-3.5 w-3.5 text-gold" /> USDOT {site.credentials[0].value}</span>
            <span className="hidden lg:inline">Serving the San Fernando Valley &amp; Southern California</span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 hover:text-gold md:flex"><IconMail className="h-3.5 w-3.5" /> {site.email}</a>
            <a href={site.phoneHref} className="flex items-center gap-1.5 font-semibold text-white hover:text-gold"><IconPhone className="h-3.5 w-3.5 text-gold" /> {site.phone}</a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className={`border-b transition-all duration-300 ${scrolled ? "border-white/10 bg-ink/90 shadow-2xl shadow-black/30 backdrop-blur-xl" : "border-white/5 bg-ink/55 backdrop-blur-md"}`}>
        <div className={`container-x flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? "h-[68px]" : "h-[78px]"}`}>
          <Link href="/" aria-label="Wills Way Transport Services home" className="shrink-0">
            <Logo variant="dark" className={`w-auto transition-all duration-300 ${scrolled ? "h-9" : "h-11"}`} />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`relative rounded-full px-3.5 py-2 text-[14.5px] font-semibold transition ${active(n.href) ? "text-gold" : "text-white/80 hover:text-white"}`}
              >
                {n.label}
                {active(n.href) && <motion.span layoutId="nav-dot" className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-gold" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={site.phoneHref} className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[14px] font-bold text-white transition hover:border-gold xl:flex">
              <IconPhone className="h-4 w-4 text-gold" /> {site.phone}
            </a>
            <Link href="/contact#quote" className="btn-gold !hidden !px-5 !py-2.5 !text-[14px] sm:!inline-flex">Get a Quote <IconArrow /></Link>
            <button onClick={() => setOpen((o) => !o)} className="rounded-full p-2.5 text-white lg:hidden" aria-label="Toggle menu" aria-expanded={open}>
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-b border-white/10 bg-ink/97 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x grid gap-1 py-4">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className={`rounded-xl px-4 py-3 font-display text-lg font-bold ${active(n.href) ? "bg-white/5 text-gold" : "text-white"}`}>
                  {n.label}
                </Link>
              ))}
              <a href={site.phoneHref} className="btn-ghost mt-2"><IconPhone className="text-gold" /> {site.phone}</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
