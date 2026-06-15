"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";

const subServices = [
  { title: "360 Product Photography", description: "Interactive 360-degree spins for e-commerce." },
  { title: "AR 3D Modeling", description: "WebAR ready assets (glTF/USDZ) for mobile." },
  { title: "Flatlay Renders", description: "Top-down aesthetic arrangements." },
  { title: "3D Texturing Services", description: "Photorealistic material and fabric creation." },
  { title: "Product Feature Rendering", description: "Close-up macro shots highlighting details." },
  { title: "Silo 3D Visualization", description: "Clean white-background studio shots." },
  { title: "Lifestyle 3D Rendering", description: "Products placed in realistic virtual environments." },
  { title: "3D Animation for Social", description: "Short, engaging loops for Instagram & TikTok." },
];

export function SubServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-accent/20 border-y border-brand-accent/20">
      {subServices.map((service, idx) => (
        <Link
          key={idx}
          href="/services"
          className="group block bg-brand-bg-alt p-8 hover:bg-brand-bg transition-colors relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
            <ArrowRight className="w-5 h-5 text-brand-text" />
          </div>
          <h3 className="text-lg font-bold tracking-tight text-brand-text mb-3 pr-8">
            {service.title}
          </h3>
          <p className="text-sm font-light text-brand-muted leading-relaxed">
            {service.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
