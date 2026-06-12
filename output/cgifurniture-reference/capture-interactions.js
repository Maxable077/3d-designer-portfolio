/* eslint-disable @typescript-eslint/no-unused-expressions */
async (page) => {
  const root = "output/cgifurniture-reference/animation";

  async function shot(name, options = {}) {
    await page.waitForTimeout(options.wait ?? 500);
    await page.screenshot({
      path: `${root}/${name}`,
      fullPage: Boolean(options.fullPage),
      scale: "css",
      type: "png",
    });
  }

  async function closePrivacy() {
    try {
      const close = page.getByRole("button", { name: "Close", exact: true });
      if (await close.isVisible({ timeout: 1200 })) {
        await close.click();
        await page.waitForTimeout(350);
      }
    } catch {}
  }

  async function minimizeChat() {
    try {
      const minimize = page.getByRole("button", { name: /Minimize live chat/i });
      if (await minimize.isVisible({ timeout: 800 })) {
        await minimize.click();
        await page.waitForTimeout(350);
      }
    } catch {}

    try {
      const tooltipClose = page.getByRole("button", { name: /Close tooltip/i });
      if (await tooltipClose.isVisible({ timeout: 800 })) {
        await tooltipClose.click();
        await page.waitForTimeout(350);
      }
    } catch {}
  }

  async function gotoHome(width, height) {
    await page.setViewportSize({ width, height });
    await page.goto("https://cgifurniture.com/", { waitUntil: "domcontentloaded" });
    await closePrivacy();
    await minimizeChat();
    await page.waitForTimeout(900);
  }

  async function scrollToText(text) {
    const target = page.getByText(text, { exact: false }).first();
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
  }

  const captured = [];
  async function capture(name, options) {
    await shot(name, options);
    captured.push(name);
  }

  await gotoHome(1440, 1000);
  await capture("desktop-hero-default-clean.png");

  await page.getByRole("link", { name: "Services", exact: true }).hover();
  await capture("desktop-nav-services-dropdown-clean.png");

  await page.getByRole("button", { name: "Insights" }).hover();
  await capture("desktop-nav-insights-dropdown-clean.png");

  await page.mouse.move(20, 20);
  const themeToggle = page
    .locator('button[aria-label*="dark" i], button[aria-label*="light" i], button[aria-pressed]')
    .last();
  if (await themeToggle.isVisible({ timeout: 1200 })) {
    await themeToggle.click();
  } else {
    await page.mouse.click(1375, 55);
  }
  await capture("desktop-dark-mode-clean.png");

  await gotoHome(1440, 1000);
  await scrollToText("Simple pricing of 3D content for e-commerce");
  await capture("desktop-estimator-step-1.png");
  await page.getByRole("button", { name: "Select" }).nth(1).click();
  await capture("desktop-estimator-step-1-selected.png");
  await page.getByRole("button", { name: "Continue" }).click();
  await capture("desktop-estimator-step-2.png");

  try {
    const step2Select = page.getByRole("button", { name: "Select" }).first();
    if (await step2Select.isVisible({ timeout: 1200 })) {
      await step2Select.click();
    }
    await page.getByRole("button", { name: "Continue" }).click();
    await capture("desktop-estimator-step-3.png");
  } catch {
    await capture("desktop-estimator-step-3-unavailable.png");
  }

  try {
    const step3Select = page.getByRole("button", { name: "Select" }).first();
    if (await step3Select.isVisible({ timeout: 1200 })) {
      await step3Select.click();
    }
    await page.getByRole("button", { name: "Continue" }).click();
    await capture("desktop-estimator-step-4.png");
  } catch {
    await capture("desktop-estimator-step-4-unavailable.png");
  }

  await gotoHome(1440, 1000);
  await scrollToText("See what our clients say");
  await capture("desktop-testimonials-initial.png");
  await page.getByRole("button", { name: "Next review" }).click();
  await capture("desktop-testimonials-next.png");

  await scrollToText("Answers to common questions");
  await capture("desktop-faq-closed.png");
  await page
    .getByRole("button", { name: /What details are required to begin a 3D rendering project/i })
    .click();
  await capture("desktop-faq-open.png");

  await gotoHome(390, 900);
  await capture("mobile-hero-clean.png");

  try {
    const menuButton = page
      .getByRole("button")
      .filter({ hasText: /menu|open|navigation/i })
      .first();
    if (await menuButton.isVisible({ timeout: 800 })) {
      await menuButton.click();
    } else {
      const buttons = page.getByRole("button");
      await buttons.nth(Math.max(0, (await buttons.count()) - 1)).click();
    }
    await capture("mobile-menu-open.png");
  } catch {
    await capture("mobile-menu-open-unavailable.png");
  }

  return { captured };
}
