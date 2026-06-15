import { AnimatedSection } from "@/components/AnimatedSection";
import { StudioPortraits } from "@/components/StudioPortraits";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { MagneticButton } from "@/components/MagneticButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Years Experience", value: 4, suffix: "+" },
    { label: "Projects Delivered", value: 120, suffix: "+" },
    { label: "Global Clients", value: 15, suffix: "" },
    { label: "Coffee Consumed", value: 4000, suffix: "+" },
  ];

  const processSteps = [
    {
      title: "1. Concept & Brief",
      desc: "We start by defining the visual style, mood, and technical requirements based on your CAD files or sketches.",
    },
    {
      title: "2. Modeling & Clay",
      desc: "Building the clean geometry and setting up the initial camera angles. We review untextured 'clay' renders to lock in the layout.",
    },
    {
      title: "3. Materials & Lighting",
      desc: "Applying photorealistic materials and crafting the lighting to highlight the product's key features.",
    },
    {
      title: "4. Final Output",
      desc: "Rendering high-resolution files, followed by post-production polishing and delivering the final assets.",
    },
  ];

  return (
    <div className="flex flex-col bg-brand-bg">
      {/* Immersive Studio Hero */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-brand-bg/80 z-10" /> {/* Dark overlay over hero */}
        <div className="absolute inset-0 z-0">
           <ImagePlaceholder label="Studio / Behind the scenes" className="w-full h-full object-cover" aspectRatio="landscape" />
        </div>
        <div className="relative z-20 text-center px-6 max-w-4xl flex flex-col items-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-6">
              We build visual <span className="italic">worlds.</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted font-light max-w-2xl mx-auto">
              A boutique 3D visualization studio specializing in high-end product rendering and motion.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* About the studio (Text + Portraits) */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          <AnimatedSection className="flex flex-col gap-8">
            <p className="text-sm uppercase tracking-widest text-brand-muted font-medium">Who we are</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
              Driven by a relentless pursuit of photorealism and perfect lighting.
            </h2>
            <div className="flex flex-col gap-6 text-lg text-brand-muted leading-relaxed font-light">
              <p>
                I am Max, a product design student and 3D visualizer based in the Netherlands. The studio is built around a clear visual workflow: direction, precision modeling, and render polish.
              </p>
              <p>
                Specializing in Blender and Fusion 360, I translate ideas, sketches, and CAD models into polished visuals. Whether it's a lighting concept, modern furniture, or a technical packaging system, I strive to make every render feel tactile, intentional, and premium.
              </p>
            </div>
            <div className="mt-4">
              <MagneticButton strength={0.1}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-brand-accent text-brand-text hover:bg-brand-text hover:text-brand-bg px-8 py-4 text-sm font-medium transition-colors"
                >
                  Meet the team
                </Link>
              </MagneticButton>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="relative h-full min-h-[400px]">
            <StudioPortraits />
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-brand-bg-alt relative z-10 border-y border-brand-accent/20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-brand-muted font-medium mb-4">The Advantage</h2>
            <h3 className="text-4xl md:text-5xl font-medium tracking-tight">Why Choose Us</h3>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Cost Effective", desc: "No need to build physical sets, hire photographers, or ship prototypes around the world." },
              { title: "Infinite Scalability", desc: "Easily generate new colorways, materials, or angles without starting from scratch." },
              { title: "Pixel Perfect Control", desc: "Absolute control over lighting, environment, and camera settings down to the millimeter." }
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="bg-brand-bg border border-brand-accent/30 p-8 flex flex-col gap-4 group hover:border-brand-text transition-colors">
                <CheckCircle2 className="w-8 h-8 text-brand-text" />
                <h4 className="text-xl font-medium tracking-tight">{item.title}</h4>
                <p className="text-brand-muted leading-relaxed">{item.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll-driven Process Timeline */}
      <section className="py-32 px-6 max-w-7xl mx-auto w-full">
        <AnimatedSection className="mb-20 text-center">
          <h2 className="text-sm uppercase tracking-widest text-brand-muted font-medium mb-4">Workflow</h2>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tight">How we work</h3>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {processSteps.map((step, index) => (
            <AnimatedSection key={index} delay={index * 0.15} className="relative group">
              <div className="h-0.5 w-full bg-brand-accent/20 absolute top-0 left-0 hidden lg:block overflow-hidden">
                <div className="h-full w-full bg-brand-text -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]" />
              </div>
              <div className="pt-8 border-t border-brand-accent/20 lg:border-none">
                <h4 className="text-xl font-medium tracking-tight mb-4 group-hover:text-brand-accent transition-colors">{step.title}</h4>
                <p className="text-brand-muted leading-relaxed">{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Dark "By the numbers" Bar */}
      <section className="w-full bg-brand-text text-brand-bg py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 divide-x divide-brand-bg/20">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-2 items-center text-center px-4">
              <div className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm uppercase tracking-widest opacity-80 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Footer overlapping fix (bottom padding added to let footer slide up correctly) */}
      <div className="h-10 bg-brand-bg"></div>
    </div>
  );
}
