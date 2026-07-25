// ==========================================
// CLOSURE - a function that "remembers" the variables from its outer scope,
// even after that outer function has finished running
// ==========================================


// ==========================================
// 1. BASIC CLOSURE EXAMPLE
// ==========================================

function outerFunction() {
  let outerVariable = "I am from outer function";

  function innerFunction() {
    console.log(outerVariable); // inner function "remembers" this variable
  }

  return innerFunction;
}

const myClosure = outerFunction(); // outerFunction has already finished running here
myClosure(); // still prints "I am from outer function", because of closure

// even though outerFunction() already returned, innerFunction still has
// access to outerVariable, this is the closure effect


// ==========================================
// 2. THE CLASSIC COUNTER EXAMPLE
// this is the most common closure example used to explain the concept
// ==========================================

function createCounter() {
  let count = 0; // this variable is "enclosed" by the returned function

  return function () {
    count++;
    return count;
  };
}

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

// each call to createCounter() creates a completely new, independent count variable
const counter2 = createCounter();
console.log(counter2()); // 1, separate from counter1, has its own closure


// ==========================================
// 3. WHY THIS MATTERS - DATA PRIVACY
// closures allow creating "private" variables that cannot be accessed directly from outside
// ==========================================

function createBankAccount(initialBalance) {
  let balance = initialBalance; // cannot be accessed directly from outside this function

  return {
    deposit: function (amount) {
      balance += amount;
      console.log(`Deposited ${amount}, new balance: ${balance}`);
    },
    withdraw: function (amount) {
      if (amount > balance) {
        console.log("Insufficient funds");
        return;
      }
      balance -= amount;
      console.log(`Withdrew ${amount}, new balance: ${balance}`);
    },
    getBalance: function () {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
account.deposit(500);   // Deposited 500, new balance: 1500
account.withdraw(200);  // Withdrew 200, new balance: 1300
console.log(account.getBalance()); // 1300

// console.log(account.balance); // undefined, balance is not directly accessible
// the only way to interact with balance is through the functions provided


// ==========================================
// 4. CLOSURES IN LOOPS (connects back to var vs let topic)
// ==========================================

function createFunctions() {
  const functions = [];

  for (let i = 0; i < 3; i++) {
    functions.push(function () {
      console.log("Value:", i); // each function closes over its own separate 'i'
    });
  }

  return functions;
}

const fns = createFunctions();
fns[0](); // Value: 0
fns[1](); // Value: 1
fns[2](); // Value: 2

// this works correctly because let creates a new binding of i for each iteration,
// each returned function forms a closure over its own separate i


// ==========================================
// 5. REAL PROJECT EXAMPLE - CONFIGURATION/FACTORY FUNCTIONS
// closures are commonly used to create configurable, reusable functions
// ==========================================

function createLogger(prefix) {
  return function (message) {
    console.log(`[${prefix}] ${message}`);
  };
}

const errorLogger = createLogger("ERROR");
const infoLogger = createLogger("INFO");

errorLogger("Database connection failed"); // [ERROR] Database connection failed
infoLogger("Server started successfully"); // [INFO] Server started successfully

// each logger function remembers its own "prefix" value through closure


// ==========================================
// 6. REAL PROJECT EXAMPLE - RATE LIMITING PATTERN (relevant for backend APIs)
// this exact pattern will be used later in Express middleware for rate limiting
// ==========================================

function createRateLimiter(limit) {
  let requestCount = 0;

  return function () {
    requestCount++;
    if (requestCount > limit) {
      console.log("Rate limit exceeded, request blocked");
      return false;
    }
    console.log(`Request allowed, count: ${requestCount}`);
    return true;
  };
}

const limiter = createRateLimiter(3);
limiter(); // Request allowed, count: 1
limiter(); // Request allowed, count: 2
limiter(); // Request allowed, count: 3
limiter(); // Rate limit exceeded, request blocked


// ==========================================
// 7. PRACTICAL RULE OF THUMB
// ==========================================

// closures happen automatically whenever a function is defined inside another function
// they are the foundation of: data privacy patterns, factory functions,
// middleware in Express, memoization, and event handler callbacks
// understanding closures deeply now will make Node.js and Express code much easier to read later