class MyPropertiesComponent extends HTMLElement {

    constructor() {
		super();
        console.log(`${this.tagName} created! - ${this.currentTime}`);
        this.__params = [];
    }

    connectedCallback() {
        this.render();
    }
    
    render() {
		this.innerHTML = JSON.stringify(this.__params);
		this.innerHTML = `<ul>${this.__params.map(e=>`<li>${e}</li>`).join("")}</ul>`;
	}

    get params(){
		return this.__params;
	}

	set params(paramsList){
		this.__params = paramsList;
		this.render();
	}
}

customElements.define('my-properties-component', MyPropertiesComponent);

let ctime = new Date();
console.log(`my-properties-component registered! - ${ctime.getHours()}:${ctime.getMinutes()}:${ctime.getSeconds()}:${ctime.getMilliseconds()}`);
