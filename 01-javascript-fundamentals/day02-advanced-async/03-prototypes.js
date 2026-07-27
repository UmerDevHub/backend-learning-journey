// ==========================================
// PROTOTYPES - the mechanism JavaScript uses for objects to inherit
// properties and methods from other objects
// every object has a hidden internal link to another object, called its "prototype"
// if a property is not found on the object itself, JS looks up the prototype chain
// ==========================================


// ==========================================
// 1. THE BASIC IDEA - Object.create()
// ==========================================

const animal = {
  eats: true,
  makeSound: function () {
    console.log("Some generic animal sound");
  }
};

const dog = Object.create(animal); // dog's prototype is now "animal"
dog.barks = true;

console.log(dog.eats);   // true, not found on dog itself, JS looks up the prototype chain to animal
console.log(dog.barks);  // true, found directly on dog
dog.makeSound();          // "Some generic animal sound", inherited method from animal

// dog does NOT actually have its own copy of "eats" or "makeSound",
// it just has access to them through the prototype chain


// ==========================================
// 2. CHECKING THE PROTOTYPE CHAIN
// ==========================================

console.log(Object.getPrototypeOf(dog) === animal); // true
console.log(dog.hasOwnProperty("eats"));  // false, "eats" belongs to animal, not dog directly
console.log(dog.hasOwnProperty("barks")); // true, "barks" was added directly on dog


// ==========================================
// 3. EVERY OBJECT ALREADY HAS A PROTOTYPE, EVEN IF YOU DON'T SET ONE
// plain objects created with {} automatically get Object.prototype as their prototype
// this is why methods like toString(), hasOwnProperty() work on every object
// ==========================================

const simpleObject = { name: "Umer" };
console.log(simpleObject.toString()); // "[object Object]", inherited from Object.prototype

console.log(Object.getPrototypeOf(simpleObject) === Object.prototype); // true


// ==========================================
// 4. FUNCTIONS AND THE prototype PROPERTY
// every regular function in JS automatically gets a "prototype" property,
// this becomes important when the function is used as a constructor
// ==========================================

function Doctor(name, specialty) {
  this.name = name;
  this.specialty = specialty;
}

// adding a method to the function's prototype, instead of inside the function itself
Doctor.prototype.introduce = function () {
  console.log(`I am ${this.name}, specialist in ${this.specialty}`);
};

const doc1 = new Doctor("Farha", "Cardiology");
const doc2 = new Doctor("Ahmed", "Neurology");

doc1.introduce(); // "I am Farha, specialist in Cardiology"
doc2.introduce(); // "I am Ahmed, specialist in Neurology"

// IMPORTANT: doc1 and doc2 do NOT have their own separate copy of introduce()
// both share the SAME function through the prototype chain, saving memory
console.log(doc1.introduce === doc2.introduce); // true, literally the same function in memory


// ==========================================
// 5. WHY NOT JUST PUT METHODS DIRECTLY INSIDE THE CONSTRUCTOR? (memory efficiency)
// ==========================================

function DoctorInefficient(name) {
  this.name = name;
  // BAD PRACTICE: this creates a NEW function for every single object created
  this.introduce = function () {
    console.log(`I am ${this.name}`);
  };
}

const badDoc1 = new DoctorInefficient("Farha");
const badDoc2 = new DoctorInefficient("Ahmed");

console.log(badDoc1.introduce === badDoc2.introduce); // false, two separate functions in memory, wasteful

// this is exactly why prototype-based methods matter: with thousands of objects,
// putting methods on the prototype instead of inside the constructor saves a lot of memory


// ==========================================
// 6. PROTOTYPE CHAIN WITH INHERITANCE (constructor functions, the "old way" before classes)
// classes (next topic) are mostly a cleaner syntax over this exact mechanism
// ==========================================

function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  console.log(`Hello, I am ${this.name}`);
};

function DoctorPerson(name, specialty) {
  Person.call(this, name); // borrowing Person's constructor logic (connects back to call/apply topic)
  this.specialty = specialty;
}

// linking DoctorPerson's prototype to Person's prototype, forming the chain
DoctorPerson.prototype = Object.create(Person.prototype);
DoctorPerson.prototype.constructor = DoctorPerson;

DoctorPerson.prototype.introduce = function () {
  console.log(`I am Dr. ${this.name}, specialist in ${this.specialty}`);
};

const doctorInstance = new DoctorPerson("Farha", "Cardiology");
doctorInstance.greet();     // "Hello, I am Farha", inherited from Person
doctorInstance.introduce(); // "I am Dr. Farha, specialist in Cardiology", own method

// this is exactly what "class extends" does internally, just with much uglier syntax,
// this is why classes were introduced in ES6, to make this pattern readable


// ==========================================
// 7. WHY THIS MATTERS FOR BACKEND DEVELOPMENT
// ==========================================

// you will almost NEVER write raw prototype code like section 6 in real projects,
// classes (next topic) handle all of this automatically behind the scenes

// but understanding prototypes matters because:
// - it explains WHY class methods are shared efficiently across instances
// - it explains errors like "X is not a function" when something is missing from the prototype chain
// - libraries and Node.js internals still use prototypes directly in some places
// - built-in objects like Array, Object, String all work through this exact prototype system

console.log(typeof [].map);       // "function", inherited from Array.prototype
console.log(typeof "".toUpperCase); // "function", inherited from String.prototype


// ==========================================
// 8. PRACTICAL RULE OF THUMB
// ==========================================

// you don't need to manually write prototype chains in modern backend code,
// classes give you the same benefit with much cleaner syntax

// but knowing prototypes helps you understand:
// - why methods defined in a class are shared across all instances (memory efficient)
// - what "prototype chain" means when debugging inheritance issues
// - why every object in JS automatically has access to methods like toString(), hasOwnProperty()