"use client";

import { usePathname } from "next/navigation";
import { WhatsAppLogo } from "@/components/WhatsAppLogo";
import { getCollection, getProduct, whatsappHref } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Pre-filled WhatsApp message for the page the shopper is on. */
function messageFor(pathname: string): string {
  const [, section, slug] = pathname.split("/");
  if (section === "products" && slug) {
    const product = getProduct(slug);
    if (product) return `Hi RILUX, I'm looking at the ${product.title} (${product.price}). Can you help me with sizes and colours?`;
  }
  if (section === "collections" && slug) {
    const collection = getCollection(slug);
    if (collection) {
      return slug === "all"
        ? "Hi RILUX, I'm browsing your shirts. Can you suggest a few for me?"
        : `Hi RILUX, I'm browsing your ${collection.title} collection. Can you suggest a few shirts?`;
    }
  }
  if (section === "cart") return "Hi RILUX, I have a question about the shirts in my cart before I check out.";
  if (section === "pages" && slug === "track-order") return "Hi RILUX, I'd like an update on my order.";
  if (section === "pages" && slug === "returns") return "Hi RILUX, I'd like to exchange or return a shirt.";
  return "Hi RILUX, I'd like to know more about your shirts.";
}

const RING_TEXT = "CONTACT NOW • CONTACT NOW • ";

// Floating chat button with a slowly rotating "Contact now" ring. Sits above the phone bottom nav,
// and higher still on product pages where the sticky add-to-cart bar is shown. Hidden during checkout.
export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/checkout")) return null;
  const onProduct = pathname.startsWith("/products/");

  return (
    <a
      href={whatsappHref(messageFor(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className={cn(
        "group fixed right-[10px] z-40 flex size-[84px] items-center justify-center md:bottom-[18px] md:right-[18px]",
        onProduct ? "bottom-[124px]" : "bottom-[66px]",
      )}
    >
      <span aria-hidden className="absolute inset-0 rounded-full bg-white/95 shadow-[0_4px_18px_rgba(14,38,72,0.18)]" />
      <svg
        viewBox="0 0 100 100"
        aria-hidden
        className="absolute inset-0 size-full animate-[spin_12s_linear_infinite] group-hover:[animation-play-state:paused]"
      >
        <defs>
          <path id="wa-ring" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-navy font-ui text-[10.5px] font-semibold tracking-[0.2em]">
          <textPath href="#wa-ring" textLength="236">
            {RING_TEXT}
          </textPath>
        </text>
      </svg>
      <span className="relative flex size-[50px] items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-200 group-hover:scale-105">
        <WhatsAppLogo className="size-[27px]" />
      </span>
    </a>
  );
}
