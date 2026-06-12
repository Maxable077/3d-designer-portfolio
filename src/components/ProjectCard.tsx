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

export function ProjectCard({ slug, title, category, year, description, thumbnailUrl }: ProjectCardProps) {
  return (
    <Link href={`/work/${slug}`} className="group block">
      <div className="flex flex-col gap-6">
        <div className="overflow-hidden rounded-sm transition-transform duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:-translate-y-1">
          <div className="relative aspect-[16/9] transition-transform duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.03]">
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <ImagePlaceholder label={`Hero render placeholder — ${title}`} aspectRatio="landscape" className="absolute inset-0" />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-baseline border-b border-brand-accent pb-2">
            <h3 className="text-xl md:text-2xl font-medium tracking-tight text-brand-text transition-colors">{title}</h3>
            <span className="text-sm text-brand-muted">{year}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <p className="text-brand-text/80 text-sm max-w-sm leading-relaxed">{description}</p>
            <p className="text-brand-muted text-sm text-right flex-shrink-0">{category}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
