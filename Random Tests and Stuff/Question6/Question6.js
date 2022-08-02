/**
 * This is a proof of concept, to show some values of following math statement:
 * Let a and b be positive integers such that ab + 1 divides a2 + b2. Show that
 * a2 + b2 / ab + 1 is the square of an integer.
 */

let pow2 = (x) => x * x;
let round_precision = (n, p) => Math.round(n * 100).toFixedp(p);

let res;
let iMax = 10000;
let jMax = 10000; // MAX: 46340, because int can only have that number safely squared (a^2 or b^2)
let a_pow_2;
let part_1; // This one can potentially go over int (a^2 + b^2)
let part_2;
let precision = 12;
let num = 0;

for (let a = 1; a < iMax; a++) {
    a_pow_2 = pow2(a);

    for (let b = a; b < jMax; b++) {
        part_1 = a_pow_2 + pow2(b);
        part_2 = (a * b) + 1;

        res = round_precision(part_1  /part_2, precision);

        if (res % 1 <= 0) { // Questionable if modulo is the right one here original was "res.scale <= 00"
            num++;
            console.log("a = " + a + ", b = " + b + ", Result = " + res);
        }
    }
}
 console.log("Numbers calculated: " + num); 
