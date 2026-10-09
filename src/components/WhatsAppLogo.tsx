import { siWhatsapp } from "simple-icons";

/** Official WhatsApp glyph (via simple-icons, CC0). Inherits colour from `currentColor`. */
export function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={siWhatsapp.path} />
    </svg>
  );
}
