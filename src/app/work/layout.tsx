import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Case studies in photorealistic product CGI — espresso machines, furniture, lighting, and packaging visuals built for e-commerce and launch campaigns.",
  path: "/work",
});

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
