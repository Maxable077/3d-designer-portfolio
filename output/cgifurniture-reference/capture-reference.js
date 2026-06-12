/* eslint-disable @typescript-eslint/no-unused-expressions */
async (page) => {
  const root = "output/cgifurniture-reference";
  const desktopDir = `${root}/desktop`;
  const mobileDir = `${root}/mobile`;
  const fullpageDir = `${root}/fullpage`;
  const animationDir = `${root}/animation`;

  async function closePrivacy() {
    const close = page.getByRole("button", { name: "Close" });
    try {
      if (await close.isVisible({ timeout: 1500 })) {
        await close.click();
      }
    } catch {}
  }

  async function captureScrollSeries({ dir, prefix, width, height, positions }) {
    await page.setViewportSize({ width, height });
    await page.goto("https://cgifurniture.com/", { waitUntil: "domcontentloaded" });
    await closePrivacy();
    await page.waitForTimeout(800);

    const metrics = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      width: document.documentElement.scrollWidth,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
      title: document.title,
      url: location.href,
    }));

    await page.screenshot({
      path: `${fullpageDir}/${prefix}-fullpage.png`,
      fullPage: true,
    });

    const written = [];
    for (let index = 0; index < positions.length; index += 1) {
      const y = Math.min(positions[index], Math.max(0, metrics.height - height));
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(550);
      const file = `${String(index).padStart(2, "0")}-y${String(Math.round(y)).padStart(5, "0")}.png`;
      await page.screenshot({ path: `${dir}/${file}`, fullPage: false });
      written.push({ file, y });
    }

    return { metrics, written };
  }

  const desktopPositions = [
    0, 420, 900, 1350, 1800, 2300, 2800, 3300, 3800, 4300, 4800, 5350, 5900, 6450, 7000, 7550, 8100, 8650, 9200, 9750,
  ];
  const mobilePositions = [
    0, 520, 1040, 1560, 2080, 2600, 3120, 3640, 4160, 4680, 5200, 5720, 6240, 6760, 7280, 7800, 8320, 8840, 9360,
  ];

  const desktop = await captureScrollSeries({
    dir: desktopDir,
    prefix: "desktop",
    width: 1440,
    height: 1000,
    positions: desktopPositions,
  });

  const mobile = await captureScrollSeries({
    dir: mobileDir,
    prefix: "mobile",
    width: 390,
    height: 900,
    positions: mobilePositions,
  });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("https://cgifurniture.com/", { waitUntil: "domcontentloaded" });
  await closePrivacy();
  await page.waitForTimeout(800);

  const animationPositions = [1500, 1680, 1860, 2040, 2220, 2400, 2580, 2760, 2940, 3120];
  const animation = [];
  for (let index = 0; index < animationPositions.length; index += 1) {
    const y = animationPositions[index];
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(300);
    const file = `stacked-industry-${String(index).padStart(2, "0")}-y${String(y).padStart(5, "0")}.png`;
    await page.screenshot({ path: `${animationDir}/${file}`, fullPage: false });
    animation.push({ file, y });
  }

  const manifest = {
    capturedAt: new Date().toISOString(),
    source: "https://cgifurniture.com/",
    desktop,
    mobile,
    animation,
    notes: [
      "desktop/fullpage/desktop-fullpage.png and mobile-fullpage.png are long-page reference captures.",
      "desktop/*.png and mobile/*.png are viewport scroll states.",
      "animation/*.png captures denser frames through the stacked industry/service panel area.",
      "Privacy popup was captured separately in desktop/00-hero-raw-with-privacy-popup.png before being closed.",
    ],
  };
  return manifest;
}
