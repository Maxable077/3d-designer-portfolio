import { CONTACT_EMAIL } from "@/lib/site";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string;
  intent?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    if (body.website?.trim()) {
      return NextResponse.json({ ok: true });
    }

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const company = body.company?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const intent = body.intent?.trim() ?? "general";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!resend) {
      return NextResponse.json(
        { error: "Email service is not configured. Please email us directly at max@populique.com." },
        { status: 503 }
      );
    }

    const fromAddress = process.env.RESEND_FROM_EMAIL ?? "Populique <onboarding@resend.dev>";
    const intentLabel =
      intent === "demo" ? "Demo request" : intent === "estimate" ? "Project estimate" : "Contact form";

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `[Populique] ${intentLabel} — ${name}${company ? ` (${company})` : ""}`,
      text: [
        `New message from populique.com`,
        ``,
        `Intent: ${intentLabel}`,
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        ``,
        `Message:`,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
