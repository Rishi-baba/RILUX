"use client";

import { useEffect, useState } from "react";
import { SidePanel } from "@/components/SidePanel";
import { WhatsAppLogo } from "@/components/WhatsAppLogo";
import { whatsappHref } from "@/lib/content";
import { cn } from "@/lib/utils";

// Garment measurements in inches (shirt laid flat). Replace with the final spec sheet when ready.
const rows = [
  { size: "S", chest: 40, shoulder: 17, sleeve: 24.5, length: 28.5, collar: 15 },
  { size: "M", chest: 42, shoulder: 17.5, sleeve: 25, length: 29, collar: 15.5 },
  { size: "L", chest: 44, shoulder: 18, sleeve: 25.5, length: 29.5, collar: 16 },
  { size: "XL", chest: 46, shoulder: 18.5, sleeve: 26, length: 30, collar: 16.5 },
  { size: "XXL", chest: 48, shoulder: 19.5, sleeve: 26.5, length: 31, collar: 17 },
];
const columns = ["chest", "shoulder", "sleeve", "length", "collar"] as const;

const steps = [
  { title: "Shoulder", body: "Straight across the back, from the tip of one shoulder to the other." },
  { title: "Chest", body: "Around the fullest part of the chest, under the arms. Keep the tape level and a finger loose." },
  { title: "Sleeve", body: "From the shoulder seam down to the wrist bone, with your arm relaxed at your side." },
  { title: "Waist", body: "Around your natural waist, just above the navel." },
  { title: "Length", body: "From the highest point of the shoulder, next to the collar, down to where you want the hem." },
  { title: "Collar", body: "Around the base of the neck where the collar sits. Add half an inch so it isn't tight." },
];

const toCm = (inches: number) => Math.round(inches * 2.54 * 2) / 2;

/** Numbered marker on the diagram. */
function Marker({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="9" className="fill-navy" />
      <text x={x} y={y + 3.6} textAnchor="middle" className="fill-gold font-ui text-[10px] font-semibold">
        {n}
      </text>
    </g>
  );
}

/** Front view of a shirt with the six measurement lines. */
function MeasureDiagram() {
  const line = "stroke-gold-deep [stroke-dasharray:4_3]";
  return (
    <svg viewBox="0 0 300 350" role="img" aria-label="Where to measure on a shirt" className="mx-auto h-auto w-full max-w-[300px]">
      {/* shirt */}
      <g className="fill-cream stroke-navy" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M128 28 L78 48 L30 230 L54 238 L92 128 L92 312 Q150 334 208 312 L208 128 L246 238 L270 230 L222 48 L172 28 Q150 40 128 28 Z" />
        <path d="M128 28 L150 60 L136 31 Z M172 28 L150 60 L164 31 Z" className="fill-white" />
        <path d="M150 60 V322" fill="none" />
        <rect x="164" y="92" width="26" height="30" rx="2" fill="none" />
        <path d="M33 218 L56 226 M267 218 L244 226" fill="none" />
      </g>
      <g className="fill-navy">
        {[84, 122, 160, 198, 236, 274].map((y) => (
          <circle key={y} cx="150" cy={y} r="2.2" />
        ))}
      </g>
      {/* measurement lines */}
      <g fill="none" strokeWidth="1.4" className={line}>
        <path d="M80 40 H220" />
        <path d="M95 136 H205" />
        <path d="M232 52 L280 228" />
        <path d="M95 220 H205" />
        <path d="M116 36 V318" />
        <path d="M128 22 Q150 38 172 22" />
      </g>
      <Marker n={1} x={230} y={38} />
      <Marker n={2} x={196} y={148} />
      <Marker n={3} x={286} y={244} />
      <Marker n={4} x={196} y={232} />
      <Marker n={5} x={116} y={332} />
      <Marker n={6} x={150} y={12} />
    </svg>
  );
}

// Size chart + how-to-measure guide in a right-hand drawer.
export function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [unit, setUnit] = useState<"in" | "cm">("in");

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
    <SidePanel open={open} onClose={onClose} title="Size Guide" className="md:max-w-[520px]">
      <div className="px-[20px] py-[24px] md:px-[28px]">
        <div className="mb-[12px] flex items-center justify-between">
          <p className="font-ui text-[12px] text-stone">Shirt measurements, laid flat</p>
          <div role="group" aria-label="Units" className="flex rounded-full border border-navy/20 p-[2px] font-ui text-[11px] font-medium">
            {(["in", "cm"] as const).map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={unit === u}
                onClick={() => setUnit(u)}
                className={cn(
                  "rounded-full px-[12px] py-[4px] uppercase transition-colors",
                  unit === u ? "bg-navy text-white" : "text-navy",
                )}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-ui text-[13px] text-ink">
            <thead>
              <tr className="bg-cream">
                <th scope="col" className="px-[10px] py-[10px] text-left font-semibold">Size</th>
                {columns.map((c) => (
                  <th key={c} scope="col" className="px-[10px] py-[10px] text-left font-semibold capitalize">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.size} className="border-b border-navy/10">
                  <th scope="row" className="px-[10px] py-[10px] text-left font-semibold">{r.size}</th>
                  {columns.map((c) => (
                    <td key={c} className="px-[10px] py-[10px] tabular-nums">
                      {unit === "in" ? r[c] : toCm(r[c])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-[32px] rounded-[6px] bg-[#faf7ef] px-[16px] pb-[20px] pt-[22px] md:px-[22px]">
          <h3 className="font-display text-[26px] leading-none text-navy">
            <span className="border-b-2 border-gold pb-[2px]">How to Measure</span>
          </h3>
          <div className="mt-[22px] grid items-start gap-[20px] md:grid-cols-[1fr_1.05fr]">
            <MeasureDiagram />
            <ol className="flex flex-col gap-[14px]">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-[10px]">
                  <span className="flex size-[22px] flex-none items-center justify-center rounded-full bg-navy font-ui text-[11px] font-semibold text-gold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-ui text-[13px] font-semibold text-navy">{step.title}</p>
                    <p className="mt-[2px] font-ui text-[12px] leading-[1.55] text-ink-soft">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-[20px] border-l-2 border-gold pl-[14px]">
          <p className="font-ui text-[13px] font-semibold text-navy">Between two sizes?</p>
          <p className="mt-[4px] font-ui text-[12.5px] leading-[1.6] text-ink-soft">
            Go one size up for a relaxed fit, or stay with your size for a closer, formal fit. Still unsure? Send us your
            chest and shoulder measurements and we&apos;ll tell you.
          </p>
          <a
            href={whatsappHref("Hi RILUX, can you help me pick the right shirt size?")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[10px] inline-flex items-center gap-[8px] font-ui text-[12.5px] font-medium text-navy underline underline-offset-[3px]"
          >
            <WhatsAppLogo className="size-[15px] text-[#25D366]" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </SidePanel>
  );
}
