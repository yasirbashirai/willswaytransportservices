import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Every field any site form can send, with the label used in the lead email
const FIELDS: Record<string, string> = {
  service: "Service", unitType: "Unit type", unitSize: "Unit size", quantity: "Units",
  from: "Pickup", to: "Delivery", area: "Delivery area", date: "Target date", flexible: "Date flexibility",
  access: "Site access", checks: "Move check notes", rating: "Rating",
  name: "Name", company: "Company", customerType: "Customer type", email: "Email", phone: "Phone", notes: "Notes / message",
};

const SUBJECTS: Record<string, string> = {
  quote: "New quote request",
  review: "New customer review (for approval)",
  contact: "New website message",
};

const clean = (v: unknown) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, 2000);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots move on
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const type = SUBJECTS[clean(body.type)] ? clean(body.type) : "contact";
  const lead = Object.fromEntries(Object.keys(FIELDS).map((k) => [k, clean(body[k])]));
  if (!lead.name || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 422 });
  }

  // Short reference the customer can quote on the phone
  const ref = `WW-${Date.now().toString(36).slice(-5).toUpperCase()}`;
  const lines = [`Reference: ${ref}`, ...Object.entries(FIELDS).filter(([k]) => lead[k]).map(([k, label]) => `${label}: ${lead[k]}`)];
  const route = lead.from && lead.to ? `: ${lead.from} to ${lead.to}` : lead.company ? `: ${lead.company}` : `: ${lead.name}`;
  const subject = `${SUBJECTS[type]}${route} [${ref}]`;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEADS_TO } = process.env;

  // Without SMTP settings, log the lead so nothing is lost during development
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log(`[lead:${type}] ${subject}\n${lines.join("\n")}`);
    return NextResponse.json({ ok: true, ref });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Wills Way Website" <${SMTP_USER}>`,
      to: LEADS_TO || "info@willswaytransportation.com",
      replyTo: lead.email,
      subject,
      text: lines.join("\n"),
    });
    return NextResponse.json({ ok: true, ref });
  } catch (err) {
    console.error("[lead] email failed", err);
    return NextResponse.json({ error: "Could not send" }, { status: 500 });
  }
}
