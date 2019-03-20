function Calculator_OOP() {
  this.num1 = null;
  this.num2 = null;
  this.op = null;
  this.res = null;
}

Calculator_OOP.prototype.calc = function (num1, num2, op) {
  // Assigning of variables to calculator
  this.num1 = num1;
  this.num2 = num2;
  this.op = op;

  // Evaluate the operator to use
  if (this.op === "+") {
    return addition();
  } else if (this.op === "-") {
    return subtraction();
  } else if (this.op === "*") {
    return multiplication();
  } else if (this.op === "/") {
    if (this.num2 !== 0) {
      return division();
    }
  } else {
    return errorInvalidOperator();
  }
}

Calculator_OOP.prototype.calc.addition = function () {
  this.res = this.num1 + this.num2;
  return `${this.num1} + ${this.num2} = ${this.res}`;
}

subtraction = function () {
  this.res = this.num1 - this.num2;
  return `${this.num1} - ${this.num2} = ${this.res}`;
}

multiplication = function () {
  this.res = this.num1 * this.num2;
  return `${this.num1} * ${this.num2} = ${this.res}`;
}

division = function () {
  this.res = this.num1 / this.num2;
  return `${this.num1} / ${this.num2} = ${this.res}`;
}

errorInvalidOperator = function () {
  return "Your operator is invalid!"
}