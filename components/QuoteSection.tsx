import Image from "next/image";
import QuoteForm from "./QuoteForm";
import Reveal from "./Reveal";
import { site } from "@/lib/site";
import { IconCheck } from "./icons";

// Quote block placed on every major page (anchor: #quote)
export default function QuoteSection({
  title = "Get your move checked and quoted.",
  intro = "Tell us about the unit, the route and your timing. You will see route and permit notes instantly, and we reply with clear next steps.",
  image,
  imageAlt = "",
}: { title?: string; intro?: string; image?: string; imageAlt?: string }) {
  return (
    <section id="quote" className="relative overflow-hidden bg-fog py-24 lg:py-28">
      <div className="grid-lines-dark absolute inset-0" />
      <div className="container-x relative">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="eyebrow">Request a quote</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-lg text-steel">{intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-2 text-[14.5px] font-semibold text-ink">
              {["No obligation", "Real people review every request", `24/7 line: ${site.phone}`].map((t) => (
                <li key={t} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-gold text-ink"><IconCheck className="h-3 w-3" /></span>{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        {image && (
          <Reveal className="relative mt-10 hidden h-44 overflow-hidden rounded-3xl lg:block">
            <Image src={image} alt={imageAlt} fill sizes="80rem" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
            <p className="absolute left-10 top-1/2 max-w-md -translate-y-1/2 font-display text-2xl font-extrabold text-white">
              Dependable transportation. <span className="text-gold-grad">Direct communication.</span>
            </p>
          </Reveal>
        )}
        <Reveal delay={0.05} className="mt-10"><QuoteForm /></Reveal>
      </div>
    </section>
  );
}
