import Person from "./Person.js";

const group = [];
let groupGreetings = "";
const output = document.getElementById("output");
const namefield = document.getElementById("namefield");

window.addPersonToGroup = () => {
  const name = namefield.value;
  if (name === "") {
    output.innerHTML = "";
    output.innerHTML = "<span style=\"color: white; background-color: Tomato\"><b>Enter a valid name!</b></span>";
  } else {
    const personInstance = new Person(name);
    group.push(personInstance);
    namefield.value = "";
  }
};

window.groupGreeting = () => {
  // Empty the groupGreeting before adding the group
  groupGreetings = "";

  for (let i = 0; i < group.length; i++) {
    groupGreetings += `${group[i].myGreeting}<br>`;
  }
  output.innerHTML = "";
  output.innerHTML = groupGreetings;
};
