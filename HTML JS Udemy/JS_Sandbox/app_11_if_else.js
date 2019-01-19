const id = 100;

////EQUAL TO
//if (id == 100) {
//  console.log('correct');
//} else {
//  console.log('incorrect');
//}
//
////NOT WQUAL TO
//if (id != 101) {
//  console.log('correct');
//} else {
//  console.log('incorrect');
//}
//
////EQUAL TO VALUE & TYPE
//if (id === 100) {
//  console.log('correct');
//} else {
//  console.log('incorrect');
//}
//
////EQUAL TO VALUE & TYPE
//if (id !== 100) {
//  console.log('correct');
//} else {
//  console.log('incorrect');
//}

////Text  if undefined
//if (typeof id !== 'undefined') {
//  console.log(`The ID = ${id}`);
//} else {
//  console.log('NO ID');
//}

////Greater or less than
//if (id < 100) {
//  console.log('CORRECT');
//} else {
//  console.log('INCORRECT');
//}

const color = 'yellow';

//if (color === 'red') {
//  console.log('Color is red');
//} else if (color === 'blue') {
//  console.log('Color is blue');
//} else {
//  console.log('Color is not red or blue');
//}

const name = 'Steve';
const age = 15;

//AND &&
if (age > 0 && age < 12) {
  console.log(`${name} is a child`);
} else if (age >= 13 && age <= 19) {
  console.log(`${name} is a teenager`);
} else {
  console.log(`${name} is an adult`);
}

//OR ||
if (age < 16 || age > 65) {
  console.log(`${name} cannot run in race`);
} else {
  console.log(`${name} is registered for the race`);
}

//TERNARY OPERATOR
console.log(id === 100 ? 'correct' : 'incorrect');

//Without Braces
if (id === 100)
  console.log('correct');
else
  console.log('incorrect');