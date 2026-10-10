"use client";

import { useState, type FormEvent } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { useStore } from "@/lib/store";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Visual-only signup: validates and confirms; nothing is sent anywhere.
export function NewsletterForm() {
  const { notify } = useStore();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    setEmail("");
    notify("Thanks for subscribing");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-[420px]">
      <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8fa6d4]">Join the list</p>
      <p className="mt-[8px] font-ui text-[13px] leading-[1.6] text-white/60">
        One email when a new shirt drops. No spam, unsubscribe anytime.
      </p>
      <div className="mt-[16px] flex h-[52px] items-center rounded-full border border-white/12 bg-white/[0.04] pl-[20px] pr-[5px] backdrop-blur transition-colors focus-within:border-[#5b84d6]/70">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="min-w-0 flex-1 bg-transparent font-ui text-[14px] text-white outline-none placeholder:text-white/45"
        />
        <button type="submit" aria-label="Subscribe" className="flex size-[42px] flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#3d6cc4] to-[#16336a] text-white shadow-[0_6px_20px_-6px_rgba(61,108,196,0.7)] transition-transform hover:scale-105">
          <ArrowRightIcon className="size-[18px]" strokeWidth={1.5} />
        </button>
      </div>
      {error ? (
        <p id="newsletter-error" className="mt-[6px] font-ui text-[12px] text-red-400">
          {error}
        </p>
      ) : null}
    </form>
  );
}
