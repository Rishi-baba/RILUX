"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileMenu } from "@/components/MobileMenu";
import { NavDropdown } from "@/components/NavDropdown";
import { SearchOverlay } from "@/components/SearchOverlay";
import { BagIcon, HeartIcon, SearchIcon, UserIcon } from "@/components/icons";
import { brandName, navItems, routes } from "@/lib/content";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const hoverFade =
  "transition-opacity duration-[250ms] ease-theme hover:opacity-60";

const iconButton = cn(
  "relative inline-flex items-center justify-center text-ink",
  hoverFade,
);

const bubble =
  "absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-[3px] font-ui text-[9px] font-semibold leading-none text-white";

export function Header() {
  const pathname = usePathname();
  const { openPanel, setOpenPanel, cartCount, wishlist, user, hydrated } = useStore();

  // Close any open panel (menu, search, cart) when the route changes.
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    setOpenPanel(null);
  }, [pathname, setOpenPanel]);

  const bagCount = hydrated ? cartCount : 0;
  const wishCount = hydrated ? wishlist.length : 0;
  const accountHref = hydrated && user ? routes.account : routes.login;

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="grid h-[56px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-[66px] lg:grid-cols-[1fr_auto] lg:px-[63px]">
        {/* Left cluster: display:contents below lg so menu button and logo become grid cells */}
        <div className="contents lg:flex lg:items-center">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={openPanel === "menu"}
            onClick={() => setOpenPanel("menu")}
            className={cn(iconButton, "justify-self-start lg:hidden")}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <Link
            href={routes.home}
            className="justify-self-center whitespace-nowrap font-display text-[30px] uppercase leading-none tracking-[0.02em] text-ink lg:mr-8 lg:min-w-[120px]"
          >
            {brandName}
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <NavDropdown
                  key={item.label}
                  item={item}
                  active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                />
              ))}
            </ul>
          </nav>
        </div>

        {/* Right cluster */}
        <div className="flex items-center justify-end gap-5">
          <Link
            href={routes.wishlist}
            aria-label={wishCount > 0 ? `Wishlist (${wishCount} items)` : "Wishlist"}
            className={cn(iconButton, "hidden md:inline-flex")}
          >
            <HeartIcon size={20} strokeWidth={1.5} />
            {wishCount > 0 && <span className={bubble}>{wishCount}</span>}
          </Link>
          <Link
            href={accountHref}
            aria-label={hydrated && user ? "Account" : "Sign in"}
            className={cn(iconButton, "hidden md:inline-flex")}
          >
            <UserIcon size={20} strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            aria-label="Search"
            aria-expanded={openPanel === "search"}
            onClick={() => setOpenPanel("search")}
            className={iconButton}
          >
            <SearchIcon size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label={`Cart (${bagCount} items)`}
            aria-expanded={openPanel === "cart"}
            onClick={() => setOpenPanel("cart")}
            className={iconButton}
          >
            <BagIcon size={20} strokeWidth={1.5} />
            <span className={bubble}>{bagCount}</span>
          </button>
        </div>
      </div>

      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
    </header>
  );
}
