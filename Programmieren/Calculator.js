function Calculator() {
  this.num1 = null;
  this.num2 = null;
  this.op = null;
  this.res = null;

  // Assigning of numbers to calculator
  this.setNumbers = function (num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
  }

  // Assigning of operator to calculator
  this.setOperator = function (op) {
    this.op = op;
  }

  this.calc = function () {
    // Evaluate the operator to use
    switch (this.op) {
      case "+":
        return this.addition();
        break;
      case "-":
        return this.subtraction();
        break;
      case "*":
        return this.multiplication();
        break;
      case "/":
        if (this.num2 !== 0) {
          return this.division();
        } else {
          return "DIVISION BY 0!";
        }
        break;
      default:
        return this.errorInvalidOperator();
        break;
    }

    // if (this.op === "+") {
    //   return this.addition();
    // } else if (this.op === "-") {
    //   return this.subtraction();
    // } else if (this.op === "*") {
    //   return this.multiplication();
    // } else if (this.op === "/") {
    //   if (this.num2 !== 0) {
    //     return this.division();
    //   } else {
    //     return "DIVISION BY 0!";
    //   }
    // } else {
    //   return this.errorInvalidOperator();
    // }
  }

  // Return the value of addition of the numbers
  this.addition = function () {
    this.res = this.num1 + this.num2;
    return `${this.num1} + ${this.num2} = ${this.res}`;
  }

  // Return the value of subtraction of the numbers
  this.subtraction = function () {
    this.res = this.num1 - this.num2;
    return `${this.num1} - ${this.num2} = ${this.res}`;
  }

  // Return the value of multiplication of the numbers
  this.multiplication = function () {
    this.res = this.num1 * this.num2;
    return `${this.num1} * ${this.num2} = ${this.res}`;
  }

  // Return the value of division of the numbers
  this.division = function () {
    this.res = this.num1 / this.num2;
    return `${this.num1} / ${this.num2} = ${this.res}`;
  }

  // Return the the exception, when the operator is not one of the 4
  this.errorInvalidOperator = function () {
    return "Your operator is invalid!"
  }
}