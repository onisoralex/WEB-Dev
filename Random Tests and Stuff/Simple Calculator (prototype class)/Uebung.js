const c = new Calculator();
const finish = false;
let num1;
let num2;
let op;

c.setNumbers(1, 2);
c.setOperator("+");
console.log(c.calc());

c.setNumbers(1, 2);
c.setOperator("-");
console.log(c.calc());

c.setNumbers(5, 3);
c.setOperator("*");
console.log(c.calc());

c.setNumbers(7, 2);
c.setOperator("/");
console.log(c.calc());

c.setNumbers(5, 0);
c.setOperator("/");
console.log(c.calc());

const c2 = new Calculator();
c2.setOperator("/");
console.log(c2.calc());
