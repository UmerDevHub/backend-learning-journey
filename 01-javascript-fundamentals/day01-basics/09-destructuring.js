// ==========================================
// DESTRUCTURING - a shortcut to extract values from objects/arrays
// into individual variables, without accessing them one by one manually
// ==========================================


// ==========================================
// 1. OBJECT DESTRUCTURING - BASIC
// ==========================================

const user = {
  name: "Umer",
  age: 21,
  city: "Wah Cantt"
};

// without destructuring - repetitive
const name1 = user.name;
const age1 = user.age;

// with destructuring - shorter and cleaner
const { name, age, city } = user;
console.log(name, age, city); // "Umer" 21 "Wah Cantt"

// order does not matter in object destructuring, keys must match exactly
const { city: userCity, name: userName } = user;
console.log(userCity, userName); // "Wah Cantt" "Umer"


// ==========================================
// 2. RENAMING WHILE DESTRUCTURING
// real use: when the key name conflicts with an existing variable, or you want a clearer name
// ==========================================

const { name: fullName } = user;
console.log(fullName); // "Umer", the variable is now called fullName instead of name


// ==========================================
// 3. DEFAULT VALUES
// real use: providing a fallback when a property might not exist on the object
// ==========================================

const { country = "Pakistan" } = user; // user object has no "country" field
console.log(country); // "Pakistan", default value used since it was missing

const { age: userAge = 18 } = user; // user.age already exists, so default is ignored
console.log(userAge); // 21


// ==========================================
// 4. NESTED OBJECT DESTRUCTURING
// real use: pulling values out of deeply nested API/database response objects
// ==========================================

const doctor = {
  name: "Dr. Farha",
  clinic: {
    name: "DFJ Clinics",
    location: {
      city: "Wah Cantt",
      country: "Pakistan"
    }
  }
};

const {
  clinic: {
    name: clinicName,
    location: { city: clinicCity }
  }
} = doctor;

console.log(clinicName, clinicCity); // "DFJ Clinics" "Wah Cantt"


// ==========================================
// 5. DESTRUCTURING IN FUNCTION PARAMETERS (VERY COMMON IN EXPRESS LATER)
// real use: extracting fields directly from req.body without writing req.body.name every time
// ==========================================

function createUser({ name, email, password }) {
  console.log(`Creating user: ${name}, ${email}`);
  // password intentionally not logged
}

createUser({ name: "Ali", email: "ali@test.com", password: "12345" });

// this exact pattern will be used constantly in Express controllers:
// function createAppointment(req, res) {
//   const { patientName, doctorId, date } = req.body;
// }


// ==========================================
// 6. ARRAY DESTRUCTURING - BASIC
// order MATTERS here, unlike object destructuring, position decides which variable gets what
// ==========================================

const numbers = [10, 20, 30, 40, 50];

const [first, second] = numbers;
console.log(first, second); // 10 20

// skipping elements using empty commas
const [, , third] = numbers;
console.log(third); // 30, skipped first two positions


// ==========================================
// 7. ARRAY DESTRUCTURING WITH REST OPERATOR
// real use: grabbing the first item and keeping the rest as an array
// ==========================================

const [firstNum, ...restNums] = numbers;
console.log(firstNum);  // 10
console.log(restNums);  // [20, 30, 40, 50]


// ==========================================
// 8. DEFAULT VALUES IN ARRAY DESTRUCTURING
// real use: when an array might not have as many elements as expected
// ==========================================

const [a = 1, b = 2, c = 3] = [100]; // only one value provided
console.log(a, b, c); // 100 2 3, b and c fall back to defaults


// ==========================================
// 9. SWAPPING VARIABLES USING ARRAY DESTRUCTURING
// a common trick, avoids needing a temporary variable
// ==========================================

let x = 5;
let y = 10;

[x, y] = [y, x]; // swaps values in one line
console.log(x, y); // 10 5


// ==========================================
// 10. DESTRUCTURING RETURN VALUES FROM FUNCTIONS
// real use: when a function returns multiple values inside an array or object
// ==========================================

function getMinMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}

const [min, max] = getMinMax([5, 2, 9, 1, 7]);
console.log(min, max); // 1 9

function getUserInfo() {
  return { name: "Sara", age: 25 };
}

const { name: infoName, age: infoAge } = getUserInfo();
console.log(infoName, infoAge); // "Sara" 25


// ==========================================
// 11. PRACTICAL RULE OF THUMB
// ==========================================

// use object destructuring when working with named fields, like API responses, function parameters
// use array destructuring when working with ordered lists, like coordinates, min/max pairs
// always add default values when a field might be missing, avoids undefined errors later
// destructuring function parameters is one of the most common patterns in Express route handlers