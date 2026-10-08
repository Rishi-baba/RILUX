"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const rows = [
  { size: "S", chest: "38", length: "28" },
  { size: "M", chest: "40", length: "29" },
  { size: "L", chest: "42", length: "30" },
  { size: "XL", chest: "44", length: "31" },
  { size: "XXL", chest: "46", length: "32" },
];

export function SizeGuide({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      root.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-[16px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
        className="relative w-full max-w-[480px] rounded-[4px] bg-white p-[24px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-[16px] flex items-center justify-between">
          <h2 id="size-guide-title" className="font-display text-[24px] text-black">
            Size guide
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close size guide"
            onClick={onClose}
            className="flex size-[36px] items-center justify-center text-black"
          >
            <X className="size-[20px]" strokeWidth={1.5} />
          </button>
        </div>
        <table className="w-full border-collapse font-ui text-[13px] text-black">
          <caption className="mb-[8px] text-left text-[12px] text-stone">
            Placeholder measurements in inches
          </caption>
          <thead>
            <tr className="bg-mist">
              <th scope="col" className="px-[12px] py-[10px] text-left font-semibold">Size</th>
              <th scope="col" className="px-[12px] py-[10px] text-left font-semibold">Chest</th>
              <th scope="col" className="px-[12px] py-[10px] text-left font-semibold">Length</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.size} className="border-b border-black/10">
                <th scope="row" className="px-[12px] py-[10px] text-left font-normal">{r.size}</th>
                <td className="px-[12px] py-[10px]">{r.chest}</td>
                <td className="px-[12px] py-[10px]">{r.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
