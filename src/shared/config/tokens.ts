// Non-Panda design tokens: values used directly as CSS strings.
// Colors and radii live in panda.config.ts as proper CSS custom properties.

export const transitions = {
  interactive:
    "background 0.15s ease, border-color 0.15s ease, color 0.15s ease, opacity 0.15s ease, transform 0.1s ease",
  fast: "0.1s ease",
  base: "0.15s ease",
} as const;

export const opacity = {
  disabled: "0.45",
  loading: "0.7",
} as const;

export const transforms = {
  pressScale: "scale(0.98)",
} as const;
