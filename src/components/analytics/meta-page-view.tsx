"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { createMetaEventId, getMetaAttribution, reportMetaPixelPageView } from "@/utils/meta-pixel";

const pageViewEndpoint = "/api/meta/pageview";

/** Sends matching browser Pixel and server CAPI PageView events for each client-side route. */
export function MetaPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    const eventId = createMetaEventId();
    let browserTracked = reportMetaPixelPageView({ eventId });
    let retryId: number | undefined;

    const retryBrowserTracking = () => {
      if (!browserTracked) {
        browserTracked = reportMetaPixelPageView({ eventId });
      }
    };

    if (!browserTracked) {
      window.addEventListener("meta-pixel-ready", retryBrowserTracking, { once: true });
      retryId = window.setTimeout(retryBrowserTracking, 250);
    }

    void fetch(pageViewEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        event_id: eventId,
        page_path: `${pathname}${search ? `?${search}` : ""}`,
        meta_attribution: getMetaAttribution()
      })
    }).catch(() => {
      // Tracking is intentionally non-blocking.
    });

    return () => {
      window.removeEventListener("meta-pixel-ready", retryBrowserTracking);
      if (retryId !== undefined) window.clearTimeout(retryId);
    };
  }, [pathname, search]);

  return null;
}
