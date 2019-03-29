let personlist = [];
let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let plist = document.getElementById("list");

//Person Object Constructor
function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.mature = true;
}

// Adds a new person to the list of persons
function addNewPerson() {
  personlist.push(new Person(firstname.value, lastname.value));
  firstname.value = "";
  lastname.value = "";

  showPersonList();
}

// Deletes a person from the personlist
function deletePerson() {
  let personToDelete = document.getElementById("personid");

  console.log("going to delete person: " + personToDelete);

  personlist.splice(personToDelete, 1);

  showPersonList();
}

//TODO
// Edit person in personlist
function editPerson() {

}

// Clicking on the button creates a link which can be clicked to download the file with all the settings
function saveas() {
  let filename = document.getElementById("filename").value;
  let type = "text/plain";
  let downloadlink = document.getElementById("exportlink");

  let content = JSON.stringify(personlist);;

  let theFile = new Blob([content], { type: type });
  downloadlink.href = URL.createObjectURL(theFile);
  downloadlink.download = filename;
}

// Displays a list of all pesons saved in the personlist Array
function showPersonList() {
  let list = "";
  plist.innerHTML = "";

  personlist.forEach(element => {
    list += `<tr><td>${element.firstname}</td><td>${element.lastname}</td></tr>`;
  });

  plist.innerHTML = list;
}

// Prints the array to the console
function showPersonArray() {
  console.log(personlist);
}