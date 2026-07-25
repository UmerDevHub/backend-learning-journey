// ==========================================
// SCOPE - defines where a variable is accessible from
// HOISTING - JS moves declarations to the top of their scope before running code
// ==========================================


// ==========================================
// 1. GLOBAL SCOPE
// accessible from anywhere in the file
// real risk: too many global variables can cause naming conflicts in large projects
// ==========================================

let globalMessage = "I am accessible everywhere";

function showMessage() {
  console.log(globalMessage); // accessible here too, since it's global
}
showMessage();


// ==========================================
// 2. FUNCTION SCOPE
// variables declared with var, let, or const inside a function
// are only accessible within that function
// ==========================================

function testFunctionScope() {
  let localVar = "I only exist inside this function";
  console.log(localVar);
}
testFunctionScope();
// console.log(localVar); // Error, not accessible outside the function


// ==========================================
// 3. BLOCK SCOPE (let/const only, var ignores this)
// a block is anything inside { } like if, for, while
// ==========================================

if (true) {
  let blockScoped = "only exists inside this if block";
  const alsoBlockScoped = "same here";
  console.log(blockScoped);
}
// console.log(blockScoped); // Error, not accessible outside the block

// var does NOT respect block scope, it leaks out
if (true) {
  var leakyVar = "I leak outside the block";
}
console.log(leakyVar); // accessible here, this is why var is considered unsafe


// ==========================================
// 4. NESTED SCOPE (important for understanding closures later)
// inner functions/blocks can access outer scope variables, not the other way around
// ==========================================

function outer() {
  let outerVar = "from outer function";

  function inner() {
    let innerVar = "from inner function";
    console.log(outerVar); // accessible, inner can see outer's variables
    console.log(innerVar);
  }

  inner();
  // console.log(innerVar); // Error, outer cannot see inner's variables
}
outer();


// ==========================================
// 5. HOISTING WITH var
// var declarations are hoisted to the top of their scope
// but only the DECLARATION is hoisted, not the assigned value
// ==========================================

console.log(hoistedVar); // undefined, not an error, because declaration was hoisted
var hoistedVar = "assigned later";
console.log(hoistedVar); // "assigned later", now it has the value

// what actually happens behind the scenes (conceptually):
// var hoistedVar;              <- hoisted to top automatically
// console.log(hoistedVar);     <- undefined
// hoistedVar = "assigned later";


// ==========================================
// 6. HOISTING WITH let/const (Temporal Dead Zone)
// let/const are technically hoisted too, but cannot be accessed
// before their actual line of declaration, this gap is called the TDZ
// ==========================================

// console.log(hoistedLet); // Error: Cannot access 'hoistedLet' before initialization
let hoistedLet = "I am now initialized";
console.log(hoistedLet);

// same rule applies to const
// console.log(hoistedConst); // Error
const hoistedConst = "also initialized now";


// ==========================================
// 7. FUNCTION DECLARATION HOISTING (fully hoisted, including the body)
// this is why declared functions can be called before their definition in the file
// ==========================================

console.log(multiply(3, 4)); // works fine, function is fully hoisted

function multiply(a, b) {
  return a * b;
}

// function expressions are NOT hoisted the same way, only the variable is hoisted, not the function body
// console.log(divide(10, 2)); // Error, divide is undefined at this point
var divide = function (a, b) {
  return a / b;
};


// ==========================================
// 8. REAL PROJECT EXAMPLE WHERE SCOPE MATTERS
// common bug in loops with async operations, covered in detail on Day 01 var/let topic
// but also relevant in Express route handlers
// ==========================================

function processRequests(requests) {
  for (let i = 0; i < requests.length; i++) {
    // using let here ensures each iteration has its own separate 'i'
    setTimeout(() => {
      console.log(`Processing request ${i}: ${requests[i]}`);
    }, 100);
  }
}
processRequests(["signup", "login", "checkout"]);


// ==========================================
// 9. PRACTICAL RULE OF THUMB
// ==========================================

// always declare variables at the top of their scope, even though hoisting exists,
// relying on hoisting makes code confusing to read
// use let/const so the compiler catches accidental use-before-declaration bugs
// avoid var entirely to prevent scope leaks and hoisting confusion