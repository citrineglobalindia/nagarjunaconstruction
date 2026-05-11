import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Nagarjuna" },
      { name: "description", content: "How Nagarjuna uses cookies and similar technologies on this website." },
      { property: "og:title", content: "Cookie Policy — Nagarjuna" },
      { property: "og:description", content: "How Nagarjuna uses cookies and similar technologies on this website." },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      updated="01 May 2026"
      intro="This policy explains how we use cookies and similar technologies to recognise you when you visit our website, and the choices you have to manage them."
      sections={[
        {
          heading: "What are Cookies?",
          body: "Cookies are small text files placed on your device when you visit a website. They are widely used to make sites work efficiently and to provide reporting information to site owners.",
        },
        {
          heading: "Types of Cookies We Use",
          body: (
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-[color:var(--navy)]">Essential cookies</strong> — required for the site to function, including navigation and access to secure areas.
              </li>
              <li>
                <strong className="text-[color:var(--navy)]">Performance cookies</strong> — collect anonymous information about how visitors use the site, helping us improve it.
              </li>
              <li>
                <strong className="text-[color:var(--navy)]">Functionality cookies</strong> — remember your preferences (such as language) for a more personalised experience.
              </li>
              <li>
                <strong className="text-[color:var(--navy)]">Marketing cookies</strong> — used to deliver relevant advertising and measure the effectiveness of campaigns.
              </li>
            </ul>
          ),
        },
        {
          heading: "Third-Party Cookies",
          body: "Some cookies are set by third-party services that appear on our pages, such as analytics providers and embedded media. These third parties may use cookies in accordance with their own privacy policies.",
        },
        {
          heading: "Managing Cookies",
          body: "You can control and delete cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of the website and your overall experience.",
        },
        {
          heading: "Updates to this Policy",
          body: "We may update this cookie policy as our practices and applicable regulations evolve. The latest version will always be available on this page.",
        },
      ]}
    />
  );
}
