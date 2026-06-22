import { createPageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: PAGE_SEO.work.title,
  description: PAGE_SEO.work.description,
  path: "/work",
});

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
