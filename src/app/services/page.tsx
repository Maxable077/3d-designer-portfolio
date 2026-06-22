import { AnimatedSection } from "@/components/AnimatedSection";
import { MagneticButton } from "@/components/MagneticButton";
import { PageHero } from "@/components/PageHero";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MonitorPlay, Layers, Zap, Ruler } from "lucide-react";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { faqs } from "@/data/services";
import Image from "next/image";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Product CGI services — photorealistic 3D modeling, texturing, rendering, animation, and interactive visuals for e-commerce and marketing.",
  path: "/services",
});

export default function ServicesPage() {
  const benefits = [
    { icon: MonitorPlay, title: "Photorealistic Quality", desc: "Pixel-perfect rendering that is indistinguishable from traditional photography." },
    { icon: Layers, title: "Endless Flexibility", desc: "Change colors, materials, or angles at any point without reshooting." },
    { icon: Zap, title: "Fast Turnarounds", desc: "Predictable timelines without relying on physical prototypes or shipping." },
    { icon: Ruler, title: "Absolute Precision", desc: "Based entirely on your CAD data for 100% accurate dimensions." }
  ];

  const coreServices = [
    {
      title: "3D Modeling & Texturing",
      subtitle: "The Foundation",
      desc: "We turn your sketches, CAD files, or reference photos into highly optimized, production-ready 3D models. Paired with bespoke material texturing for flawless photorealism.",
      image: "modeling"
    },
    {
      title: "Product Images",
      subtitle: "Visual Impact",
      desc: "From clean, perfectly lit white-background silo shots to fully designed, luxurious lifestyle scenes. We craft visuals that highlight craftsmanship and boost engagement.",
      image: "images"
    },
    {
      title: "Product Animation",
      subtitle: "Motion & Mechanics",
      desc: "Bring your furniture and products to life with expert 3D animation. Perfect for showcasing exploded views, mechanical features, or captivating social media campaigns.",
      video: "animation"
    },
    {
      title: "Interactive Content",
      subtitle: "Immersive Experiences",
      desc: "Step into the future with web-ready AR models and 360° interactive product spins. Let your customers explore every angle before they buy.",
      video: "interactive"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-brand-bg">
      <PageHero
        align="left"
        eyebrow="3D Render Services"
        title={
          <>
            Visuals that drive <span className="italic opacity-90">impact.</span>
          </>
        }
        description="We replace expensive physical photoshoots with scalable, flexible, and photorealistic 3D rendering systems."
      >
        <MagneticButton>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-bg text-brand-text px-8 py-5 text-lg font-medium transition-transform hover:scale-[1.02] active:scale-95"
          >
            Request a quote <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </MagneticButton>
      </PageHero>

      {/* Benefits Grid */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto w-full -mt-20 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-brand-bg-alt rounded-3xl p-8 md:p-12 border border-brand-accent/20 shadow-2xl">
          {benefits.map((benefit, i) => (
            <AnimatedSection key={i} delay={i * 0.1} className="flex flex-col gap-4">
              <benefit.icon className="w-10 h-10 text-brand-text mb-2" strokeWidth={1.5} />
              <h3 className="text-xl font-medium tracking-tight">{benefit.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{benefit.desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Alternating Z-Pattern Services */}
      <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto w-full flex flex-col gap-32 md:gap-48">
        {coreServices.map((service, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div key={index} className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}>
              {/* Text Side */}
              <div className="flex-1 w-full flex flex-col gap-6">
                <AnimatedSection>
                  <p className="text-sm uppercase tracking-widest text-brand-muted font-medium mb-2">{service.subtitle}</p>
                  <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">{service.title}</h2>
                  <p className="text-lg text-brand-muted leading-relaxed mb-8">{service.desc}</p>
                  <ul className="flex flex-col gap-3 mb-10">
                    <li className="flex items-center gap-3 text-brand-text"><CheckCircle2 className="w-5 h-5 text-brand-accent" /> High Resolution Output</li>
                    <li className="flex items-center gap-3 text-brand-text"><CheckCircle2 className="w-5 h-5 text-brand-accent" /> Perfect Material Accuracy</li>
                    <li className="flex items-center gap-3 text-brand-text"><CheckCircle2 className="w-5 h-5 text-brand-accent" /> Ready for Web & Print</li>
                  </ul>
                  <MagneticButton strength={0.1}>
                    <Link
                      href="/work"
                      className="inline-flex items-center justify-center rounded-full border border-brand-accent text-brand-text hover:bg-brand-text hover:text-brand-bg px-8 py-4 text-sm font-medium transition-colors"
                    >
                      See examples
                    </Link>
                  </MagneticButton>
                </AnimatedSection>
              </div>
              
              {/* Image Side */}
              <div className="flex-1 w-full">
                <AnimatedSection delay={0.2} className="relative aspect-[4/5] md:aspect-[3/2] lg:aspect-square w-full rounded-[2rem] overflow-hidden bg-brand-bg-alt shadow-2xl border border-brand-accent/10">
                  {service.video ? (
                    <video
                      src={`/service_${service.video}.mp4`}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <Image 
                      src={`/service_${service.image}.png`} 
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  )}
                </AnimatedSection>
              </div>
            </div>
          );
        })}
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-brand-bg-alt relative z-20 rounded-t-[3rem] md:rounded-t-[5vw] border-t border-brand-accent/20 py-32 mt-20">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Common Questions
            </h2>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              Everything you need to know about pricing, deliverables, and the process.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <FAQAccordion />
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full bg-brand-bg relative z-20 pt-32 pb-48 -mt-10 rounded-t-[3rem] md:rounded-t-[5vw]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection className="flex flex-col items-center gap-10">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tight leading-tight">
              Ready to upgrade your visuals?
            </h2>
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 justify-center rounded-full bg-brand-text text-brand-bg px-10 py-6 text-lg font-medium transition-transform hover:scale-[1.02] active:scale-95"
              >
                Start your project <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
