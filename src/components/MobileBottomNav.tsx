"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid } from "lucide-react";
import { HeartIcon, UserIcon } from "@/components/icons";
import { routes } from "@/lib/content";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

// Fixed bottom tab bar on phones (the reference shows one on every page below 768px).
export function MobileBottomNav() {
  const pathname = usePathname();
  const { user, wishlist, hydrated } = useStore();
  const wishCount = hydrated ? wishlist.length : 0;

  const items = [
    { label: "Home", href: routes.home, Icon: Home, active: pathname === routes.home },
    { label: "Category", href: routes.collection("all"), Icon: LayoutGrid, active: pathname.startsWith("/collections") },
    { label: "Account", href: hydrated && user ? routes.account : routes.login, Icon: UserIcon, active: pathname.startsWith("/account") },
    { label: "Wishlist", href: routes.wishlist, Icon: HeartIcon, active: pathname === routes.wishlist, count: wishCount },
  ];

  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-0 bottom-0 z-40 grid h-[60px] grid-cols-4 border-t border-black/10 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {items.map(({ label, href, Icon, active, count }) => (
        <Link
          key={label}
          href={href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "relative flex flex-col items-center justify-center gap-[3px] font-ui text-[10px] text-ink",
            !active && "text-ink/70",
          )}
        >
          <Icon size={20} strokeWidth={active ? 1.8 : 1.4} aria-hidden />
          {label}
          {count ? (
            <span className="absolute left-1/2 top-[7px] ml-[6px] flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-[3px] text-[9px] font-semibold leading-none text-white">
              {count}
            </span>
          ) : null}
        </Link>
      ))}
    </nav>
  );
}
