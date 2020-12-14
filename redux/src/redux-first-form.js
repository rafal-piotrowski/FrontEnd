import { LitElement, html, css } from 'lit-element';
import './components/rich-editor.js';

// podłączenie do Redux store.
import { store } from './redux/store.js';

// konektor służący podłączaniu się do store-a
// import { connect } from 'pwa-helpers/connect-mixin.js';

import { changeFormValue } from './redux/actions/forms.js';

// class ReduxFirstForm extends connect(store)(LitElement) {
class ReduxFirstForm extends LitElement {
    render() {
        return html`
            <h2>formatka #1</h2>
            <rich-editor id="editor" .page=${this.page} @ev-confirm-text-change=${this.editorTextChanged}></rich-editor>
        `;
    }

    editorTextChanged(event) {
        console.log(event.detail.textChanged);
        store.dispatch(changeFormValue(this.page, event.detail.textChanged));
    }

    static get properties() {
        return {
            page: { type: Number },
            formContent: { type: Object }
        }
    }

    constructor() {
        super();
        this.page = 1;
    }

    // stateChanged(state) {
    // }

    get editor() {
        return this.shadowRoot.getElementById("editor");
    }
}

customElements.define('redux-first-form', ReduxFirstForm);
