import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/lib/posts";

// XML sitemap: core pages + every article
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/about", "/contact", "/faq", "/reviews", "/blog"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : p === "/services" ? 0.9 : 0.8,
  }));
  const articles = posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 }));
  return [...pages, ...articles];
}
