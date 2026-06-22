"use client";

export function InfiniteMarquee() {
  const techStack = [
    { name: "OpenAI", domain: "openai.com" },
    { name: "Anthropic / Claude", domain: "anthropic.com" },
    { name: "Midjourney", domain: "midjourney.com" },
    { name: "Stable Diffusion", domain: "stability.ai" },
    { name: "Blender", domain: "blender.org" },
    { name: "Autodesk Fusion", domain: "autodesk.com" },
    { name: "Chaos V-Ray", domain: "chaos.com" },
    { name: "Adobe Substance 3D", domain: "adobe.com" },
    { name: "Marmoset Toolbag", domain: "marmoset.co" },
    { name: "RizomUV", domain: "rizom-lab.com" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mt-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-12 gap-y-16 items-center justify-items-center opacity-80">
        {techStack.map((item, idx) => (
          <div
            key={idx}
            className="flex h-10 sm:h-12 w-full items-center justify-center grayscale hover:grayscale-0 hover:opacity-100 opacity-70 transition-all duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
               src={`https://icon.horse/icon/${item.domain}?size=large`} 
               alt={item.name} 
               className="h-full w-full object-contain"
               onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.nextElementSibling?.classList.remove('hidden');
               }}
            />
            <span className="hidden text-sm sm:text-base font-semibold tracking-wide text-brand-muted text-center uppercase">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
