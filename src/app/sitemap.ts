import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/create", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/templates", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${siteConfig.url}${r.path || "/"}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
