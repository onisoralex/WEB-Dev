function Calculator_OOP() {
  this.num1 = null;
  this.num2 = null;
  this.op = null;
  this.res = null;
}

Calculator_OOP.prototype.calc = (num1, num2, op) => {
  // Assigning of variables to calculator
  this.num1 = num1;
  this.num2 = num2;
  this.op = op;

  // Evaluate the operator to use
  if (this.op === "+") return this.calc.addition();
  if (this.op === "-") return this.calc.subtraction();
  if (this.op === "*") return this.calc.multiplication();
  if (this.op === "/"
  && this.num2 !== 0) return this.calc.division();

  return this.errorInvalidOperator();
};

Calculator_OOP.prototype.calc.addition = () => {
  this.res = this.num1 + this.num2;
  return `${this.num1} + ${this.num2} = ${this.res}`;
};

Calculator_OOP.prototype.calc.subtraction = () => {
  this.res = this.num1 - this.num2;
  return `${this.num1} - ${this.num2} = ${this.res}`;
};

Calculator_OOP.prototype.calc.multiplication = () => {
  this.res = this.num1 * this.num2;
  return `${this.num1} * ${this.num2} = ${this.res}`;
};

Calculator_OOP.prototype.calc.division = () => {
  this.res = this.num1 / this.num2;
  return `${this.num1} / ${this.num2} = ${this.res}`;
};

Calculator_OOP.prototype.errorInvalidOperator = () => "Your operator is invalid!";
