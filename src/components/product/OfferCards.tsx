"use client";

import { useStore } from "@/lib/store";

const offers = [
  { amount: "10% off", code: "CODE10" },
  { amount: "20% off", code: "CODE20" },
  { amount: "30% off", code: "CODE30" },
  { amount: "40% off", code: "CODE40" },
];

export function OfferCards() {
  const { notify } = useStore();

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      notify("Code copied");
    } catch {
      notify(`Code: ${code}`);
    }
  };

  return (
    <ul className="grid grid-cols-1 gap-[8px] min-[400px]:grid-cols-2" aria-label="Offers">
      {offers.map((offer) => (
        <li
          key={offer.code}
          className="flex items-center justify-between gap-[8px] rounded-[4px] border border-[rgb(240,225,205)] bg-[rgb(250,246,240)] px-[12px] py-[10px]"
        >
          <div className="min-w-0">
            <p className="font-ui text-[12px] leading-[1.4] text-black">
              Placeholder offer <span className="font-semibold text-[rgb(200,95,30)]">{offer.amount}</span>
            </p>
            <p className="font-ui text-[10px] leading-[1.4] text-stone">Placeholder terms apply</p>
          </div>
          <button
            type="button"
            onClick={() => copy(offer.code)}
            aria-label={`Copy code ${offer.code}`}
            className="flex-none rounded-[2px] border border-dashed border-[rgb(200,95,30)] px-[6px] py-[3px] font-ui text-[11px] font-medium text-[rgb(200,95,30)]"
          >
            {offer.code}
          </button>
        </li>
      ))}
    </ul>
  );
}
