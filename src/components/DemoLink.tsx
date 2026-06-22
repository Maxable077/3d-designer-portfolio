import Link from "next/link";
import { DEMO_URL } from "@/lib/site";
import { ReactNode } from "react";

type DemoLinkProps = {
  className?: string;
  children: ReactNode;
};

export function DemoLink({ className, children }: DemoLinkProps) {
  if (DEMO_URL.startsWith("http")) {
    return (
      <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={DEMO_URL} className={className}>
      {children}
    </Link>
  );
}
