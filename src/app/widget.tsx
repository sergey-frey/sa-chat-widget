import { render } from "preact";
import { App } from "./app.tsx";

import cssRow from "./index.css?inline";

export default class SAWidget {
  private shadow: ShadowRoot;
  private container: HTMLElement;

  constructor(options?: { target?: HTMLElement }) {
    const hostEl = document.createElement("div");
    const mountPoint = options?.target ?? document.body;
    mountPoint.appendChild(hostEl);

    const style = document.createElement("style");
    style.textContent = cssRow;

    this.shadow = hostEl.attachShadow({ mode: "open" });

    this.container = document.createElement("div");
    this.container.id = "app";
    this.shadow.appendChild(style);
    this.shadow.appendChild(this.container);

    render(<App />, this.container);
  }

  destroy() {
    render(null, this.container);
    this.container.parentElement?.parentElement?.remove();
  }
}
