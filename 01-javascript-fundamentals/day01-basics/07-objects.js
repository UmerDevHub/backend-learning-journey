// ==========================================
// OBJECTS - key-value pairs, used to represent structured data
// real use: database records, API request/response bodies, config objects,
// user profiles, appointment details, doctor records
// ==========================================

const user = {
  name: "Umer",
  age: 21,
  skills: ["React", "Node", "Flutter"],
  address: {
    city: "Wah Cantt",
    country: "Pakistan"
  }
};




// ==========================================
// 1. ACCESSING VALUES
// ==========================================

console.log(user.name);            // dot notation, most common way
console.log(user["age"]);          // bracket notation
console.log(user.address.city);    // nested object access

// bracket notation is required when the key is stored in a variable
const key = "name";
console.log(user[key]); // "Umer", dot notation cannot do this (user.key would look for literal "key")


// ==========================================
// 2. ADDING, UPDATING, DELETING PROPERTIES
// ==========================================

user.email = "umer@test.com"; // adds a new property
user.age = 22;                 // updates an existing property
delete user.age;               // removes a property entirely

console.log(user);


// ==========================================
// 3. CHECKING IF A PROPERTY EXISTS
// ==========================================

console.log("name" in user);              // true, checks if key exists anywhere, including inherited
console.log(user.hasOwnProperty("name"));  // true, safer, only checks the object's own properties
console.log(user.nonExistentField);        // undefined, no error thrown, just undefined


// ==========================================
// 4. OBJECT.KEYS, OBJECT.VALUES, OBJECT.ENTRIES
// real use: looping through fields dynamically, useful for validation or logging
// ==========================================

console.log(Object.keys(user));    // ["name", "skills", "address", "email"]
console.log(Object.values(user));  // ["Umer", [...], {...}, "umer@test.com"]
console.log(Object.entries(user)); // [["name","Umer"], ["skills",[...]], ...]

// looping through an object's fields using entries
Object.entries(user).forEach(([fieldName, value]) => {
  console.log(`${fieldName}:`, value);
});


// ==========================================
// 5. SHORTHAND PROPERTY NAMES
// when variable name and key name are the same, you can shorten it
// real use: constructing objects from function parameters, very common in Express controllers
// ==========================================

function createUser(name, age) {
  // instead of writing { name: name, age: age }
  return { name, age };
}
console.log(createUser("Ali", 25)); // { name: "Ali", age: 25 }


// ==========================================
// 6. METHOD SHORTHAND
// functions inside objects can be written without the "function" keyword
// ==========================================

const calculator = {
  // shorthand method
  add(a, b) {
    return a + b;
  },
  // equivalent long form
  subtract: function (a, b) {
    return a - b;
  }
};
console.log(calculator.add(5, 3));      // 8
console.log(calculator.subtract(5, 3)); // 2


// ==========================================
// 7. COMPUTED PROPERTY NAMES
// allows using a variable's value as the key name itself
// real use: building dynamic objects, e.g. grouping data by a changing field name
// ==========================================

const fieldName = "status";
const appointment = {
  patient: "Sara",
  [fieldName]: "confirmed" // key becomes "status" because fieldName = "status"
};
console.log(appointment); // { patient: "Sara", status: "confirmed" }


// ==========================================
// 8. NESTED OBJECTS AND OPTIONAL CHAINING
// real use: safely accessing deeply nested data without crashing the app
// very common when working with database records that might have missing fields
// ==========================================

const doctor = {
  name: "Dr. Farha",
  clinic: {
    name: "DFJ Clinics"
    // address is missing here on purpose
  }
};

console.log(doctor.clinic.name);          // "DFJ Clinics", works fine
// console.log(doctor.clinic.address.city); // would throw an error, address is undefined

console.log(doctor.clinic.address?.city); // undefined, no error, optional chaining stops safely


// ==========================================
// 9. PRACTICAL RULE OF THUMB
// ==========================================

// objects are the primary way structured data is represented in backend code
// almost every API request body and database record is essentially an object
// use shorthand properties and methods to keep controller code clean
// always use optional chaining (?.) when accessing nested data that might not exist,
// this prevents the app from crashing on missing fields