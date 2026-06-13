import SAWidget from "./widget";

class SAWidgetElement extends HTMLElement {
  private instance: SAWidget | null = null;

  connectedCallback() {
    const productId = Number(this.getAttribute("product-id"));
    const dev = this.getAttribute("_dev") === "true";
    // const align = this.getAttribute("align");
    this.instance = new SAWidget({ productId, dev, target: this });
  }

  disconnectedCallback() {
    this.instance?.destroy();
    this.instance = null;
  }

  static get observedAttributes() {
    return ["product-id"];
  }

  attributeChangedCallback() {
    if (this.instance) {
      this.instance.destroy();
      const productId = Number(this.getAttribute("product-id"));
      this.instance = new SAWidget({ productId, target: this });
    }
  }
}

customElements.define("sa-widget", SAWidgetElement);
