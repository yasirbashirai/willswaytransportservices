import Reveal from "@/components/Reveal";
import ServiceMap from "@/components/home/ServiceMap";
import { markets } from "@/lib/site";

// Coverage map inside a console-style window frame
export default function Coverage() {
  const primary = markets.filter((m) => m.tier === "primary").length;
  const extended = markets.filter((m) => m.tier === "extended").length;
  return (
    <section className="relative overflow-hidden bg-fog py-24 lg:py-32">
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(0,0,0,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.045)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="container-x relative">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">Coverage network</p>
            <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-.02em] sm:text-[54px]">Rooted in the Valley.<br />Routed across California.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-8 text-steel">Mobile office transportation in Los Angeles, the San Fernando Valley and Southern California, with extended coverage by quote. Select an area to start a quote for it.</p>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-12">
          <div className="overflow-hidden rounded-[1.8rem] border border-black/10 bg-white shadow-[0_50px_100px_-60px_rgba(0,0,0,.55)]">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-ink px-5 py-3 text-white">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-white/20" /><i className="h-2.5 w-2.5 rounded-full bg-white/20" /><i className="h-2.5 w-2.5 rounded-full bg-[#d4ab20]" /></span>
                <span className="font-mono text-[11.5px] uppercase tracking-[.18em] text-white/60">coverage.map / southern-california</span>
              </div>
              <div className="flex gap-2 font-mono text-[11px] uppercase tracking-wider">
                <span className="rounded-md bg-[#d4ab20] px-2 py-1 font-bold text-ink">{primary} primary</span>
                <span className="rounded-md border border-white/20 px-2 py-1 text-white/70">{extended} by quote</span>
                <span className="hidden rounded-md border border-white/20 px-2 py-1 text-white/70 sm:inline">hub: SFV</span>
              </div>
            </div>
            <div className="p-4 sm:p-8">
              <ServiceMap />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
