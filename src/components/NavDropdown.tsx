"use client";

import { useId, useState, type FocusEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@/components/icons";
import type { NavItem } from "@/types/content";
import { cn } from "@/lib/utils";

const hoverFade = "transition-opacity duration-[250ms] ease-theme hover:opacity-60";

/** Desktop nav entry: the label link plus (when the item has children) a hover/focus sub-menu. */
export function NavDropdown({
  item,
  active,
  inverted = false,
}: {
  item: NavItem;
  active: boolean;
  /** White label for the transparent header over the home hero (sub-menu stays dark on white) */
  inverted?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const children = item.children ?? [];
  const hasChildren = children.length > 0;
  const showChevron = hasChildren || item.hasDropdown;

  const onBlur = (e: FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
      e.currentTarget.querySelector<HTMLAnchorElement>("a")?.focus();
    }
  };

  return (
    <li
      className="relative flex h-[66px] items-center"
      onMouseEnter={hasChildren ? () => setOpen(true) : undefined}
      onMouseLeave={hasChildren ? () => setOpen(false) : undefined}
      onFocus={hasChildren ? () => setOpen(true) : undefined}
      onBlur={hasChildren ? onBlur : undefined}
      onKeyDown={hasChildren ? onKeyDown : undefined}
    >
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        aria-haspopup={hasChildren ? "true" : undefined}
        aria-expanded={hasChildren ? open : undefined}
        aria-controls={hasChildren ? menuId : undefined}
        // Re-opening after Escape requires a fresh focus/hover; clicking navigates.
        onClick={() => setOpen(false)}
        className={cn(
          "inline-flex items-center font-sans text-[16px] font-normal leading-[25.6px]",
          hoverFade,
          inverted ? "text-white" : "text-ink",
        )}
      >
        <span className={cn(active && "underline decoration-1 underline-offset-4")}>{item.label}</span>
        {item.badge && (
          <span className="ml-1.5 rounded-[4px] bg-brand px-[5px] py-0.5 font-sans text-[8px] font-semibold uppercase leading-[11.2px] tracking-[0.24px] text-white">
            {item.badge}
          </span>
        )}
        {showChevron && (
          <ChevronDownIcon
            aria-hidden
            size={12}
            strokeWidth={1.5}
            className={cn(
              "ml-[3px] transition-transform duration-[250ms] ease-theme",
              open && "rotate-180",
            )}
          />
        )}
      </Link>

      {hasChildren && (
        <ul
          id={menuId}
          className={cn(
            "absolute left-[-30px] top-full z-10 flex min-w-[190px] flex-col gap-[10px] bg-white px-[30px] py-[22px] shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-all duration-[250ms] ease-theme",
            open
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible translate-y-[6px] opacity-0",
          )}
        >
          {children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block whitespace-nowrap font-sans text-[15px] leading-[1.4] text-ink",
                  hoverFade,
                )}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
