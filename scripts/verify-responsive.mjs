import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "playwright";

const HOST = "127.0.0.1";
const PORT = Number(process.env.RESPONSIVE_VERIFY_PORT ?? 44181);
const BASE_URL = `http://${HOST}:${PORT}`;
const PREVIEW_TIMEOUT_MS = 30_000;

const chromeCandidates = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
];

const pages = [
  { name: "home", hash: "" },
  { name: "writing", hash: "#writing" },
  { name: "projects", hash: "#projects" },
  { name: "design", hash: "#design" },
  { name: "health", hash: "#health" },
  { name: "contact", hash: "#contact" }
];

const viewports = [
  { name: "mobile", width: 390, height: 844, isMobile: true },
  { name: "desktop", width: 1440, height: 1000, isMobile: false }
];

function findBrowserExecutable() {
  const executable = chromeCandidates.find((candidate) => existsSync(candidate));

  if (!executable) {
    throw new Error("No system Chrome or Edge executable found for responsive verification.");
  }

  return executable;
}

function startPreview() {
  const command = `npm.cmd run preview -- --host ${HOST} --port ${PORT} --strictPort`;

  return spawn("cmd.exe", ["/d", "/s", "/c", command], {
    cwd: process.cwd(),
    env: { ...process.env, NO_UPDATE_NOTIFIER: "1" },
    shell: false,
    stdio: ["ignore", "pipe", "pipe"]
  });
}

async function waitForPreview() {
  const startedAt = Date.now();

  while (Date.now() - startedAt < PREVIEW_TIMEOUT_MS) {
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) {
        return;
      }
    } catch {
      // Preview server is still starting.
    }

    await delay(500);
  }

  throw new Error(`Preview server did not become ready at ${BASE_URL}`);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function verifyPage(browser, viewport, pageTarget) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.isMobile
  });
  const page = await context.newPage();
  const errors = [];

  page.on("pageerror", (error) => {
    errors.push(error.message);
  });
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });

  await page.goto(`${BASE_URL}/?qa=responsive-${viewport.name}-${pageTarget.name}${pageTarget.hash}`, {
    waitUntil: "networkidle"
  });

  const result = await page.evaluate((viewportName) => {
    const app = document.querySelector("#app");
    const mobileNav = document.querySelector(".md\\:hidden.fixed.bottom-0.left-0.w-full");
    const desktopNav = [...document.querySelectorAll("nav, aside")].find((element) => {
      const style = window.getComputedStyle(element);
      return style.display !== "none" && element.getBoundingClientRect().height > 0;
    });
    const interactiveTargets = document.querySelectorAll("button, a, input, textarea, [data-page-link]");
    const widthOverflow = document.documentElement.scrollWidth - window.innerWidth;

    return {
      bodyTextLength: document.body.innerText.trim().length,
      appExists: Boolean(app),
      interactiveTargetCount: interactiveTargets.length,
      hasExpectedNav: viewportName === "mobile" ? Boolean(mobileNav) : Boolean(desktopNav),
      widthOverflow
    };
  }, viewport.name);

  await context.close();

  assert(errors.length === 0, `${viewport.name}/${pageTarget.name} browser errors: ${errors.join(" | ")}`);
  assert(result.appExists, `${viewport.name}/${pageTarget.name} did not render #app`);
  assert(result.bodyTextLength > 100, `${viewport.name}/${pageTarget.name} rendered too little visible text`);
  assert(result.interactiveTargetCount > 0, `${viewport.name}/${pageTarget.name} has no interactive targets`);
  assert(result.hasExpectedNav, `${viewport.name}/${pageTarget.name} missing expected navigation`);
  assert(result.widthOverflow <= 2, `${viewport.name}/${pageTarget.name} has horizontal overflow of ${result.widthOverflow}px`);
}

