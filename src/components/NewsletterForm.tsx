"use client";

import { useState, type FormEvent } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { useStore } from "@/lib/store";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Visual-only signup: validates and confirms; nothing is sent anywhere. Styled for the black footer.
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
      <p className="font-ui text-[10.5px] font-medium uppercase tracking-[0.16em] text-gold-deep">Join the list</p>
      <p className="mt-[6px] font-ui text-[12.5px] leading-[1.6] text-white/60">
        One email when a new shirt drops. No spam, unsubscribe anytime.
      </p>
      <div className="mt-[14px] flex h-[46px] items-center border-b border-white/25 transition-colors focus-within:border-white">
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
          className="min-w-0 flex-1 bg-transparent font-ui text-[14px] text-white outline-none placeholder:text-white/40"
        />
        <button type="submit" aria-label="Subscribe" className="flex size-[34px] flex-none items-center justify-center rounded-full text-white transition-transform duration-200 hover:translate-x-[3px]">
          <ArrowRightIcon className="size-[18px]" strokeWidth={1.5} />
        </button>
      </div>
      {error ? (
        <p id="newsletter-error" className="mt-[6px] font-ui text-[12px] text-[#f97066]">
          {error}
        </p>
      ) : null}
    </form>
  );
}
