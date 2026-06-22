import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { MagneticButton } from "@/components/MagneticButton";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";
import { InfiniteCardCarousel } from "@/components/InfiniteCardCarousel";
import { SubServicesGrid } from "@/components/SubServicesGrid";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { DemoLink } from "@/components/DemoLink";
import { ESTIMATE_URL } from "@/lib/site";
import { projects } from "@/data/projects";
import { serviceFamilies } from "@/data/services";

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const featuredServices = serviceFamilies.slice(0, 4);

  return (
    <div className="flex flex-col bg-brand-bg text-brand-text">
      {/* Hero Section - Matching CGIFurniture full height video */}
      <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video 
            src="/hero-video-combined.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover scale-[1.30] origin-center"
          />
          {/* Dark overlays */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
        </div>
        
        <AnimatedSection className="relative w-full pb-8 px-4 z-10">
          <div className="text-white text-center mt-20">
            <h1 className="text-5xl sm:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight drop-shadow-md">
              Bespoke Product CGI
            </h1>
            <p className="text-lg sm:text-xl xl:text-2xl font-light mt-6 drop-shadow-sm">
              Accelerate business growth with conversion-driven 3D rendering services
            </p>
          </div>
          <div className="flex sm:flex-row flex-col items-center justify-center gap-4 mt-24">
            <MagneticButton>
              <DemoLink 
                className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-5 text-lg font-medium transition-transform hover:scale-[1.02] active:scale-95"
              >
                Schedule a demo
              </DemoLink>
            </MagneticButton>
            <MagneticButton strength={0.1}>
              <Link 
                href={ESTIMATE_URL}
                className="inline-flex items-center justify-center rounded-full bg-transparent text-white border border-white/20 hover:bg-white/10 px-8 py-5 text-lg font-medium transition-colors"
              >
                Estimate project
              </Link>
            </MagneticButton>
          </div>
        </AnimatedSection>
      </section>

      {/* Trusted By Section - Overlapping the Hero via -mt-[5vw] and rounded-t-[5vw] */}
      <section id="trusted-by-section" className="relative pt-12 pb-16 rounded-t-[3rem] md:rounded-t-[5vw] bg-brand-bg -mt-[3rem] md:-mt-[5vw] z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-sm uppercase tracking-widest text-brand-muted font-medium">
              <span>OUR NEXT-GEN CGI TECH STACK</span>
            </h2>
          </div>
          <div className="mt-12 overflow-hidden -mx-6">
             <InfiniteMarquee />
          </div>
        </div>
      </section>

      {/* Stacked Sticky Cards Section (Roomsets) */}
      <section id="roomsets" className="min-h-[50vh] relative z-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-24">
          <AnimatedSection className="text-center mb-24">
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
              Tap into the <span className="text-brand-muted italic">power of CG</span> visual experiences that are perfect for your products. Any style, setting, or season.
            </h2>
          </AnimatedSection>

          <div className="relative mt-24">
            {/* Card 1 */}
            <div className="sticky top-[6rem] pb-24">
              <div className="rounded-[3rem] bg-brand-bg-alt overflow-clip lg:h-[40rem] shadow-2xl flex flex-col lg:flex-row border border-brand-accent/10">
                <div className="lg:w-2/5 p-8 sm:p-16 lg:py-24 flex flex-col justify-center">
                  <h3 className="text-3xl lg:text-4xl 2xl:text-5xl font-extrabold mb-6 tracking-tight">Tech & Electronics</h3>
                  <p className="text-lg lg:text-xl font-light text-brand-muted mb-10 leading-relaxed">
                    Showcase complex consumer electronics with photorealistic precision. Exploded views, glowing LEDs, and macro material details that cameras simply can't capture.
                  </p>
                  <DemoLink className="inline-flex w-fit items-center justify-center rounded-full border border-brand-text px-6 py-4 text-base font-medium hover:bg-brand-text hover:text-brand-bg transition-colors">
                    Schedule a demo
                  </DemoLink>
                </div>
                <div className="lg:flex-1 relative min-h-[300px]">
                  <Image src={featuredProjects[0]?.thumbnailUrl || "/placeholder.jpg"} alt="Tech & Electronics" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="sticky top-[8rem] pb-24">
              <div className="rounded-[3rem] bg-brand-bg text-brand-text overflow-clip lg:h-[40rem] shadow-2xl flex flex-col lg:flex-row border border-brand-text/10">
                <div className="lg:w-2/5 p-8 sm:p-16 lg:py-24 flex flex-col justify-center">
                  <h3 className="text-3xl lg:text-4xl 2xl:text-5xl font-extrabold mb-6 tracking-tight">Cosmetics & Beauty</h3>
                  <p className="text-lg lg:text-xl font-light text-brand-muted mb-10 leading-relaxed">
                    Silky textures, glass reflections, and water splashes. We build luxurious visual campaigns that make beauty products feel premium and tactile.
                  </p>
                  <DemoLink className="inline-flex w-fit items-center justify-center rounded-full border border-brand-text px-6 py-4 text-base font-medium hover:bg-brand-text hover:text-brand-bg transition-colors">
                    Schedule a demo
                  </DemoLink>
                </div>
                <div className="lg:flex-1 relative min-h-[300px]">
                  <Image
                    src={projects.find((p) => p.slug === "nova-pack")?.thumbnailUrl || featuredProjects[1]?.thumbnailUrl || "/placeholder.jpg"}
                    alt="Cosmetics & Beauty"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="sticky top-[10rem] pb-24">
              <div className="rounded-[3rem] bg-brand-text text-brand-bg overflow-clip lg:h-[40rem] shadow-2xl flex flex-col lg:flex-row border border-brand-bg/20">
                <div className="lg:w-2/5 p-8 sm:p-16 lg:py-24 flex flex-col justify-center">
                  <h3 className="text-3xl lg:text-4xl 2xl:text-5xl font-extrabold mb-6 tracking-tight">Furniture</h3>
                  <p className="text-lg lg:text-xl font-light text-brand-bg/80 mb-10 leading-relaxed">
                    Present sofas, chairs, and lighting in stylish interiors. No photo studios or logistics needed, just flawless CGI styling in any setting.
                  </p>
                  <DemoLink className="inline-flex w-fit items-center justify-center rounded-full border border-brand-bg px-6 py-4 text-base font-medium hover:bg-brand-bg hover:text-brand-text transition-colors">
                    Schedule a demo
                  </DemoLink>
                </div>
                <div className="lg:flex-1 relative min-h-[300px]">
                  <Image
                    src={projects.find((p) => p.slug === "forma-chair")?.thumbnailUrl || "/placeholder.jpg"}
                    alt="Furniture"
                    fill
                    className="object-cover object-[90%_center]"
                  />
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="sticky top-[12rem] pb-24">
              <div className="rounded-[3rem] bg-brand-text text-brand-bg overflow-clip lg:h-[40rem] shadow-2xl flex flex-col lg:flex-row border border-brand-bg/20">
                <div className="lg:w-2/5 p-8 sm:p-16 lg:py-24 flex flex-col justify-center">
                  <h3 className="text-3xl lg:text-4xl 2xl:text-5xl font-extrabold mb-6 tracking-tight">Interior Design</h3>
                  <p className="text-lg lg:text-xl font-light text-brand-bg/80 mb-10 leading-relaxed">
                    Bespoke architectural visualizations with calm proportions, realistic lighting, and premium material direction. Ideal for property developers and interior brands.
                  </p>
                  <DemoLink className="inline-flex w-fit items-center justify-center rounded-full border border-brand-bg px-6 py-4 text-base font-medium hover:bg-brand-bg hover:text-brand-text transition-colors">
                    Schedule a demo
                  </DemoLink>
                </div>
                <div className="lg:flex-1 relative min-h-[300px]">
                  <Image src={projects.find(p => p.slug === "linea-kitchen")?.thumbnailUrl || "/placeholder.jpg"} alt="Interior Design" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Carousel Section */}
      <section className="py-20 sm:py-32 bg-brand-bg-alt relative z-20 rounded-t-[3rem] md:rounded-t-[5vw] border-t border-brand-accent/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full mb-16">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-16 items-end">
            <div className="flex gap-3 flex-col-reverse">
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight">
                Your <span className="text-brand-muted italic">one-stop solution</span> for all your visual needs
              </h2>
              <span className="text-sm uppercase tracking-widest text-brand-muted font-medium">Our 3D Render Services</span>
            </div>
          </AnimatedSection>
        </div>

        {/* The sliding card carousel */}
        <InfiniteCardCarousel />
        
        {/* The 8-grid of sub-services for SEO parity */}
        <div className="mt-16 sm:mt-24 w-full">
          <SubServicesGrid />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-brand-bg relative z-20">
        <AnimatedSection>
          <div className="text-center mb-4">
            <h2 className="text-sm uppercase tracking-widest text-brand-muted font-medium">
              <span>What our clients say</span>
            </h2>
          </div>
          <TestimonialCarousel />
        </AnimatedSection>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-32 bg-brand-bg-alt relative z-20 rounded-t-[3rem] md:rounded-t-[5vw] border-t border-brand-accent/20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight mb-4">
              Frequently asked <span className="text-brand-muted italic">questions</span>
            </h2>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              Everything you need to know about our 3D rendering process, timelines, and deliverables.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <FAQAccordion />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
