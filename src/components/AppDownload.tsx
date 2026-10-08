"use client";

import { PhoneIcon } from "@/components/icons";
import { useStore } from "@/lib/store";

const stores = ["App Store A", "App Store B"];

// Linen band with generic (logo-free) app store buttons.
export function AppDownload() {
  const { notify } = useStore();

  return (
    <section className="flex h-[152px] w-full flex-col items-center gap-[20px] bg-linen pt-[32px] md:h-[181px] md:gap-[24px] md:pt-[40px]">
      <div className="flex items-center gap-2 text-ink-soft">
        <PhoneIcon className="size-4" aria-hidden />
        <span className="font-ui text-[14px] font-semibold uppercase leading-[20px] tracking-[1.4px] md:text-[16px]">
          Get the app
        </span>
      </div>
      <div className="flex gap-3 md:gap-4">
        {stores.map((store) => (
          <button
            key={store}
            type="button"
            onClick={() => notify("App coming soon")}
            className="flex h-12 w-[150px] flex-col items-start justify-center rounded-[8px] bg-black px-4 text-left text-white md:h-14 md:w-[176px]"
          >
            <span className="font-ui text-[9px] uppercase leading-none">Download on</span>
            <span className="mt-1 font-ui text-[18px] font-semibold leading-none">{store}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
