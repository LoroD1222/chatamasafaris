export const web3FormsAccessKey = "13a9dcc6-7696-41ba-9014-517aa9e556c2";
export const web3FormsEndpoint = "https://api.web3forms.com/submit";

type Web3FormPayload = {
  subject: string;
  values: Record<string, string>;
};

export async function submitWeb3Form({ subject, values }: Web3FormPayload) {
  const formData = new FormData();
  formData.append("access_key", web3FormsAccessKey);
  formData.append("subject", subject);

  Object.entries(values).forEach(([name, value]) => {
    formData.append(name, value);
  });

  if (typeof window !== "undefined") {
    formData.append("page_url", window.location.href);
  }

  const response = await fetch(web3FormsEndpoint, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Unable to submit form");
  }

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!result.success) {
    throw new Error(result.message || "Unable to submit form");
  }

  return result;
}
