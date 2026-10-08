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
  safeRedirect,
} from "@/components/account/form";
import { routes } from "@/lib/content";
import { useStore } from "@/lib/store";

function nameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "";
  return local ? local.charAt(0).toUpperCase() + local.slice(1) : "Customer";
}

export function LoginForm({ redirect }: { redirect?: string }) {
  const router = useRouter();
  const { user, hydrated, signIn, notify } = useStore();
  const signingIn = useRef(false);

  const [mode, setMode] = useState<"login" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState<string>();
  const [resetSent, setResetSent] = useState(false);

  // Already signed in → straight to the account page.
  useEffect(() => {
    if (hydrated && user && !signingIn.current) router.replace(routes.account);
  }, [hydrated, user, router]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (next.email || next.password) return;

    signingIn.current = true;
    // Mock auth: only name + email are kept. The password is never stored or sent.
    signIn({ firstName: nameFromEmail(trimmed), lastName: "", email: trimmed });
    setPassword("");
    notify("Signed in");
    router.push(safeRedirect(redirect, routes.account));
  }

  function onReset(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(resetEmail.trim())) {
      setResetError("Enter a valid email address.");
      return;
    }
    setResetError(undefined);
    setResetSent(true);
  }

  if (mode === "reset") {
    return (
      <AuthShell title="Reset password" subtitle="We'll send you a link to reset your password.">
        {resetSent ? (
          <p
            role="status"
            className="mb-[20px] rounded-[4px] bg-mist px-[14px] py-[12px] text-center font-ui text-[14px] text-black"
          >
            If an account exists, we&apos;ve sent a reset link.
          </p>
        ) : (
          <form onSubmit={onReset} noValidate>
            <Field
              id="reset-email"
              label="Email"
              type="email"
              autoComplete="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              error={resetError}
            />
            <button type="submit" className={primaryButtonClass}>
              Submit
            </button>
          </form>
        )}
        <p className="mt-[20px] text-center">
          <button
            type="button"
            className={linkClass}
            onClick={() => {
              setMode("login");
              setResetSent(false);
            }}
          >
            Back to sign in
          </button>
        </p>
        <DemoNote />
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Login" subtitle="Please enter your email and password.">
      <form onSubmit={onSubmit} noValidate>
        <Field
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Field
          id="login-password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          className="mb-[10px]"
        />
        <p className="mb-[22px]">
          <button
            type="button"
            className={linkClass}
            onClick={() => {
              setResetEmail(email);
              setMode("reset");
            }}
          >
            Forgot your password?
          </button>
        </p>
        <button type="submit" className={primaryButtonClass}>
          Sign in
        </button>
      </form>
      <p className="mt-[22px] text-center font-ui text-[13px] text-stone">
        Don&apos;t have an account?{" "}
        <Link href={routes.register} className={linkClass}>
          Create account
        </Link>
      </p>
      <DemoNote />
    </AuthShell>
  );
}
