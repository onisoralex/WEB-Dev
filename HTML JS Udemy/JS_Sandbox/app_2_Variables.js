//var, let, const; var is global, let is for a specific block
var name = 'John Doe';
console.log(name);
name = 'Steve';
console.log(name);

//init var
var greeting;
console.log(greeting);
greeting = 'Hello';
console.log(greeting);

//Variable name can have letters, numbers, _, $
//Cannot start with number

//Multi word vars
var firstName = 'John'; //Camel case
var first_name = 'Sarah'; //Underscore
var FirstName = 'Tom'; //Pascal case
var firstname; //not recomended

//LET
let name2 = 'John Doe';
console.log(name2);
name2 = 'Steve';
console.log(name2);

//CONST
const name3 = 'John';
console.log(name3);
//Can not rassign
//name3 = 'Sarah';
//Have to asign a value
//const greeting;

const person = {
    name: 'John',
    age: 30
}

person.name = 'Sarah';
person.age = 32;

//console.log(person);

const numbers = [1,2,3,4,5];
numbers.push[6];
console.log(numbers);