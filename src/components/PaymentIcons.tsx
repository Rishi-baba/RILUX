import { siGooglepay, siPaytm, siPhonepe, siVisa } from "simple-icons";
import { Banknote } from "@/components/icons";
import { cn } from "@/lib/utils";

// Payment marks for the footer and checkout. Brand glyphs come from simple-icons (CC0) where
// available; UPI, RuPay and Mastercard are drawn here because simple-icons has no colour versions.

function Glyph({ path, color, className }: { path: string; color: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill={color}>
      <path d={path} />
    </svg>
  );
}

const marks: { name: string; mark: React.ReactNode }[] = [
  {
    name: "UPI",
    mark: (
      <svg viewBox="0 0 64 24" aria-hidden className="h-[16px] w-auto">
        <text x="0" y="19" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fontStyle="italic" fill="#6d6e70">
          UPI
        </text>
        <path d="M43 3l8 9-8 9 3-9z" fill="#f37021" />
        <path d="M50 3l8 9-8 9 3-9z" fill="#098041" />
      </svg>
    ),
  },
  { name: "Google Pay", mark: <Glyph path={siGooglepay.path} color="#3c4043" className="h-[18px] w-auto" /> },
  { name: "PhonePe", mark: <Glyph path={siPhonepe.path} color={`#${siPhonepe.hex}`} className="h-[18px] w-auto" /> },
  { name: "Paytm", mark: <Glyph path={siPaytm.path} color={`#${siPaytm.hex}`} className="h-[22px] w-auto" /> },
  { name: "Visa", mark: <Glyph path={siVisa.path} color="#1a1f71" className="h-[20px] w-auto" /> },
  {
    name: "Mastercard",
    mark: (
      <svg viewBox="0 0 38 24" aria-hidden className="h-[18px] w-auto">
        <circle cx="13" cy="12" r="9" fill="#eb001b" />
        <circle cx="25" cy="12" r="9" fill="#f79e1b" />
        <path d="M19 5.3a9 9 0 0 1 0 13.4 9 9 0 0 1 0-13.4z" fill="#ff5f00" />
      </svg>
    ),
  },
  {
    name: "RuPay",
    mark: (
      <svg viewBox="0 0 70 24" aria-hidden className="h-[16px] w-auto">
        <text x="0" y="18" fontFamily="Arial, sans-serif" fontSize="19" fontWeight="700" fontStyle="italic" fill="#1b3f94">
          RuPay
        </text>
        <path d="M60 4l7 8-9 8z" fill="#f37021" />
        <path d="M57 6l6 6-7 6z" fill="#098041" />
      </svg>
    ),
  },
  {
    name: "Cash on Delivery",
    mark: (
      <span className="flex items-center gap-[4px] font-ui text-[10px] font-semibold uppercase tracking-[0.04em] text-[#2f6b3a]">
        <Banknote size={16} weight="regular" aria-hidden />
        COD
      </span>
    ),
  },
];

export function PaymentIcons({ className }: { className?: string }) {
  return (
    <ul aria-label="Payment methods we accept" className={cn("flex flex-wrap gap-[8px]", className)}>
      {marks.map(({ name, mark }) => (
        <li
          key={name}
          title={name}
          className="flex h-[32px] min-w-[54px] items-center justify-center rounded-[5px] bg-white px-[9px] shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
        >
          <span className="sr-only">{name}</span>
          {mark}
        </li>
      ))}
    </ul>
  );
}
