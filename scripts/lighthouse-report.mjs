import { readFile, rm } from "node:fs/promises";

export async function runFreshLighthouseAudit(reportPath, runAudit) {
  await rm(reportPath, { force: true });
  await runAudit();
  return JSON.parse(await readFile(reportPath, "utf8"));
}
