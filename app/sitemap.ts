import type { MetadataRoute } from "next";
import { getCaseStudies, getTeardowns } from "@/lib/content";
import { site } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/teardowns", "/about"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...getCaseStudies().map((c) => ({ url: `${site.url}/work/${c.slug}` })),
    ...getTeardowns().map((t) => ({ url: `${site.url}/teardowns/${t.slug}`, lastModified: t.date })),
  ];
}
