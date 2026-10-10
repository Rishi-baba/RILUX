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
    <form onSubmit={onSubmit} noValidate className="w-full max-w-[380px]">
      <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Join the list</p>
      <p className="mt-[8px] font-ui text-[13px] leading-[1.6] text-cream/70">
        One email when a new shirt drops. No spam, unsubscribe anytime.
      </p>
      <div className="mt-[14px] flex h-[46px] border-b border-gold/60">
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
        <button type="submit" aria-label="Subscribe" className="flex w-[40px] items-center justify-end text-gold hover:opacity-70">
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
