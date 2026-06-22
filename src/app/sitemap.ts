import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const baseUrl = "https://populique.com";

const staticRoutes = [
  "",
  "/work",
  "/services",
  "/pricing",
  "/about",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/contact" || path === "/services" ? 0.9 : 0.7,
  }));

  const workPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...workPages];
}
