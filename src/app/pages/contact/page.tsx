import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/info/ContactForm";
import { PageHero } from "@/components/info/PageHero";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Questions about sizing, orders or fabrics? Get in touch with RILUX."
};

const cards = [
  { icon: Mail, label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  { icon: Phone, label: "Phone", value: "+91 00000 00000", href: "tel:+910000000000" },
  { icon: Clock, label: "Hours", value: "Monday – Saturday, 10:00 – 19:00" },
  { icon: MapPin, label: "Address", value: "Studio address coming soon" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" subtitle="Questions about sizing, fabrics or an order? We&apos;re happy to help." />
      <div className="mx-auto grid max-w-[1100px] gap-10 px-4 pb-[72px] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
        <ul className="flex flex-col gap-3">
          {cards.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="flex items-start gap-4 rounded-[6px] bg-mist p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand">
                <Icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </span>
              <div>
                <p className="mb-1 font-ui text-[12px] font-medium uppercase tracking-[0.08em] text-stone">{label}</p>
                {href ? (
                  <a href={href} className="font-ui text-[14px] text-black underline-offset-2 hover:underline">
                    {value}
                  </a>
                ) : (
                  <p className="font-ui text-[14px] leading-[1.6] text-black">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <ContactForm />
      </div>
    </>
  );
}
