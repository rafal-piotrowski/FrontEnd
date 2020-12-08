import { LitElement, html } from 'lit-element';

class LitEvents extends LitElement {
  static get properties() {
    return {
      count: { type: Number },
    };
  }

  constructor() {
    super();
    this.count = 0;

    this.keypressListener = this.handleKeypress.bind(this);
  }

  render() {
    return html`
      <div id="handle-events">
        Current count: [${this.count}]
        <!-- @[eventname] liniowa rejestracja event handlera z wykorzystaniem funkcji strzałkowej -->
        <button @click=${() => this.count += 1}>+</button>

        <!--
          liniowa rejestracja event handlera z wykorzystaniem referencji do zewnętrznego elementu. 
          Poniższy zapis spowoduje że lit-html automatycznie użyje funkcji
        -->
        <button @click=${this._onDecrement}>-</button>
      </div>

      <div id="fire-events">
        <!-- odbieranie własnych eventów -->
        <my-event
            @plus-event-fired=${(event) => { this.count += 1; console.log(event.detail); } }
            @minus-event-fired=${(event) => { this._onDecrement(); console.log(event.detail); } }>
        </my-event>
      </div>
    `;
  }

    _onDecrement() {
        this.count -= 1;
    }

    // rejestracja event handlera za pomocą standardowych metod lifecycle dostępnych w specyfikacji web components
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('keypress', this.keypressListener);
    }

    disconnectedCallback() {
        document.removeEventListener('keypress', this.keypressListener);
        super.disconnectedCallback();
    }

    handleKeypress(event) {
        console.log(`przechwycony keyCode: ${event.keyCode}`);

        if (event.keyCode === 43) { this.count += 1 }
        else if (event.keyCode === 45) { this._onDecrement() }
    }

}

customElements.define('lit-events', LitEvents);

// wywoływanie własnych zdefiniowanych eventów

class MyEvent extends LitElement {
    handlePlus() {
        this.dispatchEvent(new CustomEvent('plus-event-fired', { detail: 'increment' }));
    }
    
    handleMinus() {
        this.dispatchEvent(new CustomEvent('minus-event-fired', { detail: 'decrement' }));
    }

    render() {
        return html`
            <div>
                <button @click=${this.handlePlus}>PLUS</button>
                <button @click=${this.handleMinus}>MINUS</button>
            </div>`;
    }
}

customElements.define('my-event', MyEvent);
