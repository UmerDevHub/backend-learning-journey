// ==========================================
// JAVASCRIPT DATA TYPES
// 7 primitives: string, number, boolean, null, undefined, symbol, bigint
// 1 non-primitive: object (arrays, functions, etc also fall under object)
// ==========================================


// ==========================================
// 1. STRING
// real life use: names, emails, passwords, JSON responses, database queries,
// URLs, tokens (JWT), status fields like "confirmed"/"pending"
// ==========================================
const str1 = "Umer";
const str2 = 'Ali';
const str3 = `Hello ${str1}`; // template literal, used a lot in generating dynamic messages/emails

console.log(typeof str1); // "string"

// strings are immutable, methods return a new string, original stays unchanged
const name = "umer";
console.log(name.toUpperCase()); // "UMER"
console.log(name);               // still "umer"

console.log(str1.length);
console.log(str1.includes("me"));
console.log(str1.slice(0, 2));
console.log(str1.trim());        // useful for cleaning user input before saving to database


// ==========================================
// 2. NUMBER
// real life use: prices, quantities, ratings, pagination (page, limit),
// timestamps, age validation
// ==========================================
const int = 25;
const float = 25.5;

console.log(typeof int); // "number"

console.log(1 / 2); // 0.5, only one number type in JS, no separate int/float

// special values
console.log(1 / 0);  // Infinity
console.log(0 / 0);  // NaN

console.log(NaN === NaN);       // false
console.log(Number.isNaN(NaN)); // true, correct way to check for NaN

// floating point precision issue, real risk in financial calculations
console.log(0.1 + 0.2);         // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// real project practice: store money in smallest unit to avoid precision bugs
let priceInPaisa = 150000; // represents Rs 1500.00, avoids decimal errors


// ==========================================
// 3. BOOLEAN
// real life use: isVerified, isActive, isDeleted (soft delete), isPaid,
// feature flags, auth checks like isLoggedIn
// ==========================================
const isActive = true;
const isDeleted = false;

console.log(typeof isActive); // "boolean"

// falsy values: false, 0, "", null, undefined, NaN
// everything else is truthy, including "0" (string), [], {}

if ("0") console.log("truthy - non-empty string");
if ([]) console.log("truthy - empty array is still truthy");

// real project example - controlling booking flow
const appointment = {
  isConfirmed: false,
  isPaid: false
};
if (!appointment.isPaid) {
  console.log("block booking confirmation until payment is done");
}


// ==========================================
// 4. NULL
// real life use: explicitly saying "empty on purpose",
// e.g. profilePicture not uploaded yet, or a database query found nothing
// ==========================================
let emptyValue = null;
console.log(typeof emptyValue); // "object", known long standing JS bug

// example: database returns null when no matching record exists
// const doctor = await Doctor.findById(id);
// if (doctor === null) return res.status(404).json({ error: "Doctor not found" });


// ==========================================
// 5. UNDEFINED
// real life use: a value that was never assigned,
// e.g. optional fields in req.body that the client did not send at all
// ==========================================
let notAssigned;
console.log(notAssigned);        // undefined
console.log(typeof notAssigned); // "undefined"

function checkUser(user) {
  console.log(user); // undefined if no argument passed
}
checkUser();

// important distinction for API validation:
// undefined = field was never sent
// null = field was sent, but intentionally empty
console.log(null == undefined);  // true (loose equality treats them as equal)
console.log(null === undefined); // false (strict equality checks type too)


// ==========================================
// 6. SYMBOL
// real life use: rare in daily backend code, mostly used internally by libraries
// to create unique property keys that never collide
// ==========================================
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2); // false, always unique even with same description
console.log(typeof id1);  // "symbol"

// practical but rare use case: hidden property that JSON.stringify ignores automatically
const config = {
  apiUrl: "https://api.example.com",
  [id1]: "hidden-value"
};
console.log(JSON.stringify(config)); // symbol property excluded automatically


// ==========================================
// 7. BIGINT
// real life use: numbers larger than Number.MAX_SAFE_INTEGER,
// mainly relevant in cryptography, blockchain, or very large scale calculations
// rarely needed in typical backend apps like booking systems
// ==========================================
const bigNumber = 1234567890123456789012345n;
console.log(typeof bigNumber); // "bigint"

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991, beyond this precision is unreliable

// cannot mix bigint with regular number directly
// console.log(bigNumber + 1); // Error
console.log(bigNumber + 10n); // works, both are bigint


// ==========================================
// 8. PRACTICAL VALIDATION EXAMPLE COMBINING TYPES
// this pattern is used constantly in Express API route handlers
// ==========================================
function validateAppointment(data) {
  if (!data.patientName || typeof data.patientName !== "string") {
    throw new Error("Patient name is required and must be a string");
  }
  if (data.age !== undefined && typeof data.age !== "number") {
    throw new Error("Age must be a number if provided");
  }
  if (typeof data.isPaid !== "boolean") {
    throw new Error("isPaid must be true or false");
  }
}