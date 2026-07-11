import { execFile, spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const port = 44183;
const url = `http://127.0.0.1:${port}/`;
const reportPath = resolve(projectRoot, "output", "lighthouse-performance.json");
const chromePath = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
].find((candidate) => candidate && existsSync(candidate));

if (!chromePath) {
  throw new Error("Chrome or Edge was not found. Set CHROME_PATH to run Lighthouse.");
}

await mkdir(dirname(reportPath), { recursive: true });

const preview = spawn(
  process.platform === "win32" ? "cmd.exe" : "npm",
  process.platform === "win32"
    ? ["/c", "npm.cmd", "run", "preview", "--", "--host", "127.0.0.1", "--port", String(port), "--strictPort"]
    : ["run", "preview", "--", "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
  { cwd: projectRoot, stdio: "ignore" }
);

try {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) break;
    } catch {
      // The preview server is still starting.
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 300));
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("The local preview server did not become ready for Lighthouse.");
  }

  try {
    await execFileAsync(process.execPath, [
      resolve(projectRoot, "node_modules", "lighthouse", "cli", "index.js"),
      url,
      `--chrome-path=${chromePath}`,
      "--only-categories=performance",
      "--output=json",
      `--output-path=${reportPath}`,
      "--quiet"
    ]);
  } catch (error) {
    if (!existsSync(reportPath)) {
      throw error;
    }
  }

  const report = JSON.parse(await readFile(reportPath, "utf8"));
  const audits = report.audits;
  const metrics = {
    performance: Math.round(report.categories.performance.score * 100),
    firstContentfulPaint: audits["first-contentful-paint"].displayValue,
    largestContentfulPaint: audits["largest-contentful-paint"].displayValue,
    totalBlockingTime: audits["total-blocking-time"].displayValue,
    cumulativeLayoutShift: audits["cumulative-layout-shift"].displayValue,
    transferSize: audits["total-byte-weight"].displayValue
  };

  console.log(JSON.stringify(metrics, null, 2));
} finally {
  preview.kill();
}
