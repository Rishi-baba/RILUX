// Site icon set: Phosphor Icons (light weight) for a finer, more tailored line than generic UI icons.
// Exported under stable names so every component imports icons from here and nowhere else.
import type { ComponentType, SVGProps } from "react";
import type { IconWeight } from "@phosphor-icons/react";
import {
  ArrowLeft as PhArrowLeft,
  ArrowRight as PhArrowRight,
  ArrowsClockwise,
  At,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  Check as PhCheck,
  CheckCircle as PhCheckCircle,
  ClipboardText,
  Clock as PhClock,
  Diamond,
  DeviceMobile,
  Feather as PhFeather,
  FadersHorizontal,
  GlobeSimple,
  Handbag,
  Headset,
  Heart as PhHeart,
  House,
  Info as PhInfo,
  Leaf as PhLeaf,
  List,
  MapPin as PhMapPin,
  Minus as PhMinus,
  Money,
  Needle,
  Package,
  Phone as PhPhone,
  Play as PhPlay,
  Plus as PhPlus,
  Ruler as PhRuler,
  MagnifyingGlass,
  ArrowCounterClockwise,
  ShareNetwork,
  ShieldCheck as PhShieldCheck,
  SquaresFour,
  Star as PhStar,
  Sparkle,
  TShirt,
  Trash,
  Truck as PhTruck,
  User as PhUser,
  X as PhX,
  EnvelopeSimple,
} from "@phosphor-icons/react/ssr";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  size?: number | string;
  weight?: IconWeight;
  /** Accepted for call-site compatibility; Phosphor weights replace stroke widths. */
  strokeWidth?: number;
};
export type IconType = ComponentType<IconProps>;

type PhosphorLike = ComponentType<Omit<SVGProps<SVGSVGElement>, "ref"> & { size?: number | string; weight?: IconWeight }>;

function icon(Ph: PhosphorLike, name: string): IconType {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // A solid `fill` (as lucide call sites pass for active hearts and stars) maps to Phosphor's filled weight.
  const Icon = ({ strokeWidth, weight = "light", size = 24, fill, ...rest }: IconProps) => (
    <Ph weight={fill && fill !== "none" ? "fill" : weight} size={size} {...rest} />
  );
  Icon.displayName = name;
  return Icon;
}

export const ArrowLeft = icon(PhArrowLeft, "ArrowLeft");
export const ArrowRight = icon(PhArrowRight, "ArrowRight");
export const AtSign = icon(At, "AtSign");
export const Banknote = icon(Money, "Banknote");
export const Check = icon(PhCheck, "Check");
export const CheckCircle2 = icon(PhCheckCircle, "CheckCircle2");
export const ChevronDown = icon(CaretDown, "ChevronDown");
export const ChevronLeft = icon(CaretLeft, "ChevronLeft");
export const ChevronRight = icon(CaretRight, "ChevronRight");
export const ChevronUp = icon(CaretUp, "ChevronUp");
export const ClipboardList = icon(ClipboardText, "ClipboardList");
export const Clock = icon(PhClock, "Clock");
export const Feather = icon(PhFeather, "Feather");
export const Gem = icon(Diamond, "Gem");
export const Globe = icon(GlobeSimple, "Globe");
export const Headphones = icon(Headset, "Headphones");
export const Heart = icon(PhHeart, "Heart");
export const Home = icon(House, "Home");
export const Info = icon(PhInfo, "Info");
export const LayoutGrid = icon(SquaresFour, "LayoutGrid");
export const Leaf = icon(PhLeaf, "Leaf");
export const Mail = icon(EnvelopeSimple, "Mail");
export const MapPin = icon(PhMapPin, "MapPin");
export const Menu = icon(List, "Menu");
export const Minus = icon(PhMinus, "Minus");
export const PackageCheck = icon(Package, "PackageCheck");
export const Phone = icon(PhPhone, "Phone");
export const Play = icon(PhPlay, "Play");
export const Plus = icon(PhPlus, "Plus");
export const RefreshCcw = icon(ArrowsClockwise, "RefreshCcw");
export const RotateCcw = icon(ArrowCounterClockwise, "RotateCcw");
export const Ruler = icon(PhRuler, "Ruler");
export const Scissors = icon(Needle, "Scissors");
export const Search = icon(MagnifyingGlass, "Search");
export const Share2 = icon(ShareNetwork, "Share2");
export const ShieldCheck = icon(PhShieldCheck, "ShieldCheck");
export const Shirt = icon(TShirt, "Shirt");
export const ShoppingBag = icon(Handbag, "ShoppingBag");
export const SlidersHorizontal = icon(FadersHorizontal, "SlidersHorizontal");
export const Smartphone = icon(DeviceMobile, "Smartphone");
export const Sparkles = icon(Sparkle, "Sparkles");
export const Star = icon(PhStar, "Star");
export const Trash2 = icon(Trash, "Trash2");
export const Truck = icon(PhTruck, "Truck");
export const User = icon(PhUser, "User");
export const X = icon(PhX, "X");

// Legacy aliases used across the layout components
export {
  ArrowRight as ArrowRightIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronUp as ChevronUpIcon,
  Heart as HeartIcon,
  Search as SearchIcon,
  ShoppingBag as BagIcon,
  Smartphone as PhoneIcon,
  User as UserIcon,
};
