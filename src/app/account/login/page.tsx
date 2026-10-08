import type { Metadata } from "next";

import { LoginForm } from "@/components/account/LoginForm";

export const metadata: Metadata = { title: "Login" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { redirect } = await searchParams;
  return <LoginForm redirect={typeof redirect === "string" ? redirect : undefined} />;
}
