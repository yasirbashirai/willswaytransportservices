// Single source of truth for business details, services and markets.
// Edit here and every page, form, footer and schema block updates together.

export const site = {
  name: "Wills Way Transport Services LLC",
  shortName: "Wills Way",
  tagline: "A Legacy That Keeps Moving",
  // Planned domain (matches the company email). Change once the domain is registered.
  url: "https://willswaytransportation.com",
  phone: "(213) 222-5870",
  phoneHref: "tel:+12132225870",
  email: "info@willswaytransportation.com",
  contact: { name: "Caprice Anderson", email: "Caprice.anderson@willswaytransportation.com" },
  hours: "24 Hours / 7 Days",
  // Display address (public) + mailing address (used for schema / verification)
  displayAddress: "San Fernando Valley, CA",
  address: { city: "North Hills", region: "CA", zip: "91343", country: "US" },
  founded: "2026",
  legacyYears: 30,
  credentials: [
    { label: "USDOT", value: "4578902" },
    { label: "CA #", value: "673856" },
    { label: "CA MCP", value: "0673856" },
    { label: "CA LLC #", value: "B20260199550" },
  ],
  social: {
    linkedin: "https://www.linkedin.com/company/wills-way-transport-services-llc/",
  },
  description:
    "Wills Way Transport Services LLC is a family-owned transportation company specializing in the movement of mobile offices, modular structures and related equipment throughout Southern California.",
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  use: string;
  body: string;
  points: string[];
  keyword: string;
  art: "office" | "modular" | "relocate" | "factory" | "overflow" | "return" | "yard" | "clock";
};

// The 8 services supplied by the client, with their "typical use" line
export const services: Service[] = [
  {
    slug: "mobile-office-transportation",
    title: "Mobile Office Transportation",
    short: "Delivery and placement support for rental and customer mobile offices.",
    use: "Rental / customer delivery and placement support",
    body: "We move mobile office trailers from your yard to the customer's site and help position the unit where the site plan calls for it, so your setup crew can get to work.",
    points: ["Construction and site office trailers", "Delivery to active jobsites", "Placement support on arrival", "Direct driver-to-site communication"],
    keyword: "Mobile office transportation Los Angeles",
    art: "office",
  },
  {
    slug: "modular-building-transportation",
    title: "Modular Building Transportation",
    short: "Modular sections moved between factory, yard, staging and project site.",
    use: "Factory, yard or staging locations and project site",
    body: "Modular sections are moved on a schedule that lines up with your set crew. We plan the route, confirm permit needs and keep you updated from pickup to arrival.",
    points: ["Modular building sections", "Factory, yard and staging pickups", "Route and permit review", "Coordinated arrival windows"],
    keyword: "Modular building transportation Southern California",
    art: "modular",
  },
  {
    slug: "jobsite-to-jobsite-relocation",
    title: "Jobsite-to-Jobsite Relocation",
    short: "Move units directly from one project to the next.",
    use: "Move units from one project to another",
    body: "When a phase wraps up, we move the office or unit straight to the next project. No extra trip back to the yard, less downtime for your team.",
    points: ["Direct site-to-site moves", "Fewer yard round trips", "Site access checked in advance", "Pickup and drop scheduled together"],
    keyword: "Jobsite office relocation services",
    art: "relocate",
  },
  {
    slug: "factory-to-jobsite-delivery",
    title: "Factory-to-Jobsite Delivery",
    short: "Equipment and units delivered from the factory to where they are needed.",
    use: "Delivering necessary equipment from one location to another",
    body: "We pick up from the manufacturer and deliver to the project, timed to your installation schedule so units do not sit waiting or arrive late.",
    points: ["Manufacturer pickups", "Delivery to project sites", "Timed to installation", "Paperwork handled at handoff"],
    keyword: "Construction trailer transport Southern California",
    art: "factory",
  },
  {
    slug: "overflow-transportation",
    title: "Overflow Transportation",
    short: "Extra carrier capacity for rental fleets during peak periods.",
    use: "Additional carrier capacity during peak periods",
    body: "When your own drivers are booked, we step in as added capacity. A dependable overflow carrier keeps your delivery promises intact during busy seasons.",
    points: ["Peak-season capacity", "Works alongside your drivers", "Repeat lanes welcome", "Single point of contact"],
    keyword: "Commercial trailer transportation Southern California",
    art: "overflow",
  },
  {
    slug: "rental-unit-returns",
    title: "Rental Unit Returns",
    short: "Units brought back from customer or jobsite to your yard.",
    use: "Customer / jobsite back to yard or service location",
    body: "End-of-rental pickups handled on time, so returned units get back to your yard or service center and into the next rental faster.",
    points: ["Off-rent pickups", "Back to yard or service center", "Pickup windows that fit the site", "Condition notes at pickup"],
    keyword: "Mobile office trailer movers Southern California",
    art: "return",
  },
  {
    slug: "yard-repositioning",
    title: "Yard Repositioning",
    short: "Inventory moved between yards and service areas.",
    use: "Move inventory between yards or service areas",
    body: "Balance inventory where demand is. We reposition units between your yards and service areas so the right unit is in the right place.",
    points: ["Yard-to-yard transfers", "Inventory balancing", "Batch moves scheduled together", "Commercial trailer transport"],
    keyword: "Commercial trailer transportation Los Angeles",
    art: "yard",
  },
  {
    slug: "time-sensitive-moves",
    title: "Time-Sensitive Moves",
    short: "Priority moves when the schedule is tight.",
    use: "Subject to equipment, permitting and availability",
    body: "When a date cannot slip, call us. We will tell you honestly what is possible based on equipment, permits and availability, then commit to it.",
    points: ["Priority scheduling", "24/7 phone line", "Clear go / no-go answers", "Subject to equipment, permitting and availability"],
    keyword: "Oversized load transportation California",
    art: "clock",
  },
];

