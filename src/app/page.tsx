import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { MotionDeliverableStrip } from "@/components/MotionDeliverableStrip";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceProofSection } from "@/components/ServiceProofSection";
import { StudioPortraits } from "@/components/StudioPortraits";
import { projects } from "@/data/projects";
import { deliverables, serviceFamilies } from "@/data/services";

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const featuredServices = serviceFamilies.slice(0, 4);
  const featuredDeliverables = deliverables.slice(0, 4);

  return (
    <div className="flex flex-col gap-32 md:gap-48 pb-20">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video 
            src="/hero-video-combined.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover scale-[1.15] origin-center"
          />
          {/* Dark overlays to make text readable */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
        </div>
        
        <AnimatedSection className="relative z-10 flex flex-col items-center text-center gap-8 max-w-4xl px-6 pt-20">
          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight leading-[1.05] text-white drop-shadow-md">
            Product visuals, 3D renders & technical presentations.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed drop-shadow-sm">
            I create high-quality product renders, animations and visual concepts using Blender, Fusion 360 and Adobe tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/work" 
              className="inline-flex items-center justify-center bg-white text-black px-8 py-4 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95"
            >
              View work
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center border border-white/30 bg-black/30 backdrop-blur-md text-white px-8 py-4 text-sm font-medium transition-colors hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <MotionDeliverableStrip />

      <ServiceProofSection />

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <AnimatedSection className="flex justify-between items-end mb-16 border-b border-brand-accent pb-6">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Featured work</h2>
          <Link href="/work" className="hidden md:flex items-center gap-2 text-sm font-medium text-brand-muted hover:text-brand-text transition-colors group">
            All projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {featuredProjects.map((project, index) => (
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
        <div className="mt-12 md:hidden">
          <Link href="/work" className="inline-flex items-center justify-center w-full border border-brand-accent bg-transparent text-brand-text px-8 py-4 text-sm font-medium">
            View all projects
          </Link>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-brand-bg-alt py-32">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AnimatedSection className="mb-16 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-16 items-end">
            <div>
              <p className="text-sm text-brand-muted mb-4">Visual content for product brands</p>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Services shaped like a product content system.</h2>
            </div>
            <p className="text-lg text-brand-muted leading-relaxed max-w-2xl lg:ml-auto">
              From clean e-commerce images to atmospheric lifestyle scenes and motion-ready assets, each project is built so one 3D model can support multiple moments in your launch.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredServices.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.08}>
                <Link href={service.href} className="group block">
                  <div className="overflow-hidden rounded-sm mb-5">
                    <div className="relative aspect-[4/3] transition-transform duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.03]">
                      <Image
                        src={service.imageUrl}
                        alt={service.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                        style={{ objectPosition: service.imagePosition ?? "center" }}
                      />
                    </div>
                  </div>
                  <div className="border-t border-brand-accent pt-5">
                    <p className="text-sm text-brand-muted mb-2">{service.eyebrow}</p>
                    <h3 className="text-xl font-medium tracking-tight mb-3">{service.title}</h3>
                    <p className="text-sm text-brand-muted leading-relaxed">{service.description}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.35} className="mt-16 grid grid-cols-1 lg:grid-cols-[0.35fr_1fr] gap-8 lg:gap-16 border-t border-brand-accent pt-10">
            <div>
              <h3 className="text-xl font-medium tracking-tight mb-4">Typical deliverables</h3>
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted hover:text-brand-text transition-colors group">
                View service menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {featuredDeliverables.map((item) => (
                <div key={item.title}>
                  <h4 className="text-base font-medium mb-2">{item.title}</h4>
                  <p className="text-sm text-brand-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Preview */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <AnimatedSection className="order-2 md:order-1">
            <StudioPortraits compact />
          </AnimatedSection>
          <AnimatedSection className="order-1 md:order-2 flex flex-col gap-8 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">A focused studio setup for polished product visuals.</h2>
            <p className="text-lg md:text-xl text-brand-muted leading-relaxed">
              Creative direction, precise modeling and final render polish come together in one lean visual workflow.
            </p>
            <div>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center border border-brand-text bg-transparent text-brand-text px-8 py-4 text-sm font-medium transition-colors hover:bg-brand-text hover:text-brand-bg"
              >
                Read full bio
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-4xl mx-auto px-6 w-full text-center">
        <AnimatedSection className="flex flex-col items-center gap-8 py-20 border-y border-brand-accent">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight max-w-2xl">
            Looking for product visuals, renders or flexible 3D support?
          </h2>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center bg-brand-text text-brand-bg px-8 py-4 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95 mt-4"
          >
            Start a conversation
          </Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
