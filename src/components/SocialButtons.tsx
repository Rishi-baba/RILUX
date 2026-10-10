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
          className="flex size-[38px] items-center justify-center rounded-full border border-gold/50 text-gold transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-navy"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-[16px]">
            <path d={path} />
          </svg>
        </button>
      ))}
    </div>
  );
}
