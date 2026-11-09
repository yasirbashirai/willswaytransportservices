"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { markets, services, site } from "@/lib/site";
import { IconArrow, IconCheck, IconPhone } from "./icons";

// 3-step "Instant Move Check" quote form.
// Qualifies the request (unit, route, timing, site) and shows live guidance
// (market tier, permit flags, short-notice) before a human ever picks up the phone.

const UNIT_TYPES = ["Mobile office / construction trailer", "Modular building section", "Ground-level office or storage unit", "Other equipment"];
const UNIT_SIZES = ["8x20 or smaller", "8x24 to 8x32", "10x32 to 10x50", "12x40 to 12x60", "14 ft wide or larger", "Not sure"];
const CUSTOMER_TYPES = ["Modular rental company", "Manufacturer", "Contractor", "Other"];
const ACCESS = ["Paved, easy access", "Dirt / gravel, firm", "Tight or limited access", "Not sure yet"];

type Data = Record<string, string>;
const EMPTY: Data = {
  service: "", unitType: "", unitSize: "", quantity: "1",
  from: "", to: "", area: "", date: "", flexible: "Flexible by a few days", access: "",
  name: "", company: "", customerType: "", email: "", phone: "", notes: "", website: "",
};

const STEPS = ["The move", "Route & timing", "Your details"];

