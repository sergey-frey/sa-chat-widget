import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  jsxFramework: "preact",
  outExtension: "js",
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  outdir: "src/shared/styled-system",

  theme: {
    extend: {
      tokens: {
        colors: {
          accent: {
            default: { value: "#5b7cf6" },
            hover: { value: "#4a6be0" },
            active: { value: "#3d5bcc" },
            light: { value: "#7b9bff" },
            focusRing: { value: "rgba(91, 124, 246, 0.45)" },
            border: { value: "rgba(91, 124, 246, 0.30)" },
            borderHover: { value: "rgba(91, 124, 246, 0.50)" },
            bgHover: { value: "rgba(91, 124, 246, 0.08)" },
            bgActive: { value: "rgba(91, 124, 246, 0.12)" },
          },
          surface: {
            default: { value: "#1e2028" },
            hover: { value: "#252836" },
            active: { value: "#2c3040" },
          },
          border: {
            default: { value: "#2a2d3e" },
            hover: { value: "#363a52" },
          },
          text: {
            primary: { value: "#c7cad8" },
            muted: { value: "#8b8fa8" },
          },
          danger: {
            default: { value: "#e05252" },
            hover: { value: "#cc3f3f" },
            active: { value: "#b83030" },
          },
        },
        // Semantic radii — avoids collisions with Panda's default xs/sm/md scale
        radii: {
          panel: { value: "16px" },
          control: { value: "10px" },
          controlSm: { value: "8px" },
          inline: { value: "4px" },
        },
      },
    },
  },
});
