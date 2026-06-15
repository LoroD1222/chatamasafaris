import { expect, test, type Page } from "@playwright/test";

async function gotoApp(page: Page, path: string, options?: { waitForPlanner?: boolean }) {
  await page.goto(path, { waitUntil: "domcontentloaded" });

  if (options?.waitForPlanner) {
    await page.locator("#planner[data-hydrated='true']").waitFor();
  }
}

test("redirects the root route to the default locale", async ({ page }) => {
  await gotoApp(page, "/", { waitForPlanner: true });

  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByRole("heading", { name: /A lot of People visit/ })).toBeVisible();
});

test("renders the English homepage on desktop", async ({ page }) => {
  await gotoApp(page, "/en", { waitForPlanner: true });

  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("banner")).toContainText("Astra Tanzania Safaris");
  await expect(page.getByRole("heading", { name: "Talk to a safari planner" }).first()).toBeVisible();
  await expect(page.getByPlaceholder("Your name").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Choose your Tanzania Experience Category" })).toBeVisible();
});

test("Arabic is deferred for the English-only v1", async ({ page }) => {
  await gotoApp(page, "/ar");

  await expect(page.getByRole("heading", { name: "This route is off the map." })).toBeVisible();
});

test("planner form can be completed", async ({ page }) => {
  await gotoApp(page, "/en", { waitForPlanner: true });

  const planner = page.locator("#planner");
  await planner.getByPlaceholder("Your name").fill("Alex Traveler");
  await planner.getByPlaceholder("Whatsapp number").fill("+15551234567");
  await planner.getByPlaceholder("Email").fill("traveler@example.com");
  await planner.getByRole("combobox", { name: "How many people" }).click();
  await page.getByRole("option", { name: "2 people" }).click();
  await planner.getByRole("button", { name: /Talk to Safari Planner/ }).click();

  await expect(page.getByText("Thanks. A safari planner will reply within 4 hours.")).toBeVisible();
});

test("mobile menu opens and links to planner", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile-only interaction");

  await gotoApp(page, "/en", { waitForPlanner: true });
  await page.getByLabel("Open menu").click();
  await expect(page.getByRole("dialog")).toContainText("Itineraries");
  await page.getByRole("link", { name: "Talk to Safari Planner" }).click();
  await expect(page.locator("#planner")).toBeInViewport();
});

test("FAQ rows expand and the page has no horizontal overflow", async ({ page }) => {
  await gotoApp(page, "/en", { waitForPlanner: true });

  await expect(page.getByText("Lorem ipsum dolor sit amet").first()).toBeVisible();
  await page.getByRole("button", { name: "Expand answer" }).first().click();
  await expect(page.getByRole("button", { name: "Collapse answer" }).first()).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
