"use client";

import { useEffect, useState } from "react";
import { showSampleReviews } from "@/lib/content";

/** Hosts where sample reviews may appear: this computer, the local network and the Vercel demo link (*.vercel.app). */
const isPreviewHost = (host: string) =>
  host === "localhost" ||
  host === "127.0.0.1" ||
  host === "[::1]" ||
  host.endsWith(".localhost") ||
  /^192\.168\.\d+\.\d+$/.test(host) ||
  /^10\.\d+\.\d+\.\d+$/.test(host) ||
  host.endsWith(".vercel.app");

/**
 * True only when sample reviews are switched on AND the site is opened from a preview host
 * (local or the Vercel demo link). On a custom production domain this stays false, so invented
 * reviews never reach real shoppers.
 */
export function useSamplePreview() {
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hostname is only known in the browser
    setPreview(showSampleReviews && isPreviewHost(window.location.hostname));
  }, []);
  return preview;
}
