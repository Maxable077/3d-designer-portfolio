import type { Metadata } from "next";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_PERSONAL_URL,
  WEBSITE_URL,
} from "@/lib/site";

export const SITE_NAME = "Populique";

export const DEFAULT_DESCRIPTION =
  "Photorealistic 3D rendering, product visualization and motion content for brands that need conversion-driven visuals without physical photoshoots.";

export const DEFAULT_OG_IMAGE = "/studio-hero.png";

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalPath = path || "/";
  const url = `${WEBSITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
  const fullTitle = title.includes("Populique") ? title : `${title} — Populique`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: WEBSITE_URL,
    email: CONTACT_EMAIL,
    image: `${WEBSITE_URL}/populique-app-icon-primary.svg`,
    description: DEFAULT_DESCRIPTION,
    areaServed: "Worldwide",
    serviceType: [
      "3D product visualization",
      "Product CGI",
      "3D rendering",
      "Product animation",
    ],
    sameAs: [INSTAGRAM_URL, LINKEDIN_PERSONAL_URL].filter(Boolean),
  };
}
