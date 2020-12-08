class MyDefinedComponent extends HTMLElement {
	
    constructor() {
		super();
        console.log(`${this.tagName} created! - ${this.currentTime}`);
        this.render();
    }
 
	render() {
		this.innerHTML = `${this.helloname} rendered - ${this.currentTime}`
	}

	get helloname() {
		return "my defined component";
    }
    
    get currentTime() {
        let ctime = new Date();
        // return ctime.getTime();
        return `${ctime.getHours()}:${ctime.getMinutes()}:${ctime.getSeconds()}:${ctime.getMilliseconds()}`;
    }

}

customElements.define('my-defined-component', MyDefinedComponent); 

let ctime = new Date();
console.log(`my-defined-component registered! - ${ctime.getHours()}:${ctime.getMinutes()}:${ctime.getSeconds()}:${ctime.getMilliseconds()}`);
