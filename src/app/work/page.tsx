import { AnimatedSection } from "@/components/AnimatedSection";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function WorkPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
      <AnimatedSection className="mb-20 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-brand-text">Work</h1>
        <p className="text-lg md:text-xl text-brand-muted leading-relaxed">
          A selection of conceptual projects, visual studies and product presentations.
        </p>
      </AnimatedSection>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {projects.map((project, index) => (
          <AnimatedSection key={project.slug} delay={index * 0.1}>
            <ProjectCard 
              slug={project.slug}
              title={project.title}
              category={project.meta.category}
              year={project.meta.year}
              description={project.shortDescription}
              thumbnailUrl={project.thumbnailUrl}
            />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
