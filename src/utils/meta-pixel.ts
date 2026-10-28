type MetaLeadEventParameters = {
  form_name: string;
  page_path: string;
};

type MetaLeadOptions = {
  formName: string;
  pagePath?: string;
  eventId: string;
};

type MetaPageViewOptions = {
  eventId: string;
};

export type MetaAttribution = {
  fbp?: string;
  fbc?: string;
};

declare global {
  interface Window {
    fbq?: (
      command: "track",
      eventName: "Lead" | "PageView",
      parameters?: MetaLeadEventParameters,
      options?: { eventID: string }
    ) => void;
  }
}

function readCookie(name: string) {
  if (typeof document === "undefined") return undefined;

  const value = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);

  return value ? decodeURIComponent(value) : undefined;
}

export function createMetaEventId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Returns Meta's browser identifiers without collecting any additional data. */
export function getMetaAttribution(): MetaAttribution {
  if (typeof window === "undefined") return {};

  const fbp = readCookie("_fbp");
  const existingFbc = readCookie("_fbc");
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  const fbc = existingFbc ?? (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined);

  return { fbp, fbc };
}

/**
 * Reports a browser-side lead only after the enquiry provider confirms success.
 * Tracking failures must never make a successful enquiry look unsuccessful.
 */
export function reportMetaPixelLead({ formName, pagePath, eventId }: MetaLeadOptions) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return false;
  }

  try {
    window.fbq(
      "track",
      "Lead",
      {
        form_name: formName,
        page_path: pagePath ?? window.location.pathname
      },
      { eventID: eventId }
    );
    return true;
  } catch {
    return false;
  }
}

/** Reports a browser PageView with the ID shared by its server-side CAPI event. */
export function reportMetaPixelPageView({ eventId }: MetaPageViewOptions) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return false;
  }

  try {
    window.fbq("track", "PageView", undefined, { eventID: eventId });
    return true;
  } catch {
    return false;
  }
}
