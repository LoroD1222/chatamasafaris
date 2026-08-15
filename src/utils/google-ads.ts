export const googleAdsLeadDestination = "AW-18226330867/02-hCILxneEcEPP5_vJD";

type GoogleAdsConversionParameters = {
  send_to: string;
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: "conversion",
      parameters: GoogleAdsConversionParameters
    ) => void;
  }
}

/**
 * Reports a lead only after the enquiry provider confirms the submission.
 * Tracking failures must never make a successful enquiry look unsuccessful.
 */
export function reportGoogleAdsLeadConversion() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return false;
  }

  try {
    window.gtag("event", "conversion", {
      send_to: googleAdsLeadDestination
    });
    return true;
  } catch {
    return false;
  }
}
