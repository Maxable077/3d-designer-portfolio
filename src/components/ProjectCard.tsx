import Link from "next/link";
import Image from "next/image";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface ProjectCardProps {
  slug: string;
  title: string;
  category: string;
  year: number;
  description: string;
  thumbnailUrl?: string;
}

export function ProjectCard({ slug, title, category, year, thumbnailUrl }: ProjectCardProps) {
  return (
    <Link href={`/work/${slug}`} className="group block relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-105">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder label={`Project — ${title}`} aspectRatio="square" className="absolute inset-0 w-full h-full" />
        )}
      </div>

      {/* Dark Overlay that fades in on hover */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

      {/* Sliding Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
        <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] flex flex-col gap-2 text-white">
          <p className="text-sm uppercase tracking-widest font-medium opacity-80">{category}</p>
          <div className="flex justify-between items-end gap-4 border-b border-white/30 pb-6">
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight">{title}</h3>
            <span className="text-lg opacity-80 shrink-0">{year}</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-brand-accent transition-colors">
            View Project <span className="transform group-hover:translate-x-2 transition-transform">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
