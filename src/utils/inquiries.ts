import { reportGoogleAdsLeadConversion } from "@/utils/google-ads";
import { reportMetaPixelLead } from "@/utils/meta-pixel";
import type { PlannerField } from "@/i18n/types";

export const inquiryEndpoint = "https://safari-digital-portal.vercel.app/api/inquiries";
export const inquiryFormKey = "sdf_MdPdg4b62MwTI5h5vAhkhXMq";

const utmFields = ["utm_source", "utm_medium", "utm_campaign"] as const;

type InquiryPayload = {
  formName: string;
  values: Record<string, string>;
};

type UtmValues = Partial<Record<(typeof utmFields)[number], string>>;

export function requiredInquiryFields(fields: PlannerField[], values: Record<string, string>) {
  const missing = fields
    .filter((field) => field.name === "name" && !values[field.name]?.trim())
    .map((field) => field.name);
  const contactFields = fields.filter((field) => ["email", "phone", "whatsapp"].includes(field.name));

  if (contactFields.length > 0 && !contactFields.some((field) => values[field.name]?.trim())) {
    missing.push(...contactFields.map((field) => field.name));
  }

  return missing;
}

function storedUtmValues(): UtmValues {
  if (typeof window === "undefined") return {};

  try {
    const value: unknown = JSON.parse(window.sessionStorage.getItem("utm") ?? "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};

    return Object.fromEntries(
      utmFields.flatMap((field) => {
        const fieldValue = (value as Record<string, unknown>)[field];
        return typeof fieldValue === "string" && fieldValue ? [[field, fieldValue]] : [];
      })
    ) as UtmValues;
  } catch {
    return {};
  }
}

export function captureUtmParameters(search = typeof window === "undefined" ? "" : window.location.search) {
  if (typeof window === "undefined") return;

  const parameters = new URLSearchParams(search);
  const currentValues = Object.fromEntries(
    utmFields.flatMap((field) => {
      const value = parameters.get(field);
      return value ? [[field, value]] : [];
    })
  ) as UtmValues;

  if (Object.keys(currentValues).length === 0) return;

  try {
    window.sessionStorage.setItem("utm", JSON.stringify({ ...storedUtmValues(), ...currentValues }));
  } catch {
    // Attribution is optional; private browsing or restricted storage must not block a lead.
  }
}

export async function submitInquiry({ formName, values }: InquiryPayload) {
  const response = await fetch(inquiryEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key: inquiryFormKey,
      name: values.name?.trim(),
      email: values.email?.trim() || undefined,
      phone: values.phone?.trim() || values.whatsapp?.trim() || undefined,
      interested_in: values.interested_in?.trim() || undefined,
      travel_dates: values.travel_dates?.trim() || undefined,
      travellers: values.travellers?.trim() || values.people?.trim() || undefined,
      country: values.country?.trim() || undefined,
      message: values.message?.trim() || undefined,
      ...storedUtmValues()
    })
  });

  if (!response.ok) {
    throw new Error("Unable to submit inquiry");
  }

  let result: { success?: boolean; message?: string } | undefined;
  try {
    result = (await response.json()) as { success?: boolean; message?: string };
  } catch {
    // A successful endpoint may legitimately return an empty response body.
  }

  if (result?.success === false) {
    throw new Error(result.message || "Unable to submit inquiry");
  }

  reportGoogleAdsLeadConversion();
  reportMetaPixelLead({ formName });
}
