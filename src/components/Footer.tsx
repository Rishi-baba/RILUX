import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SocialButtons } from "@/components/SocialButtons";
import { brandName, contact, footerColumns, paymentMethods, whatsappHref } from "@/lib/content";

const heading =
  "mb-[19px] font-display text-[16px] font-normal capitalize leading-[20px] text-white [font-variant-caps:small-caps]";
const link =
  "font-ui text-[14px] font-normal capitalize leading-[21px] text-white/75 underline-offset-[3px] transition-colors hover:text-white hover:underline";

export function Footer() {
  return (
    <footer className="bg-black px-[11px] pb-[71px] pt-[42px] text-white md:px-[35px] md:pb-[40px] md:pt-[70px]">
      {/* Logo + newsletter */}
      <div className="mb-[56px] flex flex-col gap-[32px] md:mb-[72px] md:flex-row md:items-start md:justify-between">
        <Link href="/" className="block w-fit font-display text-[38px] uppercase leading-[32px] text-white md:text-[64px] md:leading-[53px]">
          {brandName}
        </Link>
        <NewsletterForm />
      </div>

      {/* Link columns + contact */}
      <div className="grid grid-cols-1 gap-[32px] md:grid-cols-[247px_247px_1fr] md:gap-0">
        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h4 className={heading}>{col.heading}</h4>
            <ul className="flex flex-col gap-3 leading-[21px]">
              {col.links.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className={heading}>Contact</h4>
          <ul className="flex flex-col gap-3 leading-[21px]">
            <li>
              <a href={`mailto:${contact.email}`} className={`${link} inline-flex items-center gap-2 normal-case`}>
                <Mail className="size-[15px]" strokeWidth={1.5} aria-hidden />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={`${link} inline-flex items-center gap-2`}>
                <Phone className="size-[15px]" strokeWidth={1.5} aria-hidden />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2`}>
                <MessageCircle className="size-[15px]" strokeWidth={1.5} aria-hidden />
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-[56px] flex flex-col gap-[20px] border-t border-white/15 pt-[24px] md:mt-[72px] md:flex-row md:items-center md:justify-between md:pr-[72px]">
        <SocialButtons />
        <ul aria-label="Payment methods" className="flex flex-wrap gap-[8px]">
          {paymentMethods.map((method) => (
            <li
              key={method}
              className="rounded-[4px] border border-white/25 px-[10px] py-[4px] font-ui text-[11px] uppercase tracking-[0.06em] text-white/75"
            >
              {method}
            </li>
          ))}
        </ul>
        <p className="font-ui text-[13px] leading-[20.8px] text-white/60">© 2026 {brandName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
