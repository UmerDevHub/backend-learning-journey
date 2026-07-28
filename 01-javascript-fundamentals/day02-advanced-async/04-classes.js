// ==========================================
// CLASSES (ES6) - a cleaner syntax for creating objects with shared structure and behavior
// internally still uses the same prototype system covered in the previous topic,
// classes are essentially "syntactic sugar" over prototypes
// ==========================================


// ==========================================
// 1. BASIC CLASS SYNTAX
// ==========================================

class Doctor {
  // constructor runs automatically when a new object is created
  constructor(name, specialty) {
    this.name = name;
    this.specialty = specialty;
  }

  // methods defined here are automatically placed on the prototype,
  // shared across all instances, just like Doctor.prototype.introduce in the old syntax
  introduce() {
    console.log(`I am ${this.name}, specialist in ${this.specialty}`);
  }
}

const doc1 = new Doctor("Farha", "Cardiology");
const doc2 = new Doctor("Ahmed", "Neurology");

doc1.introduce(); // "I am Farha, specialist in Cardiology"
doc2.introduce(); // "I am Ahmed, specialist in Neurology"

// same memory efficiency as prototypes, methods are shared, not duplicated per instance
console.log(doc1.introduce === doc2.introduce); // true


// ==========================================
// 2. CLASSES ARE STILL BASED ON PROTOTYPES UNDERNEATH
// ==========================================

console.log(typeof Doctor);                          // "function", classes are functions under the hood
console.log(Doctor.prototype.introduce);               // the introduce method lives on the prototype
console.log(Object.getPrototypeOf(doc1) === Doctor.prototype); // true


// ==========================================
// 3. INHERITANCE WITH extends AND super
// this replaces the messy Object.create() pattern shown in the prototypes topic
// ==========================================

class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, I am ${this.name}`);
  }
}

class DoctorPerson extends Person {
  constructor(name, specialty) {
    super(name); // calls Person's constructor, sets up "name"
    this.specialty = specialty;
  }
  introduce() {
    console.log(`I am Dr. ${this.name}, specialist in ${this.specialty}`);
  }
}

const doctorInstance = new DoctorPerson("Farha", "Cardiology");
doctorInstance.greet();     // "Hello, I am Farha", inherited from Person
doctorInstance.introduce(); // "I am Dr. Farha, specialist in Cardiology", own method

// this achieves the exact same result as section 6 in the prototypes file,
// but with far cleaner, more readable syntax


// ==========================================
// 4. OVERRIDING METHODS (child class replacing parent's method)
// ==========================================

class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  describe() {
    console.log(`${this.name} earns ${this.salary}`);
  }
}

class Manager extends Employee {
  constructor(name, salary, teamSize) {
    super(name, salary);
    this.teamSize = teamSize;
  }
  // overriding the parent's describe method with a more specific version
  describe() {
    super.describe(); // still calls the parent's version first, then adds more
    console.log(`Manages a team of ${this.teamSize}`);
  }
}

const manager = new Manager("Ali", 80000, 5);
manager.describe();
// "Ali earns 80000"
// "Manages a team of 5"


// ==========================================
// 5. GETTERS AND SETTERS
// real use: computing a value dynamically, or validating data before setting it
// ==========================================

class Appointment {
  constructor(patientName, fee) {
    this.patientName = patientName;
    this._fee = fee; // underscore convention, indicates "internal" value
  }

  // getter - accessed like a property, not called like a function
  get fee() {
    return `Rs. ${this._fee}`;
  }

  // setter - allows validation when a value is being assigned
  set fee(newFee) {
    if (newFee < 0) {
      console.log("Fee cannot be negative");
      return;
    }
    this._fee = newFee;
  }
}

const appointment = new Appointment("Sara", 1500);
console.log(appointment.fee); // "Rs. 1500", called like a property, not appointment.fee()

appointment.fee = 2000; // uses the setter
console.log(appointment.fee); // "Rs. 2000"

appointment.fee = -500; // "Fee cannot be negative", setter blocks invalid update
console.log(appointment.fee); // still "Rs. 2000"


// ==========================================
// 6. STATIC METHODS - belong to the class itself, not to individual instances
// real use: utility/helper functions related to the class, but not tied to one specific object
// ==========================================

class MathHelper {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathHelper.add(5, 3)); // 8, called directly on the class, no need to create an instance

// const instance = new MathHelper();
// instance.add(5, 3); // this would NOT work, static methods are not available on instances


// ==========================================
// 7. CLASS FIELDS AND ARROW FUNCTION METHODS (connects back to the 'this' topic)
// this is the modern solution to the 'this' binding problem covered earlier
// ==========================================

class AppointmentService {
  appointments = []; // class field, initialized directly, no need to set in constructor

  // arrow function as a class property, automatically locks 'this' to the instance
  addAppointment = (name) => {
    this.appointments.push(name);
    console.log(this.appointments);
  };
}

const service = new AppointmentService();
const extractedMethod = service.addAppointment; // extracted, would normally lose 'this'
extractedMethod("Ali"); // still works correctly, because 'this' was locked by the arrow function

// this exact pattern is what will be used in real Express controllers later


// ==========================================
// 8. PRACTICAL BACKEND EXAMPLE - THIS IS WHAT REAL CODE WILL LOOK LIKE
// ==========================================

class UserController {
  users = [];

  createUser = (name, email) => {
    const newUser = { name, email };
    this.users.push(newUser);
    return newUser;
  };

  getAllUsers = () => {
    return this.users;
  };
}

const controller = new UserController();
controller.createUser("Umer", "umer@test.com");
controller.createUser("Ali", "ali@test.com");
console.log(controller.getAllUsers());
// [{ name: "Umer", email: "..." }, { name: "Ali", email: "..." }]

// in real Express code, this exact structure gets connected to routes like:
// app.post('/users', controller.createUser);
// app.get('/users', controller.getAllUsers);


// ==========================================
// 9. PRACTICAL RULE OF THUMB
// ==========================================

// use classes to group related data and behavior together, especially for
// database models, services, and controllers in backend projects

// use extends + super when one class is a more specific version of another
// (e.g. Manager extends Employee, AdminUser extends User)

// use getters/setters when a value needs validation or computed formatting

// use static methods for utility functions related to the class but not tied to one instance

// use arrow function class properties for any method that might be passed around
// as a callback (like Express route handlers), to avoid losing 'this'