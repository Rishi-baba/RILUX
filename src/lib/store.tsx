"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "@/lib/content";
import type { CartLine, MockOrder, MockUser } from "@/types/content";

// Front-end only store: cart, wishlist, a mock signed-in user and mock orders.
// Persisted to localStorage; there is no backend, auth or payment.

const STORAGE_KEY = "rilux-store-v1";

interface Persisted {
  cart: CartLine[];
  wishlist: string[];
  user: MockUser | null;
  orders: MockOrder[];
}

export interface Toast {
  id: number;
  message: string;
}

type Panel = "cart" | "search" | "menu" | null;

interface StoreValue extends Persisted {
  hydrated: boolean;
  // cart
  addToCart: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeLine: (index: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  // wishlist
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  // account (mock)
  signIn: (user: MockUser) => void;
  signOut: () => void;
  placeOrder: () => MockOrder | null;
  // ui
  openPanel: Panel;
  setOpenPanel: (panel: Panel) => void;
  toasts: Toast[];
  notify: (message: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const empty: Persisted = { cart: [], wishlist: [], user: null, orders: [] };

function readStorage(): Persisted {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
      user: parsed.user ?? null,
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
    };
  } catch {
    return empty;
  }
}

function writeStorage(data: Persisted) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage unavailable (private mode, blocked) — state stays in memory
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Persisted>(empty);
  const [hydrated, setHydrated] = useState(false);
  const [openPanel, setOpenPanel] = useState<Panel>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  // Load after mount so server and first client render match.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from storage
    setData(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(data);
  }, [data, hydrated]);

  // Lock page scroll while a side panel is open.
  useEffect(() => {
    document.documentElement.style.overflow = openPanel ? "hidden" : "";
  }, [openPanel]);

  const notify = useCallback((message: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, message }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  const addToCart = useCallback<StoreValue["addToCart"]>((line, quantity = 1) => {
    setData((d) => {
      const i = d.cart.findIndex(
        (l) => l.productId === line.productId && l.size === line.size && l.color === line.color,
      );
      const cart = [...d.cart];
      if (i >= 0) cart[i] = { ...cart[i], quantity: cart[i].quantity + quantity };
      else cart.push({ ...line, quantity });
      return { ...d, cart };
    });
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    setData((d) => ({
      ...d,
      cart:
        quantity <= 0
          ? d.cart.filter((_, i) => i !== index)
          : d.cart.map((l, i) => (i === index ? { ...l, quantity } : l)),
    }));
  }, []);

  const removeLine = useCallback((index: number) => {
    setData((d) => ({ ...d, cart: d.cart.filter((_, i) => i !== index) }));
  }, []);

  const clearCart = useCallback(() => setData((d) => ({ ...d, cart: [] })), []);

  const toggleWishlist = useCallback((productId: string) => {
    setData((d) => ({
      ...d,
      wishlist: d.wishlist.includes(productId)
        ? d.wishlist.filter((id) => id !== productId)
        : [...d.wishlist, productId],
    }));
  }, []);

  const signIn = useCallback((user: MockUser) => setData((d) => ({ ...d, user })), []);
  const signOut = useCallback(() => setData((d) => ({ ...d, user: null })), []);

  const cartSubtotal = useMemo(
    () =>
      data.cart.reduce((sum, l) => sum + (getProductById(l.productId)?.priceValue ?? 0) * l.quantity, 0),
    [data.cart],
  );

  const placeOrder = useCallback((): MockOrder | null => {
    if (data.cart.length === 0) return null;
    const order: MockOrder = {
      id: `#${1000 + data.orders.length + 1}`,
      createdAt: new Date().toISOString(),
      lines: data.cart,
      total: cartSubtotal,
      status: "Confirmed",
    };
    setData((d) => ({ ...d, cart: [], orders: [order, ...d.orders] }));
    return order;
  }, [data.cart, data.orders.length, cartSubtotal]);

  const value = useMemo<StoreValue>(
    () => ({
      ...data,
      hydrated,
      addToCart,
      updateQuantity,
      removeLine,
      clearCart,
      cartCount: data.cart.reduce((n, l) => n + l.quantity, 0),
      cartSubtotal,
      toggleWishlist,
      isWishlisted: (id: string) => data.wishlist.includes(id),
      signIn,
      signOut,
      placeOrder,
      openPanel,
      setOpenPanel,
      toasts,
      notify,
    }),
    [data, hydrated, addToCart, updateQuantity, removeLine, clearCart, cartSubtotal, toggleWishlist, signIn, signOut, placeOrder, openPanel, toasts, notify],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
