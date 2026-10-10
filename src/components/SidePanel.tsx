"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "@/components/icons";
import { cn } from "@/lib/utils";

// Slide-in drawer matching the source's side panels: white, 371px wide on desktop,
// sticky header, 0.25s theme easing, dark overlay. Used for cart, filters, mobile menu.
export function SidePanel({
  open,
  onClose,
  title,
  side = "right",
  footer,
  headerAction,
  rail,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: "left" | "right";
  footer?: ReactNode;
  headerAction?: ReactNode;
  /** Desktop-only column attached to the panel's inner edge (right-side panels); scrolls on its own. */
  rail?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Rendered into <body> so a sticky/transformed ancestor can't trap it under the site header.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- portal target exists only after mount
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;
  return createPortal(
    <div aria-hidden={!open} className={cn("fixed inset-0 z-[60]", !open && "pointer-events-none")}>
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-[250ms] ease-theme",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "absolute top-0 flex h-full transition-transform duration-[250ms] ease-theme",
          side === "right" ? "right-0" : "left-0",
          open ? "translate-x-0" : side === "right" ? "translate-x-full" : "-translate-x-full",
        )}
      >
        {rail && side === "right" ? (
          <div className="hidden h-full w-[190px] flex-none flex-col border-r border-navy/10 bg-[#faf7ef] md:flex">{rail}</div>
        ) : null}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          className={cn(
            "flex h-full w-screen max-w-[400px] flex-col bg-white outline-none md:max-w-[371px]",
            className,
          )}
        >
          <div className="sticky top-0 z-10 flex h-[60px] items-center justify-between border-b border-black/10 bg-white px-5">
            <h2 className="font-display text-[21px] uppercase tracking-[0.04em] text-navy">{title}</h2>
            <div className="flex items-center gap-4">
              {headerAction}
              <button type="button" onClick={onClose} aria-label="Close" className="text-ink hover:opacity-60">
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">{children}</div>
          {footer ? <div className="border-t border-black/10 bg-white p-4">{footer}</div> : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
