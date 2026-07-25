// ==========================================
// TYPE COERCION - JS automatically converts one type into another
// this happens implicitly during operations like +, -, ==, if conditions etc
// ==========================================


// ==========================================
// 1. STRING + NUMBER COERCION
// ==========================================

console.log("5" + 3);      // "53", number 3 gets converted to string, then concatenated
console.log(5 + "3");      // "53", same thing, order does not matter for +
console.log("5" + "3");    // "53", both already strings, simple concatenation

console.log("5" - 3);      // 2, minus operator forces both sides to become numbers
console.log("5" * "2");    // 10, multiplication also forces numeric conversion
console.log("10" / "2");   // 5, division also forces numeric conversion

// only + behaves differently because it works for both strings and numbers
// -, *, / only make sense for numbers, so JS always converts to number for those


// ==========================================
// 2. BOOLEAN COERCION IN MATH
// ==========================================

console.log(1 + true);      // 2, true becomes 1
console.log(1 + false);     // 1, false becomes 0
console.log("5" + true);    // "5true", true becomes string "true" when combined with a string


// ==========================================
// 3. NULL AND UNDEFINED IN MATH
// ==========================================

console.log(1 + null);        // 1, null becomes 0 in numeric context
console.log(1 + undefined);   // NaN, undefined cannot convert to a usable number


// ==========================================
// 4. LOOSE EQUALITY (==) VS STRICT EQUALITY (===)
// ==========================================

// == compares values only, converts types automatically before comparing
// === compares both value and type, no conversion happens

console.log(5 == "5");     // true, "5" gets converted to number 5, then compared
console.log(5 === "5");    // false, different types (number vs string), so false immediately

console.log(0 == false);   // true, false becomes 0
console.log(0 === false);  // false, different types

console.log(null == undefined);   // true, JS treats these as equal specifically with ==
console.log(null === undefined);  // false, different types

console.log("" == 0);      // true, empty string converts to 0
console.log("" === 0);     // false, different types


// ==========================================
// 5. WEIRD COERCION CASES (KNOW THESE FOR INTERVIEWS)
// ==========================================

console.log([] == false);       // true, empty array converts to "" then to 0, false also becomes 0
console.log([] == "");          // true, empty array converts to empty string
console.log([1] == 1);          // true, array with one number converts to that number as string, then to number
console.log([1, 2] == "1,2");   // true, array converts to string "1,2" automatically

console.log(NaN == NaN);        // false, NaN is never equal to anything, even itself


// ==========================================
// 6. TRUTHY AND FALSY VALUES (used constantly in if conditions)
// ==========================================

// falsy values in JS, only these are falsy, everything else is truthy
// false, 0, "", null, undefined, NaN

if (0) {
  console.log("this will not run");
}
if ("") {
  console.log("this will not run");
}
if (null) {
  console.log("this will not run");
}
if (undefined) {
  console.log("this will not run");
}
if (NaN) {
  console.log("this will not run");
}

if ("0") {
  console.log("this WILL run, non-empty string is truthy even if it looks like zero");
}
if ([]) {
  console.log("this WILL run, empty array is truthy");
}
if ({}) {
  console.log("this WILL run, empty object is truthy");
}


// ==========================================
// 7. PRACTICAL BACKEND EXAMPLE WHERE THIS MATTERS
// ==========================================

// checking if a field was provided in request body
function validateInput(value) {
  // wrong way, this would treat 0 or empty string as "missing" incorrectly
  if (!value) {
    console.log("treated as missing, but this is misleading for 0 or empty string");
  }

  // better way, explicitly check for null or undefined
  if (value === null || value === undefined) {
    console.log("correctly identified as actually missing");
  }
}

validateInput(0);   // 0 is falsy, first check wrongly treats it as missing
validateInput("");  // empty string is falsy, first check wrongly treats it as missing
validateInput(null); // this is actually missing


// ==========================================
// 8. THE RULE OF THUMB
// ==========================================

// always use === and !== in real projects
// only use == when specifically comparing null and undefined together, like:
// if (value == null) covers both null and undefined in one check

function isEmpty(value) {
  return value == null; // this intentionally checks for both null and undefined
}

console.log(isEmpty(null));       // true
console.log(isEmpty(undefined));  // true
console.log(isEmpty(0));          // false, correctly not treated as empty
console.log(isEmpty(""));         // false, correctly not treated as empty