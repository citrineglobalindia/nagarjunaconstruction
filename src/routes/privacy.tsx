import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Nagarjuna" },
      { name: "description", content: "How Nagarjuna collects, uses, and protects your personal information." },
      { property: "og:title", content: "Privacy Policy — Nagarjuna" },
      { property: "og:description", content: "How Nagarjuna collects, uses, and protects your personal information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="01 May 2026"
      intro="We respect your privacy. This policy explains what information we collect, how we use it, and the choices you have regarding your data when you interact with our website and services."
      sections={[
        {
          heading: "Information We Collect",
          body: (
            <>
              <p>
                We collect information you provide directly when you make an enquiry, request a brochure, schedule a site
                visit, or subscribe to updates. This typically includes your name, email, phone number, preferred location,
                and any message you choose to share.
              </p>
              <p>
                We also collect limited technical information automatically, such as device type, browser, IP address, and
                pages visited, to keep the site secure and improve performance.
              </p>
            </>
          ),
        },
        {
          heading: "How We Use Your Information",
          body: (
            <>
              <p>We use your information to:</p>
              <ul className="ml-5 list-disc space-y-2">
                <li>Respond to your enquiries and arrange site visits or consultations.</li>
                <li>Share project updates, launch information, and brochures you have requested.</li>
                <li>Improve our website, services, and customer experience.</li>
                <li>Comply with applicable legal and regulatory obligations.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Sharing of Information",
          body: "We do not sell your personal information. We may share it with channel partners, financial institutions, or service providers strictly to deliver the service you have requested, and only under appropriate confidentiality terms.",
        },
        {
          heading: "Data Retention",
          body: "We retain your personal information only for as long as necessary to fulfil the purposes set out in this policy or as required by law. You may request deletion of your data at any time.",
        },
        {
          heading: "Your Rights",
          body: "You have the right to access, correct, or delete your personal information, and to withdraw consent for marketing communications. To exercise these rights, please contact us using the details on the Contact page.",
        },
        {
          heading: "Security",
          body: "We use reasonable administrative, technical, and physical safeguards to protect your information. No system is completely secure, but we work to continuously improve our practices.",
        },
        {
          heading: "Updates to this Policy",
          body: "We may update this policy from time to time. The latest version will always be available on this page with the revised effective date.",
        },
      ]}
    />
  );
}
