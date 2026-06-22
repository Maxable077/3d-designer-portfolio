import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Populique collects, uses, and protects personal data when you visit our website or request 3D visualization services.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="How we handle your data when you browse our site or work with us."
      lastUpdated="June 16, 2026"
    >
      <section>
        <h2>1. Who we are</h2>
        <p>
          Populique (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides product CGI, 3D visualization,
          and related creative services. This Privacy Policy explains how we process personal data when you
          visit <strong>populique.com</strong> or contact us about a project.
        </p>
        <p>
          For privacy-related questions, email us at{" "}
          <a href="mailto:max@populique.com">max@populique.com</a>.
        </p>
      </section>

      <section>
        <h2>2. Data we collect</h2>
        <p>Depending on how you interact with us, we may collect:</p>
        <ul>
          <li>
            <strong>Contact details</strong> — name, email address, company name, and any information you
            include in contact forms, chat messages, or project briefs.
          </li>
          <li>
            <strong>Project information</strong> — references, CAD files, sketches, moodboards, and other
            materials you share for quoting or production.
          </li>
          <li>
            <strong>Usage data</strong> — pages visited, device type, browser, approximate location, and
            referral source, collected through analytics and hosting logs.
          </li>
          <li>
            <strong>Communications</strong> — records of emails and messages exchanged during sales or
            project delivery.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How we use your data</h2>
        <p>We use personal data to:</p>
        <ul>
          <li>Respond to inquiries and prepare quotes</li>
          <li>Deliver 3D visualization services under contract</li>
          <li>Improve our website, services, and client experience</li>
          <li>Send operational updates related to active projects</li>
          <li>Comply with legal, tax, and accounting obligations</li>
        </ul>
        <p>
          We do not sell your personal data. Marketing emails are only sent where permitted by law and with
          appropriate consent where required.
        </p>
      </section>

      <section>
        <h2>4. Legal bases (GDPR)</h2>
        <p>If you are located in the European Economic Area, we rely on the following legal bases:</p>
        <ul>
          <li>
            <strong>Contract</strong> — to respond to requests and perform services you ask us to deliver
          </li>
          <li>
            <strong>Legitimate interests</strong> — to operate and improve our business, prevent abuse, and
            secure our systems
          </li>
          <li>
            <strong>Consent</strong> — where required for optional analytics, newsletters, or non-essential
            cookies
          </li>
          <li>
            <strong>Legal obligation</strong> — where we must retain records for compliance purposes
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Sharing and processors</h2>
        <p>
          We may share data with trusted service providers that help us run our business, such as hosting
          (Vercel), email, analytics, payment, and file-transfer tools. These providers may only process
          data on our instructions and subject to appropriate safeguards.
        </p>
        <p>
          We may also disclose information if required by law, to protect our rights, or in connection with
          a business transfer such as a merger or acquisition.
        </p>
      </section>

      <section>
        <h2>6. International transfers</h2>
        <p>
          Some providers may process data outside the Netherlands or European Economic Area. Where this
          occurs, we use appropriate safeguards such as Standard Contractual Clauses or equivalent
          mechanisms where required.
        </p>
      </section>

      <section>
        <h2>7. Retention</h2>
        <p>
          We retain personal data only as long as needed for the purposes described above. Project files and
          correspondence are typically kept for the duration of the engagement and for a reasonable period
          afterward for support, warranty, and legal purposes unless you request earlier deletion and we
          have no overriding obligation to retain them.
        </p>
      </section>

      <section>
        <h2>8. Your rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access, correct, or delete your personal data</li>
          <li>Restrict or object to certain processing</li>
          <li>Request data portability</li>
          <li>Withdraw consent where processing is consent-based</li>
          <li>Lodge a complaint with your local supervisory authority</li>
        </ul>
        <p>
          To exercise these rights, contact{" "}
          <a href="mailto:max@populique.com">max@populique.com</a>. We may need to verify your identity
          before responding.
        </p>
      </section>

      <section>
        <h2>9. Cookies and analytics</h2>
        <p>
          Our website may use essential cookies required for security and basic functionality. If we enable
          analytics or marketing cookies, we will provide appropriate notice and, where required, obtain
          consent before placing non-essential cookies.
        </p>
      </section>

      <section>
        <h2>10. Security</h2>
        <p>
          We apply reasonable technical and organizational measures to protect personal data. No online
          transmission or storage system is completely secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>11. Children</h2>
        <p>
          Our services are directed at businesses and professionals. We do not knowingly collect personal
          data from children under 16.
        </p>
      </section>

      <section>
        <h2>12. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top
          of this page indicates when it was last revised. Material changes will be posted on this page.
        </p>
      </section>
    </LegalPageShell>
  );
}
