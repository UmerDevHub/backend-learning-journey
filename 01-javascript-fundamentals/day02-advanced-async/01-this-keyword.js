// ==========================================
// 'this' KEYWORD - refers to the "context" a function is called in
// its value is NOT fixed, it depends on HOW the function is called, not WHERE it is written
// ==========================================


// ==========================================
// 1. 'this' INSIDE A REGULAR OBJECT METHOD
// when a function is called as obj.method(), 'this' refers to that object
// ==========================================

const doctor = {
  name: "Dr. Farha",
  specialty: "Cardiology",
  introduce: function () {
    console.log(`I am ${this.name}, specialist in ${this.specialty}`);
  }
};

doctor.introduce(); // "this" refers to doctor object here
// "I am Dr. Farha, specialist in Cardiology"


// ==========================================
// 2. THE COMMON TRAP - LOSING 'this' WHEN EXTRACTING A METHOD
// this is one of the most common real bugs, especially with callbacks
// ==========================================

const greetFunction = doctor.introduce;
// greetFunction(); // "this" is now undefined (or global object), NOT doctor anymore
// because 'this' depends on HOW the function is called, and here it is called
// standalone, not as doctor.introduce()


// ==========================================
// 3. ARROW FUNCTIONS DO NOT HAVE THEIR OWN 'this'
// they inherit 'this' from their surrounding (parent) scope
// this is the single most important thing to remember about arrow functions
// ==========================================

const clinic = {
  name: "DFJ Clinics",
  showName: function () {
    console.log(this.name); // regular function, 'this' = clinic object
  },
  showNameArrow: () => {
    console.log(this.name); // arrow function, 'this' comes from outer scope, NOT clinic
    // in a module/file, this outer 'this' is usually undefined or the global object
  }
};

clinic.showName();       // "DFJ Clinics"
clinic.showNameArrow();  // undefined, arrow function did not bind to clinic


// ==========================================
// 4. WHY THIS MATTERS IN REAL BACKEND CODE - CALLBACKS
// this exact issue appears constantly in Express controllers and class-based services
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

// direct call works fine
service.addAppointment("Ali"); // this = service, works correctly

// BUT if passed as a callback (common in Express route handlers, event listeners, array methods)
// setTimeout(service.addAppointment, 1000); 
// this would BREAK, because 'this' is lost when the function is passed around like this
// inside addAppointment, 'this' would be undefined, causing an error


// ==========================================
// 5. THE FIX - USING ARROW FUNCTIONS FOR CALLBACKS (MOST COMMON SOLUTION TODAY)
// arrow functions inherit 'this' from where they are DEFINED, not how they are called
// this is exactly why arrow functions are preferred for callbacks in classes
// ==========================================

class AppointmentServiceFixed {
  constructor() {
    this.appointments = [];
  }

  // using an arrow function as a class property automatically locks 'this' to the instance
  addAppointment = (name) => {
    this.appointments.push(name);
    console.log(this.appointments);
  };
}

const fixedService = new AppointmentServiceFixed();
const callbackRef = fixedService.addAppointment;
callbackRef("Sara"); // works correctly now, 'this' is locked to fixedService


// ==========================================
// 6. REAL EXPRESS.JS PATTERN (this is exactly how it looks in real backend code)
// ==========================================

// class UserController {
//   constructor() {
//     this.users = [];
//   }
//
//   // arrow function ensures 'this' always refers to the controller instance,
//   // even when Express calls this method internally as a plain callback
//   getUsers = (req, res) => {
//     res.json(this.users);
//   };
// }
//
// const controller = new UserController();
// app.get('/users', controller.getUsers); // 'this' stays correctly bound because of arrow function


// ==========================================
// 7. 'this' INSIDE A REGULAR FUNCTION (NOT A METHOD)
// when called standalone, 'this' is undefined in strict mode / modules,
// or the global object in old non-strict scripts
// ==========================================

function showThis() {
  console.log(this);
}
showThis(); // undefined in modules/strict mode, or global object in plain scripts


// ==========================================
// 8. 'this' INSIDE NESTED REGULAR FUNCTIONS (ANOTHER COMMON TRAP)
// ==========================================

const clinicData = {
  name: "DFJ Clinics",
  doctors: ["Dr. Farha", "Dr. Ahmed"],
  listDoctors: function () {
    // regular function used here would lose 'this'
    this.doctors.forEach(function (doctor) {
      // console.log(this.name); // undefined, 'this' here is NOT clinicData anymore
    });

    // arrow function fixes this, because it inherits 'this' from listDoctors' scope
    this.doctors.forEach((doctor) => {
      console.log(`${doctor} works at ${this.name}`); // 'this' correctly refers to clinicData
    });
  }
};

clinicData.listDoctors();
// "Dr. Farha works at DFJ Clinics"
// "Dr. Ahmed works at DFJ Clinics"


// ==========================================
// 9. PRACTICAL RULE OF THUMB FOR BACKEND DEVELOPMENT
// ==========================================

// use regular functions/methods when defining methods directly on an object or class,
// where 'this' should refer to that object/class instance

// use arrow functions for:
// - callbacks passed to array methods (map, filter, forEach) inside a method
// - class methods that get passed around as callbacks (like Express route handlers)
// - anywhere you want 'this' to stay locked to the surrounding context

// this single rule prevents almost all of the confusing 'this' bugs you will encounter
// in real Node.js/Express projects