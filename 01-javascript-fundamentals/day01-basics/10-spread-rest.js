// ==========================================
// SPREAD OPERATOR (...) - expands/unpacks an array or object into individual elements
// REST OPERATOR (...) - opposite of spread, collects multiple values INTO an array
// same syntax (...), different meaning depending on where it's used
// ==========================================


// ==========================================
// 1. SPREAD - COPYING ARRAYS
// real use: creating a safe copy of an array without modifying the original
// ==========================================

const originalNumbers = [1, 2, 3];
const copiedNumbers = [...originalNumbers]; // creates a new array with the same values

copiedNumbers.push(4);

console.log(originalNumbers); // [1, 2, 3], untouched
console.log(copiedNumbers);   // [1, 2, 3, 4], only the copy changed

// without spread, this would be a mistake (reference copy, not a real copy)
const wrongCopy = originalNumbers; // this just points to the same array
wrongCopy.push(99);
console.log(originalNumbers); // [1, 2, 3, 99] - original got affected too, this is the bug spread avoids


// ==========================================
// 2. SPREAD - MERGING ARRAYS
// real use: combining multiple lists together, e.g. merging results from two sources
// ==========================================

const morningAppointments = ["Ali", "Sara"];
const eveningAppointments = ["Umer", "Zain"];

const allAppointments = [...morningAppointments, ...eveningAppointments];
console.log(allAppointments); // ["Ali", "Sara", "Umer", "Zain"]


// ==========================================
// 3. SPREAD - COPYING OBJECTS
// real use: updating a record without mutating the original, common in backend update logic
// ==========================================

const user = { name: "Umer", age: 21 };
const userCopy = { ...user }; // shallow copy of the object

userCopy.age = 25;

console.log(user);      // { name: "Umer", age: 21 }, untouched
console.log(userCopy);  // { name: "Umer", age: 25 }, only the copy changed


// ==========================================
// 4. SPREAD - MERGING OBJECTS AND OVERRIDING VALUES
// real use: applying updates to a record, e.g. PATCH request in an API
// if the same key exists in both, the LATER one wins
// ==========================================

const existingUser = { name: "Umer", age: 21, city: "Wah Cantt" };
const updates = { age: 22 };

const updatedUser = { ...existingUser, ...updates };
console.log(updatedUser); // { name: "Umer", age: 22, city: "Wah Cantt" }

// real project example - this is exactly how PATCH/update endpoints work
function updateAppointment(existingAppointment, changes) {
  return { ...existingAppointment, ...changes };
}

const appointment = { patient: "Ali", status: "pending", time: "10:00 AM" };
const updatedAppointment = updateAppointment(appointment, { status: "confirmed" });
console.log(updatedAppointment); // { patient: "Ali", status: "confirmed", time: "10:00 AM" }


// ==========================================
// 5. SPREAD - PASSING ARRAY ELEMENTS AS FUNCTION ARGUMENTS
// real use: when a function expects separate arguments but you have an array
// ==========================================

function addThreeNumbers(a, b, c) {
  return a + b + c;
}

const nums = [10, 20, 30];
console.log(addThreeNumbers(...nums)); // 60, spread unpacks the array into 3 separate arguments

// practical example with built in functions
console.log(Math.max(...[5, 2, 9, 1])); // 9, Math.max normally needs separate arguments, not an array


// ==========================================
// 6. SPREAD - CONVERTING STRING INTO CHARACTERS ARRAY
// real use: quick way to break a string into individual characters
// ==========================================

const word = "hello";
const characters = [...word];
console.log(characters); // ["h", "e", "l", "l", "o"]


// ==========================================
// 7. REST - COLLECTING FUNCTION ARGUMENTS INTO AN ARRAY
// real use: functions that accept an unknown/variable number of arguments
// ==========================================

function sum(...numbers) {
  // all arguments get collected into a single array called "numbers"
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(5, 10, 15, 20)); // 50


// ==========================================
// 8. REST - IN OBJECT DESTRUCTURING
// real use: pulling out specific fields, and keeping the "remaining" fields together
// ==========================================

const product = {
  name: "Laptop",
  price: 1000,
  category: "Electronics",
  inStock: true
};

const { name, ...otherDetails } = product;
console.log(name);          // "Laptop"
console.log(otherDetails);  // { price: 1000, category: "Electronics", inStock: true }

// real project example - excluding sensitive fields before sending a response
const userRecord = {
  name: "Umer",
  email: "umer@test.com",
  password: "hashed_password_here"
};

const { password, ...safeUserData } = userRecord;
console.log(safeUserData); // { name: "Umer", email: "umer@test.com" }, password excluded safely


// ==========================================
// 9. REST - IN ARRAY DESTRUCTURING
// real use: grabbing the first item(s) and keeping the rest as an array
// ==========================================

const scores = [95, 88, 76, 65, 50];
const [highest, ...remainingScores] = scores;
console.log(highest);          // 95
console.log(remainingScores);  // [88, 76, 65, 50]


// ==========================================
// 10. SPREAD VS REST - HOW TO TELL THEM APART
// ==========================================

// SPREAD - used when creating/calling something, it EXPANDS values out
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // spreading arr1 OUT into a new array

// REST - used when receiving/destructuring something, it COLLECTS values in
function example(...args) { // collecting all arguments IN as an array
  console.log(args);
}
example(1, 2, 3);


// ==========================================
// 11. PRACTICAL RULE OF THUMB
// ==========================================

// use spread whenever you need to copy or merge arrays/objects without mutating originals
// use spread to pass array elements as separate function arguments
// use rest when a function needs to accept a flexible number of arguments
// use rest in destructuring when you need "everything else" after pulling out specific fields
// this pattern (excluding password before sending user data) will be used constantly in real APIs