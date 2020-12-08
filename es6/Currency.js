class Currency {
    
    constructor(url) {
        this.url = url;
    }

    ajax() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.url);
    
        let p = new Promise(function(resolve, reject) {
            xhr.onload = function() {
                if(xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject( new Error("Wystąpił błąd") );
                }
            };
            xhr.onerror = function() {
                reject( new Error("Wystapił błąd") );
            };
    
        });
    
        xhr.send();
        return p;
    }
}

export default Currency;
