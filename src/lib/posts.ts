// Blog articles. Each targets one cluster of the client's search terms.
// Content blocks: { h2 } heading, { p } paragraph, { ul } bullet list, { h3 } sub-heading.

export type Block = { h2: string } | { h3: string } | { p: string } | { ul: string[] };

export type Post = {
  slug: string;
  title: string;
  short: string; // short label for footer / cards
  description: string;
  date: string;
  readMins: number;
  category: string;
  cover: string;
  coverAlt: string;
  keywords: string[];
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "mobile-office-transportation-southern-california-guide",
    title: "Mobile Office Transportation in Southern California: How a Move Actually Works",
    short: "How a mobile office move works",
    description:
      "A plain-English guide to mobile office and construction trailer transportation in Los Angeles and Southern California: what to prepare, what affects scheduling, and how to get an accurate quote.",
    date: "2026-11-02",
    readMins: 6,
    category: "Guides",
    cover: "/images/fleet/construction-site-hauling.jpg",
    coverAlt: "Heavy truck working on an active construction site",
    keywords: ["Mobile office transportation Los Angeles", "Mobile office transportation Southern California", "Construction trailer transport Southern California"],
    body: [
      { p: "A mobile office looks simple from the outside: a unit, a truck, a destination. In practice, a smooth move depends on a handful of details being right before the truck ever shows up. This guide walks through how mobile office transportation works in Southern California, from the first call to the unit sitting where your site plan says it should." },
      { h2: "1. Start with the unit details" },
      { p: "The single biggest factor in planning a move is the unit itself. Before you ask for a quote, gather the basics:" },
      { ul: ["Unit size (for example 8x20, 10x40 or 12x60) and approximate weight if known", "Whether the unit is on its own running gear (axles, tires, hitch) or needs to be loaded", "Any attached items such as steps, ramps, skirting or HVAC units that need to be removed first", "Unit or serial number, so the right unit is picked up from a busy yard"] },
      { p: "With these details, a carrier can tell you quickly which equipment is needed and whether the move is a standard load or an oversize load that requires permits." },
      { h2: "2. Confirm both sites are ready" },
      { p: "Most delays on mobile office deliveries happen at the site, not on the road. Before scheduling, confirm that the pickup and the delivery location are accessible for a truck and trailer combination." },
      { ul: ["A clear, firm path for the truck to enter, turn and exit", "Overhead clearance (wires, trees, gates, canopies)", "A level, prepared pad or blocking area where the unit will be placed", "A site contact who will be there on delivery day, with a phone number the driver can call"] },
      { p: "If the site is muddy, tight or still being graded, tell your carrier in advance. It is much easier to plan around a challenge than to discover it on arrival." },
      { h2: "3. Permits and route planning" },
      { p: "Wider and taller units can require transportation permits from Caltrans for state highways, and sometimes from cities or counties for local roads. Permits can affect the route, the allowed travel times and whether escort vehicles are needed. A good carrier reviews this early and tells you what it means for your schedule." },
      { h2: "4. Scheduling the move" },
      { p: "Once the unit and sites are confirmed, the move is scheduled around your project. For deliveries, that usually means aligning the arrival window with your setup crew. For returns, it means a pickup window that does not interfere with active work on site." },
      { h2: "5. Delivery and placement support" },
      { p: "On arrival, the driver works with your site contact to position the unit as close as practical to the planned location. Final setup tasks such as blocking, leveling, tie-downs and utility connections are typically handled by the rental company or installer, so make sure everyone knows who owns each step." },
      { h2: "How to get an accurate quote" },
      { p: "The fastest quotes come from complete requests. Share the unit size, pickup and delivery addresses (or at least the cities), your target date and any site access notes. At Wills Way Transport Services we review every request and respond with clear next steps, and our phone line is open 24/7 at (213) 222-5870." },
    ],
  },
  {
    slug: "oversized-load-transportation-california-modular-buildings",
    title: "Oversized Load Transportation in California: What Modular Building Moves Require",
    short: "Oversize permits for modular moves",
    description:
      "Moving a modular building section or wide mobile office in California? Learn when a load is considered oversize, how Caltrans and local permits work, and how they affect your timeline.",
    date: "2026-10-26",
    readMins: 5,
    category: "Permits & Compliance",
    cover: "/images/fleet/industrial-equipment-hauling.jpg",
    coverAlt: "Tractor hauling industrial equipment on a work yard",
    keywords: ["Oversized load transportation California", "Modular building transportation Southern California"],
    body: [
      { p: "Modular buildings and larger mobile offices are often wider or taller than a standard trailer. When that happens, the move becomes an oversize load, and planning changes. Here is what modular rental companies, manufacturers and contractors should know before scheduling an oversized move in California." },
      { h2: "When is a load considered oversize?" },
      { p: "In California, the standard legal width for most vehicles and loads is 8 feet 6 inches (102 inches), and the general legal height limit is 14 feet. Many modular sections and wide mobile offices exceed one or both of these, which means the move needs a transportation permit." },
      { h2: "Who issues the permits?" },
      { p: "Caltrans issues transportation permits for travel on state highways. When a route uses city or county roads, the local jurisdiction may require its own permit. A single move can involve more than one permit, depending on where the unit is coming from and going to." },
      { h2: "What permits can change about your move" },
      { ul: ["The route: permitted loads must follow approved routes, which are not always the shortest", "Travel times: some permits restrict movement to certain hours or days", "Escorts: wider loads may require pilot or escort vehicles", "Lead time: permits are not always instant, so build in time before your target date"] },
      { h2: "How to keep an oversize move on schedule" },
      { p: "The best way to protect your schedule is to share accurate dimensions early. Measure the unit at its widest and tallest points, including eaves, overhangs, and anything attached. Then share the pickup and delivery locations so the route can be reviewed for clearances and permit needs." },
      { h3: "Questions to ask your carrier" },
      { ul: ["Will this unit require a permit, and who will obtain it?", "Does the route require escorts or travel time restrictions?", "How much lead time do you need before the move date?", "What happens if the site is not ready on the scheduled day?"] },
      { h2: "Our approach" },
      { p: "We are upfront about what a move requires. Time-sensitive and oversize moves are always subject to equipment, permitting and availability, and we would rather give you a clear, honest answer than an optimistic promise. Request a quote with your unit dimensions and we will tell you what to expect." },
    ],
  },
  {
    slug: "overflow-capacity-yard-repositioning-modular-rental-companies",
    title: "Overflow Capacity and Yard Repositioning: Keeping a Modular Rental Fleet Moving",
    short: "Overflow capacity for rental fleets",
    description:
      "How modular and mobile office rental companies use an overflow carrier for peak periods, rental returns and yard-to-yard repositioning in Los Angeles and Southern California.",
    date: "2026-10-19",
    readMins: 5,
    category: "For Rental Companies",
    cover: "/images/fleet/trailers-at-dock.jpg",
    coverAlt: "Row of tractor-trailers lined up at a distribution yard",
    keywords: ["Commercial trailer transportation Southern California", "Commercial trailer transportation Los Angeles", "Mobile office trailer movers Southern California"],
    body: [
      { p: "For modular and mobile office rental companies, transportation is rarely steady. Some weeks your own drivers handle everything. Other weeks, deliveries, returns and transfers stack up at the same time. An overflow carrier helps you keep promises to customers without adding permanent overhead." },
      { h2: "Where overflow capacity helps most" },
      { ul: ["Peak seasons, when new projects start at the same time", "Large project mobilizations that need several units delivered together", "End-of-project demobilizations with many returns in a short window", "Coverage when your own drivers or trucks are out of service"] },
      { h2: "Rental unit returns" },
      { p: "Returns are easy to put off, but every day a unit sits off-rent at a customer site is a day it cannot be rented again. Scheduling returns promptly and getting units back to the yard or service location shortens your turnaround and keeps inventory available." },
      { h2: "Yard repositioning" },
      { p: "Demand does not always match where your inventory sits. Moving units between yards and service areas lets you put the right unit in the right place before the order comes in. Batching yard-to-yard moves together can also reduce cost per unit." },
      { h2: "What to look for in an overflow carrier" },
      { ul: ["Experience with mobile offices and modular units, not just general freight", "Direct communication with the person actually running the move", "Clear answers on what is possible, especially for permits and tight timelines", "Proper operating authority, such as an active USDOT number and California carrier permit"] },
      { h2: "Working with Wills Way" },
      { p: "Wills Way Transport Services was founded in 2026 to carry forward a 30-year family transportation business. We work as added capacity alongside your team for deliveries, returns and yard repositioning across the San Fernando Valley, Los Angeles County and Southern California. Tell us about your lanes and volume, and we will tell you how we can help." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
