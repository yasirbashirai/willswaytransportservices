import type { Metadata } from "next";
import Hero from "@/components/concepts/command/Hero";
import OpsStrip from "@/components/concepts/command/OpsStrip";
import Bento from "@/components/concepts/command/Bento";
import Configurator from "@/components/concepts/command/Configurator";
import Coverage from "@/components/concepts/command/Coverage";
import Legacy from "@/components/concepts/command/Legacy";
import QuoteSection from "@/components/QuoteSection";

// Homepage CONCEPT B: "Command Center" (logistics infrastructure platform aesthetic).
// Review-only route; not indexed.
export const metadata: Metadata = {
  title: "Concept B: Command Center",
  robots: { index: false },
};

export default function CommandConcept() {
  return (
    <>
      <Hero />
      <OpsStrip />
      <Bento />
      <Configurator />
      <Coverage />
      <Legacy />
      <QuoteSection
        title="Send the unit. We'll map the move."
        intro="Unit, route and timing in about 60 seconds. You'll see route and permit notes instantly, and a real person replies with next steps."
      />
    </>
  );
}
