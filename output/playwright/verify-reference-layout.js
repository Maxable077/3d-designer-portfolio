/* eslint-disable @typescript-eslint/no-unused-expressions */
async (page) => {
  const root = "output/playwright";
  const consoleMessages = [];
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      consoleMessages.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    consoleMessages.push(`pageerror: ${error.message}`);
  });

  async function shot(path) {
    await page.waitForTimeout(450);
    await page.screenshot({ path: `${root}/${path}`, fullPage: false });
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  await shot("local-home-hero-after-reference-pass.png");

  await page.goto("http://localhost:3000/services", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  await shot("local-services-top-after-reference-pass.png");

  await page.getByRole("button", { name: "Services" }).hover();
  await page.waitForTimeout(500);
  await shot("local-services-mega-menu-after-reference-pass.png");
  await page.mouse.move(20, 980);
  await page.waitForTimeout(500);

  await page.locator("#service-story").scrollIntoViewIfNeeded();
  await page.waitForTimeout(650);
  await shot("local-services-sticky-story-after-reference-pass.png");

  await page.locator("#service-carousel").scrollIntoViewIfNeeded();
  await page.waitForTimeout(650);
  await shot("local-services-carousel-after-reference-pass.png");

  await page.locator("#brief-builder").scrollIntoViewIfNeeded();
  await page.waitForTimeout(650);
  await shot("local-estimator-step-1-after-reference-pass.png");
  await page.getByRole("button", { name: /Continue/i }).click();
  await page.waitForTimeout(500);
  await shot("local-estimator-step-2-after-reference-pass.png");

  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("http://localhost:3000/services", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  await shot("local-services-mobile-top-after-reference-pass.png");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.waitForTimeout(500);
  await shot("local-services-mobile-menu-after-reference-pass.png");

  return {
    screenshots: [
      "local-home-hero-after-reference-pass.png",
      "local-services-top-after-reference-pass.png",
      "local-services-mega-menu-after-reference-pass.png",
      "local-services-sticky-story-after-reference-pass.png",
      "local-services-carousel-after-reference-pass.png",
      "local-estimator-step-1-after-reference-pass.png",
      "local-estimator-step-2-after-reference-pass.png",
      "local-services-mobile-top-after-reference-pass.png",
      "local-services-mobile-menu-after-reference-pass.png",
    ],
    consoleMessages,
  };
}
