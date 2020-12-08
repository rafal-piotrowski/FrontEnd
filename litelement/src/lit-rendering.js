import { LitElement, html, css } from 'lit-element';

// You also implement conditional logic in separate functions
function getMessage(message, showMessage) {
  if (!showMessage) {
    return '';
  }

  return `Message from function: ${message}`;
}

class LitRendering extends LitElement {

  /**
   * Styles should be added as a static getter. They are evaluated once, and then added
   * in the element's shadow dom.
   *
   * Shadow dom takes care of scoping the CSS of your element to only affect your
   * element's template, and not the element outside. For an in-depth explanation
   * of shadow dom, see: https://github.com/praveenpuglia/shadow-dom-in-depth
   */

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .message {
        color: blue;
      }
    `;
  }

  static get properties() {
    return {
      showMessage: { type: Boolean },
      message: { type: String },
      ckeys: { type: Array },
    };
  }

  constructor() {
      super();
      this.message = 'Hello everybody';
      
      this.ckeys = [
        { corpkey: 'PF83WS', name: 'Rafał Piotrowski'}, 
        { corpkey: 'KX99PB', name: 'Wiesław Lech'},
        { corpkey: 'SB98AE', name: 'Wojciech Siekiera'}
      ];
  }

  render() {
    return html`
      <div class="message">Hello world!</div>

      <div id="conditional-rendering">
        <button @click=${() => this.showMessage = !this.showMessage}>
          <!-- You can use ternary expressions for quick conditional rendering -->
          Click to ${this.showMessage ? 'hide' : 'show'} message
        </button>

        <!-- Or to conditionally show/hide a template -->
        <div>
          ${this.showMessage
            ? html`The message is: ${this.message}`
            : ''}
        </div>

        <!-- You can also call a function and handle the conditional rendering in there -->
        <div>
          ${getMessage(this.message, this.showMessage)}
        </div>
      </div>

      <div id="repeated-rendering">
        <!--
          To repeat a template, you can simply use a map function of arrays.
          In this case, it maps the array of messages to an array of templates.
          Lit-html will read the array and render the templates inside it.
        -->
        Corporate keys:
        <ul>
          ${this.ckeys.map(ckey => html`
            <li>${ckey.corpkey}: ${ckey.name}</li>
          `)}
        </ul>

        <!--
          If a template gets too large, you can also split it in a separate function
        -->
        Employees names:
        <ul>
          ${this.ckeys.map(this._ckeyTemplate)}
        </ul>
      </div>
    `;
  }

  _ckeyTemplate(ckey) {
    return html`<li>${ckey.corpkey}: ${ckey.name}</li>`;
  }

}

customElements.define('lit-rendering', LitRendering);
