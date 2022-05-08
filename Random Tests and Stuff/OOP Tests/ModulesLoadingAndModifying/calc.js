import * as numbers from "./number.js";

let aValue = numbers.a; // Primitive passed by value
const bValue = numbers.b; // Object passed by reference
// Changing of the reference (of numbers) not possible. The import variable (numbers) is a const, so changing it won't work, but the content of objects will be changeable, since the reference wasn't changed

aValue += 1; // Only local variable is changed
bValue.num += 1; // Through reference the original value in the module is changed
const bvalueNum = bValue.num; // Primitive passed by value, thus remains unchanged laer on

// numbers.a += 1; // This doesn't work. Modifies the primitive of the original module
numbers.b.num += 1; // Modifies also the original object through reference, but more direct

export { aValue as a, bValue as b, bvalueNum as bNum };
