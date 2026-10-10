import Link from "next/link";
import { ArrowsClockwise, MapPin as PinIcon } from "@phosphor-icons/react/ssr";
import { Banknote, Mail, Phone, Truck } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PaymentIcons } from "@/components/PaymentIcons";
import { SocialButtons } from "@/components/SocialButtons";
import { WhatsAppLogo } from "@/components/WhatsAppLogo";
import { brandName, contact, footerColumns, routes, whatsappHref } from "@/lib/content";

const heading = "mb-[18px] font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-gold";
const link =
  "font-ui text-[14px] leading-[21px] text-cream/75 underline-offset-[4px] transition-colors hover:text-white hover:underline";

const shopLinks = [
  { label: "Shop All", href: routes.collection("all") },
  { label: "New In", href: routes.collection("new-in") },
  { label: "Formal Shirts", href: routes.collection("formal") },
  { label: "Casual Shirts", href: routes.collection("casual") },
  { label: "Giza Cotton", href: routes.collection("giza-cotton") },
];

const promises = [
  { Icon: Truck, title: "Free shipping", text: "On every order in India" },
  { Icon: Banknote, title: "Cash on delivery", text: "Pay when it arrives" },
  { Icon: ArrowsClockwise, title: "7-day exchange", text: "Wrong size? We'll swap it" },
  { Icon: PinIcon, title: "Made in India", text: "Cut and stitched in-house" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      {/* Promise strip */}
      <ul className="grid grid-cols-2 gap-y-[22px] border-b border-gold/20 px-[16px] py-[26px] md:grid-cols-4 md:px-[48px]">
        {promises.map(({ Icon, title, text }) => (
          <li key={title} className="flex items-center gap-[12px]">
            <span className="flex size-[40px] flex-none items-center justify-center rounded-full border border-gold/40 text-gold">
              <Icon size={20} weight="light" aria-hidden />
            </span>
            <span>
              <span className="block font-ui text-[13px] font-medium text-white">{title}</span>
              <span className="block font-ui text-[12px] text-cream/60">{text}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="px-[16px] pb-[90px] pt-[48px] md:px-[48px] md:pb-[32px] md:pt-[64px]">
        {/* Logo + newsletter */}
        <div className="flex flex-col gap-[36px] md:flex-row md:items-end md:justify-between">
          <div>
            <Link href={routes.home} className="block w-fit text-gold" aria-label={`${brandName} home`}>
              <Logo className="h-[52px] w-auto md:h-[64px]" />
            </Link>
            <p className="mt-[14px] max-w-[340px] font-display text-[19px] italic leading-[1.4] text-cream/85">
              Crafted with precision. Worn with pride.
            </p>
          </div>
          <NewsletterForm />
        </div>

        {/* Link columns + contact */}
        <div className="mt-[48px] grid grid-cols-2 gap-x-[16px] gap-y-[36px] border-t border-gold/20 pt-[40px] md:mt-[56px] md:grid-cols-[1fr_1fr_1fr_1.3fr] md:gap-[32px]">
          <div>
            <h4 className={heading}>Shop</h4>
            <ul className="flex flex-col gap-[11px]">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className={heading}>{col.heading}</h4>
              <ul className="flex flex-col gap-[11px]">
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
            <h4 className={heading}>Get in touch</h4>
            <ul className="flex flex-col gap-[12px]">
              <li>
                <a href={`mailto:${contact.email}`} className={`${link} inline-flex items-center gap-[10px] break-all`}>
                  <Mail size={17} aria-hidden className="flex-none text-gold" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={`${link} inline-flex items-center gap-[10px]`}>
                  <Phone size={17} aria-hidden className="flex-none text-gold" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link} inline-flex items-center gap-[10px]`}
                >
                  <WhatsAppLogo className="size-[16px] flex-none text-gold" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
            <p className="mt-[16px] font-ui text-[12px] leading-[1.6] text-cream/55">Mon to Sat, 10am to 7pm IST</p>
          </div>
        </div>

        {/* Social + payments */}
        <div className="mt-[44px] flex flex-col gap-[28px] md:flex-row md:items-end md:justify-between">
          <div>
            <p className={heading}>Follow us</p>
            <SocialButtons />
          </div>
          <div>
            <p className={heading}>We accept</p>
            <PaymentIcons />
          </div>
        </div>

        <div className="mt-[40px] flex flex-col gap-[8px] border-t border-gold/20 pt-[20px] font-ui text-[12px] text-cream/50 md:flex-row md:justify-between">
          <p>© 2026 {brandName}. All rights reserved.</p>
          <p>Designed and made in India</p>
        </div>
      </div>
    </footer>
  );
}
