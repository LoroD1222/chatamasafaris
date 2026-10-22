import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LeadPlanner } from "@/features/home/lead-planner";
import type { HomeDictionary } from "@/i18n/types";
import { thankYouHref } from "@/utils/routes";

const { pushMock, submitWeb3FormMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  submitWeb3FormMock: vi.fn()
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock })
}));

vi.mock("@/utils/web3forms", () => ({
  submitWeb3Form: submitWeb3FormMock
}));

const planner: HomeDictionary["planner"] = {
  eyebrow: "Free, no commitment",
  title: "Talk to a safari planner",
  description: "Tell us about your trip.",
  submit: "Talk to Safari Planner",
  success: "Thanks. A safari planner will reply within 4 hours.",
  note: "Your details stay with Chatama Safaris.",
  fields: [
    {
      name: "name",
      label: "Your name",
      placeholder: "Your name",
      type: "text"
    }
  ]
};

describe("LeadPlanner", () => {
  it("redirects to the thank-you page after a successful submission", async () => {
    submitWeb3FormMock.mockResolvedValueOnce({ success: true });
    render(<LeadPlanner planner={planner} />);

    fireEvent.change(screen.getByPlaceholderText("Your name"), {
      target: { value: "Alex Traveler" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Talk to Safari Planner" }));

    await waitFor(() => {
      expect(submitWeb3FormMock).toHaveBeenCalledWith({
        subject: "New safari planner request",
        formName: "safari_planner_request",
        values: {
          name: "Alex Traveler",
          form_name: planner.title
        }
      });
      expect(pushMock).toHaveBeenCalledWith(thankYouHref);
    });
  });
});
