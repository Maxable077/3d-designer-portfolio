export type ProjectSection = {
  id: string;
  type: "text" | "image-single" | "image-grid" | "tech-specs";
  title?: string;
  content?: string;
  images?: { label: string; aspectRatio: "landscape" | "portrait" | "square" | "video"; url?: string }[];
  specs?: { label: string; value: string }[];
};

export interface ProjectMeta {
  category: string;
  tools: string;
  role: string;
  year: number;
  status: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  thumbnailUrl?: string;
  meta: ProjectMeta;
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: "aurora-espresso",
    title: "Aurora Espresso",
    shortDescription: "A high-end minimalist espresso machine concept featuring brushed titanium, matte steel, and ribbed walnut wood.",
    thumbnailUrl: "/project-espresso-v2.png",
    meta: {
      category: "Product Visualization",
      tools: "Blender, Fusion 360, Octane",
      role: "3D modelling, rendering, visual direction",
      year: 2026,
      status: "Concept study",
    },
    sections: [
      {
        id: "intro",
        type: "text",
        title: "Project intro",
        content: "Aurora Espresso is a fictional premium espresso machine concept exploring the balance between technical precision and warm, tactile materials. The goal was to create a kitchen appliance that feels compact, architectural and crafted for a high-end domestic interior.",
      },
      {
        id: "hero",
        type: "image-single",
        images: [{ label: "Hero render — Aurora Espresso", aspectRatio: "landscape", url: "/project-espresso-v2.png" }],
      },
      {
        id: "form-exploration",
        type: "text",
        title: "Design concept & Form exploration",
        content: "Starting from a restrained box volume, the form was refined with brushed steel, ribbed walnut details and clear tactile controls. The focus was placed on making the machine feel professional without losing the warmth of a domestic kitchen object.",
      },
      {
        id: "details",
        type: "image-grid",
        images: [
          { label: "Close-up of pressure gauge", aspectRatio: "square", url: "/project-aurora-gauge.png" },
          { label: "Close-up of walnut side detail", aspectRatio: "square", url: "/project-aurora-walnut-detail.png" },
        ],
      },
      {
        id: "material",
        type: "image-single",
        images: [{ label: "Material detail — brushed steel & ribbed walnut", aspectRatio: "landscape", url: "/project-aurora-material-detail.png" }],
      },
      {
        id: "technical",
        type: "image-grid",
        images: [
          { label: "Exploded view", aspectRatio: "portrait", url: "/project-aurora-exploded-view.png" },
          { label: "Technical side view", aspectRatio: "portrait", url: "/project-aurora-side-view.png" },
        ],
      },
      {
        id: "animation",
        type: "image-single",
        images: [{ label: "Product animation loop", aspectRatio: "video", url: "/service_animation.png" }],
      }
    ],
  },
  {
    slug: "forma-chair",
    title: "Forma Chair",
    shortDescription: "A modern lounge chair visualization study focused on warm materials, balanced proportions and realistic interior presentation.",
    thumbnailUrl: "/project-forma-chair-v2.png",
    meta: {
      category: "Furniture visualization",
      tools: "Blender, Marvelous Designer, Corona Render",
      role: "Texturing, lighting, interior styling",
      year: 2026,
      status: "Visualization study",
    },
    sections: [
      {
        id: "intro",
        type: "text",
        title: "Project intro",
        content: "Forma Chair is an exercise in conveying softness and warmth through digital tools. The challenge was to create upholstery that feels lived-in and wood materials with authentic grain mapping, placed within a calming, contemporary architectural space.",
      },
      {
        id: "hero",
        type: "image-single",
        images: [{ label: "Hero chair render", aspectRatio: "landscape", url: "/project-forma-chair-v2.png" }],
      },
      {
        id: "interior",
        type: "image-single",
        images: [{ label: "Chair in calm interior environment", aspectRatio: "landscape", url: "/project-forma-interior.png" }],
      },
      {
        id: "details-1",
        type: "image-grid",
        images: [
          { label: "Close-up wood joint", aspectRatio: "square", url: "/project-forma-wood-joint.png" },
          { label: "Upholstery fabric detail", aspectRatio: "square", url: "/project-forma-upholstery-detail.png" },
        ],
      },
      {
        id: "tech-views",
        type: "image-grid",
        images: [
          { label: "Side view", aspectRatio: "portrait", url: "/project-forma-side-view.png" },
          { label: "Front view", aspectRatio: "portrait", url: "/project-forma-front-view.png" },
        ],
      },
      {
        id: "palette",
        type: "image-single",
        images: [{ label: "Material palette breakdown", aspectRatio: "landscape", url: "/project-forma-material-palette.png" }],
      },
      {
        id: "line",
        type: "image-single",
        images: [{ label: "Technical line view", aspectRatio: "landscape", url: "/project-forma-line-view.png" }],
      }
    ],
  },
  {
    slug: "linea-kitchen",
    title: "Linea Kitchen",
    shortDescription: "A bespoke kitchen visualization with travertine stone, warm oak cabinetry and architectural lighting.",
    thumbnailUrl: "/project-linea-kitchen-v2.png",
    meta: {
      category: "Interior visualization",
      tools: "Blender, Fusion 360, Corona Render",
      role: "Spatial modelling, material direction, rendering",
      year: 2026,
      status: "Concept study",
    },
    sections: [
      {
        id: "intro",
        type: "text",
        title: "Project intro",
        content: "Linea Kitchen is a premium interior visualization study for a compact architectural kitchen. The project focuses on material weight, calm proportion and the way warm oak, travertine and brushed metal can make a functional space feel highly crafted.",
      },
      {
        id: "hero",
        type: "image-single",
        images: [{ label: "Hero kitchen render", aspectRatio: "landscape", url: "/project-linea-kitchen-v2.png" }],
      },
      {
        id: "details",
        type: "image-grid",
        images: [
          { label: "Travertine island detail", aspectRatio: "square", url: "/project-linea-travertine-detail.png" },
          { label: "Oak cabinetry and fixture detail", aspectRatio: "square", url: "/project-linea-oak-fixture-detail.png" },
        ],
      },
      {
        id: "technical",
        type: "image-single",
        images: [{ label: "Kitchen elevation concept", aspectRatio: "landscape", url: "/project-linea-elevation.png" }],
      },
    ],
  },
  {
    slug: "luma-light",
    title: "Luma Light",
    shortDescription: "A sculptural lighting object with brushed brass, soft opal glass and warm ambient glow.",
    thumbnailUrl: "/project-luma-light-v2.png",
    meta: {
      category: "Lighting visualization",
      tools: "Blender, Fusion 360, KeyShot",
      role: "Product modelling, lighting, render direction",
      year: 2026,
      status: "Concept study",
    },
    sections: [
      {
        id: "intro",
        type: "text",
        title: "Project intro",
        content: "Luma Light is a lighting object study built around a simple monolithic silhouette, a warm opal diffuser and precise brushed brass surfaces. The image direction emphasizes glow, material contrast and premium product staging.",
      },
      {
        id: "hero",
        type: "image-single",
        images: [{ label: "Hero lighting object render", aspectRatio: "landscape", url: "/project-luma-light-v2.png" }],
      },
      {
        id: "details",
        type: "image-grid",
        images: [
          { label: "Opal diffuser detail", aspectRatio: "square", url: "/project-luma-opal-diffuser-detail.png" },
          { label: "Brushed brass base detail", aspectRatio: "square", url: "/project-luma-brass-base-detail.png" },
        ],
      },
      {
        id: "technical",
        type: "image-single",
        images: [{ label: "Exploded lighting object concept", aspectRatio: "landscape", url: "/project-luma-exploded-view.png" }],
      },
    ],
  },
  {
    slug: "nova-pack",
    title: "Nova Pack",
    shortDescription: "A premium luxury cosmetics visualization study featuring water caustics, heavy frosted glass, and brushed brass.",
    thumbnailUrl: "/project-cosmetics-v2.png",
    meta: {
      category: "Packaging visualization",
      tools: "Blender, Adobe Illustrator, Arnold",
      role: "3D modelling, brand application, rendering",
      year: 2026,
      status: "Concept study",
    },
    sections: [
      {
        id: "intro",
        type: "text",
        title: "Project intro",
        content: "Nova Pack demonstrates a complete visual system for a premium health and skincare brand. It ranges from stark, clinical white-background e-commerce shots to moody lifestyle imagery and engaging social media loops.",
      },
      {
        id: "hero",
        type: "image-single",
        images: [{ label: "Hero packaging render", aspectRatio: "landscape", url: "/project-nova-hero.png" }],
      },
      {
        id: "lineup",
        type: "image-single",
        images: [{ label: "Three-product lineup", aspectRatio: "landscape", url: "/project-nova-lineup.png" }],
      },
      {
        id: "details",
        type: "image-grid",
        images: [
          { label: "Front label design mockup", aspectRatio: "portrait", url: "/project-nova-label-mockup.png" },
          { label: "Detail of cap / material texture", aspectRatio: "portrait", url: "/project-nova-cap-detail.png" },
        ],
      },
      {
        id: "ecommerce",
        type: "image-grid",
        images: [
          { label: "E-commerce white background image", aspectRatio: "square", url: "/project-nova-ecommerce.png" },
          { label: "Social media square visual", aspectRatio: "square", url: "/project-nova-social-square.png" },
        ],
      },
      {
        id: "lifestyle",
        type: "image-single",
        images: [{ label: "Lifestyle-style context render", aspectRatio: "landscape", url: "/project-nova-lifestyle.png" }],
      },
      {
        id: "360",
        type: "image-single",
        images: [{ label: "360-degree product spin", aspectRatio: "video", url: "/service_interactive.png" }],
      }
    ],
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
