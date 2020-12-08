class MyOpenComponent extends HTMLElement {
    
    static layout = `
		<style>
			p {
				color: blue;
			}
		</style>
		<p>My open component!</p>
	`;

    constructor() {
		super();
        console.log(`${this.tagName} created! - ${this.currentTime}`);
    }

    connectedCallback() {
		this.render();
		this.innerHTML = MyOpenComponent.layout;
    }
    
    render() {
	}

}

customElements.define('my-open-component', MyOpenComponent);

console.log(`my-open-component registered!`);
