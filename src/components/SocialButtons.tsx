"use client";

import { AtSign, Globe } from "lucide-react";
import { useStore } from "@/lib/store";

const socials = [
  { label: "Website", Icon: Globe },
  { label: "Social", Icon: AtSign },
];

export function SocialButtons() {
  const { notify } = useStore();

  return (
    <div className="mt-[86px] flex gap-4">
      {socials.map(({ label, Icon }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          onClick={() => notify("Social links coming soon")}
          className="text-black"
        >
          <Icon className="size-[18px]" aria-hidden />
        </button>
      ))}
    </div>
  );
}
