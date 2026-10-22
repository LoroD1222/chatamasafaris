import { afterEach, describe, expect, it, vi } from "vitest";

import { reportMetaPixelLead } from "@/utils/meta-pixel";

describe("reportMetaPixelLead", () => {
  afterEach(() => {
    delete window.fbq;
  });

  it("reports the standard Lead event without personal information", () => {
    window.fbq = vi.fn();

    expect(
      reportMetaPixelLead({
        formName: "safari_planner_request",
        pagePath: "/en"
      })
    ).toBe(true);

    expect(window.fbq).toHaveBeenCalledWith("track", "Lead", {
      form_name: "safari_planner_request",
      page_path: "/en"
    });
  });

  it("does not fail when the existing Meta Pixel is unavailable", () => {
    expect(reportMetaPixelLead({ formName: "safari_planner_request" })).toBe(false);
  });

  it("does not propagate a Meta Pixel tracking error", () => {
    window.fbq = vi.fn(() => {
      throw new Error("blocked");
    });

    expect(reportMetaPixelLead({ formName: "safari_planner_request" })).toBe(false);
  });
});
