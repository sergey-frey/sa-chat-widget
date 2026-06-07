import SAWidget from "./widget";

class SAWidgetElement extends HTMLElement {
  private instance: SAWidget | null = null;

  connectedCallback() {
    const productId = Number(this.getAttribute("product-id"));
    const align = this.getAttribute("align");
    this.instance = new SAWidget({ productId, target: this });
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
