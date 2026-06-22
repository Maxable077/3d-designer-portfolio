import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms and conditions governing use of the Populique website and our 3D visualization and product CGI services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Terms of Service"
      description="The terms that apply when you use our website or engage our studio."
      lastUpdated="June 16, 2026"
    >
      <section>
        <h2>1. Agreement</h2>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to <strong>populique.com</strong> and
          your use of services offered by Populique (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By
          using the website or requesting our services, you agree to these Terms.
        </p>
        <p>
          Project-specific work is also governed by any written proposal, statement of work, or contract
          (&quot;Project Agreement&quot;). If there is a conflict, the Project Agreement prevails for that
          project.
        </p>
      </section>

      <section>
        <h2>2. Services</h2>
        <p>
          Populique provides product CGI, 3D modeling, rendering, animation, and related visual production
          services for commercial clients. Scope, deliverables, timelines, and fees are defined in each
          Project Agreement or written quote accepted by both parties.
        </p>
      </section>

      <section>
        <h2>3. Website use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the website in any unlawful or abusive manner</li>
          <li>Attempt to gain unauthorized access to our systems or data</li>
          <li>Scrape, copy, or republish site content except as permitted by law</li>
          <li>Interfere with the security or performance of the website</li>
        </ul>
        <p>
          Content on this website — including text, visuals, case studies, and branding — is owned by
          Populique or its licensors unless otherwise stated. You may not reuse it without prior written
          permission.
        </p>
      </section>

      <section>
        <h2>4. Client materials</h2>
        <p>
          You represent that you have the rights to any references, CAD files, logos, product designs, or
          other materials you provide. You grant us a limited license to use those materials solely to
          perform the agreed services.
        </p>
        <p>
          You remain responsible for ensuring that requested visuals do not infringe third-party intellectual
          property or misrepresent regulated products.
        </p>
      </section>

      <section>
        <h2>5. Quotes, deposits, and payment</h2>
        <p>
          Quotes are valid for the period stated in the proposal unless otherwise agreed. We may require a
          deposit before production begins. Unless a Project Agreement says otherwise:
        </p>
        <ul>
          <li>Invoices are due within the payment term stated on the invoice</li>
          <li>Late payments may pause work and incur reasonable recovery costs where permitted by law</li>
          <li>Prices exclude applicable taxes, which will be added where required</li>
        </ul>
      </section>

      <section>
        <h2>6. Revisions and approvals</h2>
        <p>
          Each project includes the number of revision rounds stated in the Project Agreement. Additional
          revisions or scope changes may be billed separately. Client approval of look development, camera
          angles, or draft renders may be treated as sign-off for subsequent production stages.
        </p>
      </section>

      <section>
        <h2>7. Delivery and acceptance</h2>
        <p>
          Final files are delivered in the formats specified in the Project Agreement. Unless you report a
          material defect within the review period stated in the proposal, deliverables are deemed accepted.
          We are not responsible for color or display differences caused by your hardware, browser, or
          third-party platforms.
        </p>
      </section>

      <section>
        <h2>8. Intellectual property</h2>
        <p>
          Upon full payment, you receive the usage rights described in the Project Agreement for the final
          delivered assets. Unless otherwise agreed in writing:
        </p>
        <ul>
          <li>Final rendered outputs are licensed for the agreed commercial uses</li>
          <li>We retain ownership of workflows, scene setups, shaders, and reusable production methods</li>
          <li>We may showcase completed work in our portfolio unless a confidentiality agreement says otherwise</li>
        </ul>
      </section>

      <section>
        <h2>9. Confidentiality</h2>
        <p>
          We treat non-public client information as confidential and use it only to perform the services.
          If you require stricter confidentiality terms, please request a mutual NDA before sharing sensitive
          materials.
        </p>
      </section>

      <section>
        <h2>10. Warranties and disclaimers</h2>
        <p>
          We provide services with professional skill and care consistent with industry standards. Except as
          expressly stated in a Project Agreement, services and the website are provided &quot;as is&quot;
          and we disclaim all implied warranties to the fullest extent permitted by law.
        </p>
        <p>
          Estimates generated through online calculators or chat tools are indicative only and are not binding
          offers until confirmed in writing.
        </p>
      </section>

      <section>
        <h2>11. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Populique is not liable for indirect, incidental, special,
          consequential, or punitive damages, or for lost profits, revenue, or data. Our total liability for
          any claim arising out of a project is limited to the fees paid by you for that project, unless a
          mandatory law requires otherwise.
        </p>
      </section>

      <section>
        <h2>12. Termination</h2>
        <p>
          Either party may terminate a project according to the terms in the Project Agreement. If a project
          is cancelled after work has started, you remain responsible for work performed and non-recoverable
          costs up to the termination date.
        </p>
      </section>

      <section>
        <h2>13. Governing law</h2>
        <p>
          These Terms are governed by the laws of the Netherlands, without regard to conflict-of-law rules.
          Disputes shall be submitted to the competent courts in the Netherlands, unless mandatory consumer
          protection rules require otherwise.
        </p>
      </section>

      <section>
        <h2>14. Contact</h2>
        <p>
          For questions about these Terms, contact{" "}
          <a href="mailto:max@populique.com">max@populique.com</a>.
        </p>
      </section>

      <section>
        <h2>15. Changes</h2>
        <p>
          We may update these Terms from time to time. Continued use of the website after changes are posted
          constitutes acceptance of the revised Terms. Active projects remain subject to the Terms in effect
          when the Project Agreement was accepted, unless both parties agree otherwise.
        </p>
      </section>
    </LegalPageShell>
  );
}
