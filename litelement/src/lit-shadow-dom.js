import { LitElement, html } from 'lit-element';

class LitShadowDom extends LitElement {
  static get properties() {
    return {
      text: { type: String },
    }
  }

  /**
   * If you don't want to use shadow DOM, you can overwrite the 
   * `createRenderRoot` method. By default, LitElement sets the
   * render root to the shadowDom.
   * This is usually used for small leaf-components.
   */

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.text = "Zbadaj element żeby sprawdzić Shadow DOM!";
  }

  render() {
    return html`
      <h3>
        ${this.text}
      </h3>
    `;
  }
}

customElements.define('lit-shadow-dom', LitShadowDom);
