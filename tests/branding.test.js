import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const brandSurfaces = [
  "src/main.js",
  "index.html",
  "public/llms-full.txt"
];

describe("JamesAQI branding", () => {
  it.each(brandSurfaces)("removes legacy template branding from %s", (path) => {
    const content = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

    expect(content).not.toMatch(/Synthetic\s*Curator/i);
    expect(content).not.toMatch(/LIVING INTELLIGENCE/i);
  });

  it.each(brandSurfaces)("identifies JamesAQI in %s", (path) => {
    const content = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

    expect(content).toContain("JamesAQI");
  });
});
