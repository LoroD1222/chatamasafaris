import { afterEach, describe, expect, it, vi } from "vitest";

import { reportMetaPixelLead, reportMetaPixelPageView } from "@/utils/meta-pixel";

describe("reportMetaPixelLead", () => {
  afterEach(() => {
    delete window.fbq;
  });

  it("reports the standard Lead event without personal information", () => {
    window.fbq = vi.fn();

    expect(
      reportMetaPixelLead({
        formName: "safari_planner_request",
        pagePath: "/en",
        eventId: "lead-event-123"
      })
    ).toBe(true);

    expect(window.fbq).toHaveBeenCalledWith(
      "track",
      "Lead",
      {
        form_name: "safari_planner_request",
        page_path: "/en"
      },
      { eventID: "lead-event-123" }
    );
  });

  it("does not fail when the existing Meta Pixel is unavailable", () => {
    expect(reportMetaPixelLead({ formName: "safari_planner_request", eventId: "lead-event-123" })).toBe(false);
  });

  it("does not propagate a Meta Pixel tracking error", () => {
    window.fbq = vi.fn(() => {
      throw new Error("blocked");
    });

    expect(reportMetaPixelLead({ formName: "safari_planner_request", eventId: "lead-event-123" })).toBe(false);
  });

  it("reports PageView with an event ID for CAPI deduplication", () => {
    window.fbq = vi.fn();

    expect(reportMetaPixelPageView({ eventId: "page-view-123" })).toBe(true);
    expect(window.fbq).toHaveBeenCalledWith("track", "PageView", undefined, { eventID: "page-view-123" });
  });
});