export default function QuoteForm({ showSummary = true, dark = false }: { showSummary?: boolean; dark?: boolean }) {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [ref, setRef] = useState("");

  // Pre-fill from links like /contact?service=...&area=...#quote
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const svc = services.find((s) => s.slug === q.get("service"));
    const area = q.get("area");
    if (svc || area) setD((p) => ({ ...p, service: svc?.title ?? p.service, area: area && markets.some((m) => m.name === area) ? area : p.area }));
  }, []);

  const set = (k: string, v: string) => setD((p) => ({ ...p, [k]: v }));

  // Live guidance shown in the summary panel
  const checks = useMemo(() => {
    const out: { tone: "ok" | "warn" | "info"; text: string }[] = [];
    const m = markets.find((x) => x.name === d.area);
    if (m) out.push(m.tier === "primary" ? { tone: "ok", text: `${m.name} is a primary market: standard scheduling.` } : { tone: "info", text: `${m.name} is an extended area: quoted case by case.` });
    if (d.unitSize === "12x40 to 12x60" || d.unitSize === "14 ft wide or larger" || d.unitType === "Modular building section")
      out.push({ tone: "warn", text: "Likely oversize: we review permits and route. Allow extra lead time." });
    if (d.date) {
      const days = (new Date(d.date + "T12:00:00").getTime() - Date.now()) / 864e5;
      if (days < 3) out.push({ tone: "warn", text: `Short notice: call ${site.phone} for the fastest answer.` });
    }
    if (d.service === "Time-Sensitive Moves") out.push({ tone: "info", text: "Time-sensitive moves are subject to equipment, permitting and availability." });
    if (Number(d.quantity) > 1) out.push({ tone: "ok", text: `${d.quantity} units: we can schedule these moves together.` });
    if (d.access === "Tight or limited access") out.push({ tone: "info", text: "Tight access noted: we may ask for photos of the site." });
    return out;
  }, [d]);

  const stepValid = [
    !!(d.service && d.unitType && d.unitSize),
    !!(d.from && d.to && d.area),
    !!(d.name && /^\S+@\S+\.\S+$/.test(d.email) && d.phone.replace(/\D/g, "").length >= 10),
  ];

  async function submit() {
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "quote", ...d, checks: checks.map((c) => c.text).join(" | ") }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setRef(json.ref || "");
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  const chip = (active: boolean) =>
    `rounded-xl border px-3.5 py-2.5 text-left text-[13.5px] font-semibold transition ${
      active ? "border-gold bg-gold/12 text-ink shadow-[0_0_0_3px_rgb(212_171_32/.18)]" : "border-line bg-white text-graphite hover:border-gold/60"
    }`;

  if (status === "done") {
    return (
      <div className={`card p-8 text-center sm:p-12 ${dark ? "" : ""}`}>
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-ink">
          <IconCheck className="h-8 w-8" />
        </motion.div>
        <h3 className="mt-6 text-2xl font-extrabold">Request received{d.name ? `, ${d.name.split(" ")[0]}` : ""}.</h3>
        <p className="mx-auto mt-3 max-w-md text-steel">
          We review every request personally and will reply with next steps. {ref && <>Your reference is <strong className="text-ink">{ref}</strong>.</>}
        </p>
        <p className="mt-6 text-sm text-steel">Need an answer faster?</p>
        <a href={site.phoneHref} className="btn-dark mt-3"><IconPhone className="text-gold" /> Call {site.phone}</a>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${showSummary ? "lg:grid-cols-[1fr_320px]" : ""}`}>
      <div className="card overflow-hidden">
        {/* Progress */}
        <div className="border-b border-line bg-fog/70 px-6 pt-5 sm:px-8">
          <div className="flex items-center justify-between">
            <p className="font-condensed text-[13px] uppercase tracking-[.2em] text-gold-deep">Instant Move Check</p>
            <p className="text-[13px] font-semibold text-steel">Step {step + 1} of 3</p>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 pb-5">
            {STEPS.map((s, i) => (
              <button key={s} type="button" onClick={() => i < step && setStep(i)} className="text-left" disabled={i > step}>
                <span className="block h-1.5 overflow-hidden rounded-full bg-line">
                  <motion.span className="block h-full rounded-full bg-gradient-to-r from-gold-light to-gold" initial={false} animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }} />
                </span>
                <span className={`mt-2 block text-[12.5px] font-semibold ${i === step ? "text-ink" : "text-mist"}`}>{s}</span>
              </button>
            ))}
          </div>
        </div>

        <form
          className="p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (!stepValid[step]) return;
            if (step < 2) setStep(step + 1);
            else submit();
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              {step === 0 && (
                <div className="space-y-6">
                  <fieldset>
                    <legend className="label">What do you need moved? *</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {services.map((s) => (
                        <button type="button" key={s.slug} className={chip(d.service === s.title)} onClick={() => set("service", s.title)}>{s.title}</button>
                      ))}
                    </div>
                  </fieldset>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label>
                      <span className="label">Unit type *</span>
                      <select className="field" value={d.unitType} onChange={(e) => set("unitType", e.target.value)} required>
                        <option value="">Select unit type</option>
                        {UNIT_TYPES.map((u) => <option key={u}>{u}</option>)}
                      </select>
                    </label>
                    <label>
                      <span className="label">Approximate size *</span>
                      <select className="field" value={d.unitSize} onChange={(e) => set("unitSize", e.target.value)} required>
                        <option value="">Select size</option>
                        {UNIT_SIZES.map((u) => <option key={u}>{u}</option>)}
                      </select>
                    </label>
                  </div>
                  <label className="block max-w-[200px]">
                    <span className="label">Number of units</span>
                    <input className="field" type="number" min={1} max={50} value={d.quantity} onChange={(e) => set("quantity", e.target.value)} />
                  </label>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label><span className="label">Pickup city or ZIP *</span><input className="field" value={d.from} onChange={(e) => set("from", e.target.value)} placeholder="e.g. Sun Valley, 91352" required /></label>
                    <label><span className="label">Delivery city or ZIP *</span><input className="field" value={d.to} onChange={(e) => set("to", e.target.value)} placeholder="e.g. Santa Clarita, 91355" required /></label>
                  </div>
                  <label className="block">
                    <span className="label">Delivery area *</span>
                    <select className="field" value={d.area} onChange={(e) => set("area", e.target.value)} required>
                      <option value="">Select county / area</option>
                      <optgroup label="Primary markets">{markets.filter((m) => m.tier === "primary").map((m) => <option key={m.name}>{m.name}</option>)}</optgroup>
                      <optgroup label="Extended / by quote">{markets.filter((m) => m.tier === "extended").map((m) => <option key={m.name}>{m.name}</option>)}</optgroup>
                    </select>
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label><span className="label">Target move date</span><input className="field" type="date" value={d.date} onChange={(e) => set("date", e.target.value)} /></label>
                    <label>
                      <span className="label">Date flexibility</span>
                      <select className="field" value={d.flexible} onChange={(e) => set("flexible", e.target.value)}>
                        <option>Flexible by a few days</option><option>Fixed date</option><option>As soon as possible</option>
                      </select>
                    </label>
                  </div>
                  <fieldset>
                    <legend className="label">Site access at delivery</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {ACCESS.map((a) => <button type="button" key={a} className={chip(d.access === a)} onClick={() => set("access", a)}>{a}</button>)}
                    </div>
                  </fieldset>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label><span className="label">Full name *</span><input className="field" value={d.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" required /></label>
                    <label><span className="label">Company</span><input className="field" value={d.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" /></label>
                    <label><span className="label">Email *</span><input className="field" type="email" value={d.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" required /></label>
                    <label><span className="label">Phone *</span><input className="field" type="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" required /></label>
                  </div>
                  <fieldset>
                    <legend className="label">I am a</legend>
                    <div className="flex flex-wrap gap-2">
                      {CUSTOMER_TYPES.map((c) => <button type="button" key={c} className={chip(d.customerType === c)} onClick={() => set("customerType", c)}>{c}</button>)}
                    </div>
                  </fieldset>
                  <label className="block"><span className="label">Anything else we should know?</span><textarea className="field min-h-24" value={d.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Unit numbers, site contact, gate codes, attached steps or ramps..." /></label>
                  {/* Honeypot: hidden from people, bots fill it in */}
                  <input type="text" name="website" value={d.website} onChange={(e) => set("website", e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {status === "error" && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}. Please call {site.phone}.</p>}

          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="text-sm font-bold text-steel hover:text-ink">← Back</button>
            ) : (
              <span className="text-[12.5px] text-mist">Takes about 60 seconds</span>
            )}
            <button type="submit" disabled={!stepValid[step] || status === "sending"} className="btn-gold disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0">
              {step < 2 ? "Continue" : status === "sending" ? "Sending..." : "Request My Quote"} <IconArrow />
            </button>
          </div>
        </form>
      </div>

      {showSummary && (
        <aside className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white">
          <div className="grid-lines absolute inset-0 opacity-70" />
          <div className="relative">
            <p className="font-condensed text-[13px] uppercase tracking-[.2em] text-gold">Your move</p>
            <dl className="mt-4 space-y-3 text-[14px]">
              {[
                ["Service", d.service], ["Unit", [d.unitType, d.unitSize].filter(Boolean).join(", ")], ["Units", d.quantity],
                ["Route", d.from && d.to ? `${d.from} → ${d.to}` : ""], ["Area", d.area], ["Date", d.date ? `${d.date} (${d.flexible.toLowerCase()})` : ""],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-white/10 pb-2.5">
                  <dt className="text-white/50">{k}</dt>
                  <dd className="text-right font-semibold">{v || <span className="text-white/25">—</span>}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-condensed text-[13px] uppercase tracking-[.2em] text-gold">Move check</p>
            <ul className="mt-3 space-y-2.5">
              {checks.length === 0 && <li className="text-[13.5px] text-white/45">Fill in the form to see route, permit and scheduling notes.</li>}
              <AnimatePresence>
                {checks.map((c) => (
                  <motion.li key={c.text} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-2.5 text-[13.5px] leading-snug">
                    <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${c.tone === "ok" ? "bg-emerald-light" : c.tone === "warn" ? "bg-gold" : "bg-white/50"}`} />
                    <span className="text-white/85">{c.text}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-[13px] text-white/70">
              Prefer to talk? Dispatch answers 24/7.
              <a href={site.phoneHref} className="mt-1 flex items-center gap-2 font-display text-lg font-bold text-white hover:text-gold"><IconPhone className="h-4 w-4 text-gold" /> {site.phone}</a>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
