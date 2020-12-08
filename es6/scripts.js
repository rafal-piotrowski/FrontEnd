// ********************************** ES6 **********************************

// let i const (odejście od hoistingu znanego w przypadku var)
// zmienia się zakres działania zmiennych
// niemożliwa podwójna deklaracja zmiennej

let scopeExample = function() {
  for(var i=0; i<10; i++) {
  // for(let i=0; i<10; i++) {
    console.log('inside block code: '+i);
  }
  console.log('outside block code: '+i);
}

let hoistingExample = function() {
  console.log(hoistedVariable);
  var hoistedVariable = 54;
  // let hoistedVariable = 54;
}

// (function() {
//   console.log(firstName);
//   var firstName = "Jan";
// })();

// ********************************** arrow functions **********************************
var name = "Rafał";
var surname = "Piotrowski";

let af = {
    name: 'Janek',
    surname: 'Kowalski',
    canWalk: false,

    helloFunction: function() {
      console.log(this.name + ' ' + this.surname);
    },

    helloArrow: () => {
      console.log(this.name + ' ' + this.surname);
    },

    timeoutFunction: function() {
      setTimeout(function() {
        console.log(this.name + ' ' + this.surname);
      }, 1000);
    },

    timeoutArrow: function() {
      setTimeout(() => {
        console.log(this.name + ' ' + this.surname);
      }, 1000);
    }
};

let afunc = function() {
  af.helloFunction();
  af.helloArrow();
  af.timeoutFunction();
  af.timeoutArrow();
}

// ********************************** spread operator **********************************
let numbers = [12, 32, 1, 54, 91];

function listArray() {
  // console.log(numbers);
  // console.table(numbers);
  // for(let i=0; i < numbers.length; i++) {
  //   console.log(numbers[i]);
  // }
  // console.log(Math.max(numbers));
  console.log( Math.max.apply(Math, numbers) );
}

function spreadArray() {
  // console.log([...numbers, ..."Rafał"]);
  // console.log(...numbers);
  console.log( Math.max(...numbers) );
}

function spreadNodeElements() {
  let nodeList = document.querySelectorAll(".someBlock");
  console.log(nodeList);
  // console.log(nodeList.filter(li => li.getAttribute("id") === "malContent"));
  console.log([...nodeList]);
  // console.dir([...nodeList]);
  console.log([...nodeList].filter(li => li.getAttribute("id") === "malContent"));

  [...nodeList]
      .filter(li => li.getAttribute("id") === "malContent")
      .forEach(li => li.style.backgroundColor = "red");
}

function spreadReverse() {
  let text = "Jestem Rafał. Pracuję w ING!";
  // console.log( text.split("").reverse().join("") );
  console.log( [...text].reverse().join("") );
}

// ********************************** template strings **********************************

function concatString() {
  let { name, surname } = af;
  let info = "Imię: " + name + ", nazwisko: " + surname + ".";
  console.log(info);
}

function templateString() {
  let { name, surname, canWalk } = af;
  let info = `Imię: ${name}, nazwisko: ${surname}. ${canWalk ? "" : "nie"} potrafi chodzić.`;
  console.log(info);
}

// **************************************** class ****************************************

function ExampleES5(name, surname) {
    this.name = name;
    this.surname = surname;
}

ExampleES5.prototype.doSomething = function() {
    return this.name + " " + this.surname;
};

class ExampleES6 {
  constructor(name, surname) {
      this.name = name;
      this.surname = surname;
  }

  doSomething() {
      return `${this.name} ${this.surname}`;
  }
}

function callES5() {
  var klasaES5 = new ExampleES5("Rafał", "PiotrowskiES5");
  console.log( klasaES5.doSomething() );
}

function callES6() {
  var klasaES6 = new ExampleES6("Rafał", "PiotrowskiES6");
  console.log( klasaES6.doSomething() );
}

// **************************************** inheritance ****************************************

