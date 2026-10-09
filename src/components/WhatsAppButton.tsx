"use client";

import { usePathname } from "next/navigation";
import { WhatsAppLogo } from "@/components/WhatsAppLogo";
import { whatsappHref } from "@/lib/content";
import { cn } from "@/lib/utils";

// Floating chat button (right side). Sits above the phone bottom nav, and higher still on
// product pages where the sticky add-to-cart bar is shown. Hidden during checkout.
export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/checkout")) return null;
  const onProduct = pathname.startsWith("/products/");

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "fixed right-4 z-40 flex size-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:scale-105 md:bottom-6 md:right-6",
        onProduct ? "bottom-[136px]" : "bottom-[76px]",
      )}
    >
      <WhatsAppLogo className="size-[28px]" />
    </a>
  );
}
