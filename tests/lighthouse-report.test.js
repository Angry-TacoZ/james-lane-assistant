import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { runFreshLighthouseAudit } from "../scripts/lighthouse-report.mjs";

const temporaryDirectories = [];

async function createReportPath() {
  const directory = await mkdtemp(join(tmpdir(), "lighthouse-report-"));
  temporaryDirectories.push(directory);
  return join(directory, "report.json");
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

describe("fresh Lighthouse report handling", () => {
  it("does not accept a previous report when the current audit fails", async () => {
    const reportPath = await createReportPath();
    await writeFile(reportPath, JSON.stringify({ source: "stale" }));

    await expect(runFreshLighthouseAudit(reportPath, async () => {
      throw new Error("Lighthouse could not start Chrome");
    })).rejects.toThrow("Lighthouse could not start Chrome");

    await expect(readFile(reportPath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("returns the report produced by the current successful audit", async () => {
    const reportPath = await createReportPath();
    await writeFile(reportPath, JSON.stringify({ source: "stale" }));

    const report = await runFreshLighthouseAudit(reportPath, async () => {
      await writeFile(reportPath, JSON.stringify({ source: "current" }));
    });

    expect(report).toEqual({ source: "current" });
  });
});
