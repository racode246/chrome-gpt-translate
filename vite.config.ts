import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: resolve(__dirname, "scripts/content/index.ts"),
      output: {
        entryFileNames: "content.js",
        format: "iife",
        dir: resolve(__dirname, "dist"),
      },
    },
  },
});
