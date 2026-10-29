import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { googleAdsLeadDestination } from "@/utils/google-ads";
import { inquiryEndpoint, submitInquiry } from "@/utils/inquiries";

const { sendToPortalMock } = vi.hoisted(() => ({
  sendToPortalMock: vi.fn()
}));

vi.mock("@/lib/safari-digital", () => ({
  sendToPortal: sendToPortalMock
}));

describe("submitInquiry", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    window.gtag = vi.fn();
    window.fbq = vi.fn();
    sendToPortalMock.mockResolvedValue({ ok: true });
  });

  afterEach(() => {
    fetchMock.mockReset();
    sendToPortalMock.mockReset();
    vi.unstubAllGlobals();
    delete window.gtag;
    delete window.fbq;
  });

  it("reports a conversion after a successful lead submission", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    });

    await submitInquiry({
      formName: "safari_planner_request",
      values: { name: "Alex Traveler", email: "traveler@example.com", whatsapp: "+255 123", people: "2 people" }
    });

    expect(fetchMock).toHaveBeenCalledWith(inquiryEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: expect.any(String)
    });

    const requestBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(requestBody).toMatchObject({
      event_id: expect.any(String),
      form_name: "safari_planner_request",
      page_path: window.location.pathname,
      meta_attribution: {},
      name: "Alex Traveler",
      email: "traveler@example.com",
      phone: "+255 123",
      travellers: "2 people"
    });
    expect(sendToPortalMock).toHaveBeenCalledWith({
      name: "Alex Traveler",
      email: "traveler@example.com",
      whatsapp: "+255 123",
      people: "2 people"
    });

    expect(window.gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: googleAdsLeadDestination
    });
    expect(window.fbq).toHaveBeenCalledTimes(1);
    expect(window.fbq).toHaveBeenCalledWith(
      "track",
      "Lead",
      {
        form_name: "safari_planner_request",
        page_path: window.location.pathname
      },
      { eventID: expect.any(String) }
    );
  });

  it("does not report a conversion when the lead provider rejects the submission", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ success: false, message: "Rejected" })
    });

    await expect(
      submitInquiry({
        formName: "safari_planner_request",
        values: { name: "Alex Traveler", email: "traveler@example.com" }
      })
    ).rejects.toThrow("Rejected");

    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.fbq).not.toHaveBeenCalled();
  });
});
