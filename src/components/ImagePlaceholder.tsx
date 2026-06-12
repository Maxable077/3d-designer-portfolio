import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  label: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | "auto";
}

export function ImagePlaceholder({ label, className, aspectRatio = "landscape" }: ImagePlaceholderProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    auto: "",
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-br from-[#F1F1EB] to-[#E5E6DF] flex items-center justify-center rounded-sm",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {/* Subtle grain overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      ></div>
      <span className="text-[#808080] text-sm tracking-wide font-medium z-10 px-6 text-center select-none">
        {label}
      </span>
    </div>
  );
}
