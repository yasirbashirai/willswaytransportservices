import Link from "next/link";
import { site } from "@/lib/site";
import { IconArrow, IconPhone } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden bg-ink px-5 pt-32 text-center text-white">
      <div className="grid-lines absolute inset-0" />
      <div className="relative">
        <p className="font-display text-[120px] font-black leading-none text-gold-grad">404</p>
        <h1 className="mt-4 text-3xl font-extrabold text-white">This road doesn&apos;t go anywhere.</h1>
        <p className="mt-3 text-white/60">The page you are looking for has moved or never existed.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-gold">Back to Home <IconArrow /></Link>
          <a href={site.phoneHref} className="btn-ghost"><IconPhone className="text-gold" /> {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
