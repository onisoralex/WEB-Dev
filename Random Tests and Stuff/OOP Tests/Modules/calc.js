import * as n from "./number.js";

let a = n.a; // Primitive passed by value
let b = n.b; // Object passed by reference
// Changing of the reference not possible. The import variable is a const, so changing it won't work, but the content of objects will be changeable, since the reference wasn't changed

a += 1; // Only local variable is changed
b.num += 1; // Through reference thhe original value in the module is changed

// n.a += 1; // This doesn't work. Modifies the primitive of the original module
n.b.num += 1; // Modifies also the object through reference

export { a, b };