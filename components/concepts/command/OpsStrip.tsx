import CountUp from "@/components/CountUp";
import { markets, services, site } from "@/lib/site";

// Infrastructure metrics styled as an ops console. Only verifiable numbers.
export default function OpsStrip() {
  const counties = markets.filter((m) => m.name.endsWith("County")).length;
  const cells = [
    { k: "Family legacy", v: <CountUp to={site.legacyYears} />, u: "yrs", note: "Carried forward in 2026" },
    { k: "Dispatch line", v: <><CountUp to={24} />/7</>, u: "", note: site.phone },
    { k: "Counties covered", v: <CountUp to={counties} />, u: "", note: "5 primary markets" },
    { k: "Move types", v: <CountUp to={services.length} />, u: "", note: "Mobile office → modular" },
    { k: "USDOT", v: site.credentials[0].value, u: "", note: `CA MCP ${site.credentials[2].value}` },
  ];
  const ticker = [
    "DISPATCH LINE ● OPEN 24/7",
    `HOME BASE ● SAN FERNANDO VALLEY, CA`,
    ...markets.filter((m) => m.tier === "primary").map((m) => `PRIMARY MARKET ● ${m.name.toUpperCase()}`),
    "EXTENDED COVERAGE ● BY QUOTE",
    `USDOT ● ${site.credentials[0].value}`,
    "MODEL ● ASSET-BASED CARRIER",
  ];

  return (
    <section aria-label="Operations at a glance" className="relative bg-ink text-white">
      <div className="container-x relative -mt-px">
        <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-gradient-to-b from-[#16171a] to-[#0a0a0b] shadow-[0_30px_80px_-40px_rgba(212,171,32,.35)]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[.18em] text-white/40">
            <span>ops.console / wills-way</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#19936c]" /> status: open</span>
          </div>
          <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {cells.map((c, i) => (
              <div key={c.k} className={`relative px-6 py-7 ${i ? "border-white/10 lg:border-l" : ""} ${i % 2 ? "border-l border-white/10 sm:border-l-0" : ""} ${i > 1 ? "border-t border-white/10 sm:border-t-0" : ""} ${i > 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}>
                <dt className="font-condensed text-[11.5px] uppercase tracking-[.22em] text-white/45">{c.k}</dt>
                <dd className={`mt-2 font-display font-black tabular-nums text-gold-grad ${c.k === "USDOT" ? "text-[30px] lg:text-[32px] lg:leading-[3.3rem]" : "text-4xl lg:text-[44px]"}`}>
                  {c.v}{c.u && <span className="ml-1 text-lg text-white/40">{c.u}</span>}
                </dd>
                <p className="mt-1 text-[12.5px] text-white/45">{c.note}</p>
              </div>
            ))}
          </dl>
          <div className="relative overflow-hidden border-t border-white/10 bg-[#d4ab20] py-2.5">
            <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-mono text-[12px] font-bold tracking-[.14em] text-ink">
              {[0, 1].map((k) => (
                <div key={k} className="flex gap-12" aria-hidden={k === 1}>
                  {ticker.map((t) => <span key={t}>{t}</span>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-20 bg-gradient-to-b from-ink to-white lg:h-28" />
    </section>
  );
}
