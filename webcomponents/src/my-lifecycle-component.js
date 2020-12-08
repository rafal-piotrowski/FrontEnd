class MyLifecycleComponent extends HTMLElement {
	
    constructor() {
		super();
        console.log(`${this.tagName} created! - ${this.currentTime}`);
    }

    connectedCallback() {
        // Metoda obsługująca moment wstawienia elementu do drzewa DOM strony
        console.log(this.isConnected);
        
		if (this.isConnected) {
			this.timerId = setInterval(function () {
				this.innerHTML = new Date().toString();
			}.bind(this), 1000);
		}
    }
    
    disconnectedCallback() {
        // Metoda obsługująca moment w którym element zostanie usunięty z drzewa DOM
		// usuń komponent z drzewa dom i sprawdź czy callback został wywołany
		console.log(`${this.tagName} disconnected`);
        clearInterval(this.timerId);
        console.log(this.isConnected);
    }
    
    adoptedCallback() {
        // Specyficzna metoda obsługująca przypadek gdy dany element zostanie niejako przeniesiony między różnymi dokumentami, 
        // np. przeniesiony ze strony pierwotnej do strony wyświetlonej w <iframe>
    }

}

customElements.define('my-lifecycle-component', MyLifecycleComponent); 

let ctime = new Date();
console.log(`my-lifecycle-component registered! - ${ctime.getHours()}:${ctime.getMinutes()}:${ctime.getSeconds()}:${ctime.getMilliseconds()}`);
