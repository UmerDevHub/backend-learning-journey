// ==========================================
// CALLBACKS - a function passed as an argument to another function,
// to be called later, usually after some operation completes
// ==========================================


// ==========================================
// 1. BASIC CALLBACK - SYNCHRONOUS EXAMPLE
// callbacks are not always async, they can run immediately too
// ==========================================

function processOrder(orderId, callback) {
  console.log(`Processing order ${orderId}`);
  callback(); // calling the function that was passed in
}

processOrder(101, function () {
  console.log("Order processed, sending confirmation email");
});

// this is the same pattern used constantly with array methods
[1, 2, 3].forEach(function (num) {
  console.log(num); // this function is a callback too
});


// ==========================================
// 2. ASYNCHRONOUS CALLBACKS - THE REAL REASON CALLBACKS MATTER
// used when an operation takes time (network request, file read, database query, timer)
// the callback runs LATER, once that operation finishes
// ==========================================

console.log("Start");

setTimeout(function () {
  console.log("This runs after 2 seconds");
}, 2000);

console.log("End");

// output order:
// "Start"
// "End"
// "This runs after 2 seconds" (after the 2 second delay)
// this proves JS does NOT wait for setTimeout, it moves on and runs the callback later


// ==========================================
// 3. SIMULATING A REAL BACKEND OPERATION WITH CALLBACKS
// real use: this is how database queries or API calls used to be written before Promises existed
// ==========================================

function getUserFromDatabase(userId, callback) {
  console.log("Fetching user from database...");

  setTimeout(() => {
    const user = { id: userId, name: "Umer" }; // simulating a database result
    callback(user); // "returning" the result through the callback, since return doesn't work for async code
  }, 1000);
}

getUserFromDatabase(1, function (user) {
  console.log("User found:", user);
});

// note: you CANNOT do this instead, it will not work as expected:
// const result = getUserFromDatabase(1); 
// console.log(result); // undefined, because the function returns before the setTimeout finishes
// this is exactly WHY callbacks are needed for async operations


// ==========================================
// 4. ERROR-FIRST CALLBACK PATTERN (Node.js standard convention)
// real use: this exact pattern is used throughout Node.js's built-in modules (fs, http, etc)
// the first argument is ALWAYS reserved for an error, if any
// ==========================================

function readUserData(userId, callback) {
  setTimeout(() => {
    if (!userId) {
      // something went wrong, pass the error as the first argument
      callback(new Error("User ID is required"), null);
      return;
    }
    // success case, pass null for error, actual data as second argument
    callback(null, { id: userId, name: "Umer" });
  }, 1000);
}

readUserData(1, function (error, user) {
  if (error) {
    console.log("Error:", error.message);
    return;
  }
  console.log("Success:", user);
});

readUserData(null, function (error, user) {
  if (error) {
    console.log("Error:", error.message); // "Error: User ID is required"
    return;
  }
  console.log("Success:", user);
});

// this error-first pattern is exactly how Node's fs.readFile works:
// fs.readFile('file.txt', (err, data) => { ... })


// ==========================================
// 5. THE PROBLEM - CALLBACK HELL
// when multiple async operations depend on each other, callbacks nest deeper and deeper,
// making code hard to read and maintain
// ==========================================

function getUser(userId, callback) {
  setTimeout(() => {
    console.log("Step 1: Got user");
    callback({ id: userId, name: "Umer" });
  }, 500);
}

function getAppointments(user, callback) {
  setTimeout(() => {
    console.log("Step 2: Got appointments for", user.name);
    callback(["Appointment 1", "Appointment 2"]);
  }, 500);
}

function getAppointmentDetails(appointments, callback) {
  setTimeout(() => {
    console.log("Step 3: Got details for", appointments[0]);
    callback({ time: "10:00 AM", doctor: "Dr. Farha" });
  }, 500);
}

// this nesting pattern is called "callback hell" or "the pyramid of doom"
getUser(1, function (user) {
  getAppointments(user, function (appointments) {
    getAppointmentDetails(appointments, function (details) {
      console.log("Final details:", details);
      // if there were even more steps, this would keep nesting deeper and deeper,
      // becoming very hard to read, debug, and handle errors for
    });
  });
});

// problems with this pattern:
// - hard to read, code grows sideways instead of downwards
// - error handling becomes messy, need to check for errors at every single level
// - hard to reuse or refactor individual steps


// ==========================================
// 6. WHY THIS MATTERS - THIS IS EXACTLY WHY PROMISES WERE INTRODUCED
// the next topic (Promises) solves precisely this nesting problem,
// allowing the same 3-step process to be written as a flat, readable chain
// ==========================================

// preview of what Promises will look like (not valid yet, just for comparison):
// getUser(1)
//   .then(user => getAppointments(user))
//   .then(appointments => getAppointmentDetails(appointments))
//   .then(details => console.log(details))
//   .catch(error => console.log(error));


// ==========================================
// 7. PRACTICAL RULE OF THUMB
// ==========================================

// callbacks are the foundation of all async JS, even Promises use callbacks internally
// understanding callbacks is essential before Promises and async/await make full sense

// the error-first callback pattern (error, data) is a Node.js convention worth recognizing,
// since some older Node core modules and third-party libraries still use it

// in modern backend code, you will rarely write deeply nested callbacks yourself,
// Promises and async/await (next topics) are used instead, but understanding
// WHY they exist requires understanding the callback hell problem first