function InheritedES5(name, surname, canwalk) {
  ExampleES5.call(this, name, surname);
  this.canwalk = canwalk;
}

InheritedES5.prototype = Object.create(ExampleES5.prototype);
InheritedES5.prototype.constructor = InheritedES5;
InheritedES5.prototype.doSomething = function() {
  var myname = ExampleES5.prototype.doSomething.call(this);
  return "Jestem " + myname + " i " + ((this.canwalk) ? "" : "nie") + " potrafię chodzić.";
}

class InheritedES6 extends ExampleES6 {
  constructor(name, surname, canwalk) {
      super(name, surname);
      this.canwalk = canwalk;
  }

  doSomething() {
      return `Jestem ${super.doSomething()} i ${this.canwalk ? "" : "nie"} potrafię chodzić.`;
  }
}

function callInheritedES5() {
  var dziedziczonaES5 = new InheritedES5("Rafał", "PiotrowskiES5", true);
  console.log( dziedziczonaES5.doSomething() );
}

function callInheritedES6() {
  let dziedziczonaES6 = new InheritedES6("Rafał", "PiotrowskiES6", false);
  console.log( dziedziczonaES6.doSomething() );
}

class CrazyES6 extends ExampleES5 {
  constructor(canwalk, ...args) {
      super(...args);
      this.canwalk = canwalk;
  }

  doSomething() {
      return `Jestem ${super.doSomething()} i ${this.canwalk ? "" : "nie"} potrafię chodzić.`;
  }
}

function callCrazyES6() {
  let zwariowanaES6 = new CrazyES6(true, "Rafał", "PiotrowskiESCrazy");
  console.log( zwariowanaES6.doSomething() );
}


// **************************************** iteration ****************************************

function petla() {
  let tablica = [1, 4, 62, 3];
  // for(let i=0; i<tablica.length; i++) {
  //   console.log(tablica[i]);
  // }

  // for(let key in tablica) {
  //   console.log(tablica[key]);
  // }

  tablica.forEach( x => { console.log(x) } );

  // for(let value of tablica) {
  //   console.log(value);
  // }
}


// **************************************** Promise ****************************************

function $(selector) {
  return document.querySelector(selector);
}

function ajax(url) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);

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

// $("#btn-39").onclick = function() {

function myPromise() {
  ajax("http://api.nbp.pl/api/exchangerates/rates/a/usd/")
      .then(json => $("#insideContent").textContent = JSON.parse(json).rates[0].mid)
      .catch(err => $("#malContent").textContent = err.message);
};

// **************************************** modułowość ****************************************

// import Currency from "./Currency.js";
// let waluta = new Currency("http://api.nbp.pl/api/exchangerates/rates/a/usd/");
// setTimeout(() => {
//   waluta.ajax().then(json => $("#insideContent").textContent = JSON.parse(json).rates[0].mid);
// }, 2000);


// **************************************** optional chaining operator ****************************************

const child = {
    description: {
      name: 'Janek',
      surname: 'Kowalski',
      canWalk: false,
      age: 1,
      parents: {
        mother: {
          exist: true,
          name: 'Aneta'
        },
        father: {
          exist: false,
          name: null
        }
      },
      sayHello: function() {
        return this.name + " " + this.surname;
      }
    }
  };

function myOCO() {
  let newText = window.document.createElement('p');
  newText.setAttribute('id', 'newTextParagraph');
  // if (child.description.parents.mother.surname) { newText.innerHTML = child.description.parents.mother.surname } else { newText.innerHTML = 'brak danych (if ... else)' };
  // newText.innerHTML = child.description.parents.mother.surname ? child.description.parents.mother.surname : 'brak danych (trójargumentowiec)';
  newText.innerHTML = child.description.parents.mother?.surname || 'brak danych (optional chaining operator)';
  document.getElementById('insideContent').appendChild(newText);
}
