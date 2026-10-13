import Link from "next/link";
import { announcement } from "@/lib/content";

const REPEAT = 4;

/** The message and its link, repeated to fill one half of the marquee track. */
function MessageSet({ hidden }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex flex-none items-center">
      {Array.from({ length: REPEAT }, (_, i) => (
        <div key={i} className="flex flex-none items-center gap-4 px-[160px]">
          <p className="whitespace-nowrap text-[12px] font-normal leading-normal">{announcement.message}</p>
          <Link
            href={announcement.href}
            tabIndex={hidden || i > 0 ? -1 : undefined}
            className="whitespace-nowrap border-b-[0.67px] border-solid border-white px-[14px] py-1 text-[12px] font-semibold uppercase leading-normal tracking-[0.6px] text-white"
          >
            {announcement.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}

// Scrolling marquee: the track holds two identical halves and shifts by -50% to loop seamlessly. Pauses on hover.
export function AnnouncementBar() {
  return (
    <div className="group flex h-[45px] w-full items-center overflow-hidden bg-brand font-ui text-white">
      <div className="flex w-max animate-[marquee_70s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <MessageSet />
        <MessageSet hidden />
      </div>
    </div>
  );
}
