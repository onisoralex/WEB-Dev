function Calculator() {
  this.num1 = null;
  this.num2 = null;
  this.op = null;
  this.res = null;
}

Calculator.prototype.calc = function (num1x, num2x, opx) {
  //Zuweisung der übergebene Variablen an das Objekt
  this.num1 = num1x;
  this.num2 = num2x;
  this.op = opx;

  //Abfrage, welche Operation durchgeführt werden soll
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

addition = function () {
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