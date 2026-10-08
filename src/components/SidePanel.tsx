"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
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
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: "left" | "right";
  footer?: ReactNode;
  headerAction?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div aria-hidden={!open} className={cn("fixed inset-0 z-[60]", !open && "pointer-events-none")}>
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-[250ms] ease-theme",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn(
          "absolute top-0 flex h-full w-full max-w-[400px] flex-col bg-white outline-none transition-transform duration-[250ms] ease-theme md:max-w-[371px]",
          side === "right" ? "right-0" : "left-0",
          open ? "translate-x-0" : side === "right" ? "translate-x-full" : "-translate-x-full",
          className,
        )}
      >
        <div className="sticky top-0 z-10 flex h-[60px] items-center justify-between border-b border-black/10 bg-white px-5">
          <h2 className="font-display text-[20px] uppercase tracking-[0.04em] text-ink">{title}</h2>
          <div className="flex items-center gap-4">
            {headerAction}
            <button type="button" onClick={onClose} aria-label="Close" className="text-ink hover:opacity-60">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer ? <div className="border-t border-black/10 bg-white p-4">{footer}</div> : null}
      </div>
    </div>
  );
}