async function verifyAudioGuide(browser) {
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const mobilePage = await mobileContext.newPage();

  await mobilePage.goto(`${BASE_URL}/?qa=responsive-audio-mobile#design`, { waitUntil: "networkidle" });

  const mobileInitial = await mobilePage.evaluate(() => {
    const dock = document.querySelector('aside[aria-label="Audio guide player"]');
    const nav = document.querySelector(".md\\:hidden.fixed.bottom-0.left-0.w-full");
    const dockRect = dock?.getBoundingClientRect();
    const navRect = nav?.getBoundingClientRect();
    return {
      hasDock: Boolean(dock),
      overlapsNav: Boolean(dockRect && navRect && dockRect.bottom > navRect.top)
    };
  });

  assert(mobileInitial.hasDock, "mobile audio guide dock is missing on first visit");
  assert(!mobileInitial.overlapsNav, "mobile audio guide dock overlaps bottom navigation");

  await mobilePage.click('[data-audio-guide-action="close"]');

  const mobileClosed = await mobilePage.evaluate(() => {
    const launcher = document.querySelector('[data-audio-guide-action="open"]');
    const nav = document.querySelector(".md\\:hidden.fixed.bottom-0.left-0.w-full");
    const launcherRect = launcher?.getBoundingClientRect();
    const navRect = nav?.getBoundingClientRect();
    return {
      hasLauncher: Boolean(launcher),
      launcherDisplay: launcher ? getComputedStyle(launcher).display : null,
      overlapsNav: Boolean(launcherRect && navRect && launcherRect.bottom > navRect.top)
    };
  });

  assert(mobileClosed.hasLauncher, "mobile audio guide launcher is missing after close");
  assert(mobileClosed.launcherDisplay !== "none", "mobile audio guide launcher is hidden after close");
  assert(!mobileClosed.overlapsNav, "mobile audio guide launcher overlaps bottom navigation");

  await mobilePage.click('[data-audio-guide-action="open"]');
  assert(await mobilePage.locator('[role="dialog"][aria-labelledby="audio-guide-title"]').isVisible(), "mobile audio guide prompt does not reopen");
  await mobileContext.close();

  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const desktopPage = await desktopContext.newPage();

  await desktopPage.goto(`${BASE_URL}/?qa=responsive-audio-desktop`, { waitUntil: "networkidle" });
  const visibleDesktopDocks = await desktopPage.evaluate(
    () =>
      [...document.querySelectorAll('aside[aria-label="Audio guide player"]')].filter(
        (element) => getComputedStyle(element).display !== "none"
      ).length
  );
  assert(visibleDesktopDocks === 1, `expected one visible desktop audio guide dock, found ${visibleDesktopDocks}`);

  await desktopPage.click('[data-audio-guide-action="close"]');
  const visibleDesktopLaunchers = await desktopPage.evaluate(
    () =>
      [...document.querySelectorAll('[data-audio-guide-action="open"]')].filter(
        (element) => getComputedStyle(element).display !== "none"
      ).length
  );
  assert(visibleDesktopLaunchers === 1, `expected one visible desktop audio guide launcher, found ${visibleDesktopLaunchers}`);

  await desktopPage.locator('[data-audio-guide-action="open"]:visible').click();
  assert(await desktopPage.locator('[role="dialog"][aria-labelledby="audio-guide-title"]').isVisible(), "desktop audio guide prompt does not reopen");
  await desktopContext.close();
}

async function main() {
  const preview = startPreview();
  let previewOutput = "";

  preview.stdout.on("data", (chunk) => {
    previewOutput += chunk.toString();
  });
  preview.stderr.on("data", (chunk) => {
    previewOutput += chunk.toString();
  });

  try {
    await waitForPreview();

    const browser = await chromium.launch({
      headless: true,
      executablePath: findBrowserExecutable()
    });

    for (const viewport of viewports) {
      for (const pageTarget of pages) {
        await verifyPage(browser, viewport, pageTarget);
      }
    }

    await verifyAudioGuide(browser);
    await browser.close();
  } catch (error) {
    console.error(previewOutput);
    throw error;
  } finally {
    preview.kill();
  }

  console.log("Responsive verification passed for mobile and desktop.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
