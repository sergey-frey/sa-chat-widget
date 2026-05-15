import pandacss from "@pandacss/dev/postcss";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [preact()],
  css: {
    postcss: { plugins: [pandacss] },
    modules: {
      // Shadow DOM provides scoping; plain class names keep devtools readable.
      generateScopedName: "[local]",
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SAWidget",
      formats: ["iife"],
      fileName: () => "sa-widget.js",
    },
  },
  server: {
    port: 5174,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
});
