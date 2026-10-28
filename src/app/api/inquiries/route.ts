import { NextResponse } from "next/server";

import { createMetaLeadEvent, sendMetaEvent } from "@/lib/meta-conversions";

const inquiryEndpoint = "https://safari-digital-portal.vercel.app/api/inquiries";
const inquiryFormKey = "sdf_MdPdg4b62MwTI5h5vAhkhXMq";

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

  const response = await fetch(inquiryEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key: inquiryFormKey,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      interested_in: inquiry.interested_in,
      travel_dates: inquiry.travel_dates,
      travellers: inquiry.travellers,
      country: inquiry.country,
      message: inquiry.message,
      utm_source: inquiry.utm_source,
      utm_medium: inquiry.utm_medium,
      utm_campaign: inquiry.utm_campaign
    })
  });

  let result: { success?: boolean; message?: string } | undefined;
  try {
    result = (await response.json()) as { success?: boolean; message?: string };
  } catch {
    // The enquiry service can return an empty successful response.
  }

  if (!response.ok || result?.success === false) {
    return NextResponse.json(
      { success: false, message: result?.message || "Unable to submit inquiry" },
      { status: response.status || 502 }
    );
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

  return NextResponse.json(result ?? { success: true });
}
