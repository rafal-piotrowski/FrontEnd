import { LitElement, html, css } from 'lit-element';
import './src/lit-rendering.js';
import './src/lit-properties.js';
import './src/lit-attributes.js';
import './src/lit-events.js';
import './src/lit-lifecycle.js';
import './src/lit-shadow-dom.js';
import './src/lit-templates.js';
import './src/lit-slotting.js';

import '@polymer/paper-card';
import '@vaadin/vaadin-tabs';
import { Router } from '@vaadin/router';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';

class LitDemo extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          /* display: block; */

          display: flex;
          flex-direction: column;
          font-family: sans-serif;
        }

        h2 {
          font-size: 20px;
          color: #217FF9;
        }

        h1 {
          margin-top: 0px;
          color: #217FF9;
        }

        h2 {
          font-size: 20px;
          color: #2c3e50;
        }

        h2:hover::after { 
          color: #9B35FA;
          content: " #";
        }

        #header {
          display: flex;
        }

        a {
          text-decoration: none;
        }

        a:visited {
          color: #217FF9;
        }

        #header h1 { flex: 1; }
        #header svg { margin: 8px 0 8px 0; }
        .github {transform: scale(1.2, 1.2);}
        .logo {
          margin-top: -3px;
          margin-right: 8px;
        }

        .nav { margin-bottom: 20px; }
        .footer { text-align: center; color: #a8a8a8;}


        paper-card { 
          border-radius: 5px;
          flex: 1; 
          padding: 12px;
          margin: 0 0 32px 0;
        }

        .demo > *:not(h2):not(a) {
          display: block;
          border: 1px solid	#e2e2e2;
          border-radius: 5px;
          padding: 8px;
          margin: 8px 0;
          line-height: 32px;
        }

      `,
    ];
  }

  static get properties() {
    return {
      activeTab: { type: String },
      tabs: { type: Array },
      smallScreen: { type: Boolean }
    }
  }

  constructor(){
    super();
    this.activeTab = location.pathname === '/' ? 'render' : location.pathname.replace('/', '');
    this.tabs = ['render', 'properties', 'attributes', 'events', 'lifecycle', 'shadow', 'templates', 'slotting'];

    installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
      this.smallScreen = !matches;
    });
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('outlet'));
    router.setRoutes([
      {path: '/',     component: 'lit-rendering'},
      {path: '/render',  component: 'lit-rendering'},
      {path: '/properties',  component: 'lit-properties'},
      {path: '/attributes',  component: 'lit-attributes'},
      {path: '/events',  component: 'lit-events'},
      {path: '/lifecycle',  component: 'lit-lifecycle'},
      {path: '/shadow',  component: 'lit-shadow-dom'},
      {path: '/templates',  component: 'lit-templates'},
      {path: '/slotting',  component: 'lit-slotting'},
      {path: '(.*)', redirect: '/', action: () => {
        this.activeTab = 'render';
        }
      }
    ]);
  }

  switchRoute(route) {
    this.activeTab = route;
    Router.go(`/${route}`); 
  }

  render() {
    return html`
      <div id="header">
        <h1>${this.capitalize(this.activeTab)} Lit demos</h1>
      </div>

      <vaadin-tabs class="${this.smallScreen ? 'nav' : ''}" orientation="${this.smallScreen ? 'vertical' : 'horizontal'}" selected=${this.tabs.indexOf(this.activeTab)} theme="${this.smallScreen ? '' : 'centered'}">
        <vaadin-tab @click=${() => this.switchRoute('render')}>Renderowanie</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('properties')}>Właściwości</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('attributes')}>Atrybuty</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('events')}>Eventy</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('lifecycle')}>Cykl życia</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('shadow')}>Shadow DOM</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('templates')}>HTML Templates</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('slotting')}>Slotting</vaadin-tab>
      </vaadin-tabs>

      
        <paper-card>
            <div class="demo">
                <div id="outlet">
                </div>
            </div>
        </paper-card>
      
    `;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

customElements.define('lit-demo', LitDemo);
