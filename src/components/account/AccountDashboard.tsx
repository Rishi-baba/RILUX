"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Heart } from "lucide-react";

import { AddressesPanel } from "@/components/account/AddressesPanel";
import { DetailsPanel } from "@/components/account/DetailsPanel";
import { OrdersPanel } from "@/components/account/OrdersPanel";
import { routes } from "@/lib/content";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "orders", label: "Orders" },
  { id: "addresses", label: "Addresses" },
  { id: "wishlist", label: "Wishlist" },
  { id: "details", label: "Account details" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function DashboardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-[16px] pb-[72px] pt-[40px] md:px-[24px]" aria-busy="true">
      <div className="h-[44px] w-[220px] animate-pulse bg-mist" />
      <div className="mt-[12px] h-[18px] w-[160px] animate-pulse bg-mist" />
      <div className="mt-[40px] grid gap-[24px] md:grid-cols-[220px_1fr] md:gap-[48px]">
        <div className="h-[160px] animate-pulse bg-mist" />
        <div className="h-[260px] animate-pulse bg-mist" />
      </div>
    </div>
  );
}

export function AccountDashboard() {
  const router = useRouter();
  const { user, hydrated, orders, wishlist, signOut, notify } = useStore();
  const [tab, setTab] = useState<TabId>("orders");
  const leaving = useRef(false);

  useEffect(() => {
    if (hydrated && !user && !leaving.current) {
      router.replace(`${routes.login}?redirect=${encodeURIComponent(routes.account)}`);
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user) return <DashboardSkeleton />;

  function onSignOut() {
    leaving.current = true;
    signOut();
    notify("Signed out");
    router.push(routes.home);
  }

  return (
    <div className="mx-auto w-full max-w-[1100px] px-[16px] pb-[72px] pt-[40px] md:px-[24px]">
      <header className="mb-[32px] flex flex-wrap items-end justify-between gap-[16px] border-b border-black/10 pb-[24px]">
        <div>
          <h1 className="font-display text-[40px] uppercase leading-[1.05] text-black">My Account</h1>
          <p className="mt-[6px] font-ui text-[14px] text-ink-soft">Welcome back, {user.firstName}</p>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="font-ui text-[13px] uppercase tracking-[0.08em] text-black underline underline-offset-4 hover:text-brand"
        >
          Sign out
        </button>
      </header>

      <div className="grid gap-[24px] md:grid-cols-[220px_1fr] md:gap-[48px]">
        <nav aria-label="Account sections">
          <div
            role="tablist"
            className="-mx-[16px] flex gap-[8px] overflow-x-auto px-[16px] [scrollbar-width:none] md:mx-0 md:flex-col md:gap-0 md:overflow-visible md:px-0"
          >
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "shrink-0 whitespace-nowrap font-ui text-[14px] text-black transition-colors duration-200 ease-theme",
                    // mobile: pill tabs
                    "rounded-full border px-[16px] py-[8px]",
                    active ? "border-black font-semibold" : "border-black/15 hover:border-black/40",
                    // desktop: vertical list with left bar
                    "md:rounded-none md:border-0 md:border-l-2 md:py-[10px] md:pl-[16px] md:text-left",
                    active ? "md:border-black" : "md:border-transparent md:hover:border-black/20",
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </nav>

        <section
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          className="min-w-0"
        >
          <h2 className="mb-[20px] font-display text-[24px] uppercase text-black">
            {tabs.find((t) => t.id === tab)?.label}
          </h2>
          {tab === "orders" ? <OrdersPanel orders={orders} /> : null}
          {tab === "addresses" ? <AddressesPanel user={user} /> : null}
          {tab === "wishlist" ? (
            <Link
              href={routes.wishlist}
              className="group flex max-w-[420px] items-center gap-[16px] border border-black/10 p-[20px] transition-colors hover:border-black"
            >
              <span className="flex size-[48px] items-center justify-center rounded-full bg-mist">
                <Heart className="size-[20px]" strokeWidth={1.5} aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block font-ui text-[14px] font-medium text-black">View your wishlist</span>
                <span className="block font-ui text-[13px] text-stone">
                  {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
                </span>
              </span>
              <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-[3px]" aria-hidden />
            </Link>
          ) : null}
          {tab === "details" ? <DetailsPanel key={user.email} user={user} /> : null}
        </section>
      </div>
    </div>
  );
}
