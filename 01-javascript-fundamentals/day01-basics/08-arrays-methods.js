// ==========================================
// ARRAYS - ordered lists of values
// real use: list of users, products, appointments, search results, API response data
// ==========================================

const numbers = [1, 2, 3, 4, 5];

console.log(numbers.length);              // 5
console.log(numbers[0]);                   // 1, first element
console.log(numbers[numbers.length - 1]); // 5, last element


// ==========================================
// MAP - transforms every element, returns a NEW array of the SAME length
// real use: formatting database results before sending as API response
// ==========================================

const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// real project example - formatting user data for an API response
const users = [
  { firstName: "Umer", lastName: "Khan" },
  { firstName: "Ali", lastName: "Raza" }
];

const formattedUsers = users.map((u) => ({
  fullName: `${u.firstName} ${u.lastName}`
}));
console.log(formattedUsers); // [{ fullName: "Umer Khan" }, { fullName: "Ali Raza" }]


// ==========================================
// FILTER - keeps only elements that match a condition, returns a NEW (possibly smaller) array
// real use: filtering active users, filtering products by category, filtering confirmed bookings
// ==========================================

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]

// real project example - filtering only confirmed appointments
const appointments = [
  { patient: "Ali", status: "confirmed" },
  { patient: "Sara", status: "pending" },
  { patient: "Umer", status: "confirmed" }
];

const confirmedOnly = appointments.filter((a) => a.status === "confirmed");
console.log(confirmedOnly);


// ==========================================
// REDUCE - combines all elements into a single value (number, object, array, anything)
// real use: calculating totals, grouping data, building lookup objects
// ==========================================

const total = numbers.reduce((acc, n) => acc + n, 0); // 0 is the starting value for acc
console.log(total); // 15

// real project example - calculating total appointment fees
const bookings = [
  { patient: "Ali", fee: 1500 },
  { patient: "Sara", fee: 2000 },
  { patient: "Umer", fee: 1800 }
];

const totalRevenue = bookings.reduce((acc, b) => acc + b.fee, 0);
console.log(totalRevenue); // 5300

// real project example - grouping data by a field, common in reporting/dashboards
const groupedByStatus = appointments.reduce((acc, a) => {
  if (!acc[a.status]) {
    acc[a.status] = [];
  }
  acc[a.status].push(a.patient);
  return acc;
}, {});
console.log(groupedByStatus); // { confirmed: ["Ali","Umer"], pending: ["Sara"] }


// ==========================================
// FIND - returns the FIRST matching element, or undefined if none match
// real use: finding a specific user/record by id or condition
// ==========================================

const foundUser = users.find((u) => u.firstName === "Ali");
console.log(foundUser); // { firstName: "Ali", lastName: "Raza" }

const notFound = users.find((u) => u.firstName === "Zain");
console.log(notFound); // undefined

// real project example - finding a doctor by id from a list
const doctors = [
  { id: 1, name: "Dr. Farha" },
  { id: 2, name: "Dr. Ahmed" }
];
const requestedDoctor = doctors.find((d) => d.id === 2);
console.log(requestedDoctor); // { id: 2, name: "Dr. Ahmed" }


// ==========================================
// SOME - checks if AT LEAST ONE element matches the condition, returns true/false
// real use: checking if any appointment is still pending, checking if any product is out of stock
// ==========================================

const hasPending = appointments.some((a) => a.status === "pending");
console.log(hasPending); // true


// ==========================================
// EVERY - checks if ALL elements match the condition, returns true/false
// real use: checking if all appointments are confirmed before generating a report
// ==========================================

const allConfirmed = appointments.every((a) => a.status === "confirmed");
console.log(allConfirmed); // false, because one is still pending


// ==========================================
// CHAINING METHODS TOGETHER (very common pattern in real backend code)
// ==========================================

const totalHighValueRevenue = bookings
  .filter((b) => b.fee > 1500)        // keep only fees above 1500
  .map((b) => b.fee)                   // extract just the fee values
  .reduce((acc, fee) => acc + fee, 0); // sum them up

console.log(totalHighValueRevenue); // 3800


// ==========================================
// PRACTICAL RULE OF THUMB
// ==========================================

// use map when you need to transform every item and get back the same number of items
// use filter when you need to keep only some items based on a condition
// use reduce when you need to combine everything into one single value or object
// use find when you need just one matching item, not all of them
// use some/every when you only need a true/false answer about the whole array
// none of these methods mutate the original array, they all return a new one, which is safer