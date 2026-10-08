"use client";

import { useState, type FormEvent } from "react";

import { EMAIL_RE, Field, primaryButtonClass } from "@/components/account/form";
import { useStore } from "@/lib/store";
import type { MockUser } from "@/types/content";

type Errors = Partial<Record<keyof MockUser, string>>;

export function DetailsPanel({ user }: { user: MockUser }) {
  const { signIn, notify } = useStore();
  const [draft, setDraft] = useState<MockUser>(user);
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!draft.firstName.trim()) next.firstName = "Enter your first name.";
    if (!EMAIL_RE.test(draft.email.trim())) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    signIn({
      firstName: draft.firstName.trim(),
      lastName: draft.lastName.trim(),
      email: draft.email.trim(),
    });
    notify("Details saved");
  }

  const set = (key: keyof MockUser) => (e: { target: { value: string } }) =>
    setDraft((d) => ({ ...d, [key]: e.target.value }));

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[520px]">
      <div className="grid gap-x-[16px] sm:grid-cols-2">
        <Field id="det-first" label="First name" autoComplete="given-name" value={draft.firstName} onChange={set("firstName")} error={errors.firstName} />
        <Field id="det-last" label="Last name" autoComplete="family-name" value={draft.lastName} onChange={set("lastName")} error={errors.lastName} />
      </div>
      <Field id="det-email" label="Email" type="email" autoComplete="email" value={draft.email} onChange={set("email")} error={errors.email} />
      <button type="submit" className={`${primaryButtonClass} sm:w-auto sm:px-[40px]`}>
        Save
      </button>
    </form>
  );
}
