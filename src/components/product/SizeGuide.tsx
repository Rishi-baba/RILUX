"use client";

import { useEffect } from "react";
import { SidePanel } from "@/components/SidePanel";

const rows = [
  { size: "S", chest: "38", length: "28" },
  { size: "M", chest: "40", length: "29" },
  { size: "L", chest: "42", length: "30" },
  { size: "XL", chest: "44", length: "31" },
  { size: "XXL", chest: "46", length: "32" },
];

const tips = [
  { title: "Chest", body: "Measure around the fullest part of the chest, keeping the tape level." },
  { title: "Length", body: "Measure from the highest point of the shoulder down to the hem." },
];

// Size chart in a right-hand drawer (the brief preferred a side panel over a centred modal).
export function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  // SidePanel doesn't lock page scroll on its own; lock it while the guide is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  return (
    <SidePanel open={open} onClose={onClose} title="Size Guide">
      <div className="px-[20px] py-[24px]">
        <table className="w-full border-collapse font-ui text-[13px] text-black">
          <caption className="mb-[10px] text-left text-[12px] text-stone">
            Indicative garment measurements in inches
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

        <h3 className="mt-[28px] font-display text-[18px] uppercase tracking-[0.04em] text-black">How to measure</h3>
        <ul className="mt-[12px] flex flex-col gap-[14px]">
          {tips.map((tip) => (
            <li key={tip.title}>
              <p className="font-ui text-[13px] font-semibold text-black">{tip.title}</p>
              <p className="mt-[2px] font-ui text-[13px] leading-[1.6] text-stone">{tip.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </SidePanel>
  );
}
