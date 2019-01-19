function Calculator() {
  this.num1 = null;
  this.num2 = null;
  this.op = null;
  this.res = null;

  //Zuweisung der übergebenen Zahlen an das Objekt
  this.setNumbers = function (num1x, num2x) {
    this.num1 = num1x;
    this.num2 = num2x;
  }

  //Zuweisung des übergebenen Operators an das Objekt
  this.setOperator = function (opx) {
    this.op = opx;
  }

  this.calc = function () {
    //Abfrage, welche Operation durchgeführt werden soll
    if (this.op === "+") {
      return this.addition();
    } else if (this.op === "-") {
      return this.subtraction();
    } else if (this.op === "*") {
      return this.multiplication();
    } else if (this.op === "/") {
      if (this.num2 !== 0) {
        return this.division();
      } else {
        return "DIVISION BY 0!";
      }
    } else {
      return this.errorInvalidOperator();
    }
  }

  this.addition = function () {
    this.res = this.num1 + this.num2;
    return `${this.num1} + ${this.num2} = ${this.res}`;
  }

  this.subtraction = function () {
    this.res = this.num1 - this.num2;
    return `${this.num1} - ${this.num2} = ${this.res}`;
  }

  this.multiplication = function () {
    this.res = this.num1 * this.num2;
    return `${this.num1} * ${this.num2} = ${this.res}`;
  }

  this.division = function () {
    this.res = this.num1 / this.num2;
    return `${this.num1} / ${this.num2} = ${this.res}`;
  }

  this.errorInvalidOperator = function () {
    return "Your operator is invalid!"
  }
}