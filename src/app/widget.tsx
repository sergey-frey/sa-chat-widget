import { nanoid } from "nanoid";
import { render } from "preact";
import { CHAT_ID_KEY } from "@/shared/constants/index.ts";
import allCss from "@/styles";
import { App } from "./app.tsx";

export default class SAWidget {
  private shadow: ShadowRoot;
  private container: HTMLElement;

  constructor(options: {
    productId: number;
    target?: HTMLElement;
    align?: string;
  }) {
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

    let chatId = localStorage.getItem(CHAT_ID_KEY);

    if (!chatId) {
      chatId = nanoid();
      localStorage.setItem(CHAT_ID_KEY, chatId);
    }

    render(
      <App productId={options.productId} userChatId={chatId} />,
      this.container,
    );
  }

  destroy() {
    render(null, this.container);
    this.container.parentElement?.parentElement?.remove();
  }
}
