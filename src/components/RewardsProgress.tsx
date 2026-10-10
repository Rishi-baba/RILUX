import { Check, Gift, Truck } from "@phosphor-icons/react/ssr";
import { rewardTiers } from "@/components/checkout/pricing";
import { cn } from "@/lib/utils";

/**
 * Cart reward bar: three checkpoints (free shipping, 10% off, 15% off) unlocked by number of shirts.
 * Used in the cart drawer and on the cart page.
 */
export function RewardsProgress({ shirts, className }: { shirts: number; className?: string }) {
  const next = rewardTiers.find((t) => shirts < t.shirts);
  const last = rewardTiers[rewardTiers.length - 1];
  // Checkpoints sit at 1/3, 2/3 and the end of the bar.
  const progress = Math.min(100, (shirts / last.shirts) * 100);

  return (
    <div className={className}>
      <p className="font-ui text-[12.5px] leading-[1.45] text-ink">
        {next ? (
          <>
            Add <strong className="font-semibold">{next.shirts - shirts}</strong> more{" "}
            {next.shirts - shirts === 1 ? "shirt" : "shirts"} to unlock{" "}
            <strong className="font-semibold">{next.label.toLowerCase()}</strong>
          </>
        ) : (
          <>
            You&apos;ve unlocked <strong className="font-semibold">15% off</strong> and free shipping
          </>
        )}
      </p>

      <div className="relative mx-[12px] mb-[30px] mt-[16px]">
        <div
          role="progressbar"
          aria-label="Cart rewards progress"
          aria-valuemin={0}
          aria-valuemax={last.shirts}
          aria-valuenow={Math.min(shirts, last.shirts)}
          className="h-[4px] w-full overflow-hidden rounded-full bg-navy/10"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold transition-[width] duration-500 ease-theme"
            style={{ width: `${progress}%` }}
          />
        </div>
        {rewardTiers.map((tier) => {
          const unlocked = shirts >= tier.shirts;
          const Icon = unlocked ? Check : tier.percent === 0 ? Truck : Gift;
          return (
            <div
              key={tier.label}
              className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${(tier.shirts / last.shirts) * 100}%` }}
            >
              <span
                className={cn(
                  "flex size-[24px] items-center justify-center rounded-full border transition-colors duration-300",
                  unlocked ? "border-navy bg-navy text-gold" : "border-navy/20 bg-white text-navy/45",
                )}
              >
                <Icon size={13} weight={unlocked ? "bold" : "regular"} aria-hidden />
              </span>
              <span
                className={cn(
                  "absolute top-[28px] whitespace-nowrap font-ui text-[10px] font-medium uppercase tracking-[0.06em]",
                  unlocked ? "text-navy" : "text-stone",
                  tier === last && "right-0",
                )}
              >
                {tier.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
