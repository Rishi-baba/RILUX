import { FlaskConical, Ruler, Scissors, Sparkles, type LucideIcon } from "lucide-react";

const badges: { label: string; icon: LucideIcon }[] = [
  { label: "Feature One", icon: Ruler },
  { label: "Feature Two", icon: FlaskConical },
  { label: "Feature Three", icon: Scissors },
  { label: "Feature Four", icon: Sparkles },
];

export function FeatureBadges() {
  return (
    <ul className="mx-auto mb-[28px] grid max-w-[1060px] grid-cols-2 gap-[10px] px-4 md:grid-cols-3 md:px-[36px]">
      {badges.map(({ label, icon: Icon }) => (
        <li key={label} className="flex h-[86px] flex-col items-center justify-center gap-[8px] bg-mist text-ink">
          <Icon size={22} strokeWidth={1.25} aria-hidden />
          <span className="font-ui text-[11px]">{label}</span>
        </li>
      ))}
    </ul>
  );
}
