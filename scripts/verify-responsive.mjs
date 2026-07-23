import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "playwright";

const HOST = "127.0.0.1";
const PORT = Number(process.env.RESPONSIVE_VERIFY_PORT ?? 44181);
const BASE_URL = `http://${HOST}:${PORT}`;
const PREVIEW_TIMEOUT_MS = 30_000;
const PREVIEW_STOP_TIMEOUT_MS = 5_000;
const VITE_CLI = fileURLToPath(new URL("../node_modules/vite/bin/vite.js", import.meta.url));

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

function startPreview() {
  return spawn(process.execPath, [VITE_CLI, "preview", "--host", HOST, "--port", String(PORT), "--strictPort"], {
    cwd: process.cwd(),
    env: { ...process.env, NO_UPDATE_NOTIFIER: "1" },
    shell: false,
    stdio: ["ignore", "pipe", "pipe"]
  });
}

function assertPreviewPortAvailable() {
  return new Promise((resolve, reject) => {
    const probe = createServer();

    probe.once("error", (error) => {
      reject(new Error(`Preview port ${PORT} is unavailable before verification: ${error.message}`));
    });
    probe.listen(PORT, HOST, () => {
      probe.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  });
}

function waitForProcessExit(child, timeoutMs) {
  if (child.exitCode !== null || child.signalCode !== null) {
    return Promise.resolve(true);
  }

  return Promise.race([
    new Promise((resolve) => child.once("exit", () => resolve(true))),
    delay(timeoutMs).then(() => false)
  ]);
}

async function stopPreview(preview) {
  if (preview.exitCode !== null || preview.signalCode !== null) {
    return;
  }

  preview.kill("SIGTERM");
  if (await waitForProcessExit(preview, PREVIEW_STOP_TIMEOUT_MS)) {
    return;
  }

  preview.kill("SIGKILL");
  await waitForProcessExit(preview, PREVIEW_STOP_TIMEOUT_MS);
}

async function waitForPreview(preview) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < PREVIEW_TIMEOUT_MS) {
    if (preview.exitCode !== null || preview.signalCode !== null) {
      throw new Error(`Preview process exited before becoming ready (exit ${preview.exitCode ?? preview.signalCode}).`);
    }

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

  try {
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

    const result = await page.evaluate(({ viewportName, pageTargetName }) => {
      const app = document.querySelector("#app");
      const expectedNav = document.querySelector(`[data-responsive-nav="${viewportName}"]`);
      const navStyle = expectedNav ? window.getComputedStyle(expectedNav) : null;
      const navRect = expectedNav?.getBoundingClientRect();
      const visibleNavLinks = expectedNav
        ? [...expectedNav.querySelectorAll("a, button, [data-page-link]")].filter((element) => {
            const style = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
          }).length
        : 0;
      const navControlsAreSemantic = expectedNav
        ? [...expectedNav.querySelectorAll("[data-page-link]")].every((element) => element.matches("a, button"))
        : false;
      const homeQuickLinks = [...document.querySelectorAll("[data-home-quick-link]")];
      const homeQuickLinksAreAccessible =
        homeQuickLinks.length === 0 ||
        homeQuickLinks.every((element) => element.matches("a, button") && element.getAttribute("aria-label"));
      const homeComposerIsAccessible =
        pageTargetName !== "home" ||
        Boolean(
          document.querySelector('[data-home-input][aria-label]') &&
            document.querySelector('[data-home-submit][aria-label]')
        );
      const brandLockup = document.querySelector("[data-brand-lockup]");
      const brandStyle = brandLockup ? window.getComputedStyle(brandLockup) : null;
      const brandRect = brandLockup?.getBoundingClientRect();
      const brandLockupIsVisible = Boolean(
        brandStyle &&
          brandRect &&
          brandStyle.display !== "none" &&
          brandStyle.visibility !== "hidden" &&
          brandRect.width > 0 &&
          brandRect.height > 0
      );
      const brandCopyIsCorrect =
        brandLockup?.querySelector("[data-brand-name]")?.textContent?.trim() === "JamesAQI" &&
        brandLockup?.querySelector("[data-brand-tagline]")?.textContent?.trim() === "An AI powered living resume";
      const homeEvidenceCards = [...document.querySelectorAll("[data-home-evidence-card]")];
      const homeEvidenceAffordancesAreHonest = homeEvidenceCards.every((card) => {
        const hasUrl = card.getAttribute("data-evidence-link") === "true";
        const icon = card.querySelector(".material-symbols-outlined")?.textContent?.trim();

        return hasUrl
          ? card.matches("a[href]") && icon === "open_in_new"
          : card.matches("article") && icon !== "open_in_new";
      });
      const interactiveTargets = document.querySelectorAll("button, a, input, textarea, [data-page-link]");
      const widthOverflow = document.documentElement.scrollWidth - window.innerWidth;

      return {
        bodyTextLength: document.body.innerText.trim().length,
        appExists: Boolean(app),
        interactiveTargetCount: interactiveTargets.length,
        expectedNavExists: Boolean(expectedNav),
        expectedNavVisible: Boolean(
          navStyle &&
            navRect &&
            navStyle.display !== "none" &&
            navStyle.visibility !== "hidden" &&
            navRect.width > 0 &&
            navRect.height > 0
        ),
        visibleNavLinks,
        navControlsAreSemantic,
        homeQuickLinksAreAccessible,
        homeComposerIsAccessible,
        brandLockupIsVisible,
        brandCopyIsCorrect,
        homeEvidenceAffordancesAreHonest,
        widthOverflow
      };
    }, { viewportName: viewport.name, pageTargetName: pageTarget.name });

    assert(errors.length === 0, `${viewport.name}/${pageTarget.name} browser errors: ${errors.join(" | ")}`);
    assert(result.appExists, `${viewport.name}/${pageTarget.name} did not render #app`);
    assert(result.bodyTextLength > 100, `${viewport.name}/${pageTarget.name} rendered too little visible text`);
    assert(result.interactiveTargetCount > 0, `${viewport.name}/${pageTarget.name} has no interactive targets`);
    assert(result.expectedNavExists, `${viewport.name}/${pageTarget.name} missing expected navigation`);
    assert(result.expectedNavVisible, `${viewport.name}/${pageTarget.name} expected navigation is not visible`);
    assert(result.visibleNavLinks > 0, `${viewport.name}/${pageTarget.name} expected navigation has no visible controls`);
    assert(result.navControlsAreSemantic, `${viewport.name}/${pageTarget.name} navigation includes non-semantic controls`);
    assert(result.homeQuickLinksAreAccessible, `${viewport.name}/${pageTarget.name} home quick links are not accessible controls`);
    assert(result.homeComposerIsAccessible, `${viewport.name}/${pageTarget.name} home composer is missing accessible labels`);
    assert(result.brandLockupIsVisible, `${viewport.name}/${pageTarget.name} brand lockup is missing or hidden`);
    assert(result.brandCopyIsCorrect, `${viewport.name}/${pageTarget.name} brand copy is incorrect`);
    assert(result.homeEvidenceAffordancesAreHonest, `${viewport.name}/${pageTarget.name} evidence cards imply unavailable links`);
    assert(result.widthOverflow <= 2, `${viewport.name}/${pageTarget.name} has horizontal overflow of ${result.widthOverflow}px`);
  } finally {
    await context.close();
  }
}

async function verifyAudioGuide(browser) {
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });

  try {
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto(`${BASE_URL}/?qa=responsive-audio-mobile#design`, { waitUntil: "networkidle" });

    const mobileInitial = await mobilePage.evaluate(() => {
      const dock = document.querySelector('aside[aria-label="Audio guide player"]');
      const nav = document.querySelector('[data-responsive-nav="mobile"]');
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
      const nav = document.querySelector('[data-responsive-nav="mobile"]');
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
  } finally {
    await mobileContext.close();
  }

  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });

  try {
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
  } finally {
    await desktopContext.close();
  }
}

