// Hover-animated feature icons from lucide-animated (MIT, https://lucide-animated.com), vendored as-is.
// Looked up by name so server components can pick one without passing a component across the client boundary.
import { BoxIcon } from "./box";
import { CartIcon } from "./cart";
import { ClipboardCheckIcon } from "./clipboard-check";
import { FeatherIcon } from "./feather";
import { HandCoinsIcon } from "./hand-coins";
import { HandHeartIcon } from "./hand-heart";
import { LeafIcon } from "./leaf";
import { MessageCircleMoreIcon } from "./message-circle-more";
import { RefreshCCWIcon } from "./refresh-ccw";
import { ShieldCheckIcon } from "./shield-check";
import { TruckIcon } from "./truck";
import { UserCheckIcon } from "./user-check";

export const animatedIcons = {
  box: BoxIcon,
  cart: CartIcon,
  clipboardCheck: ClipboardCheckIcon,
  feather: FeatherIcon,
  handCoins: HandCoinsIcon,
  handHeart: HandHeartIcon,
  leaf: LeafIcon,
  messageCircleMore: MessageCircleMoreIcon,
  refreshCcw: RefreshCCWIcon,
  shieldCheck: ShieldCheckIcon,
  truck: TruckIcon,
  userCheck: UserCheckIcon,
};

export type AnimatedIconName = keyof typeof animatedIcons;
