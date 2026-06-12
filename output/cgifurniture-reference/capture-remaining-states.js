/* eslint-disable @typescript-eslint/no-unused-expressions */
async (page) => {
  const root = "output/cgifurniture-reference/animation";

  async function wait(ms = 600) {
    await page.waitForTimeout(ms);
  }

  async function cleanOverlays() {
    await page.evaluate(() => {
      const blocks = Array.from(document.querySelectorAll("body *"));
      for (const el of blocks) {
        if (!(el instanceof HTMLElement)) continue;
        const text = el.innerText || "";
        const rect = el.getBoundingClientRect();
        if (
          text.includes("We value your privacy") &&
          rect.width <= 700 &&
          rect.height <= 360
        ) {
          el.style.display = "none";
        }
      }

      const selectors = [
        "iframe[title*='chat' i]",
        "iframe[src*='tawk' i]",
        "[aria-label*='Live chat' i]",
        "[class*='tawk' i]",
        "[id*='tawk' i]",
      ];
      for (const selector of selectors) {
        for (const node of document.querySelectorAll(selector)) {
          if (node instanceof HTMLElement) node.style.display = "none";
        }
      }
    });
  }

  async function shot(name) {
    await cleanOverlays();
    await wait(350);
    await page.screenshot({
      path: `${root}/${name}`,
      scale: "css",
      type: "png",
    });
  }

  async function home(width, height) {
    await page.setViewportSize({ width, height });
    await page.goto("https://cgifurniture.com/", { waitUntil: "domcontentloaded" });
    await wait(900);
    await cleanOverlays();
  }

  async function scrollTo(text) {
    await page.getByText(text, { exact: false }).first().scrollIntoViewIfNeeded();
    await wait(650);
  }

  const captured = [];
  async function capture(name) {
    await shot(name);
    captured.push(name);
  }

  await home(1440, 1000);
  await page.getByRole("button", { name: "Estimate project" }).click();
  await wait(1200);
  await capture("desktop-estimate-project-scroll-target-clean.png");

  await home(1440, 1000);
  await page.getByRole("button", { name: "Schedule a demo" }).first().click();
  await wait(1500);
  await capture("desktop-schedule-demo-state-clean.png");

  await home(1440, 1000);
  await scrollTo("Simple pricing of 3D content for e-commerce");
  await page.getByRole("button", { name: "Select" }).nth(1).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await wait(400);
  await page.getByRole("button", { name: "Select" }).first().click();
  await page.getByRole("button", { name: "Continue" }).click();
  await wait(400);
  await page.getByRole("button", { name: "Select" }).first().click();
  await page.getByRole("button", { name: "Continue" }).click();
  await wait(800);
  await capture("desktop-estimator-step-4-clean.png");

  await home(1440, 1000);
  await scrollTo("Answers to common questions");
  await capture("desktop-faq-closed-clean.png");
  await page
    .getByRole("button", { name: /What details are required to begin a 3D rendering project/i })
    .click();
  await wait(500);
  await capture("desktop-faq-open-clean.png");

  await home(390, 900);
  await capture("mobile-hero-clean-manual.png");

  try {
    const menuCandidate = page.locator(
      'button[aria-label*="menu" i], button[aria-label*="navigation" i], button[aria-expanded]'
    ).first();
    if (await menuCandidate.isVisible({ timeout: 700 })) {
      await menuCandidate.click();
      await wait(450);
      await capture("mobile-menu-open-clean.png");
    } else {
      await capture("mobile-menu-not-present-clean.png");
    }
  } catch {
    await capture("mobile-menu-not-present-clean.png");
  }

  return { captured };
}
