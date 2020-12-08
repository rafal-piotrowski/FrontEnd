import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

class LitTemplates extends LitElement {
    render() {
        return html `
            <shared-templates></shared-templates>
            <external-templates></external-templates>
            <template-factories></template-factories>
        `;
    }
}

customElements.define('lit-templates', LitTemplates);

// A powerful feature of lit-html is that templates are just variables.
// You can create them anywhere, and you can define generic templates
// to be used by multiple components.

// This template could be defined in a separate file
const sharedTemplate = html`
  <div>Shared template content</div>
`;

// Because styles tags are just html, they can be shared in the same way
// that regular templates are shared.

// This template could be defined in a separate file
const sharedStyles = css`
    .container {
        border: 2px dotted black;
      }
`;

class SharedTemplateA extends LitElement {
  static get styles() {
    return css`
      .container {
        border: 2px solid black;
      }
    `;
  }

  render() {
    return html`
      <!-- The shared template is used by this element -->
      <div class="container">
        Element A
        ${sharedTemplate}
      </div>
    `;
  }

}

customElements.define('shared-template-a', SharedTemplateA);

class SharedTemplateB extends LitElement {
  static get styles() {
    return [
        // pull in shared styles
        sharedStyles,
        // add own styles
        css`
          /* You can override classes defined in shared styles */
        `,
      ];
  }

  render() {
    return html`
      <!-- The shared template is used by this element -->
      <div class="container">
        Element B
        ${sharedTemplate}
      </div>
    `;
  }

}

customElements.define('shared-template-b', SharedTemplateB);



class SharedTemplates extends LitElement {
  static get styles() {
    return css`
      shared-template-a,
      element-b {
        display: block;
        margin: 8px 0;
      }
    `;
  }

  render() {
    return html`
      <shared-template-a></shared-template-a>
      <shared-template-b></shared-template-b>
    `;
  }

}

customElements.define('shared-templates', SharedTemplates);


// Lit-html has strict rules on what's allowed to be rendered in order to prevent
// XSS attacks (https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)).

// To render html, the values in template expressions must be created with the lit-html
// template literal tag (html`<div>foo</div>`). If you receive templates from other
// sources, such as a back-end API, this is a problem. To get around this lit-html offers
// the unsafeHTML directive. Be aware that this will open you up for XSS attacks, so make
// sure that you trust the source you are getting the html from.

// Some HTML defined as a string. This could come from any source.
const externalTemplate = `
  <div>Content rendered from an external source</div>
  <button>My button</button>
  <a href="#">My anchor</a>
`;

class ExternalTemplates extends LitElement {

  render() {
    return html`
      Content rendered in lit-html
      <!-- Render the external html inside a lit-html template -->
      ${unsafeHTML(externalTemplate)}
    `;
  }

}

customElements.define('external-templates', ExternalTemplates);


// Here we define a template which as a function that accepts a set of variables
// and returns lit html template. This is actually identical to how the render
// function works.
//
// This function could be defined in a separate, shared, file or just be a nice
// way to split up a larger template. It can also be used to create tiny components
// that don't need a lot of isolation, you could just create a function for that
// instead of a web component.
//
// In this case we are accepting a property, text content and an event handler
const templateFactory = (inputValue, buttonText, onSubmit) => html`
  <input id="usernameInput" value="${inputValue}">

  <button @click="${onSubmit}">
    ${buttonText}
  </button>
`;

class TemplateFactories extends LitElement {

  static get properties() {
    return {
      username: { type: String },
    };
  }

  constructor() {
    super();

    this.username = 'Rafał';
    this._onUsernameSubmit = this._onUsernameSubmit.bind(this);
  }

  render() {
    return html`
      <!--
        Call the template factory with a property, string constant
        and a method reference for the event handler
      -->
      <h3>Username: ${this.username}</h3>
      ${templateFactory(this.username, 'Change username', this._onUsernameSubmit)}
    `;
  }

  _onUsernameSubmit() {
    this.username = this.shadowRoot.getElementById('usernameInput').value;
  }

}

customElements.define('template-factories', TemplateFactories);
