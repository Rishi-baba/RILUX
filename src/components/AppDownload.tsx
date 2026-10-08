import { PhoneIcon } from "@/components/icons";

const stores = ["App Store A", "App Store B"];

// Linen band with generic (logo-free) app store buttons.
export function AppDownload() {
  return (
    <section className="flex h-[181px] w-full flex-col items-center justify-center gap-[18px] bg-linen">
      <div className="flex items-center gap-2 text-ink-soft">
        <PhoneIcon className="size-4" aria-hidden />
        <span className="font-ui text-[14px] font-semibold uppercase tracking-[1.4px]">
          Get the app
        </span>
      </div>
      <div className="flex gap-3">
        {stores.map((store) => (
          <a
            key={store}
            href="#"
            className="flex h-12 w-[150px] flex-col items-start justify-center rounded-[8px] bg-black px-4 text-left text-white md:h-14 md:w-[176px]"
          >
            <span className="font-ui text-[9px] uppercase leading-none">Download on</span>
            <span className="mt-1 font-ui text-[18px] font-semibold leading-none">{store}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
