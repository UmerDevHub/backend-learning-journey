// ==========================================
// 1. BASIC DECLARATION
// ==========================================
var a = 10;
let b = 20;
const c = 30;

console.log(a, b, c); // 10 20 30


// ==========================================
// 2. REASSIGNMENT RULES
// ==========================================
var x = 1;
x = 2; // works fine

let y = 1;
y = 2; // works fine

const z = 1;
// z = 2; // Error: Assignment to constant variable


// ==========================================
// 3. RE-DECLARATION RULES
// ==========================================
var name1 = "Umer";
var name1 = "Ali"; // var allows re-declaration, no error
console.log(name1); // "Ali"

let name2 = "Umer";
// let name2 = "Ali"; // Error: Identifier 'name2' has already been declared

const name3 = "Umer";
// const name3 = "Ali"; // Error: Identifier 'name3' has already been declared


// ==========================================
// 4. SCOPE DIFFERENCE - Function Scope vs Block Scope
// ==========================================

// var is function scoped, it ignores block boundaries like if/for
function testVarScope() {
  if (true) {
    var funcScoped = "I leak outside the block";
  }
  console.log(funcScoped); // accessible here even though declared inside if block
}
testVarScope();

// let/const are block scoped, they respect if/for/while boundaries
function testLetScope() {
  if (true) {
    let blockScoped = "I stay inside the block";
    const alsoBlockScoped = "Me too";
  }
  // console.log(blockScoped); // Error: not defined outside the block
}
testLetScope();


// ==========================================
// 5. THE CLASSIC LOOP BUG (var vs let)
// ==========================================

// Problem with var in loops combined with setTimeout
console.log("var in loop (buggy)");
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log("var i:", i); // prints 3, 3, 3 instead of 0, 1, 2
  }, 100);
}
// Reason: var is function scoped, so all 3 setTimeout callbacks
// share the same i variable. By the time setTimeout runs,
// the loop has already finished and i is 3.

// Solution using let
console.log("let in loop (correct)");
for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log("let j:", j); // prints 0, 1, 2 correctly
  }, 100);
}
// Reason: let creates a new j for each loop iteration since it is block scoped,
// so each setTimeout callback captures its own separate value.


// ==========================================
// 6. HOISTING BEHAVIOR
// ==========================================

console.log(hoistedVar); // undefined, not an error, var is hoisted with default value
var hoistedVar = "I'm hoisted";

// console.log(hoistedLet); // Error: Cannot access 'hoistedLet' before initialization
let hoistedLet = "I'm in temporal dead zone until this line";

// same behavior applies to const
// console.log(hoistedConst); // Error
const hoistedConst = "Also in temporal dead zone";


// ==========================================
// 7. GLOBAL SCOPE BEHAVIOR (important difference)
// ==========================================

var globalVar = "I attach to window or global object";
let globalLet = "I do not attach to window or global object";

console.log(typeof window !== "undefined" ? window.globalVar : global.globalVar);
// prints the value since var attaches to the global object


// ==========================================
// 8. const WITH OBJECTS AND ARRAYS (IMPORTANT MISCONCEPTION)
// ==========================================

// const prevents reassignment, not mutation
const person = { name: "Umer", age: 21 };
person.age = 22;        // works, mutating a property, not reassigning
person.city = "Wah";    // works, adding a new property
console.log(person);    // { name: "Umer", age: 22, city: "Wah" }

// person = {};          // Error, cannot reassign the const itself

const arr = [1, 2, 3];
arr.push(4);             // works, mutating the array
console.log(arr);        // [1, 2, 3, 4]

// arr = [5, 6, 7];       // Error, cannot reassign the const itself

// for true immutability, use Object.freeze()
const frozenPerson = Object.freeze({ name: "Ali" });
frozenPerson.name = "Changed"; // fails silently, or throws in strict mode
console.log(frozenPerson.name); // still "Ali"


// ==========================================
// 9. TEMPORAL DEAD ZONE - deeper example
// ==========================================

function tdzExample() {
  // console.log(tdzVar); // Error
  let tdzVar = "now I exist";
  console.log(tdzVar); // "now I exist"
}
tdzExample();


// ==========================================
// 10. PRACTICAL RULE OF THUMB
// ==========================================

// use const by default since most variables should not be reassigned
// use let only when the value is expected to change, like counters or loops
// avoid var completely in modern JS, it only exists for legacy code

const PI = 3.14159;           // never changes, so const
let score = 0;                 // will change, so let
score += 10;
console.log(PI, score);