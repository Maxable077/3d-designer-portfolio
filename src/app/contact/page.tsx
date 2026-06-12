import { AnimatedSection } from "@/components/AnimatedSection";
import { StudioPortraits } from "@/components/StudioPortraits";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <AnimatedSection className="flex flex-col gap-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-brand-text max-w-lg">
            Looking for product visuals, renders or a flexible 3D support partner?
          </h1>
          <p className="text-xl text-brand-muted leading-relaxed">
            Send me a message and I&apos;ll get back to you.
          </p>
          
          <div className="mt-8 flex flex-col gap-6 text-brand-text">
            <div>
              <p className="text-sm text-brand-muted mb-1">Email</p>
              <a href="mailto:hello@example.com" className="text-lg hover:text-brand-muted transition-colors">hello@example.com</a>
            </div>
            <div>
              <p className="text-sm text-brand-muted mb-1">Socials</p>
              <div className="flex gap-4">
                <a href="#" className="text-lg hover:text-brand-muted transition-colors">Instagram</a>
                <a href="#" className="text-lg hover:text-brand-muted transition-colors">LinkedIn</a>
              </div>
            </div>
            <div>
              <p className="text-sm text-brand-muted mb-1">Location</p>
              <p className="text-lg">Netherlands</p>
            </div>
          </div>

          <div className="pt-6">
            <StudioPortraits compact />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <form className="flex flex-col gap-8 bg-brand-bg-alt p-8 md:p-12 rounded-sm border border-brand-accent">
            <h2 className="text-2xl font-medium tracking-tight mb-4">Start a conversation</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-brand-text">Name</label>
              <input type="text" id="name" className="bg-brand-bg border border-brand-accent p-4 outline-none focus:border-brand-text transition-colors rounded-sm" placeholder="John Doe" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-brand-text">Email</label>
              <input type="email" id="email" className="bg-brand-bg border border-brand-accent p-4 outline-none focus:border-brand-text transition-colors rounded-sm" placeholder="john@company.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-sm font-medium text-brand-text">Company (Optional)</label>
              <input type="text" id="company" className="bg-brand-bg border border-brand-accent p-4 outline-none focus:border-brand-text transition-colors rounded-sm" placeholder="Company Name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-brand-text">Message</label>
              <textarea id="message" rows={5} className="bg-brand-bg border border-brand-accent p-4 outline-none focus:border-brand-text transition-colors rounded-sm resize-none" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="button" className="bg-brand-text text-brand-bg py-4 px-8 font-medium transition-transform hover:scale-[1.02] active:scale-95 mt-4">
              Send Message
            </button>
          </form>
        </AnimatedSection>
      </div>
    </div>
  );
}
