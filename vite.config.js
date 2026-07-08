import { defineConfig } from "vite";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: projectRoot,
  preview: {
    host: "127.0.0.1",
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0"
    }
  },
  server: {
    host: "127.0.0.1",
    port: 4173,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0"
    }
  },
  test: {
    environment: "node",
    exclude: ["functions/**/*.test.js", "node_modules/**", "dist/**"]
  }
});
