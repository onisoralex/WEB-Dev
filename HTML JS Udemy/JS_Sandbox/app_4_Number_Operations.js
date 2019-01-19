let val;

//Number to string
val = 5;
val = String(555);
val = String(4+4);
//Bool to String
val = String(true);
//Date to String
val = String(new Date());
//Array to String
val = String([1,2,3,4]);

//toString()
val = (5).toString();
val = (true).toString();

//String to number
val = Number('5');
val = Number(true);
val = Number(false);
val = Number(null);
val = Number('hello');
val = Number([1,2,3,4]);

val = parseInt('100.30');
val = parseFloat('100.30');

//Output
//console.log(val);
//console.log(typeof val);
//console.log(val.length);
//console.log(val.toFixed(2)); //The 2 shows 2 numbers after the decimal, even if they're zeros

const val1 = String('5');
const val2 = 6;
const sum = Number(val1 + val2); //val2 was converted to String and concatenated to val1. Then the result is converted to a number
console.log(sum);
console.log(typeof sum);