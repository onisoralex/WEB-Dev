function Calculator() {
  this.num1 = null;
  this.num2 = null;
  this.op = null;
  this.res = null;

  // Assigning of numbers to calculator
  this.setNumbers = (num1, num2) => {
    this.num1 = num1;
    this.num2 = num2;
  };

  // Assigning of operator to calculator
  this.setOperator = (op) => {
    this.op = op;
  };

  this.calc = () => {
    // Evaluate the operator to use
    switch (this.op) {
      case "+":
        return this.addition();
      case "-":
        return this.subtraction();
      case "*":
        return this.multiplication();
      case "/":
        return (this.num2 !== 0) ? this.division() : "DIVISION BY 0!";
      default:
        return this.errorInvalidOperator();
    }
  };

  // Return the value of addition of the numbers
  this.addition = () => {
    this.res = this.num1 + this.num2;
    return `${this.num1} + ${this.num2} = ${this.res}`;
  };

  // Return the value of subtraction of the numbers
  this.subtraction = () => {
    this.res = this.num1 - this.num2;
    return `${this.num1} - ${this.num2} = ${this.res}`;
  };

  // Return the value of multiplication of the numbers
  this.multiplication = () => {
    this.res = this.num1 * this.num2;
    return `${this.num1} * ${this.num2} = ${this.res}`;
  };

  // Return the value of division of the numbers
  this.division = () => {
    this.res = this.num1 / this.num2;
    return `${this.num1} / ${this.num2} = ${this.res}`;
  };

  // Return the the exception, when the operator is not one of the 4
  this.errorInvalidOperator = () => "Your operator is invalid!";
}
