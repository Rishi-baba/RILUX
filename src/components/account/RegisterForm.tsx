"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  AuthShell,
  DemoNote,
  EMAIL_RE,
  Field,
  linkClass,
  primaryButtonClass,
} from "@/components/account/form";
import { routes } from "@/lib/content";
import { useStore } from "@/lib/store";

type Errors = Partial<Record<"firstName" | "lastName" | "email" | "password", string>>;

export function RegisterForm() {
  const router = useRouter();
  const { user, hydrated, signIn, notify } = useStore();
  const creating = useRef(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emails, setEmails] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (hydrated && user && !creating.current) router.replace(routes.account);
  }, [hydrated, user, router]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!firstName.trim()) next.firstName = "Enter your first name.";
    if (!lastName.trim()) next.lastName = "Enter your last name.";
    if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;

    creating.current = true;
    // Mock auth: the password is never stored or sent.
    signIn({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() });
    setPassword("");
    notify("Account created");
    router.push(routes.account);
  }

  return (
    <AuthShell title="Create account" subtitle="Please fill in the information below.">
      <form onSubmit={onSubmit} noValidate>
        <Field
          id="reg-first"
          label="First name"
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName}
        />
        <Field
          id="reg-last"
          label="Last name"
          autoComplete="family-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={errors.lastName}
        />
        <Field
          id="reg-email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Field
          id="reg-password"
          label="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <label
          htmlFor="reg-emails"
          className="mb-[24px] flex cursor-pointer items-center gap-[10px] font-ui text-[13px] text-black"
        >
          <input
            id="reg-emails"
            type="checkbox"
            checked={emails}
            onChange={(e) => setEmails(e.target.checked)}
            className="size-[16px] accent-black"
          />
          Sign up for emails
        </label>
        <button type="submit" className={primaryButtonClass}>
          Create
        </button>
      </form>
      <p className="mt-[22px] text-center font-ui text-[13px] text-stone">
        Already have an account?{" "}
        <Link href={routes.login} className={linkClass}>
          Sign in
        </Link>
      </p>
      <DemoNote />
    </AuthShell>
  );
}
