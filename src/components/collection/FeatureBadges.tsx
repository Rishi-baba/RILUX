import { Gem, RefreshCcw, Scissors, Truck, type LucideIcon } from "lucide-react";

const badges: { label: string; icon: LucideIcon }[] = [
  { label: "Long-Staple Cotton", icon: Gem },
  { label: "Clean Finishing", icon: Scissors },
  { label: "Free Shipping", icon: Truck },
  { label: "7-Day Exchange", icon: RefreshCcw },
];

export function FeatureBadges() {
  return (
    <ul className="mx-auto mb-[28px] grid max-w-[1060px] grid-cols-2 gap-[10px] px-4 md:grid-cols-4 md:px-[36px]">
      {badges.map(({ label, icon: Icon }) => (
        <li key={label} className="flex h-[86px] flex-col items-center justify-center gap-[8px] bg-mist text-ink">
          <Icon size={22} strokeWidth={1.25} aria-hidden />
          <span className="font-ui text-[11px]">{label}</span>
        </li>
      ))}
    </ul>
  );
}
