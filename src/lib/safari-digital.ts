export const PORTAL_INQUIRY_URL = "https://safari-digital-portal.vercel.app/api/inquiries";
export const PORTAL_FORM_KEY = "sdf_HWDAUgSqb9tgZgUFLiW7IB5P";

const attributionKey = "sd_utm";
const attributionFields = ["utm_source", "utm_medium", "utm_campaign", "fbclid"] as const;
const mappedFieldNames = new Set([
  "name",
  "first_name",
  "firstName",
  "last_name",
  "lastName",
  "email",
  "phone",
  "whatsapp",
  "country",
  "interested_in",
  "tour",
  "safari",
  "package",
  "travel_dates",
  "dates",
  "travel_month",
  "travellers",
  "people",
  "message"
]);

type Attribution = Partial<Record<(typeof attributionFields)[number], string>>;

export type SafariDigitalFields = Record<string, string | undefined>;

export type SafariDigitalResult = { ok: true } | { ok: false; error: string };

function valueFor(fields: SafariDigitalFields, names: string[]) {
  return names.map((name) => fields[name]?.trim()).find(Boolean) ?? "";
}

function storedAdSource(): Attribution {
  if (typeof window === "undefined") return {};

  try {
    const raw: unknown = JSON.parse(window.sessionStorage.getItem(attributionKey) ?? "{}");
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};

    return Object.fromEntries(
      attributionFields.flatMap((field) => {
        const value = (raw as Record<string, unknown>)[field];
        return typeof value === "string" && value ? [[field, value]] : [];
      })
    ) as Attribution;
  } catch {
    return {};
  }
}

function cookieValue(name: string) {
  if (typeof document === "undefined") return undefined;

  const cookie = document.cookie.split("; ").find((item) => item.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : undefined;
}

function readableLabel(name: string) {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (letter) => letter.toUpperCase());
}

export function rememberAdSource() {
  if (typeof window === "undefined") return;

  try {
    if (window.sessionStorage.getItem(attributionKey)) return;

    const parameters = new URLSearchParams(window.location.search);
    const source = Object.fromEntries(
      attributionFields.flatMap((field) => {
        const value = parameters.get(field);
        return value ? [[field, value]] : [];
      })
    ) as Attribution;

    if (Object.keys(source).length > 0) {
      window.sessionStorage.setItem(attributionKey, JSON.stringify(source));
    }
  } catch {
    // Attribution storage is optional and must not affect form submissions.
  }
}

export async function sendToPortal(fields: SafariDigitalFields): Promise<SafariDigitalResult> {
  const firstName = valueFor(fields, ["first_name", "firstName"]);
  const lastName = valueFor(fields, ["last_name", "lastName"]);
  const name = valueFor(fields, ["name"]) || [firstName, lastName].filter(Boolean).join(" ");
  const message = valueFor(fields, ["message"]);
  const extraFieldLines = Object.entries(fields)
    .filter(([field, value]) => !mappedFieldNames.has(field) && value?.trim())
    .map(([field, value]) => `${readableLabel(field)}: ${value?.trim()}`);
  const messageLines = [message, ...extraFieldLines, `Sent from: ${typeof window === "undefined" ? "" : window.location.href}`].filter(Boolean);
  const attribution = storedAdSource();

  try {
    const response = await fetch(PORTAL_INQUIRY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        key: PORTAL_FORM_KEY,
        name,
        email: valueFor(fields, ["email"]),
        phone: valueFor(fields, ["phone", "whatsapp"]),
        country: valueFor(fields, ["country"]),
        interested_in: valueFor(fields, ["interested_in", "tour", "safari", "package"]),
        travel_dates: valueFor(fields, ["travel_dates", "dates", "travel_month"]),
        travellers: valueFor(fields, ["travellers", "people"]),
        message: messageLines.join("\n"),
        ...attribution,
        fbc: cookieValue("_fbc"),
        fbp: cookieValue("_fbp")
      })
    });
    const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };

    if (!response.ok || result.ok !== true) {
      return { ok: false, error: result.error || "Unable to send inquiry to Safari Digital" };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Unable to send inquiry to Safari Digital" };
  }
}
