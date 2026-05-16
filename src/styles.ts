const scssFiles = import.meta.glob("./**/*.module.scss", { query: "?inline", eager: true });

export default [...Object.values(scssFiles)]
  .map((m) => (m as { default: string }).default)
  .join("\n");
