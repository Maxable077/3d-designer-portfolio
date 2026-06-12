"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const portraits = [
  {
    name: "Max",
    role: "Owner / Creative Lead",
    note: "Direction, concept and client contact",
    src: "/team-owner-silhouette.png",
    alt: "Studio owner portrait in side profile",
  },
  {
    name: "Modeling",
    role: "3D Modeler",
    note: "Clean geometry and CAD-based forms",
    src: "/team-3d-modeler-silhouette.png",
    alt: "3D modeler portrait at a workstation",
  },
  {
    name: "Render",
    role: "Render Artist",
    note: "Lighting, materials and final polish",
    src: "/team-render-artist-silhouette.png",
    alt: "Render artist portrait in a lighting studio",
  },
] as const;

interface StudioPortraitsProps {
  className?: string;
  compact?: boolean;
}

export function StudioPortraits({ className, compact = false }: StudioPortraitsProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className={cn("grid grid-cols-1 gap-4", compact ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
        {portraits.map((portrait, index) => (
          <motion.figure
            key={portrait.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
              delay: index * 0.08,
            }}
            className={cn(
              "group relative overflow-hidden rounded-sm border border-brand-accent bg-brand-bg-alt",
              !compact && index === 0 && "sm:col-span-2"
            )}
          >
            <div className={cn("relative overflow-hidden", compact ? "aspect-[4/5]" : index === 0 ? "aspect-[5/4]" : "aspect-[4/5]")}>
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes={compact ? "(min-width: 768px) 16vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
                className="object-cover transition duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.04]"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />
            </div>

            <figcaption
              className={cn(
                "flex items-start justify-between gap-4 border-t border-brand-accent bg-brand-bg/90 px-5 py-4 backdrop-blur-sm",
                !compact && index > 0 && "flex-col gap-2"
              )}
            >
              <div>
                <h3 className="text-base font-medium tracking-tight text-brand-text">{portrait.name}</h3>
                <p className="text-sm text-brand-muted">{portrait.role}</p>
              </div>
              <p
                className={cn(
                  "max-w-[10rem] text-xs leading-relaxed text-brand-muted",
                  compact || index === 0 ? "text-right" : "text-left"
                )}
              >
                {portrait.note}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
