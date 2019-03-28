let Person = (function (name) {
  let myGreeting = "Hello, My name is " + name + "!";

  let iGreet = function () {
    console.log(myGreeting);
  }

  return {
    greeting: myGreeting,
    greet: iGreet
  }
}());

module.exports = Person;