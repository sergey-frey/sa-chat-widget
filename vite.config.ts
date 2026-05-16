import preact from "@preact/preset-vite";
import { resolve } from "path";
import { defineConfig, type Plugin } from "vite";

function stripCssAssets(): Plugin {
  return {
    name: "strip-css-assets",
    apply: "build",
    generateBundle(_, bundle) {
      for (const key of Object.keys(bundle)) {
        if (key.endsWith(".css")) delete bundle[key];
      }
    },
  };
}

export default defineConfig({
  plugins: [preact(), stripCssAssets()],
  css: {
    modules: {
      // Use default hashed scoping for CSS Modules
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/app/index.ts"),
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
