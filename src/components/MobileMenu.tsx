"use client";

import { useState } from "react";
import Link from "next/link";
import { SidePanel } from "@/components/SidePanel";
import { ChevronDownIcon } from "@/components/icons";
import { brandName, navItems, routes } from "@/lib/content";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/** Left drawer with the nav tree (accordion for items with children) and account shortcuts. */
export function MobileMenu() {
  const { openPanel, setOpenPanel, user, wishlist, hydrated } = useStore();
  const [expanded, setExpanded] = useState<string | null>(null);
  const close = () => setOpenPanel(null);

  const signedIn = hydrated && !!user;
  const wishlistCount = hydrated ? wishlist.length : 0;
  const secondary = [
    { label: signedIn ? "Account" : "Sign in", href: signedIn ? routes.account : routes.login },
    { label: wishlistCount > 0 ? `Wishlist (${wishlistCount})` : "Wishlist", href: routes.wishlist },
    { label: "Track Order", href: routes.trackOrder },
    { label: "Contact", href: routes.contact },
  ];

  return (
    <SidePanel open={openPanel === "menu"} onClose={close} title={brandName} side="left">
      <nav aria-label="Mobile">
        <ul className="px-5">
          {navItems.map((item) => {
            const children = item.children ?? [];
            const isOpen = expanded === item.label;
            const panelId = `mobile-sub-${item.label.replace(/\s+/g, "-").toLowerCase()}`;
            return (
              <li key={item.label} className="border-b border-black/10">
                <div className="flex h-[52px] items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex flex-1 items-center font-sans text-[18px] leading-none text-ink"
                  >
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 rounded-[4px] bg-brand px-[5px] py-0.5 font-sans text-[8px] font-semibold uppercase leading-[11.2px] tracking-[0.24px] text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                  {children.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                      className="flex h-[52px] w-[44px] items-center justify-end text-ink"
                    >
                      <ChevronDownIcon
                        size={16}
                        strokeWidth={1.5}
                        className={cn(
                          "transition-transform duration-[250ms] ease-theme",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                  )}
                </div>
                {children.length > 0 && (
                  <div
                    id={panelId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-[250ms] ease-theme",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <ul className="overflow-hidden" inert={!isOpen}>
                      {children.map((child, i) => (
                        <li key={child.href} className={cn(i === children.length - 1 && "pb-4")}>
                          <Link
                            href={child.href}
                            onClick={close}
                            className="block py-2 pl-4 font-sans text-[15px] text-ink hover:opacity-60"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <ul className="flex flex-col gap-4 px-5 py-6">
          {secondary.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={close}
                className="font-ui text-[14px] text-ink transition-opacity duration-[250ms] ease-theme hover:opacity-60"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </SidePanel>
  );
}
