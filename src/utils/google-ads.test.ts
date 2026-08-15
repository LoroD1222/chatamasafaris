import { afterEach, describe, expect, it, vi } from "vitest";

import { googleAdsLeadDestination, reportGoogleAdsLeadConversion } from "@/utils/google-ads";

describe("reportGoogleAdsLeadConversion", () => {
  afterEach(() => {
    delete window.gtag;
  });

  it("reports the configured Google Ads lead conversion", () => {
    window.gtag = vi.fn();

    expect(reportGoogleAdsLeadConversion()).toBe(true);
    expect(window.gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: googleAdsLeadDestination
    });
  });

  it("does not fail when Google Tag is unavailable", () => {
    expect(reportGoogleAdsLeadConversion()).toBe(false);
  });

  it("does not propagate a tracking error", () => {
    window.gtag = vi.fn(() => {
      throw new Error("blocked");
    });

    expect(reportGoogleAdsLeadConversion()).toBe(false);
  });
});
