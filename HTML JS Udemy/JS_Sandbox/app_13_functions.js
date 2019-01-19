//Function Declarations
function greet(firstname, lastname) {
//  typeof firstname === 'undefined' ? firstname = 'John' : firstname = firstname;
//  typeof lastname === 'undefined' ? lastname = 'Doe' : lastname = lastname;
  //console.log('Hello');
  return 'Hello ' + firstname + ' ' + lastname;
}

//console.log(greet());

//Function Expression

const square = function (x = 3) {
  return x * x;
};

//console.log(square());

//Immediately invocable function expressions - IIFEs

//(function () {
//  console.log('IIFE Ran..');
//})();

//(function (name) {
//  console.log('Hello ' + name);
//})('Brad');

//Property Methods

const todo = {
  add: function () {
    console.log('Add todo..');
  },
  edit: function (id) {
    console.log(`Edit todo ${id}`);
  }
}

todo.delete = function () {
  console.log('Delete todo...');
}

todo.add();
todo.edit(22);
todo.delete();