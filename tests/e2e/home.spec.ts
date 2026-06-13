import { expect, test } from "@playwright/test";

test("redirects the root route to the default locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByRole("heading", { name: "A lot of people visit Africa. A few witness it." })).toBeVisible();
});

test("renders the English homepage on desktop", async ({ page }) => {
  await page.goto("/en");

  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("banner")).toContainText("Seba Safari");
  await expect(page.getByRole("heading", { name: "Talk to a local planner" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Travel month" })).toBeVisible();
});

test("renders the Arabic homepage with RTL direction", async ({ page }) => {
  await page.goto("/ar");

  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("banner")).toContainText("سيبا سفاري");
  await expect(page.getByRole("heading", { name: "تحدث مع مخطط محلي" })).toBeVisible();
  await expect(page.getByRole("button", { name: "شهر السفر" })).toBeVisible();
});

test("planner select can be opened and completed", async ({ page }) => {
  await page.goto("/en");

  await page.getByRole("button", { name: "Travel month" }).click();
  await page.getByRole("option", { name: "June to October" }).click();
  await page.getByLabel("Email").fill("traveler@example.com");

  await expect(page.getByText("June to October")).toBeVisible();
});

test("mobile menu opens and links to planner", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile-only interaction");

  await page.goto("/en");
  await page.getByLabel("Open menu").click();
  await expect(page.getByRole("dialog")).toContainText("Destinations");
  await page.getByRole("link", { name: "Talk to a local planner" }).click();
  await expect(page.locator("#planner")).toBeInViewport();
});
