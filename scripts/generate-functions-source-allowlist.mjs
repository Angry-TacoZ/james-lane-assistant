import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { sourceCorpus } from "../src/data/resumeCorpus.js";

const outputPath = resolve("functions/approved-source-allowlist.json");
const refs = Object.fromEntries(
  sourceCorpus.map((section) => [
    section.id,
    {
      title: section.title,
      sourceLabel: section.sourceLabel,
      referenceLabel: section.referenceLabel,
      items: [...new Set([section.title, ...section.items, "Supporting resources:"].map((item) => item.trim()))]
    }
  ])
);

await writeFile(
  outputPath,
  `${JSON.stringify(
    {
      generatedFrom: "src/data/resumeCorpus.js",
      refCount: Object.keys(refs).length,
      refs
    },
    null,
    2
  )}\n`
);

console.log(`Wrote ${Object.keys(refs).length} approved source refs to ${outputPath}`);
