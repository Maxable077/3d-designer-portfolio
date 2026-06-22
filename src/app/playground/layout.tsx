import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Playground",
  description: "Experimental AI image generation demo — not part of Populique client services.",
  path: "/playground",
  noIndex: true,
});

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
