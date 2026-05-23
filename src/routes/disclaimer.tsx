import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Nagarjuna" },
      {
        name: "description",
        content:
          "Important disclaimers regarding the information, visuals, pricing, and project details presented on the Nagarjuna website.",
      },
      { property: "og:title", content: "Disclaimer — Nagarjuna" },
      {
        property: "og:description",
        content:
          "Important disclaimers regarding the information, visuals, pricing, and project details presented on the Nagarjuna website.",
      },
    ],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Disclaimer"
      updated="23 May 2026"
      intro="Please read this disclaimer carefully before relying on any information presented on the Nagarjuna website, brochures, advertisements, or other communication channels. By using or accessing this website, you acknowledge and accept the terms of this disclaimer."
      sections={[
        {
          heading: "General",
          body: (
            <>
              <p>
                The information contained on this website is provided in good faith and intended for general informational
                purposes only. While we make every reasonable effort to keep the content accurate and up to date, we make
                no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity,
                reliability, availability, or completeness of any information on the site.
              </p>
              <p>
                Nothing on this website constitutes an offer to sell, a solicitation to purchase, or an invitation to
                invest in any project, residence, or service. All transactions are subject to a separate written agreement
                executed between you and Nagarjuna Corporation or its authorised affiliate.
              </p>
            </>
          ),
        },
        {
          heading: "Artistic Impressions, Renders & Visuals",
          body: (
            <>
              <p>
                All images, renders, walk-throughs, floor plans, master plans, elevations, models, and stock photographs
                shown on this website or in any marketing material are <strong className="text-[color:var(--navy)]">
                artistic impressions
                </strong> and intended only to convey a general idea of the development.
              </p>
              <p>
                Actual interiors, exteriors, furnishings, fixtures, landscaping, and surroundings may vary on the basis of
                the final approved plans, statutory approvals, site conditions, and the developer's discretion. Photographs
                of similar developments, locations, or international references are illustrative only and do not represent
                the actual project.
              </p>
            </>
          ),
        },
        {
          heading: "Pricing, Configurations & Specifications",
          body: (
            <>
              <p>
                All prices, sizes, configurations, unit mixes, amenities, materials, brands, and specifications mentioned
                on this website are <strong className="text-[color:var(--navy)]">indicative</strong> and subject to change
                without prior notice at the sole discretion of the developer.
              </p>
              <p>
                Stamp duty, registration charges, GST or VAT, maintenance deposits, parking charges, statutory levies, and
                other applicable taxes are <strong className="text-[color:var(--navy)]">not included</strong> in the
                indicative price unless expressly stated. The final price, payment schedule, and inclusions will be set
                out in the signed agreement for sale or equivalent contractual document.
              </p>
              <p>
                Prices shown in any currency other than the project's home currency are approximate conversions for
                convenience only and may not reflect prevailing exchange rates at the time of transaction.
              </p>
            </>
          ),
        },
        {
          heading: "Regulatory & RERA Information",
          body: (
            <>
              <p>
                Projects marketed on this website may be governed by the Real Estate (Regulation and Development) Act,
                2016 (RERA) in India, or by the equivalent regulatory authority in the project's jurisdiction (such as
                DLD/RERA Dubai, the Maldives Land and Survey Authority, or the relevant UK planning authority).
              </p>
              <p>
                Where applicable, the RERA registration number, project status, possession schedule, and approved plans
                for each project are available on the official regulator's website and at our sales office on request.
                Prospective purchasers are advised to verify all such information independently before making any
                financial commitment.
              </p>
            </>
          ),
        },
        {
          heading: "Forward-Looking Statements",
          body: "Statements made on this website regarding handover dates, construction milestones, expected returns, rental yields, capital appreciation, or future events are forward-looking and based on assumptions and information available at the time of publication. Such statements are not guarantees of future performance and may change due to factors beyond our control, including statutory approvals, market conditions, and force majeure events.",
        },
        {
          heading: "Investment Considerations",
          body: (
            <>
              <p>
                The purchase of real estate involves risk. Past performance of any project, location, or asset class is
                not indicative of future results. Information presented on the website should not be construed as
                investment, legal, tax, or financial advice.
              </p>
              <p>
                Prospective buyers are encouraged to seek independent professional advice from qualified legal, tax, and
                financial advisors before entering into any transaction. Nagarjuna Corporation and its affiliates accept
                no liability for decisions made on the basis of website content alone.
              </p>
            </>
          ),
        },
        {
          heading: "Third-Party Information & Links",
          body: "This website may contain links to or references to external websites, partner brands, financial institutions, lifestyle services, and third-party content. We do not endorse, control, or assume responsibility for the accuracy, content, privacy practices, or availability of any external resource. Visiting such links is at your own risk.",
        },
        {
          heading: "No Agency or Brokerage Relationship",
          body: "Submitting an enquiry, downloading a brochure, or interacting with our concierge does not create any agency, brokerage, partnership, or fiduciary relationship between you and Nagarjuna Corporation. Authorised channel partners and sales representatives identify themselves in writing.",
        },
        {
          heading: "Limitation of Liability",
          body: "To the fullest extent permitted by applicable law, Nagarjuna Corporation, its directors, officers, employees, affiliates, and authorised representatives shall not be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising from your access to, use of, or reliance on this website or any information contained within it.",
        },
        {
          heading: "Updates to this Disclaimer",
          body: "We may revise this disclaimer from time to time to reflect changes in our practices, applicable laws, or project offerings. The most current version will always be available on this page with the revised effective date. Continued use of the website after any changes constitutes acceptance of the revised disclaimer.",
        },
      ]}
    />
  );
}
