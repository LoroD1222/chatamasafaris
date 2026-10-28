import { createHash } from "node:crypto";

type MetaAttribution = {
  fbp?: string;
  fbc?: string;
};

type MetaLeadEventInput = {
  eventId: string;
  eventTime: number;
  eventSourceUrl: string;
  formName: string;
  email?: string;
  phone?: string;
  name?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  attribution?: MetaAttribution;
};

type MetaPageViewEventInput = Pick<
  MetaLeadEventInput,
  "eventId" | "eventTime" | "eventSourceUrl" | "clientIpAddress" | "clientUserAgent" | "attribution"
>;

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function hash(value?: string) {
  return value ? createHash("sha256").update(normalize(value)).digest("hex") : undefined;
}

function normalizedPhone(value?: string) {
  return value ? value.replace(/[^0-9]/g, "") : undefined;
}

/** Builds the server event in Meta's expected format; PII is SHA-256 hashed here. */
export function createMetaLeadEvent(input: MetaLeadEventInput) {
  const nameParts = input.name?.trim().split(/\s+/) ?? [];
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined;

  const userData = {
    ...(hash(input.email) ? { em: [hash(input.email)] } : {}),
    ...(hash(normalizedPhone(input.phone)) ? { ph: [hash(normalizedPhone(input.phone))] } : {}),
    ...(hash(firstName) ? { fn: [hash(firstName)] } : {}),
    ...(hash(lastName) ? { ln: [hash(lastName)] } : {}),
    ...(input.attribution?.fbp ? { fbp: input.attribution.fbp } : {}),
    ...(input.attribution?.fbc ? { fbc: input.attribution.fbc } : {}),
    ...(input.clientIpAddress ? { client_ip_address: input.clientIpAddress } : {}),
    ...(input.clientUserAgent ? { client_user_agent: input.clientUserAgent } : {})
  };

  return {
    event_name: "Lead",
    event_time: input.eventTime,
    event_id: input.eventId,
    event_source_url: input.eventSourceUrl,
    action_source: "website",
    user_data: userData,
    custom_data: { form_name: input.formName }
  };
}

/** Builds a PageView event using the browser and request metadata available before a form is completed. */
export function createMetaPageViewEvent(input: MetaPageViewEventInput) {
  return {
    event_name: "PageView",
    event_time: input.eventTime,
    event_id: input.eventId,
    event_source_url: input.eventSourceUrl,
    action_source: "website",
    user_data: {
      ...(input.attribution?.fbp ? { fbp: input.attribution.fbp } : {}),
      ...(input.attribution?.fbc ? { fbc: input.attribution.fbc } : {}),
      ...(input.clientIpAddress ? { client_ip_address: input.clientIpAddress } : {}),
      ...(input.clientUserAgent ? { client_user_agent: input.clientUserAgent } : {})
    }
  };
}

type MetaEvent = ReturnType<typeof createMetaLeadEvent> | ReturnType<typeof createMetaPageViewEvent>;

export async function sendMetaEvent(event: MetaEvent) {
  const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID ?? process.env.NEXT_PUBLIC_META_PIXEL_ID;

  // Keeping CAPI opt-in prevents a missing configuration from affecting enquiries.
  if (!accessToken || !pixelId) return { configured: false };

  const apiVersion = process.env.META_GRAPH_API_VERSION ?? "v23.0";
  const response = await fetch(`https://graph.facebook.com/${apiVersion}/${pixelId}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [event], access_token: accessToken })
  });

  if (!response.ok) {
    throw new Error(`Meta Conversions API returned ${response.status}`);
  }

  return { configured: true };
}
