import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — Nagarjuna" },
      {
        name: "description",
        content:
          "The terms and conditions that govern your access to and use of the Nagarjuna website, services, and communications.",
      },
      { property: "og:title", content: "Terms and Conditions — Nagarjuna" },
      {
        property: "og:description",
        content:
          "The terms and conditions that govern your access to and use of the Nagarjuna website, services, and communications.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms and Conditions"
      updated="23 May 2026"
      intro="These Terms and Conditions ('Terms') govern your access to and use of the Nagarjuna website, brochures, and related digital services. By using the website, submitting an enquiry, downloading a brochure, or otherwise engaging with us, you agree to be bound by these Terms. If you do not agree, please discontinue use of the website immediately."
      sections={[
        {
          heading: "1. Acceptance of Terms",
          body: (
            <>
              <p>
                By accessing or using this website, you confirm that you have read, understood, and agreed to be bound by
                these Terms, our Privacy Policy, Cookie Policy, and Disclaimer, each of which is incorporated by reference.
              </p>
              <p>
                We may update these Terms from time to time. The most current version is always available on this page.
                Continued use of the website after changes are posted constitutes acceptance of the revised Terms.
              </p>
            </>
          ),
        },
        {
          heading: "2. Eligibility",
          body: "You confirm that you are at least 18 years of age, of sound mind, and legally capable of entering into a binding contract under the laws applicable to you. If you are accessing the website on behalf of an organisation, you confirm that you are authorised to do so and to bind that organisation to these Terms.",
        },
        {
          heading: "3. Use of the Website",
          body: (
            <>
              <p>You may use this website only for lawful, personal, and informational purposes. You agree not to:</p>
              <ul className="ml-5 list-disc space-y-2">
                <li>
                  Misuse the website or attempt to gain unauthorised access to any portion of it, its servers, or related
                  systems.
                </li>
                <li>
                  Use any automated means — including bots, scrapers, or crawlers — to access, copy, or extract data from
                  the website without our prior written consent.
                </li>
                <li>
                  Interfere with the operation of the website, its security features, or the experience of other users.
                </li>
                <li>
                  Upload, transmit, or share any content that is unlawful, defamatory, infringing, harmful, or otherwise
                  objectionable.
                </li>
                <li>
                  Use the website or any information obtained from it for any commercial purpose without our prior
                  written consent.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "4. Project Information",
          body: (
            <>
              <p>
                All project visuals, plans, layouts, prices, configurations, specifications, amenities, possession
                timelines, and other project details published on this website are <strong className="text-[color:var(--navy)]">
                indicative
                </strong> and intended for general reference only. They are subject to change at the developer's sole
                discretion and based on statutory approvals.
              </p>
              <p>
                Nothing on this website constitutes an offer to sell, an invitation to invest, or a binding contract. The
                final terms of any property purchase will be governed by the signed agreement for sale (or equivalent
                contractual document) executed between you and Nagarjuna Corporation or its authorised affiliate.
              </p>
              <p>
                Please refer to our <a href="/disclaimer" className="underline hover:text-[color:var(--navy)]">Disclaimer</a>{" "}
                for important information regarding artistic impressions, pricing, RERA compliance, and forward-looking
                statements.
              </p>
            </>
          ),
        },
        {
          heading: "5. Enquiries, Bookings & Payments",
          body: (
            <>
              <p>
                Submitting an enquiry, requesting a brochure, or scheduling a site visit through this website does not
                constitute a booking, allotment, or guarantee of availability. All bookings are subject to the developer's
                acceptance, completion of know-your-customer (KYC) checks, payment of the applicable booking amount, and
                execution of the relevant contractual documents.
              </p>
              <p>
                Payment terms, milestones, applicable taxes, statutory charges, maintenance deposits, and refund policies
                are set out in the agreement for sale and any allotment letter issued at the time of booking. We do not
                accept payments through this website. Always verify bank account details directly with our sales team
                before transferring any funds.
              </p>
            </>
          ),
        },
        {
          heading: "6. Intellectual Property",
          body: (
            <>
              <p>
                All content on this website — including text, graphics, logos, photographs, renders, videos, brand
                marks, project names, floor plans, software, and design — is owned by or licensed to Nagarjuna
                Corporation and is protected by applicable copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, publish, transmit, display, or create derivative works from
                any part of the website without our prior written consent. Limited personal, non-commercial viewing on a
                single device is permitted.
              </p>
            </>
          ),
        },
        {
          heading: "7. User Submissions",
          body: "Any information you voluntarily submit through enquiry forms, brochure requests, newsletter sign-ups, or other interactive features (excluding personal information governed by our Privacy Policy) shall be treated as non-confidential. By submitting such content, you grant us a perpetual, royalty-free, worldwide licence to use it for the purpose of responding to your request and improving our services.",
        },
        {
          heading: "8. Third-Party Links & Services",
          body: "The website may contain links to third-party websites, channel partners, financial institutions, or service providers. We do not control, endorse, or assume responsibility for the content, accuracy, privacy practices, or availability of any third-party resource. Accessing such resources is at your own risk.",
        },
        {
          heading: "9. Disclaimer of Warranties",
          body: "The website is provided on an 'as is' and 'as available' basis. To the fullest extent permitted by law, we disclaim all warranties, whether express or implied, statutory or otherwise, including without limitation warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, completeness, and uninterrupted availability.",
        },
        {
          heading: "10. Limitation of Liability",
          body: "To the fullest extent permitted by applicable law, Nagarjuna Corporation, its directors, officers, employees, affiliates, and authorised representatives shall not be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising from your use of, or inability to use, the website — even if advised of the possibility of such damages. Our aggregate liability for any claim arising out of or in connection with the website is limited to one thousand Indian rupees (INR 1,000) or the equivalent in the applicable currency.",
        },
        {
          heading: "11. Indemnification",
          body: "You agree to indemnify, defend, and hold harmless Nagarjuna Corporation, its directors, officers, employees, affiliates, and authorised representatives from and against any claims, losses, liabilities, damages, costs, or expenses (including reasonable legal fees) arising out of your use of the website, your breach of these Terms, or your violation of any law or the rights of any third party.",
        },
        {
          heading: "12. Force Majeure",
          body: "We shall not be liable for any failure or delay in performance of our obligations arising from any cause beyond our reasonable control, including but not limited to acts of God, natural disasters, pandemics, war, terrorism, civil unrest, government actions, regulatory changes, labour disputes, supply chain disruptions, or failures of telecommunications or internet networks.",
        },
        {
          heading: "13. Governing Law & Jurisdiction",
          body: "These Terms are governed by and construed in accordance with the laws of India. Any dispute, controversy, or claim arising out of or in connection with these Terms or your use of the website shall be subject to the exclusive jurisdiction of the competent courts at Hyderabad, Telangana, India.",
        },
        {
          heading: "14. Severability",
          body: "If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be replaced by a valid one that achieves, as nearly as possible, the original intent.",
        },
        {
          heading: "15. Contact",
          body: "If you have any questions about these Terms and Conditions or wish to exercise any rights set out herein, please contact us through the Contact page or write to our registered office. We aim to respond within two business days.",
        },
      ]}
    />
  );
}
