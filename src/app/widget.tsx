import { render } from "preact";
import { App } from "./app.tsx";

import allCss from "@/styles";

export default class SAWidget {
  private shadow: ShadowRoot;
  private container: HTMLElement;

  constructor(options?: { target?: HTMLElement }) {
    const hostEl = document.createElement("div");
    const mountPoint = options?.target ?? document.body;
    mountPoint.appendChild(hostEl);

    this.shadow = hostEl.attachShadow({ mode: "open" });

    this.container = document.createElement("div");
    this.container.id = "app";
    this.shadow.appendChild(this.container);

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(allCss);
    this.shadow.adoptedStyleSheets = [sheet];

    render(<App />, this.container);
  }

  destroy() {
    render(null, this.container);
    this.container.parentElement?.parentElement?.remove();
  }
}
