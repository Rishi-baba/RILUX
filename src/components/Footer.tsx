import Link from "next/link";
import { Logo } from "@/components/Logo";
import { brandName, contact, routes, whatsappHref } from "@/lib/content";

// Minimal white footer: four hairline-ruled link columns, an oversized navy logo, and a quiet legal line.
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
    <footer className="border-t border-navy/10 bg-white pb-[68px] text-navy md:pb-0">
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

        <Link href={routes.home} aria-label={`${brandName} home`} className="mt-[56px] block w-full max-w-[520px] text-navy md:mt-[72px]">
          <Logo aria-hidden className="h-auto w-full" />
        </Link>

        <div className="mt-[28px] flex flex-col gap-[8px] border-t border-navy/10 py-[18px] font-ui text-[11px] text-stone sm:flex-row sm:items-center sm:justify-between">
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
      </div>
    </footer>
  );
}
