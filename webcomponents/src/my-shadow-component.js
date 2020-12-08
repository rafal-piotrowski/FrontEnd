class MyShadowComponent extends HTMLElement {
    
    static layout = `
		<style>
			p {
				color: red;
			}
		</style>
		<p>My shadow component!</p>
	`;

    constructor() {
		super();
		console.log(`${this.tagName} created! - ${this.currentTime}`);
		// utworzenie shadow DOM
		this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.render();
		// this.innerHTML = MyShadowComponent.layout;
        this.shadowRoot.innerHTML = MyShadowComponent.layout;
    }
    
    render() {
	}

}

customElements.define('my-shadow-component', MyShadowComponent);

console.log(`my-shadow-component registered!`);
