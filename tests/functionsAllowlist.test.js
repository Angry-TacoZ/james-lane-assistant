import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { sourceCorpus } from "../src/data/resumeCorpus.js";

const allowlist = JSON.parse(
  readFileSync(resolve("functions/approved-source-allowlist.json"), "utf8")
);

function expectedEntry(section) {
  return {
    title: section.title,
    sourceLabel: section.sourceLabel,
    referenceLabel: section.referenceLabel,
    items: [...new Set([section.title, ...section.items, "Supporting resources:"].map((item) => item.trim()))]
  };
}

describe("functions approved source allowlist", () => {
  it("matches the frontend source corpus", () => {
    const expectedRefs = Object.fromEntries(sourceCorpus.map((section) => [section.id, expectedEntry(section)]));

    expect(allowlist.generatedFrom).toBe("src/data/resumeCorpus.js");
    expect(allowlist.refCount).toBe(sourceCorpus.length);
    expect(allowlist.refs).toEqual(expectedRefs);
  });
});
