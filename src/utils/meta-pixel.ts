type MetaLeadEventParameters = {
  form_name: string;
  page_path: string;
};

type MetaLeadOptions = {
  formName: string;
  pagePath?: string;
};

declare global {
  interface Window {
    fbq?: (
      command: "track",
      eventName: "Lead",
      parameters: MetaLeadEventParameters
    ) => void;
  }
}

/**
 * Reports a browser-side lead only after the enquiry provider confirms success.
 * Tracking failures must never make a successful enquiry look unsuccessful.
 */
export function reportMetaPixelLead({ formName, pagePath }: MetaLeadOptions) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return false;
  }

  try {
    window.fbq("track", "Lead", {
      form_name: formName,
      page_path: pagePath ?? window.location.pathname
    });
    return true;
  } catch {
    return false;
  }
}
