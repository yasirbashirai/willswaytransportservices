import CineHero from "@/components/concepts/cinematic/CineHero";
import ServiceTrack from "@/components/concepts/cinematic/ServiceTrack";
import RouteDrive from "@/components/concepts/cinematic/RouteDrive";
import MegaMarquee from "@/components/concepts/cinematic/MegaMarquee";
import Legacy from "@/components/concepts/cinematic/Legacy";
import ServiceMap from "@/components/home/ServiceMap";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";

// Homepage: "Cinematic Industrial" direction (approved concept A, 2026-11-10).
// Metadata + canonical come from the root layout.
export default function Home() {
  return (
    <>
      {/* 1. Hero: mega-type + film-frame reveal + docked quick quote */}
      <CineHero />

      {/* 2. Services: pinned horizontal drive-through */}
      <ServiceTrack />

      {/* 3. Process: scroll-driven route */}
      <RouteDrive />

      {/* 4. Brand statement */}
      <MegaMarquee />

      {/* 5. Legacy + metrics */}
      <Legacy />

      {/* 6. Coverage */}
      <section className="relative overflow-hidden bg-fog py-24 lg:py-32">
        <div className="grid-lines-dark absolute inset-0" />
        <div className="container-x relative">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <p className="eyebrow">Coverage</p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[.95] sm:text-5xl lg:text-6xl">
                Rooted in the Valley.<br /><span className="text-gold-deep">Rolling statewide.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-8 text-steel">Five primary markets across Los Angeles and Southern California, with extended California coverage by quote. Tap any area to start a quote for it.</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-14"><ServiceMap /></Reveal>
        </div>
      </section>

      {/* 7. Conversion */}
      <QuoteSection
        title="Your unit. Our road. Let's schedule it."
        image="/images/fleet/white-semi-on-road.jpg"
        imageAlt="White semi truck on a highway"
      />
    </>
  );
}
