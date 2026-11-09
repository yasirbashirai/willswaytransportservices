# Wills Way Transport Services LLC: Website

Lead-generation website for **Wills Way Transport Services LLC**, a family-owned carrier in the San Fernando Valley, CA, that moves mobile offices, modular buildings and related equipment across Southern California.

Tagline: *A Legacy That Keeps Moving*

## What it does

- **Brings in qualified commercial leads** from modular rental companies, manufacturers and contractors.
- **Instant Move Check quote form** on every major page. It takes 3 steps (the move, route and timing, contact details) and gives live guidance as people fill it in: whether the area is a primary market or quoted case by case, likely oversize permits, short notice and multi-unit moves. Each lead gets a reference number (for example `WW-KRWV4`).
- **Local SEO**: keyword-targeted pages, LocalBusiness/MovingCompany, Service, FAQPage, BlogPosting and Breadcrumb schema, a sitemap, robots.txt and an Open Graph share image.

## Pages

| Route | Purpose |
|---|---|
| `/` | Funnel homepage: hero with 2 CTAs and a quick move check, interactive service tabs, audiences and metrics, process timeline, interactive SoCal coverage map, legacy story, quote form, FAQ and guides |
| `/about` | Story, timeline, carrier-vs-broker comparison, credentials |
| `/services` | All 8 services (anchor links `#slug`), what shapes the price, service area |
| `/reviews` | Real reviews only (empty until approved) plus a review submission form |
| `/blog` + `/blog/[slug]` | 3 SEO articles |
| `/faq` | Grouped FAQ with FAQ schema |
| `/contact` | Contact cards, full quote form, message form, map |

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS v4 and Motion for animations, with Nodemailer for form email.
Fonts: Montserrat (headlines), Oswald (labels), Inter (body).

## Editing content

- **Business details, services, markets**: `src/lib/site.ts`
- **Blog articles**: `src/lib/posts.ts`
- **FAQ**: `src/lib/faqs.ts`
- **Reviews**: add approved reviews to the `REVIEWS` array in `src/app/reviews/page.tsx`
- **Brand colors**: `@theme` in `src/app/globals.css`
- **Logos**: `public/images/brand/` (transparent SVG and PNG, extracted from the client's .ai file)
- **Photos**: `public/images/fleet/`. Each photo is used once across the site.

## Form email (required before launch)

All forms post to `/api/lead`. Set these environment variables (in Vercel, or in `.env.local`):

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=info@willswaytransportation.com
SMTP_PASS=********
LEADS_TO=info@willswaytransportation.com
```

If SMTP is not set, leads are only written to the server log. They are not lost while you develop, but nobody is emailed.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (stop the dev server first)
```

## Before launch

- [ ] Register the domain `willswaytransportation.com` (it is already used as `site.url`)
- [ ] SMTP environment variables (see above)
- [ ] Confirm the primary vs extended markets split in `src/lib/site.ts`
- [ ] Real photos of the Wills Way trucks and mobile office moves, to replace the stock images
- [ ] Google Business Profile + Search Console
