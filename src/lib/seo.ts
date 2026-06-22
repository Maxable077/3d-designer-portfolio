import type { Metadata } from "next";
import type { Project } from "@/data/projects";
import type { FaqItem } from "@/data/services";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_PERSONAL_URL,
  WEBSITE_URL,
} from "@/lib/site";

export const SITE_NAME = "Populique";

export const DEFAULT_DESCRIPTION =
  "Populique is a boutique product CGI studio specialising in photorealistic 3D product rendering, visualization and animation for e-commerce, launches and marketing — without physical photoshoots.";

export const DEFAULT_OG_IMAGE = "/og-image.jpg";

export const PAGE_SEO = {
  home: {
    title: "Product CGI Studio — Photorealistic 3D Product Rendering",
    description:
      "Hire a product CGI studio for photorealistic 3D rendering, product visualization and motion content. Ideal for e-commerce PDPs, launches and investor decks.",
  },
  services: {
    title: "Product CGI & 3D Rendering Services",
    description:
      "Product CGI services: 3D modeling, texturing, silo renders, lifestyle scenes, feature callouts and animation for furniture, appliances, lighting and packaging brands.",
  },
  pricing: {
    title: "Product CGI Pricing & Render Packages",
    description:
      "Transparent product CGI pricing for still renders, animation and PDP-ready visual sets. Configure your package and request a tailored estimate.",
  },
  work: {
    title: "Product CGI Portfolio & Case Studies",
    description:
      "Explore photorealistic product CGI case studies — espresso machines, furniture, kitchens, lighting and packaging visuals built for launch and e-commerce.",
  },
  about: {
    title: "About Populique — Product CGI Studio",
    description:
      "Populique is a design-aware 3D studio focused on photorealistic product CGI, visualization and motion for brands that need launch-ready visuals fast.",
  },
  contact: {
    title: "Contact — Start a Product CGI Project",
    description:
      "Request a product CGI quote, book a demo or discuss photorealistic 3D renders and animation for your next product launch or e-commerce rollout.",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How Populique collects, uses and protects personal data when you visit our website or request product CGI and 3D visualization services.",
  },
  terms: {
    title: "Terms of Service",
    description:
      "Terms governing use of the Populique website and our product CGI, 3D rendering and visualization services.",
  },
} as const;

const PROJECT_SEO: Record<string, { title: string; description: string }> = {
  "aurora-espresso": {
    title: "Espresso Machine Product CGI — 3D Rendering Case Study",
    description:
      "Photorealistic espresso machine product visualization with brushed metal, walnut details, exploded views and hero renders for appliance marketing.",
  },
  "forma-chair": {
    title: "Furniture 3D Rendering — Lounge Chair Visualization Case Study",
    description:
      "Furniture CGI case study: photorealistic lounge chair renders with warm materials, interior styling and material close-ups for catalogue and web.",
  },
  "linea-kitchen": {
    title: "Kitchen Interior 3D Visualization Case Study",
    description:
      "Kitchen and interior product CGI — modular cabinetry, surfaces and spatial composition rendered for premium residential brand presentation.",
  },
  "luma-light": {
    title: "Lighting Product CGI — 3D Rendering Case Study",
    description:
      "Lighting product visualization exploring glow, reflection and material behaviour in controlled studio and interior scenes.",
  },
  "nova-pack": {
    title: "Packaging & E-commerce Product CGI Case Study",
    description:
      "Packaging CGI for e-commerce — consistent product lineups, silo shots and campaign visuals from a single 3D product model.",
  },
};

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
          alt: `${SITE_NAME} — product CGI studio`,
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

export function projectPageSeo(project: Project) {
  const custom = PROJECT_SEO[project.slug];
  return {
    title: custom?.title ?? `${project.title} — Product CGI Case Study`,
    description: custom?.description ?? project.shortDescription,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${WEBSITE_URL}/#organization`,
    name: SITE_NAME,
    url: WEBSITE_URL,
    email: CONTACT_EMAIL,
    logo: `${WEBSITE_URL}/populique-app-icon-primary.svg`,
    image: `${WEBSITE_URL}${DEFAULT_OG_IMAGE}`,
    description: DEFAULT_DESCRIPTION,
    areaServed: "Worldwide",
    serviceType: [
      "Product CGI",
      "3D product rendering",
      "Product visualization",
      "Product animation",
      "E-commerce product imagery",
    ],
    knowsAbout: [
      "3D product rendering",
      "photorealistic CGI",
      "furniture visualization",
      "packaging renders",
      "product animation",
    ],
    sameAs: [INSTAGRAM_URL, LINKEDIN_PERSONAL_URL].filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${WEBSITE_URL}/#website`,
    name: SITE_NAME,
    url: WEBSITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": `${WEBSITE_URL}/#organization` },
    inLanguage: "en-GB",
  };
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function creativeWorkJsonLd(project: Project) {
  return {
    "@type": "CreativeWork",
    "@id": `${WEBSITE_URL}/work/${project.slug}#creativework`,
    name: project.title,
    headline: project.title,
    description: project.shortDescription,
    url: `${WEBSITE_URL}/work/${project.slug}`,
    image: project.thumbnailUrl ? `${WEBSITE_URL}${project.thumbnailUrl}` : `${WEBSITE_URL}${DEFAULT_OG_IMAGE}`,
    creator: { "@id": `${WEBSITE_URL}/#organization` },
    genre: project.meta.category,
    dateCreated: `${project.meta.year}-01-01`,
    inLanguage: "en-GB",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${WEBSITE_URL}${item.path}`,
    })),
  };
}

export function projectStructuredData(project: Project) {
  return [breadcrumbJsonLd(projectBreadcrumbs(project)), creativeWorkJsonLd(project)];
}

export function projectBreadcrumbs(project: Project) {
  return [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: project.title, path: `/work/${project.slug}` },
  ];
}

export function bingVerificationMetadata(): Metadata["verification"] | undefined {
  const code = process.env.BING_SITE_VERIFICATION?.trim();
  if (!code) return undefined;
  return {
    other: {
      "msvalidate.01": code,
    },
  };
}
