import { AnimatedSection } from "@/components/AnimatedSection";
import { StudioPortraits } from "@/components/StudioPortraits";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <AnimatedSection className="sticky top-32">
          <StudioPortraits />
        </AnimatedSection>
        
        <AnimatedSection delay={0.2} className="flex flex-col gap-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 text-brand-text">
              About the studio
            </h1>
            <div className="flex flex-col gap-6 text-lg text-brand-muted leading-relaxed">
              <p>
                I am Max, a product design student and 3D visualizer based in the Netherlands. The studio is built around a clear visual workflow: direction, modeling and render polish.
              </p>
              <p>
                Specializing in Blender and Fusion 360, I translate ideas, sketches, and CAD models into polished visuals. Whether it&apos;s a lighting concept, modern furniture, or a technical packaging system, I strive to make every render feel tactile, intentional, and premium.
              </p>
              <p>
                Each project moves through the same focused process: define the visual direction, build clean geometry, refine materials and lighting, then deliver assets that feel premium and ready to use.
              </p>
            </div>
          </div>

          <div className="border-t border-brand-accent pt-12">
            <h2 className="text-2xl font-medium tracking-tight mb-6 text-brand-text">Capabilities</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-brand-muted">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-text rounded-full"></span> 3D Modelling</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-text rounded-full"></span> Product Rendering</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-text rounded-full"></span> Technical Presentation</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-text rounded-full"></span> Product Animation</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-text rounded-full"></span> CAD to Visuals</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-text rounded-full"></span> Material Creation</li>
            </ul>
          </div>

          <div className="border-t border-brand-accent pt-12">
            <h2 className="text-2xl font-medium tracking-tight mb-6 text-brand-text">Tools</h2>
            <div className="flex flex-wrap gap-3">
              {['Blender', 'Fusion 360', 'Adobe Illustrator', 'Adobe Photoshop', 'After Effects', 'Figma'].map(tool => (
                <span key={tool} className="px-4 py-2 border border-brand-accent text-sm text-brand-muted rounded-sm">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-brand-text text-brand-bg px-8 py-4 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95"
            >
              Get in touch
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
