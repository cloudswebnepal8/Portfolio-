import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(rootDir, "client"),

  build: {
    outDir: path.resolve(rootDir, "dist"),
    emptyOutDir: true,
  },

  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});