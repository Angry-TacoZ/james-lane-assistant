import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const brandSurfaces = [
  "src/main.js",
  "index.html",
  "public/llms-full.txt"
];

describe("James AI branding", () => {
  it.each(brandSurfaces)("removes legacy template branding from %s", (path) => {
    const content = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

    expect(content).not.toMatch(/Synthetic\s*Curator/i);
    expect(content).not.toMatch(/LIVING INTELLIGENCE/i);
  });

  it.each(brandSurfaces)("identifies James AI in %s", (path) => {
    const content = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

    expect(content).toContain("James AI");
  });

  it("uses clear navigation labels and features the designated projects on Design", () => {
    const main = readFileSync(new URL("../src/main.js", import.meta.url), "utf8");

    expect(main).toContain('{ page: "home", label: "AI Assistant" }');
    expect(main).toContain('{ page: "writing", label: "Writing" }');
    expect(main).toContain('{ page: "projects", label: "AI Engineering" }');
    expect(main).toContain('"delivery-composer", "blue-ambient-shopping-agent", "fieldline-aec", "cruisn-pa"');
    expect(main).not.toContain('{ page: "home", label: "Nexus" }');
    expect(main).not.toContain('{ page: "writing", label: "Evolution" }');
    expect(main).not.toContain('{ page: "projects", label: "Artifacts" }');
  });
});
