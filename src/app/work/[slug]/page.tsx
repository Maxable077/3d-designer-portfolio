import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
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
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    video: "aspect-video",
  };

  return (
    <div className="pb-32">
      {/* Project Header */}
      <header className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <AnimatedSection className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight mb-8 text-brand-text">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-brand-muted leading-relaxed">
            {project.shortDescription}
          </p>
        </AnimatedSection>

        {/* Meta Info */}
        <AnimatedSection delay={0.2} className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-brand-accent pt-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-medium text-brand-text mb-2">Category</h3>
            <p className="text-brand-muted text-sm">{project.meta.category}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-medium text-brand-text mb-2">Tools</h3>
            <p className="text-brand-muted text-sm">{project.meta.tools}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-medium text-brand-text mb-2">Role</h3>
            <p className="text-brand-muted text-sm">{project.meta.role}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-brand-text mb-2">Year</h3>
            <p className="text-brand-muted text-sm">{project.meta.year}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-brand-text mb-2">Status</h3>
            <p className="text-brand-muted text-sm">{project.meta.status}</p>
          </div>
        </AnimatedSection>
      </header>

      {/* Project Content */}
      <div className="flex flex-col gap-16 md:gap-32">
        {project.sections.map((section) => {
          if (section.type === "text") {
            return (
              <section key={section.id} className="max-w-3xl mx-auto px-6 w-full">
                <AnimatedSection>
                  {section.title && <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-6">{section.title}</h2>}
                  <p className="text-lg md:text-xl text-brand-muted leading-relaxed">{section.content}</p>
                </AnimatedSection>
              </section>
            );
          }
          if (section.type === "image-single") {
            const image = section.images?.[0];

            return (
              <section key={section.id} className="max-w-7xl mx-auto px-6 w-full">
                <AnimatedSection>
                  {image?.url ? (
                    <div className={`relative w-full overflow-hidden rounded-sm ${aspectClasses[image.aspectRatio]}`}>
                      <Image src={image.url} alt={image.label} fill className="object-cover" />
                    </div>
                  ) : (
                    <ImagePlaceholder 
                      label={image?.label || "Image"} 
                      aspectRatio={image?.aspectRatio || "auto"} 
                      className="w-full"
                    />
                  )}
                </AnimatedSection>
              </section>
            );
          }
          if (section.type === "image-grid") {
            return (
              <section key={section.id} className="max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {section.images?.map((img, i) => (
                    <AnimatedSection key={i} delay={i * 0.1}>
                      {img.url ? (
                        <div className={`relative w-full overflow-hidden rounded-sm ${aspectClasses[img.aspectRatio]}`}>
                          <Image src={img.url} alt={img.label} fill className="object-cover" />
                        </div>
                      ) : (
                        <ImagePlaceholder label={img.label} aspectRatio={img.aspectRatio} className="w-full" />
                      )}
                    </AnimatedSection>
                  ))}
                </div>
              </section>
            );
          }
          return null;
        })}
      </div>

      {/* Next Project */}
      <section className="max-w-7xl mx-auto px-6 w-full mt-32 md:mt-48">
        <AnimatedSection className="border-t border-brand-accent pt-16 flex flex-col items-center text-center">
          <p className="text-brand-muted mb-4 text-sm font-medium tracking-wide uppercase">Next Project</p>
          <Link href={`/work/${nextProject.slug}`} className="group flex flex-col items-center gap-6">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-brand-text group-hover:text-brand-muted transition-colors">
              {nextProject.title}
            </h2>
            <div className="w-12 h-12 rounded-full border border-brand-accent flex items-center justify-center group-hover:bg-brand-text group-hover:text-brand-bg transition-all">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
