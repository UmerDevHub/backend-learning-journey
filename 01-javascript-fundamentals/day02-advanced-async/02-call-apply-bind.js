// ==========================================
// call, apply, bind - three methods that let you manually control
// what 'this' refers to when calling a function
// ==========================================


// ==========================================
// SETUP - a function that depends on 'this'
// ==========================================

function introduce(city, country) {
  console.log(`I am ${this.name}, working at ${this.clinic}, based in ${city}, ${country}`);
}

const doctor1 = { name: "Dr. Farha", clinic: "DFJ Clinics" };
const doctor2 = { name: "Dr. Ahmed", clinic: "City Hospital" };

// if we just call introduce() directly, 'this' would be undefined,
// because introduce is not attached to any object


// ==========================================
// 1. call() - calls the function immediately, arguments passed ONE BY ONE
// syntax: functionName.call(thisValue, arg1, arg2, ...)
// ==========================================

introduce.call(doctor1, "Wah Cantt", "Pakistan");
// "I am Dr. Farha, working at DFJ Clinics, based in Wah Cantt, Pakistan"

introduce.call(doctor2, "Islamabad", "Pakistan");
// "I am Dr. Ahmed, working at City Hospital, based in Islamabad, Pakistan"

// call() lets you "borrow" a function and run it with a different object as 'this'


// ==========================================
// 2. apply() - same as call(), but arguments are passed as an ARRAY
// syntax: functionName.apply(thisValue, [arg1, arg2, ...])
// ==========================================

introduce.apply(doctor1, ["Wah Cantt", "Pakistan"]);
// exact same result as call(), just arguments are grouped in an array

// real use case for apply - when you already have arguments as an array
// and don't want to manually spread them
const args = ["Rawalpindi", "Pakistan"];
introduce.apply(doctor2, args);


// ==========================================
// 3. bind() - does NOT call the function immediately
// instead, it returns a NEW function with 'this' permanently locked in
// syntax: const newFunction = functionName.bind(thisValue, arg1, arg2, ...)
// ==========================================

const introduceDoctor1 = introduce.bind(doctor1, "Wah Cantt", "Pakistan");

// nothing happens yet, introduceDoctor1 is just a function waiting to be called
console.log(typeof introduceDoctor1); // "function"

introduceDoctor1(); // NOW it actually runs
// "I am Dr. Farha, working at DFJ Clinics, based in Wah Cantt, Pakistan"

introduceDoctor1(); // can be called again anytime, 'this' stays locked to doctor1


// ==========================================
// 4. QUICK COMPARISON
// ==========================================

// call  -> runs immediately, arguments passed individually
// apply -> runs immediately, arguments passed as an array
// bind  -> does NOT run immediately, returns a reusable function with 'this' locked


// ==========================================
// 5. REAL BACKEND USE CASE - FIXING 'this' IN CALLBACKS
// this connects directly to the 'this' problem covered in the previous topic
// ==========================================

class AppointmentService {
  constructor() {
    this.appointments = [];
  }

  addAppointment(name) {
    this.appointments.push(name);
    console.log(this.appointments);
  }
}

const service = new AppointmentService();

// problem: passing the method directly as a callback loses 'this'
const brokenCallback = service.addAppointment;
// brokenCallback("Ali"); // would throw an error, 'this' is undefined here

// fix using bind - permanently locks 'this' to 'service'
const fixedCallback = service.addAppointment.bind(service);
fixedCallback("Ali"); // works correctly now, 'this' is locked to service
console.log(service.appointments); // ["Ali"]


// ==========================================
// 6. REAL EXPRESS.JS PATTERN USING bind()
// this is an alternative to the arrow function class property approach shown earlier,
// commonly seen in older or class-based Express controllers
// ==========================================

// class UserController {
//   constructor() {
//     this.users = [];
//     this.getUsers = this.getUsers.bind(this); // lock 'this' in the constructor
//   }
//
//   getUsers(req, res) {
//     res.json(this.users);
//   }
// }
//
// const controller = new UserController();
// app.get('/users', controller.getUsers); // 'this' stays correct because of bind() in constructor


// ==========================================
// 7. call/apply USE CASE - BORROWING ARRAY METHODS FOR ARRAY-LIKE OBJECTS
// real use: converting things like function arguments into a real array
// ==========================================

function showArguments() {
  // 'arguments' is an array-like object, it looks like an array but lacks array methods like map/filter
  console.log(arguments); // [Arguments] { '0': 'a', '1': 'b', '2': 'c' }

  // borrowing Array's slice method using call() to convert it into a real array
  const argsArray = Array.prototype.slice.call(arguments);
  console.log(argsArray); // ['a', 'b', 'c'], now a real array with map/filter available

  console.log(Array.isArray(arguments));    // false
  console.log(Array.isArray(argsArray));    // true
}

showArguments("a", "b", "c");

// note: in modern JS, rest parameters (...args) make this technique mostly unnecessary,
// but it is still good to understand since older codebases use this pattern


// ==========================================
// 8. PRACTICAL RULE OF THUMB
// ==========================================

// use call() when you want to immediately run a function with a specific 'this',
// and you have arguments as individual values

// use apply() when you want to immediately run a function with a specific 'this',
// and you already have arguments as an array

// use bind() when you want to create a reusable function with 'this' locked in,
// especially useful for fixing 'this' in callbacks, event handlers, and class methods

// in modern codebases, arrow functions have mostly replaced the need for bind()
// when writing NEW code, but bind() still appears often in existing/older projects,
// and understanding it is essential for reading and maintaining that code