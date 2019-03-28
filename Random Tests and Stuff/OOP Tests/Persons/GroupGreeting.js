let group = [];
let groupgreetings = "";
let output = document.getElementById("output");
let namefield = document.getElementById("namefield");
import person from "./Person";

function addPersonToGroup() {
  let name = namefield.value;
  if (name == "") {
    output.innerHTML = "";
    output.innerHTML = "<span style=\"color: white; background-color: Tomato\"><b>Enter a valid name!</b></span>";
  } else {
    var personInstance = new person(name);
    group.push(personInstance);
    namefield.value = "";
  }
}

function groupGreeting() {
  // Empty the groupgreeting before adding the group
  groupgreetings = "";

  for (let i = 0; i < group.length; i++) {
    groupgreetings += group[i].greeting + "<br>";
  }
  output.innerHTML = "";
  output.innerHTML = groupgreetings;
}

function greetOneByOne() {
  for (let i = 0; i < group.length; i++) {
    group[i].greet();
  }
}