import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const assetsDirectory = resolve("dist", "assets");
const assetFiles = await readdir(assetsDirectory);
const javascriptFiles = assetFiles.filter((file) => file.endsWith(".js"));

if (javascriptFiles.length === 0) {
  throw new Error("No JavaScript bundle was found in dist/assets.");
}

const bundle = (await Promise.all(javascriptFiles.map((file) => readFile(resolve(assetsDirectory, file), "utf8")))).join("\n");

if (!bundle.includes("/api/synthesize")) {
  throw new Error("Production bundle is missing the same-origin /api/synthesize endpoint.");
}

console.log("Production bundle includes the same-origin /api/synthesize endpoint.");
