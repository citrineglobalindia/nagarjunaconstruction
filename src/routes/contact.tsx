import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/section-heading";
import { InquiryDialog } from "@/components/inquiry-dialog";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({ meta: [{ title: "Contact — Nagarjuna Corporation" }] }),
});

const offices = [
  { city: "Dubai", address: "Level 38, ICD Brookfield Place, DIFC", phone: "+971 4 000 0000" },
  { city: "Hyderabad", address: "Banjara Hills, Road No. 12", phone: "+91 40 0000 0000" },
  { city: "London", address: "1 Mayfair Place, W1J 8AJ", phone: "+44 20 0000 0000" },
  { city: "Malé", address: "Ameenee Magu, Maldives", phone: "+960 000 0000" },
];

function ContactPage() {
  return (
    <>
      <section className="bg-[color:var(--navy)] pb-16 pt-36 md:pt-44">
        <div className="container-luxe">
          <SectionHeading invert eyebrow="Get In Touch" title="A private conversation, anywhere in the world" />
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-luxe grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow"><span className="gold-rule" />Our Offices</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {offices.map((o) => (
                <div key={o.city} className="border-t border-[color:var(--navy)]/15 pt-5">
                  <h3 className="font-display text-2xl text-[color:var(--navy)]">{o.city}</h3>
                  <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 text-gold" />{o.address}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4 text-gold" />{o.phone}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="mailto:concierge@nagarjuna.example" className="btn-gold inline-flex gap-2">
                <Mail className="h-4 w-4" /> Email Concierge
              </a>
              <a href="https://wa.me/971000000000" className="inline-flex items-center gap-2 border border-[color:var(--navy)] px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-[color:var(--navy)] hover:bg-[color:var(--navy)] hover:text-cream">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="border border-[color:var(--navy)]/15 bg-card p-10">
            <p className="eyebrow"><span className="gold-rule" />Send a Message</p>
            <h3 className="mt-3 font-display text-3xl text-[color:var(--navy)]">We respond within 24 hours.</h3>
            <p className="mt-2 text-sm text-muted-foreground">Open a private dialogue with one of our advisors.</p>
            <InquiryDialog source="contact-page" trigger={<button className="btn-gold mt-8 w-full">Open Enquiry Form</button>} />
          </div>
        </div>
      </section>
    </>
  );
}
