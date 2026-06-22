"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";

export function ContactFormSection() {
  const searchParams = useSearchParams();
  const intentParam = searchParams.get("intent");
  const intent =
    intentParam === "demo" ? "demo" : intentParam === "estimate" ? "estimate" : "general";

  return <ContactForm intent={intent} />;
}
