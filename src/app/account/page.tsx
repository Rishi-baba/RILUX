import type { Metadata } from "next";

import { AccountDashboard } from "@/components/account/AccountDashboard";

export const metadata: Metadata = { title: "My Account" };

export default function AccountPage() {
  return <AccountDashboard />;
}