async function verifyResumeViewer(browser) {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile
    });

    try {
      const page = await context.newPage();
      const errors = [];

      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") {
          errors.push(message.text());
        }
      });

      await page.goto(`${BASE_URL}/?qa=responsive-resume-${viewport.name}`, { waitUntil: "networkidle" });
      await page.click('[data-mode-id="resume"]');
      await page.waitForSelector("[data-resume-viewer]");
      await page.waitForFunction(
        () => [...document.querySelectorAll("[data-resume-page]")].every((image) => image.complete && image.naturalWidth > 0)
      );

      const result = await page.evaluate(() => {
        const viewer = document.querySelector("[data-resume-viewer]");
        const download = document.querySelector("[data-resume-download]");
        const pages = [...document.querySelectorAll("[data-resume-page]")];

        return {
          viewerVisible: Boolean(viewer && viewer.getBoundingClientRect().height > 0),
          pageCount: pages.length,
          pagesLoaded: pages.every((image) => image.complete && image.naturalWidth > 0),
          pageLinksAreSemantic: [...document.querySelectorAll("[data-resume-page-link]")].every((link) => link.matches("a[href]")),
          downloadHref: download?.getAttribute("href"),
          downloadName: download?.getAttribute("download"),
          operationalIdentityVisible: document.body.innerText.includes("Operational Identity"),
          widthOverflow: document.documentElement.scrollWidth - window.innerWidth
        };
      });

      assert(errors.length === 0, `${viewport.name}/resume browser errors: ${errors.join(" | ")}`);
      assert(result.viewerVisible, `${viewport.name}/resume viewer is not visible`);
      assert(result.pageCount === 2, `${viewport.name}/resume expected 2 pages, found ${result.pageCount}`);
      assert(result.pagesLoaded, `${viewport.name}/resume page images did not load`);
      assert(result.pageLinksAreSemantic, `${viewport.name}/resume full-size page links are not semantic anchors`);
      assert(result.downloadHref === "/resume/James-Lane-Resume.pdf", `${viewport.name}/resume download targets the wrong file`);
      assert(result.downloadName === "James-Lane-Resume.pdf", `${viewport.name}/resume download filename is incorrect`);
      assert(!result.operationalIdentityVisible, `${viewport.name}/resume still shows the operational identity panel`);
      assert(result.widthOverflow <= 2, `${viewport.name}/resume has horizontal overflow of ${result.widthOverflow}px`);
    } finally {
      await context.close();
    }
  }
}

async function main() {
  await assertPreviewPortAvailable();
  const preview = startPreview();
  let previewOutput = "";

  preview.stdout.on("data", (chunk) => {
    previewOutput += chunk.toString();
  });
  preview.stderr.on("data", (chunk) => {
    previewOutput += chunk.toString();
  });

  try {
    await waitForPreview(preview);

    const browser = await chromium.launch({ headless: true });
    try {
      for (const viewport of viewports) {
        for (const pageTarget of pages) {
          await verifyPage(browser, viewport, pageTarget);
        }
      }

      await verifyAudioGuide(browser);
      await verifyResumeViewer(browser);
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error(previewOutput);
    throw error;
  } finally {
    await stopPreview(preview);
  }

  console.log("Responsive verification passed for mobile and desktop.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
