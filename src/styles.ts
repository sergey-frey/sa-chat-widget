const cssFiles = import.meta.glob("./**/*.css", { query: "?inline", eager: true });
const scssFiles = import.meta.glob("./**/*.scss", { query: "?inline", eager: true });

export default [...Object.values(cssFiles), ...Object.values(scssFiles)]
  .map((m) => (m as { default: string }).default)
  .join("\n");
