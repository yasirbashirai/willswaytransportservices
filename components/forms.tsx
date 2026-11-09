"use client";
import { useState } from "react";
import { site } from "@/lib/site";
import { IconArrow, IconCheck, IconStar } from "./icons";

// Shared submit helper: posts any form to /api/lead
function useLead(type: "contact" | "review") {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  async function send(form: HTMLFormElement, extra: Record<string, string> = {}) {
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, ...data, ...extra }) }).catch(() => null);
    setStatus(res?.ok ? "done" : "error");
  }
  return { status, send };
}

const Done = ({ title, text }: { title: string; text: string }) => (
  <div className="card p-10 text-center">
    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold text-ink"><IconCheck className="h-7 w-7" /></div>
    <h3 className="mt-5 text-2xl font-extrabold">{title}</h3>
    <p className="mt-2 text-steel">{text}</p>
  </div>
);

// General message form (contact page)
export function ContactForm() {
  const { status, send } = useLead("contact");
  if (status === "done") return <Done title="Message sent." text="Thank you. We will get back to you shortly." />;
  return (
    <form className="card grid gap-4 p-6 sm:grid-cols-2 sm:p-8" onSubmit={(e) => { e.preventDefault(); send(e.currentTarget); }}>
      <label><span className="label">Full name *</span><input name="name" className="field" required autoComplete="name" /></label>
      <label><span className="label">Company</span><input name="company" className="field" autoComplete="organization" /></label>
      <label><span className="label">Email *</span><input name="email" type="email" className="field" required autoComplete="email" /></label>
      <label><span className="label">Phone</span><input name="phone" type="tel" className="field" autoComplete="tel" /></label>
      <label className="sm:col-span-2"><span className="label">How can we help? *</span><textarea name="notes" className="field min-h-32" required /></label>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {status === "error" && <p className="text-sm text-red-700 sm:col-span-2">Could not send. Please call {site.phone} or email {site.email}.</p>}
      <div className="sm:col-span-2"><button className="btn-dark" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send Message"} <IconArrow /></button></div>
    </form>
  );
}

// Customer review form (reviews page). Reviews are emailed for approval, never auto-published.
export function ReviewForm() {
  const { status, send } = useLead("review");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  if (status === "done") return <Done title="Thank you for the review." text="We read every review personally. Approved reviews are added to this page." />;
  return (
    <form className="card grid gap-4 p-6 sm:grid-cols-2 sm:p-8" onSubmit={(e) => { e.preventDefault(); send(e.currentTarget, { rating: String(rating) }); }}>
      <div className="sm:col-span-2">
        <span className="label">Your rating</span>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} onClick={() => setRating(n)} onMouseEnter={() => setHover(n)} aria-label={`${n} star${n > 1 ? "s" : ""}`} className="text-gold transition hover:scale-110">
              <IconStar className="h-8 w-8" filled={n <= (hover || rating)} />
            </button>
          ))}
        </div>
      </div>
      <label><span className="label">Full name *</span><input name="name" className="field" required /></label>
      <label><span className="label">Company</span><input name="company" className="field" /></label>
      <label className="sm:col-span-2"><span className="label">Email * (not published)</span><input name="email" type="email" className="field" required /></label>
      <label className="sm:col-span-2"><span className="label">Your review *</span><textarea name="notes" className="field min-h-32" required placeholder="What did we move, and how did it go?" /></label>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {status === "error" && <p className="text-sm text-red-700 sm:col-span-2">Could not send. Please email {site.email}.</p>}
      <div className="sm:col-span-2"><button className="btn-gold" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Submit Review"} <IconArrow /></button></div>
    </form>
  );
}
