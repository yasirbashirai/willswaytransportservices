import { markets, services, site } from "./site";

// Structured data shared by every page (local business + services for Google)
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MovingCompany"],
  "@id": `${site.url}/#business`,
  name: site.name,
  alternateName: site.shortName,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: "+1-213-222-5870",
  logo: `${site.url}/images/brand/logo-light.png`,
  image: `${site.url}/images/fleet/golden-hour-fleet-yard.jpg`,
  foundingDate: site.founded,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.zip,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: 34.2364, longitude: -118.4772 },
  areaServed: markets.filter((m) => !m.name.startsWith("Other")).map((m) => ({ "@type": "AdministrativeArea", name: `${m.name}, CA` })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  identifier: site.credentials.map((c) => ({ "@type": "PropertyValue", name: c.label, value: c.value })),
  sameAs: Object.values(site.social).filter(Boolean),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mobile office and modular transportation services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.short, url: `${site.url}/services#${s.slug}` },
    })),
  },
};

export const faqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
});
