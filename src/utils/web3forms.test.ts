import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { googleAdsLeadDestination } from "@/utils/google-ads";
import { submitWeb3Form } from "@/utils/web3forms";

describe("submitWeb3Form", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    window.gtag = vi.fn();
    window.fbq = vi.fn();
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
    delete window.gtag;
    delete window.fbq;
  });

  it("reports a conversion after a successful lead submission", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    });

    await submitWeb3Form({
      subject: "New safari planner request",
      formName: "safari_planner_request",
      values: { email: "traveler@example.com" }
    });

    expect(window.gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: googleAdsLeadDestination
    });
    expect(window.fbq).toHaveBeenCalledTimes(1);
    expect(window.fbq).toHaveBeenCalledWith("track", "Lead", {
      form_name: "safari_planner_request",
      page_path: window.location.pathname
    });
  });

  it("does not report a conversion when the lead provider rejects the submission", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ success: false, message: "Rejected" })
    });

    await expect(
      submitWeb3Form({
        subject: "New safari planner request",
        formName: "safari_planner_request",
        values: { email: "traveler@example.com" }
      })
    ).rejects.toThrow("Rejected");

    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.fbq).not.toHaveBeenCalled();
  });
});
