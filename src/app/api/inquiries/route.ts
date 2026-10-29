import { NextResponse } from "next/server";

import { createMetaLeadEvent, sendMetaEvent } from "@/lib/meta-conversions";

type InquiryRequest = {
  event_id?: string;
  form_name?: string;
  page_path?: string;
  meta_attribution?: { fbp?: string; fbc?: string };
  name?: string;
  email?: string;
  phone?: string;
  interested_in?: string;
  travel_dates?: string;
  travellers?: string;
  country?: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

function firstForwardedIp(value: string | null) {
  return value?.split(",")[0]?.trim() || undefined;
}

export async function POST(request: Request) {
  let inquiry: InquiryRequest;
  try {
    inquiry = (await request.json()) as InquiryRequest;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid enquiry" }, { status: 400 });
  }

  if (
    !inquiry.name?.trim() ||
    !inquiry.event_id ||
    !inquiry.form_name ||
    !inquiry.page_path ||
    !inquiry.page_path.startsWith("/") ||
    inquiry.page_path.startsWith("//")
  ) {
    return NextResponse.json({ success: false, message: "Invalid enquiry" }, { status: 400 });
  }

  try {
    await sendMetaEvent(
      createMetaLeadEvent({
        eventId: inquiry.event_id,
        eventTime: Math.floor(Date.now() / 1000),
        eventSourceUrl: new URL(inquiry.page_path, request.url).toString(),
        formName: inquiry.form_name,
        email: inquiry.email,
        phone: inquiry.phone,
        name: inquiry.name,
        attribution: inquiry.meta_attribution,
        clientIpAddress: firstForwardedIp(request.headers.get("x-forwarded-for")),
        clientUserAgent: request.headers.get("user-agent") ?? undefined
      })
    );
  } catch (error) {
    // Meta failures must never turn a successfully saved enquiry into a user-facing error.
    console.error("Unable to send Meta Lead conversion", error);
  }

  return NextResponse.json({ success: true });
}
