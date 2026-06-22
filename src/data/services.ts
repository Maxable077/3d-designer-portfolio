export type ServiceFamily = {
  title: string;
  eyebrow: string;
  description: string;
  audience: string;
  outputs: string[];
  imageUrl: string;
  imageAlt: string;
  imagePosition?: string;
  href: string;
};

export type Deliverable = {
  title: string;
  description: string;
  detail: string;
  useCase: string;
  formats: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProofPoint = {
  stat: string;
  title: string;
  description: string;
};

export type WorkflowProof = {
  title: string;
  description: string;
  evidence: string;
};

export const serviceFamilies: ServiceFamily[] = [
  {
    title: "Furniture & interiors",
    eyebrow: "Warm materials",
    description:
      "Furniture, kitchen and interior visuals with calm styling, believable scale and premium material direction.",
    audience: "Furniture makers, interior brands and designers who need product imagery without arranging a physical shoot.",
    outputs: ["Lifestyle scenes", "Material close-ups", "Room compositions", "Catalogue images"],
    imageUrl: "/service-furniture-interiors-clean.png",
    imageAlt: "Unbranded lounge chair in a calm modern interior with soft daylight.",
    imagePosition: "52% center",
    href: "/work/forma-chair",
  },
  {
    title: "Product & appliances",
    eyebrow: "Hero visuals",
    description:
      "Clean product renders for launch pages, portfolios, investor decks and sales presentations.",
    audience: "Product teams and makers who need precise visuals before photography, tooling or launch production is ready.",
    outputs: ["Hero images", "White-background renders", "Feature frames", "Pitch visuals"],
    imageUrl: "/service-product-appliances-clean.png",
    imageAlt: "Unbranded compact appliance rendered on a clean neutral studio background.",
    imagePosition: "50% center",
    href: "/work/aurora-espresso",
  },
  {
    title: "Lighting & decor",
    eyebrow: "Glow studies",
    description:
      "Lighting objects, decor pieces and material close-ups where reflection, texture and atmosphere matter.",
    audience: "Lighting and decor brands that need to show glow, materials and atmosphere in controlled visual settings.",
    outputs: ["Glow renders", "Ambient scenes", "Detail crops", "Material studies"],
    imageUrl: "/service-lighting-decor-clean.png",
    imageAlt: "Warm sculptural table lamp on a minimal textured interior surface.",
    imagePosition: "58% center",
    href: "/work/luma-light",
  },
  {
    title: "Packaging & e-commerce",
    eyebrow: "Product systems",
    description:
      "Consistent product sets for white-background shots, detail crops, campaign imagery and social assets.",
    audience: "Brands that need one product model to become shop images, campaign scenes and reusable launch assets.",
    outputs: ["Product lineups", "Silo images", "Social crops", "Campaign visuals"],
    imageUrl: "/service-packaging-ecommerce-clean.png",
    imageAlt: "Blank premium packaging lineup on a bright e-commerce studio background.",
    imagePosition: "50% center",
    href: "/work/nova-pack",
  },
];

export const deliverables: Deliverable[] = [
  {
    title: "Silo renders",
    description: "White or neutral background product images for shop pages, marketplaces and catalogues.",
    detail: "Front, side, detail and product-family views.",
    useCase: "Best when the product needs to be inspected clearly before a customer reads the page.",
    formats: "PNG, JPG, transparent-background crops",
  },
  {
    title: "Lifestyle scenes",
    description: "Contextual room, studio or tabletop scenes that show the product in use.",
    detail: "Furniture, interiors, lighting and packaging setups.",
    useCase: "Best for product launches, hero sections, lookbooks and social campaigns.",
    formats: "Web hero, square crop, vertical crop",
  },
  {
    title: "Feature callouts",
    description: "Visual explanations for materials, proportions, mechanisms and product benefits.",
    detail: "Close-ups, exploded views and annotated presentation frames.",
    useCase: "Best when product details need to sell faster than paragraphs of technical copy.",
    formats: "Close-up stills, labelled frames, deck visuals",
  },
  {
    title: "Motion assets",
    description: "Short product loops and reveal animations for web, pitch decks and social media.",
    detail: "Turntables, material transitions and mechanism reveals.",
    useCase: "Best for launches, reels, website loops and mechanism explanations.",
    formats: "MP4, vertical reels, silent web loops",
  },
  {
    title: "CAD to visual",
    description: "Transform technical models into refined visual assets with lighting, materials and composition.",
    detail: "Fusion 360, STEP references and model cleanup.",
    useCase: "Best when engineering files exist but the product still needs emotional, market-ready presentation.",
    formats: "Cleaned model, render-ready scene, final stills",
  },
  {
    title: "Material creation",
    description: "Surface studies that make wood, fabric, glass, metal and stone feel believable.",
    detail: "Texture matching, shader setup and close-up validation.",
    useCase: "Best when realism depends on fabric weave, wood grain, brushed metal, glass or stone behavior.",
    formats: "Shader studies, material crops, render presets",
  },
];

export const proofPoints: ProofPoint[] = [
  {
    stat: "01",
    title: "One model, many outputs",
    description:
      "A product can move from hero render to detail crop, shop image, deck frame and motion loop without rebuilding the visual system.",
  },
  {
    stat: "05",
    title: "Case studies across categories",
    description:
      "Our work already covers appliances, furniture, interiors, lighting and packaging so clients can see the range before a brief starts.",
  },
  {
    stat: "3D",
    title: "Design-aware CGI",
    description:
      "The workflow combines product design judgement with render craft, so form, material and composition are developed together.",
  },
];

export const workflowProof: WorkflowProof[] = [
  {
    title: "Brief becomes asset plan",
    description: "Instead of making one image in isolation, the project is mapped into the images, crops and motion assets the launch needs.",
    evidence: "Output list, aspect ratios and priority scenes.",
  },
  {
    title: "Model becomes visual system",
    description: "CAD, sketches or references are turned into a clean product model with reusable materials and controlled lighting.",
    evidence: "Reusable Blender/Fusion workflow and render-ready scenes.",
  },
  {
    title: "Finals become launch content",
    description: "The finished renders are exported for web, deck, e-commerce and social use so the same direction stays consistent everywhere.",
    evidence: "Hero, detail, square, vertical and presentation exports.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Brief & references",
    description:
      "We define the product, visual goal, formats and level of realism before production starts.",
  },
  {
    step: "02",
    title: "Model & materials",
    description:
      "The model is built or cleaned up, then materials are matched from CAD, sketches, photos or moodboards.",
  },
  {
    step: "03",
    title: "Look development",
    description:
      "Lighting, camera angles and styling are refined until the image direction feels premium and consistent.",
  },
  {
    step: "04",
    title: "Final delivery",
    description:
      "Final stills or motion assets are exported in the right formats, with room for focused revisions.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What do I need to start a render project?",
    answer:
      "A product sketch, CAD file, reference photos or a clear moodboard is enough to begin. The first step is always translating that input into a clean visual brief.",
  },
  {
    question: "Can you work from CAD files?",
    answer:
      "Yes. CAD or Fusion 360 files can be cleaned, styled and rendered so the final image feels less technical and more presentation-ready.",
  },
  {
    question: "Do you only make furniture visuals?",
    answer:
      "No. Furniture and interiors are a strong fit, but the same workflow works for appliances, lighting, packaging, decor and technical products.",
  },
  {
    question: "Can one model become multiple assets?",
    answer:
      "Yes. A single product model can be reused for silo images, lifestyle renders, close-ups, animation frames and technical presentation visuals.",
  },
];
