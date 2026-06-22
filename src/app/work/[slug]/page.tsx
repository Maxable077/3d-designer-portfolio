import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ProjectAccordion } from "@/components/ProjectAccordion";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata, DEFAULT_OG_IMAGE, projectPageSeo, projectStructuredData } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const seo = projectPageSeo(project);

  return createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/work/${project.slug}`,
    ogImage: project.thumbnailUrl ?? DEFAULT_OG_IMAGE,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Find the next project
  const currentIndex = projects.findIndex(p => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const aspectClasses = {
    landscape: "aspect-[4/3] md:aspect-[16/9]",
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    video: "aspect-video md:aspect-[21/9]",
  };

  const textSections = project.sections.filter(s => s.type === "text");
  const accordionItems = textSections.map(s => ({
    title: s.title || "Details",
    content: s.content || "",
  }));

  const imageSections = project.sections.filter(s => s.type !== "text");

  // Use the first image section as the hero background if it's a single image,
  // or fallback to a placeholder/first available image.
  const firstImageSection = imageSections.find(s => s.type === "image-single");
  const heroImageUrl = firstImageSection?.images?.[0]?.url;

  return (
    <>
      <JsonLd data={projectStructuredData(project)} />
    <div className="bg-brand-bg-alt min-h-screen">
      {/* Edge-to-Edge Hero Header with Parallax Feel */}
      <header className="relative w-full h-[80vh] md:h-[90vh] flex items-end pb-24 md:pb-32 px-6 overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0 bg-brand-text">
          {heroImageUrl && (
            <Image 
              src={heroImageUrl} 
              alt={project.title} 
              fill 
              className="object-cover opacity-40 mix-blend-overlay"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-alt via-brand-bg-alt/80 to-transparent"></div>
        </div>

        <AnimatedSection className="relative z-10 w-full max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-none mb-8 text-brand-text">
            {project.title}
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl text-brand-muted leading-tight max-w-4xl font-light">
            {project.shortDescription}
          </p>
        </AnimatedSection>
      </header>

      <main className="relative z-20 max-w-7xl mx-auto px-6 -mt-12 md:-mt-24 pb-32">
        {/* Meta Info Box */}
        <AnimatedSection delay={0.2} className="bg-brand-bg rounded-3xl p-8 md:p-12 shadow-2xl border border-brand-accent/20 mb-24">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xs uppercase tracking-widest font-medium text-brand-muted mb-2">Category</h3>
              <p className="text-brand-text text-lg">{project.meta.category}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xs uppercase tracking-widest font-medium text-brand-muted mb-2">Tools</h3>
              <p className="text-brand-text text-lg">{project.meta.tools}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xs uppercase tracking-widest font-medium text-brand-muted mb-2">Role</h3>
              <p className="text-brand-text text-lg">{project.meta.role}</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest font-medium text-brand-muted mb-2">Year</h3>
              <p className="text-brand-text text-lg">{project.meta.year}</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest font-medium text-brand-muted mb-2">Status</h3>
              <p className="text-brand-text text-lg">{project.meta.status}</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Project Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          {/* Left Column: Accordions for Text */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <h2 className="text-3xl font-medium tracking-tight mb-8">Project Details</h2>
              {accordionItems.length > 0 ? (
                <ProjectAccordion items={accordionItems} />
              ) : (
                <p className="text-brand-muted text-lg">No additional details provided.</p>
              )}
            </div>
          </div>

          {/* Right Column: Edge-to-Edge Images (constrained within container for this design, or full bleed if we break out) */}
          <div className="lg:col-span-7 flex flex-col gap-16 md:gap-24">
            {imageSections.map((section, idx) => {
              if (section.type === "image-single") {
                const image = section.images?.[0];
                // Skip the first image if we used it for the hero
                if (idx === 0 && heroImageUrl) return null;

                return (
                  <AnimatedSection key={section.id}>
                    {image?.url ? (
                      <div className={`relative w-full overflow-hidden rounded-2xl ${aspectClasses[image.aspectRatio as keyof typeof aspectClasses] || "aspect-video"}`}>
                        <Image src={image.url} alt={image.label} fill className="object-cover" />
                      </div>
                    ) : (
                      <ImagePlaceholder 
                        label={image?.label || "Image"} 
                        aspectRatio={image?.aspectRatio || "auto"} 
                        className="w-full rounded-2xl"
                      />
                    )}
                  </AnimatedSection>
                );
              }
              if (section.type === "image-grid") {
                return (
                  <div key={section.id} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {section.images?.map((img, i) => (
                      <AnimatedSection key={i} delay={i * 0.1}>
                        {img.url ? (
                          <div className={`relative w-full overflow-hidden rounded-2xl ${aspectClasses[img.aspectRatio as keyof typeof aspectClasses] || "aspect-square"}`}>
                            <Image src={img.url} alt={img.label} fill className="object-cover" />
                          </div>
                        ) : (
                          <ImagePlaceholder label={img.label} aspectRatio={img.aspectRatio} className="w-full rounded-2xl" />
                        )}
                      </AnimatedSection>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </main>

      {/* Next Project Footer */}
      <section className="w-full bg-brand-text text-brand-bg py-32 md:py-48 px-6 text-center rounded-t-[3rem] md:rounded-t-[5vw]">
        <AnimatedSection className="max-w-4xl mx-auto flex flex-col items-center">
          <p className="text-brand-bg/60 mb-6 text-sm font-medium tracking-widest uppercase">Up Next</p>
          <Link href={`/work/${nextProject.slug}`} className="group flex flex-col items-center gap-12">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-brand-bg group-hover:opacity-80 transition-opacity leading-none">
              {nextProject.title}
            </h2>
            <div className="w-20 h-20 rounded-full border-2 border-brand-bg flex items-center justify-center group-hover:bg-brand-bg group-hover:text-brand-text transition-all duration-300">
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </Link>
        </AnimatedSection>
      </section>
    </div>
    </>
  );
}
