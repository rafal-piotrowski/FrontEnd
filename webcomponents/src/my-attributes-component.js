class MyAttributesComponent extends HTMLElement {
    
    static get observedAttributes() {
		return ['name'];
	}

    constructor() {
		super();
        console.log(`${this.tagName} created! - ${this.currentTime}`);
    }

    connectedCallback() {
        this.render();
    }
    
    attributeChangedCallback(name, oldVal, newVal) {
		// Metoda obsługująca reakcje na zmiany wartości atrybutów zdefiniowanych w customowym elemencie
		// zmiany będą nasłuchiwane tylko w atrybutach określonych za pomocą statycznej implementacji metody observedAttributes()
		console.log(name+' changed');
		console.log(oldVal);
		console.log(newVal);

		if(name==="name"){
			this.helloname = newVal;
			this.render();
		}
    }

    render() {
		this.innerHTML = `hello: ${this.helloname}`
	}

}

customElements.define('my-attributes-component', MyAttributesComponent);

let ctime = new Date();
console.log(`my-attributes-component registered! - ${ctime.getHours()}:${ctime.getMinutes()}:${ctime.getSeconds()}:${ctime.getMilliseconds()}`);
