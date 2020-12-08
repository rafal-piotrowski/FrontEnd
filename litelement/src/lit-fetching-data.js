import { LitElement, html } from 'lit-element';

class LitFetchingData extends LitElement {
  static get properties() {
    return {
      response: { type: Array }
    }
  }

  constructor() {
    super();
    this.response = [];
  }

  firstUpdated() {
    fetch('http://api.nbp.pl/api/exchangerates/rates/a/usd/')
      .then((r) => r.json())
      .then((r) => {
        this.response = r.results;
      });

      console.log(this.response);
  }

  render() {
    const { response } = this;
    return html`
        <ul>
          ${response.map(item => html`
            <li>${item.name}</li>
          `)}
        </ul>
      `;
  }
}

customElements.define('lit-fetching-data', LitFetchingData);
