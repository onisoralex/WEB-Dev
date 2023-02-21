/**
 * This is a proof of concept, to show some values of following math statement:
 * Let a and b be positive integers such that ab + 1 divides a2 + b2. Show that
 * a2 + b2 / ab + 1 is the square of an integer.
 */

const pow2 = (x) => x * x;
const roundPrecision = (n, p) => Math.round(n * 100).toFixed(p);

let res;
const iMax = 10000;
const jMax = 10000; // MAX: 46340, because int can only have that number safely squared (a^2 or b^2)
let aPow2;
let part1; // This one can potentially go over int (a^2 + b^2)
let part2;
const precision = 12;
let num = 0;

for (let a = 1; a < iMax; a++) {
  aPow2 = pow2(a);

  for (let b = a; b < jMax; b++) {
    part1 = aPow2 + pow2(b);
    part2 = (a * b) + 1;

    res = roundPrecision(part1 / part2, precision);

    if (res % 1 <= 0) { // Questionable if modulo is the right one here original was "res.scale <= 00"
      num++;
      console.log(`a = ${a}, b = ${b}, Result = ${res}`);
    }
  }
}
console.log(`Numbers calculated: ${num}`);
