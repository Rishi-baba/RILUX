import Link from "next/link";
import { ArrowUpRight, ArrowsClockwise, MapPin as PinIcon } from "@phosphor-icons/react/ssr";
import { Banknote, Mail, Phone, Truck } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PaymentIcons } from "@/components/PaymentIcons";
import { SocialButtons } from "@/components/SocialButtons";
import { WhatsAppLogo } from "@/components/WhatsAppLogo";
import { brandName, contact, footerColumns, routes, whatsappHref } from "@/lib/content";

// Blue-and-black footer: a framed dark panel lit by a deep blue glow, with an oversized wordmark.
const heading = "mb-[18px] font-ui text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fa6d4]";
const link =
  "group/link inline-flex items-center gap-[6px] font-ui text-[14px] leading-[22px] text-white/70 transition-colors duration-200 hover:text-white";
const arrow = "size-[12px] -translate-x-[4px] opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100";

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

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className={heading}>{title}</h4>
      <ul className="flex flex-col gap-[10px]">
        {links.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className={link}>
              {item.label}
              <ArrowUpRight className={arrow} weight="bold" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#05070b] p-[8px] pb-[68px] md:p-[14px] md:pb-[14px]">
      <div className="relative isolate overflow-hidden rounded-[18px] bg-[#0a0d13] text-white md:rounded-[24px]">
        {/* Lighting: charcoal base, navy wash, blue glow rising from the lower right */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f17] via-[#0a1222] to-[#0c1a36]" />
          <div className="absolute -bottom-[30%] -right-[10%] h-[85%] w-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(52,96,184,0.55),rgba(20,46,98,0.25)_55%,transparent)] blur-[30px]" />
          <div className="absolute -left-[15%] top-[-20%] h-[60%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(14,38,72,0.6),transparent)] blur-[20px]" />
          {/* hairline frame */}
          <div className="absolute inset-x-0 top-[92px] hidden h-px bg-white/[0.06] lg:block" />
          <div className="absolute inset-y-0 left-[16px] w-px bg-white/[0.05] md:left-[48px]" />
          <div className="absolute inset-y-0 right-[16px] w-px bg-white/[0.05] md:right-[48px]" />
        </div>

        {/* Promise strip */}
        <ul className="grid grid-cols-2 gap-x-[12px] gap-y-[18px] px-[28px] py-[22px] md:px-[72px] md:py-[24px] lg:grid-cols-4">
          {promises.map(({ Icon, title, text }) => (
            <li key={title} className="flex items-center gap-[12px]">
              <span className="flex size-[38px] flex-none items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-[#a9bde6]">
                <Icon size={18} weight="light" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block font-ui text-[12.5px] font-medium text-white">{title}</span>
                <span className="block font-ui text-[11.5px] text-white/50">{text}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="px-[28px] pb-[28px] pt-[44px] md:px-[72px] md:pt-[64px]">
          {/* Brand + columns */}
          <div className="grid gap-[44px] lg:grid-cols-[1.1fr_2fr] lg:gap-[64px]">
            <div>
              <Link href={routes.home} className="block w-fit text-gold" aria-label={`${brandName} home`}>
                <Logo className="h-[44px] w-auto md:h-[52px]" />
              </Link>
              <p className="mt-[16px] max-w-[400px] font-display text-[22px] italic leading-[1.3] text-white/80 md:text-[24px]">
                Crafted with precision. Worn with pride.
              </p>
              <div className="mt-[28px]">
                <NewsletterForm />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-[16px] gap-y-[36px] sm:grid-cols-3 lg:justify-items-end">
              <LinkColumn title="Shop" links={shopLinks} />
              {footerColumns.map((col) => (
                <LinkColumn key={col.heading} title={col.heading} links={col.links} />
              ))}
            </div>
          </div>

          {/* Contact + social */}
          <div className="mt-[52px] flex flex-col gap-[28px] border-t border-white/[0.08] pt-[32px] lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={heading}>Get in touch</p>
              <a
                href={`mailto:${contact.email}`}
                className="group/mail inline-flex items-center gap-[10px] break-all bg-gradient-to-r from-white via-white to-[#9fb6e6] bg-clip-text font-display text-[24px] leading-[1.15] text-transparent sm:text-[32px] md:text-[38px]"
              >
                <Mail size={22} aria-hidden className="flex-none text-[#8fa6d4]" />
                {contact.email}
              </a>
              <div className="mt-[14px] flex flex-wrap items-center gap-x-[22px] gap-y-[8px]">
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={link}>
                  <Phone size={16} aria-hidden className="text-[#8fa6d4]" />
                  {contact.phone}
                </a>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={link}>
                  <WhatsAppLogo className="size-[15px] text-[#8fa6d4]" />
                  Chat on WhatsApp
                </a>
                <span className="font-ui text-[12px] text-white/45">Mon to Sat, 10am to 7pm IST</span>
              </div>
            </div>
            <div className="flex flex-col gap-[22px] lg:items-end">
              <div className="lg:text-right">
                <p className={heading}>Follow us</p>
                <div className="lg:flex lg:justify-end">
                  <SocialButtons />
                </div>
              </div>
              <div className="lg:text-right">
                <p className={heading}>We accept</p>
                <PaymentIcons className="lg:justify-end" />
              </div>
            </div>
          </div>
        </div>

        {/* Oversized wordmark fading into the glow */}
        <div
          aria-hidden
          className="pointer-events-none relative mx-[16px] mt-[12px] aspect-[5/1] overflow-hidden [mask-image:linear-gradient(to_bottom,black_30%,transparent)] md:mx-[48px]"
        >
          {/* shifted up so the crown sits above the crop and the letters fill the band */}
          <Logo className="-mt-[12.2%] block h-auto w-full text-[#5a84d4] opacity-[0.22]" />
        </div>

        <div className="relative flex flex-col gap-[6px] border-t border-white/[0.08] px-[28px] py-[18px] font-ui text-[12px] text-white/45 md:flex-row md:justify-between md:px-[72px]">
          <p>© 2026 {brandName}. All rights reserved.</p>
          <p>Designed and made in India</p>
        </div>
      </div>
    </footer>
  );
}
