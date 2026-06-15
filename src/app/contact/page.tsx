import { AnimatedSection } from "@/components/AnimatedSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { MagneticButton } from "@/components/MagneticButton";
import { ArrowRight, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col bg-brand-bg-alt w-full min-h-screen">
      {/* Dark Immersive Hero */}
      <section className="w-full bg-brand-text text-brand-bg pt-40 pb-20 md:pt-56 md:pb-32 px-6 rounded-b-[3rem] md:rounded-b-[5vw] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-widest font-medium opacity-80 mb-6">Let's talk</p>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-medium tracking-tighter mb-8 max-w-5xl leading-none">
              Start your project.
            </h1>
            <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto font-light mb-12">
              Looking for product visuals, renders or a flexible 3D partner? Drop us a line.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto w-full -mt-20 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 bg-brand-bg rounded-3xl p-8 md:p-16 border border-brand-accent/20 shadow-2xl">
          {/* Info Side */}
          <AnimatedSection className="flex flex-col gap-12">
            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-8 text-brand-text">Contact details</h2>
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-bg-alt flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-text" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-muted uppercase tracking-widest font-medium mb-1">Email</p>
                    <a href="mailto:hello@maxable.com" className="text-lg font-medium hover:text-brand-accent transition-colors">hello@maxable.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-bg-alt flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-text" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-muted uppercase tracking-widest font-medium mb-1">Location</p>
                    <p className="text-lg font-medium">Amsterdam, Netherlands</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-brand-accent/20">
              <p className="text-sm text-brand-muted uppercase tracking-widest font-medium mb-4">Follow us</p>
              <div className="flex gap-4">
                <a href="#" className="px-6 py-3 rounded-full border border-brand-accent text-sm font-medium hover:bg-brand-text hover:text-brand-bg transition-colors">Instagram</a>
                <a href="#" className="px-6 py-3 rounded-full border border-brand-accent text-sm font-medium hover:bg-brand-text hover:text-brand-bg transition-colors">LinkedIn</a>
              </div>
            </div>
          </AnimatedSection>

          {/* Form Side */}
          <AnimatedSection delay={0.2}>
            <form className="flex flex-col gap-8">
              <h2 className="text-3xl font-medium tracking-tight mb-4 text-brand-text">Send a message</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-brand-muted font-medium transition-colors group-focus-within:text-brand-text">Name</label>
                  <input type="text" id="name" className="bg-transparent border-b-2 border-brand-accent/50 py-3 outline-none focus:border-brand-text transition-colors rounded-none text-lg" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-brand-muted font-medium transition-colors group-focus-within:text-brand-text">Email</label>
                  <input type="email" id="email" className="bg-transparent border-b-2 border-brand-accent/50 py-3 outline-none focus:border-brand-text transition-colors rounded-none text-lg" placeholder="john@company.com" />
                </div>
              </div>

              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="company" className="text-xs uppercase tracking-widest text-brand-muted font-medium transition-colors group-focus-within:text-brand-text">Company (Optional)</label>
                <input type="text" id="company" className="bg-transparent border-b-2 border-brand-accent/50 py-3 outline-none focus:border-brand-text transition-colors rounded-none text-lg" placeholder="Your brand name" />
              </div>

              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-brand-muted font-medium transition-colors group-focus-within:text-brand-text">Project Details</label>
                <textarea id="message" rows={4} className="bg-transparent border-b-2 border-brand-accent/50 py-3 outline-none focus:border-brand-text transition-colors rounded-none resize-none text-lg" placeholder="Tell us about the deliverables you need..."></textarea>
              </div>

              <div className="pt-6">
                <MagneticButton strength={0.1}>
                  <button type="button" className="inline-flex items-center justify-center rounded-full bg-brand-text text-brand-bg px-10 py-5 text-lg font-medium transition-transform hover:scale-[1.02] active:scale-95">
                    Submit Request <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </MagneticButton>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Accordion at the bottom */}
      <section className="py-24 px-6 max-w-4xl mx-auto w-full">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-brand-muted">
            Here are some quick answers before you reach out.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <FAQAccordion />
        </AnimatedSection>
      </section>
      
      {/* Footer overlapping fix */}
      <div className="h-20 bg-brand-bg-alt"></div>
    </div>
  );
}
