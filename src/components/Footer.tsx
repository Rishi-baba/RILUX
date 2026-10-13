import Link from "next/link";
import { Logo } from "@/components/Logo";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PaymentIcons } from "@/components/PaymentIcons";
import { SocialButtons } from "@/components/SocialButtons";
import { brandName, contact, routes, whatsappHref } from "@/lib/content";

// Minimal footer, white fading to a pale navy with a gold glow in the bottom-right corner: four hairline-ruled link columns,
// an oversized navy logo beside the newsletter signup and socials, and a quiet legal line with payment marks.
const label = "mb-[12px] font-ui text-[10.5px] uppercase tracking-[0.12em] text-stone";
const link = "font-ui text-[14px] text-charcoal transition-colors duration-200 hover:text-navy";

const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", href: routes.collection("all") },
      { label: "New In", href: routes.collection("new-in") },
      { label: "Formal", href: routes.collection("formal") },
      { label: "Casual", href: routes.collection("casual") },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", href: routes.contact },
      { label: "Track Order", href: routes.trackOrder },
      { label: "Returns", href: routes.returns },
      { label: "FAQs", href: routes.faq },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: routes.about },
      { label: "Shipping", href: routes.shipping },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "WhatsApp", href: whatsappHref(), external: true },
      { label: contact.email, href: `mailto:${contact.email}`, external: true },
    ],
  },
];

const legal = [
  { label: "Terms", href: routes.terms },
  { label: "Privacy", href: routes.privacy },
];

export function Footer() {
  return (
    <footer
      className="border-t border-navy/10 pb-[68px] text-navy md:pb-0"
      style={{
        background:
          "radial-gradient(90% 80% at 90% 110%, color-mix(in oklab, var(--gold) 75%, transparent) 0%, transparent 65%), linear-gradient(to bottom, #fff, color-mix(in oklab, var(--navy) 14%, #fff))",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-[20px] md:px-[34px]">
        <div className="grid grid-cols-2 gap-x-[24px] gap-y-[32px] pt-[56px] md:pt-[80px] lg:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className={label}>{col.title}</p>
              <ul className="flex flex-col gap-[8px] border-l border-navy/15 pl-[12px]">
                {col.links.map((item) => (
                  <li key={item.label} className="min-w-0">
                    {item.external ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={`${link} block truncate`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className={link}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Same 4-column grid as the links above, so the signup lines up under "Get in touch". */}
        <div className="mt-[48px] grid gap-x-[24px] gap-y-[40px] md:mt-[64px] lg:grid-cols-4 lg:items-end">
          <Link href={routes.home} aria-label={`${brandName} home`} className="block w-full max-w-[520px] text-navy lg:col-span-3">
            <Logo aria-hidden className="h-auto w-full" />
          </Link>
          <div className="flex flex-col gap-[20px]">
            <NewsletterForm />
            <SocialButtons />
          </div>
        </div>

        <div className="mt-[48px] flex flex-col gap-[16px] border-t border-navy/10 py-[20px] font-ui text-[11px] text-stone lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-[24px]">
            <p>© 2026 {brandName}</p>
            <ul className="flex gap-[20px]">
              {legal.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors duration-200 hover:text-navy">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <PaymentIcons className="gap-[6px] lg:justify-end" />
        </div>
      </div>
    </footer>
  );
}
