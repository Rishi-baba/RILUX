import type { Metadata } from "next";

import { RegisterForm } from "@/components/account/RegisterForm";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return <RegisterForm />;
}
