// FAQ content (FAQ page + home teaser). Answers stay factual and avoid promises we can't keep.

export type Faq = { q: string; a: string };
export type FaqGroup = { title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Services",
    items: [
      { q: "What does Wills Way Transport Services move?", a: "We specialize in mobile offices, construction trailers, modular building sections and related equipment. Our services include mobile office transportation, modular building transportation, jobsite-to-jobsite relocation, factory-to-jobsite delivery, overflow transportation, rental unit returns, yard repositioning and time-sensitive moves." },
      { q: "Do you provide placement support at delivery?", a: "Yes. On arrival our driver works with your site contact to position the unit as close as practical to the planned location. Final setup such as blocking, leveling, tie-downs and utility connections is usually handled by the rental company or installer." },
      { q: "Do you work with modular rental companies as an overflow carrier?", a: "Yes. We work alongside rental companies' own drivers to add capacity during busy periods, for deliveries, returns and yard-to-yard repositioning." },
      { q: "Are you a broker or a carrier?", a: "We are a carrier. Wills Way Transport Services operates its own transportation equipment, carried forward from our father's established 30-year transportation business, under USDOT 4578902." },
    ],
  },
  {
    title: "Service Area",
    items: [
      { q: "Where are you based?", a: "We are based in the San Fernando Valley in Los Angeles County, California." },
      { q: "Which areas do you serve?", a: "Our primary markets are the San Fernando Valley, Los Angeles County, Santa Clarita and the Antelope Valley, Ventura County and Orange County. San Diego, Riverside, San Bernardino, Kern and Fresno counties, plus other California destinations, are available by quote." },
      { q: "Do you move units outside California?", a: "Our focus is Southern California and California destinations. Contact us about your route and we will tell you honestly whether we can help." },
    ],
  },
  {
    title: "Quotes & Scheduling",
    items: [
      { q: "How do I get a quote?", a: "Use the quote form on any page or call (213) 222-5870. Share the unit type and size, pickup and delivery locations, your target date and any site access notes. Complete details help us give you an accurate answer faster." },
      { q: "How much notice do you need?", a: "More notice is always better, especially for oversize units that need permits. Short-notice and time-sensitive moves are possible, subject to equipment, permitting and availability. Call us and we will give you a clear answer." },
      { q: "Are you available 24/7?", a: "Yes, our phone line is open 24 hours a day, 7 days a week." },
      { q: "What do I need to prepare at the site?", a: "A clear, firm path for the truck, enough overhead clearance, a prepared pad or placement area, and a site contact who can be reached on move day. Let us know in advance if access is tight or the ground is soft." },
    ],
  },
  {
    title: "Permits & Compliance",
    items: [
      { q: "Do you handle oversize loads?", a: "Yes. Wider and taller units may require transportation permits from Caltrans and, in some cases, local jurisdictions. We review permit needs for each move, and oversize moves are subject to permitting and availability." },
      { q: "What are your operating credentials?", a: "Wills Way Transport Services LLC operates under USDOT 4578902, CA # 673856 and California Motor Carrier Permit 0673856. Our California LLC number is B20260199550." },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((g) => g.items);
