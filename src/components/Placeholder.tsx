import { cn } from "@/lib/utils";

export type PlaceholderTone = "warm" | "sand" | "stone" | "cool" | "dark" | "olive";

const tones: Record<PlaceholderTone, string> = {
  warm: "from-[#8a6a52] via-[#6f523f] to-[#3e2c22]",
  sand: "from-[#e6dccd] via-[#d4c5b0] to-[#b9a68c]",
  stone: "from-[#d9d9d6] via-[#bdbdb8] to-[#8f8f8a]",
  cool: "from-[#9fb3c2] via-[#6f8797] to-[#3d4d59]",
  dark: "from-[#3a3a3a] via-[#262626] to-[#121212]",
  olive: "from-[#8c8a6c] via-[#6b6a50] to-[#3f3f2e]",
};

/**
 * Stand-in for a photograph. Fills its positioned parent (absolute inset-0)
 * unless `className` overrides sizing. Never replace with target-site imagery.
 */
export function Placeholder({
  tone = "stone",
  label,
  className,
}: {
  tone?: PlaceholderTone;
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 overflow-hidden bg-gradient-to-br",
        tones[tone],
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.3" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.3" />
      </svg>
      {label ? (
        <span className="absolute bottom-2 left-2 font-ui text-[10px] uppercase tracking-[0.12em] text-white/60">
          {label}
        </span>
      ) : null}
    </div>
  );
}
