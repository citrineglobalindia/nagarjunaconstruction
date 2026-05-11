import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Nagarjuna" },
      { name: "description", content: "The terms that govern your use of the Nagarjuna website and services." },
      { property: "og:title", content: "Terms of Use — Nagarjuna" },
      { property: "og:description", content: "The terms that govern your use of the Nagarjuna website and services." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      updated="01 May 2026"
      intro="These terms govern your access to and use of the Nagarjuna website. By using the site, you agree to be bound by these terms. Please read them carefully."
      sections={[
        {
          heading: "Use of the Website",
          body: "You may use this website for lawful, personal, and informational purposes only. You agree not to misuse the site, attempt unauthorised access, or interfere with its operation in any manner.",
        },
        {
          heading: "Project Information",
          body: "All visuals, plans, prices, specifications, and project details are indicative and intended for general reference. They are subject to change at the developer's discretion and do not constitute a legal offer or contract.",
        },
        {
          heading: "Intellectual Property",
          body: "All content on this site — including text, images, logos, renders, and design — is owned by or licensed to Nagarjuna Corporation and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or create derivative works without prior written consent.",
        },
        {
          heading: "Third-Party Links",
          body: "Our website may contain links to third-party sites. We are not responsible for the content, accuracy, or practices of any external website you choose to visit through such links.",
        },
        {
          heading: "Disclaimer",
          body: "The website is provided on an \"as is\" and \"as available\" basis. To the fullest extent permitted by law, we disclaim all warranties, whether express or implied, regarding the site and its content.",
        },
        {
          heading: "Limitation of Liability",
          body: "We will not be liable for any indirect, incidental, or consequential damages arising from your use of the website, even if advised of the possibility of such damages.",
        },
        {
          heading: "Governing Law",
          body: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts at our registered office.",
        },
        {
          heading: "Changes to these Terms",
          body: "We may update these terms from time to time. Continued use of the site after changes are posted constitutes your acceptance of the revised terms.",
        },
      ]}
    />
  );
}
