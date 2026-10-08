"use client";

import { useStore } from "@/lib/store";

export function Toaster() {
  const { toasts } = useStore();
  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 flex-col items-center gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-in fade-in slide-in-from-bottom-2 rounded-[6px] bg-ink-soft px-4 py-2.5 font-ui text-[13px] text-white shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
