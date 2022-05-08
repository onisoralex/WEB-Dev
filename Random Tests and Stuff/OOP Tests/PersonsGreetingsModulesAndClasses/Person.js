class Person {
  constructor(name) {
    this.myGreeting = `Hello, My name is ${name}!`;
  }

  greet() {
    return this.myGreeting;
  }
}

export { Person as default };
