import { Menu } from "lucide-react";
import {
  BagIcon,
  ChevronDownIcon,
  HeartIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";
import { brandName, navItems } from "@/lib/content";
import { cn } from "@/lib/utils";

const hoverFade =
  "transition-opacity duration-[250ms] ease-theme hover:opacity-60";

const iconButton = cn(
  "relative inline-flex items-center justify-center text-ink",
  hoverFade,
);

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="grid h-[56px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-[66px] lg:grid-cols-[1fr_auto] lg:px-[63px]">
        {/* Left cluster: display:contents below lg so menu button and logo become grid cells */}
        <div className="contents lg:flex lg:items-center">
          <button
            type="button"
            aria-label="Open menu"
            className={cn(iconButton, "justify-self-start lg:hidden")}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <a
            href="#"
            className="justify-self-center whitespace-nowrap font-display text-[30px] uppercase leading-none tracking-[0.02em] text-ink lg:mr-8 lg:min-w-[120px]"
          >
            {brandName}
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={cn(
                      "inline-flex items-center font-sans text-[16px] font-normal leading-[25.6px] text-ink",
                      hoverFade,
                    )}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="ml-1.5 rounded-[4px] bg-brand px-[5px] py-0.5 font-sans text-[8px] font-semibold uppercase leading-[11.2px] tracking-[0.24px] text-white">
                        {item.badge}
                      </span>
                    )}
                    {item.hasDropdown && (
                      <ChevronDownIcon
                        aria-hidden
                        size={12}
                        strokeWidth={1.5}
                        className="ml-[3px]"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right cluster */}
        <div className="flex items-center justify-end gap-5">
          <a
            href="#"
            aria-label="Wishlist"
            className={cn(iconButton, "hidden md:inline-flex")}
          >
            <HeartIcon size={20} strokeWidth={1.5} />
          </a>
          <a
            href="#"
            aria-label="Account"
            className={cn(iconButton, "hidden md:inline-flex")}
          >
            <UserIcon size={20} strokeWidth={1.5} />
          </a>
          <button type="button" aria-label="Search" className={iconButton}>
            <SearchIcon size={20} strokeWidth={1.5} />
          </button>
          <a href="#" aria-label="Cart" className={iconButton}>
            <BagIcon size={20} strokeWidth={1.5} />
            <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink font-ui text-[9px] font-semibold leading-none text-white">
              0
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
