// ==========================================
// FUNCTIONS - reusable blocks of code
// 4 main types covered here: declaration, expression, arrow, default/rest params
// ==========================================


// ==========================================
// 1. FUNCTION DECLARATION
// hoisted - can be called even before it appears in the file
// real use: general purpose reusable logic, utility functions
// ==========================================

console.log(add(2, 3)); // works fine even though called before definition below

function add(a, b) {
  return a + b;
}

// real project example - reusable validation function
function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}
console.log(isValidEmail("umer@test.com")); // true


// ==========================================
// 2. FUNCTION EXPRESSION
// NOT hoisted - must be defined before calling
// stored in a variable, behaves like a value
// real use: when you want to assign function conditionally, or pass it around
// ==========================================

// console.log(subtract(5, 2)); // Error if called here, not hoisted like declarations

const subtract = function (a, b) {
  return a - b;
};

console.log(subtract(5, 2)); // 3

// real project example - function stored in an object (common in controllers)
const mathOperations = {
  multiply: function (a, b) {
    return a * b;
  }
};
console.log(mathOperations.multiply(4, 5)); // 20


// ==========================================
// 3. ARROW FUNCTIONS
// shorter syntax, does not have its own 'this' (uses parent scope's 'this')
// real use: callbacks, array methods (map/filter/reduce), short utility functions
// ==========================================

const multiply = (a, b) => a * b; // implicit return, no curly braces needed
console.log(multiply(3, 4)); // 12

const square = (n) => n * n; // single parameter, brackets optional but recommended
console.log(square(5)); // 25

const greet = () => console.log("Hello"); // no parameters, still need empty brackets
greet();

// arrow function with multiple statements needs curly braces and explicit return
const calculateTotal = (price, tax) => {
  const total = price + price * tax;
  return total;
};
console.log(calculateTotal(100, 0.1)); // 110

// real project example - used everywhere with array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]


// ==========================================
// 4. DEFAULT PARAMETERS
// gives a fallback value if argument is not passed or passed as undefined
// real use: optional settings, pagination defaults, config values
// ==========================================

function power(base, exponent = 2) {
  return base ** exponent;
}
console.log(power(4));     // 16, exponent defaults to 2
console.log(power(4, 3));  // 64, exponent explicitly passed

// real project example - pagination defaults in an API
function getUsers(page = 1, limit = 10) {
  console.log(`Fetching page ${page} with limit ${limit}`);
}
getUsers();        // uses both defaults
getUsers(2);       // page 2, limit still defaults to 10
getUsers(2, 20);   // both explicitly provided


// ==========================================
// 5. REST PARAMETERS
// collects multiple arguments into a single array
// real use: functions that accept a variable/unknown number of arguments
// ==========================================

function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
console.log(sum(5, 10));      // 15

// rest parameter must always be the last parameter
function logDetails(userId, ...actions) {
  console.log("User:", userId);
  console.log("Actions:", actions);
}
logDetails(101, "login", "viewed profile", "logged out");
// User: 101
// Actions: ["login", "viewed profile", "logged out"]

// real project example - combining default and rest parameters together
function createLog(level = "info", ...messages) {
  console.log(`[${level.toUpperCase()}]`, messages.join(" "));
}
createLog("error", "Database connection failed", "retrying...");
createLog(undefined, "Server started"); // uses default level "info"


// ==========================================
// 6. FUNCTIONS AS VALUES (important concept for backend/express work)
// functions can be passed as arguments to other functions
// this is the foundation of how Express middleware works
// ==========================================

function processOrder(orderId, callback) {
  console.log(`Processing order ${orderId}`);
  callback(); // calling the passed-in function
}

processOrder(101, () => {
  console.log("Order processed, sending confirmation email");
});

// this exact pattern is how Express route handlers and middleware work later:
// app.get('/users', (req, res) => { ... })


// ==========================================
// 7. PRACTICAL RULE OF THUMB
// ==========================================

// use function declarations for general reusable logic across a file
// use arrow functions for short callbacks, array methods, and anything passed around
// use default parameters instead of manually checking undefined
// use rest parameters instead of manually handling the 'arguments' object