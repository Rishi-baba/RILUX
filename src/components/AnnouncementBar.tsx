import { announcement } from "@/lib/content";

export function AnnouncementBar() {
  return (
    <div className="flex h-[45px] w-full items-center justify-center gap-3 bg-brand px-4 font-ui text-white">
      <p className="text-[12px] font-normal leading-normal">{announcement.message}</p>
      <a
        href="#"
        className="border-b-[0.67px] border-solid border-white px-[14px] py-1 text-[12px] font-semibold uppercase leading-normal tracking-[0.6px] text-white"
      >
        {announcement.cta}
      </a>
    </div>
  );
}