// Markets supplied by the client. "primary" = core service area, "extended" = by quote.
export type Market = { name: string; tier: "primary" | "extended"; note: string };
export const markets: Market[] = [
  { name: "San Fernando Valley", tier: "primary", note: "Home base. Fastest scheduling." },
  { name: "Los Angeles County", tier: "primary", note: "Daily coverage across the county." },
  { name: "Santa Clarita / Antelope Valley", tier: "primary", note: "Regular runs north of the Valley." },
  { name: "Ventura County", tier: "primary", note: "Regular coverage west of the Valley." },
  { name: "Orange County", tier: "primary", note: "Regular coverage south of LA." },
  { name: "San Diego County", tier: "extended", note: "Available by quote." },
  { name: "Riverside County", tier: "extended", note: "Available by quote." },
  { name: "San Bernardino County", tier: "extended", note: "Available by quote." },
  { name: "Kern County", tier: "extended", note: "Available by quote." },
  { name: "Fresno County", tier: "extended", note: "Available by quote." },
  { name: "Other California destinations", tier: "extended", note: "Ask us about your route." },
];

// Who the site is built to convert (client-supplied ideal customers)
export const audiences = [
  {
    title: "Modular Rental Companies",
    text: "Deliveries, returns, yard transfers and overflow capacity when your own drivers are booked.",
    tags: ["Deliveries", "Returns", "Overflow"],
  },
  {
    title: "Manufacturers",
    text: "Factory-to-yard and factory-to-site moves timed to your production and set schedules.",
    tags: ["Factory pickups", "Staging", "Site delivery"],
  },
  {
    title: "Contractors",
    text: "Jobsite offices delivered, relocated between projects and picked up when the job is done.",
    tags: ["Site offices", "Relocation", "Pickups"],
  },
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

// Client-supplied search terms (used in metadata + copy)
export const keywords = [
  "Mobile office transportation Los Angeles",
  "Mobile office transportation San Fernando Valley",
  "Mobile office transportation Southern California",
  "Construction trailer transport Southern California",
  "Jobsite office relocation services",
  "Mobile office trailer movers Southern California",
  "Modular building transportation Southern California",
  "Commercial trailer transportation Los Angeles",
  "Commercial trailer transportation Southern California",
  "Mobile office delivery and placement",
  "Oversized load transportation California",
  "Construction trailer movers",
  "Commercial trailer transport",
];
