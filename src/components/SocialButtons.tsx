"use client";

import { siFacebook, siInstagram, siPinterest, siYoutube } from "simple-icons";
import { useStore } from "@/lib/store";

const socials = [
  { label: "Instagram", path: siInstagram.path },
  { label: "Facebook", path: siFacebook.path },
  { label: "YouTube", path: siYoutube.path },
  { label: "Pinterest", path: siPinterest.path },
];

export function SocialButtons() {
  const { notify } = useStore();

  return (
    <div className="flex gap-[10px]">
      {socials.map(({ label, path }) => (
        <button
          key={label}
          type="button"
          aria-label={`RILUX on ${label}`}
          onClick={() => notify(`${label} page coming soon`)}
          className="flex size-[40px] items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/80 transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#0a1426]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-[16px]">
            <path d={path} />
          </svg>
        </button>
      ))}
    </div>
  );
}
