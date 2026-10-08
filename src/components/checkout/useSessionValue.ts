"use client";

import { useCallback, useSyncExternalStore } from "react";

// Tiny sessionStorage-backed value shared between pages/components in the same tab.
// Every access is wrapped in try/catch: storage can be unavailable (private mode, blocked).

const EVENT = "rilux-session-change";

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function readSession(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeSession(key: string, value: string | null) {
  try {
    if (value === null) window.sessionStorage.removeItem(key);
    else window.sessionStorage.setItem(key, value);
  } catch {
    // storage unavailable — value simply isn't remembered
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Returns the raw string (null on the server and when unset) and a setter. */
export function useSessionValue(key: string): [string | null, (value: string | null) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => readSession(key),
    () => null,
  );
  const set = useCallback((next: string | null) => writeSession(key, next), [key]);
  return [value, set];
}
