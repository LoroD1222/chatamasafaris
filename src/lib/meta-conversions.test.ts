import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import { createMetaLeadEvent, createMetaPageViewEvent } from "@/lib/meta-conversions";

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

describe("createMetaLeadEvent", () => {
  it("hashes form customer data and preserves Meta browser identifiers", () => {
    expect(
      createMetaLeadEvent({
        eventId: "lead-event-123",
        eventTime: 1_730_000_000,
        eventSourceUrl: "https://chatamasafaris.com/en",
        formName: "safari_planner_request",
        name: " Alex Traveler ",
        email: " Traveler@Example.com ",
        phone: "+255 123 456",
        attribution: { fbp: "fb.1.1.123", fbc: "fb.1.1.click" },
        clientIpAddress: "203.0.113.10",
        clientUserAgent: "Mozilla/5.0"
      })
    ).toEqual({
      event_name: "Lead",
      event_time: 1_730_000_000,
      event_id: "lead-event-123",
      event_source_url: "https://chatamasafaris.com/en",
      action_source: "website",
      user_data: {
        em: [sha256("traveler@example.com")],
        ph: [sha256("255123456")],
        fn: [sha256("alex")],
        ln: [sha256("traveler")],
        fbp: "fb.1.1.123",
        fbc: "fb.1.1.click",
        client_ip_address: "203.0.113.10",
        client_user_agent: "Mozilla/5.0"
      },
      custom_data: { form_name: "safari_planner_request" }
    });
  });
});

describe("createMetaPageViewEvent", () => {
  it("uses the non-PII browser and request metadata available for a page view", () => {
    expect(
      createMetaPageViewEvent({
        eventId: "page-view-123",
        eventTime: 1_730_000_000,
        eventSourceUrl: "https://chatamasafaris.com/en?fbclid=abc",
        attribution: { fbp: "fb.1.1.123", fbc: "fb.1.1.click" },
        clientIpAddress: "203.0.113.10",
        clientUserAgent: "Mozilla/5.0"
      })
    ).toEqual({
      event_name: "PageView",
      event_time: 1_730_000_000,
      event_id: "page-view-123",
      event_source_url: "https://chatamasafaris.com/en?fbclid=abc",
      action_source: "website",
      user_data: {
        fbp: "fb.1.1.123",
        fbc: "fb.1.1.click",
        client_ip_address: "203.0.113.10",
        client_user_agent: "Mozilla/5.0"
      }
    });
  });
});
