import { NextResponse } from "next/server";

import { createMetaPageViewEvent, sendMetaEvent } from "@/lib/meta-conversions";

type PageViewRequest = {
  event_id?: string;
  page_path?: string;
  meta_attribution?: { fbp?: string; fbc?: string };
};

function firstForwardedIp(value: string | null) {
  return value?.split(",")[0]?.trim() || undefined;
}

export async function POST(request: Request) {
  let pageView: PageViewRequest;
  try {
    pageView = (await request.json()) as PageViewRequest;
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  if (
    !pageView.event_id ||
    !pageView.page_path ||
    !pageView.page_path.startsWith("/") ||
    pageView.page_path.startsWith("//")
  ) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    await sendMetaEvent(
      createMetaPageViewEvent({
        eventId: pageView.event_id,
        eventTime: Math.floor(Date.now() / 1000),
        eventSourceUrl: new URL(pageView.page_path, request.url).toString(),
        attribution: pageView.meta_attribution,
        clientIpAddress: firstForwardedIp(request.headers.get("x-forwarded-for")),
        clientUserAgent: request.headers.get("user-agent") ?? undefined
      })
    );
  } catch (error) {
    // A tracking outage must never interrupt navigation or page rendering.
    console.error("Unable to send Meta PageView conversion", error);
  }

  return new NextResponse(null, { status: 204 });
}
