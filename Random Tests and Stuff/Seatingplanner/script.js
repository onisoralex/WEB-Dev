let personlist = [{ firstname: "Alexander", lastname: "Onisor", table: 1, seat: 4 }
  , { firstname: "Alexandra", lastname: "Onisor", table: 1, seat: 3 }
  , { firstname: "Nelu", lastname: "Onisor", table: 2, seat: 1 }
  , { firstname: "Lucia", lastname: "Onisor", table: 2, seat: 2 }
  , { firstname: "Raul", lastname: "Onisor", table: 3, seat: 1 }
  , { firstname: "Lavi", lastname: "Onisor", table: 3, seat: 2 }
  , { firstname: "Elisa", lastname: "Onisor", table: 3, seat: 3 }
  , { firstname: "Michi", lastname: "Pesel", table: 3, seat: 4 }
  , { firstname: "Lucia", lastname: "Toader", table: 2, seat: 3 }
  , { firstname: "Flaviu", lastname: "Toader", table: 2, seat: 4 }
  , { firstname: "Jenny", lastname: "Toader", table: 2, seat: 5 }
  , { firstname: "Olivia", lastname: "Toader", table: 2, seat: 6 }
  , { firstname: "Markus", lastname: "Tarau", table: 1, seat: 2 }
  , { firstname: "Laura", lastname: "Tarau", table: 1, seat: 1 }
  , { firstname: "Sergiu", lastname: "Salcau", table: 5, seat: 1 }];

let tables = [];

let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let plist = document.getElementById("personlistcontainer");

//Person Object Constructor
let Person = function (firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.table = 0;
  this.seat = 0;
}


//========================
//========= Code =========
//========================

// Adds a new person to the list of persons
function addNewPerson() {
  var f = firstname.value;
  var l = lastname.value;
  let nameError = document.getElementById("nameerror");

  if (f == "" || l == "") {
    nameError.innerHTML = `<span class="invalidname">INVALID NAME!</span>`;
  } else {
    nameError.innerHTML = "";

    personlist.push(new Person(f, l));
    firstname.value = "";
    lastname.value = "";
  }
  showPersonList();
}

// Deletes a person from the personlist based on the entry in the deletion ID textfield
function deletePerson() {
  let persontodeletefield = document.getElementById("personid");
  let idOfPersonToDelete = persontodeletefield.value - 1; // Subtract one, since the IDs internally start at 0

  if (isNaN(idOfPersonToDelete)
    || idOfPersonToDelete < 0
    || idOfPersonToDelete === ""
    || idOfPersonToDelete >= personlist.length) {
    // Checks if the entered ID is a valid one. Is used only when the deletion field is used
    persontodeletefield.value = "";
  } else {
    deletePersonById(idOfPersonToDelete);
  }

  persontodeletefield.value = "";
}

// Deletes a person from the personlist by the id in the table
function deletePersonById(id) {
  // Delete person only if it has no table assigned
  (personlist[id].table) ? {} : personlist.splice(id, 1);

  showPersonList();
}

//TODO
// Edit person in personlist
function editPerson() {

}

// Clicking on the button creates a link which can be clicked to download the file with all the settings
function saveAs(filename) {
  // let filename = document.getElementById("filename").value;
  let type = "text/plain";
  let downloadlink = document.getElementById("exportlink");

  let content = JSON.stringify(personlist);

  let theFile = new Blob([content], {
    type: type
  });
  downloadlink.href = URL.createObjectURL(theFile);
  downloadlink.download = filename;
}

// Displays a list of all pesons saved in the personlist Array
function showPersonList() {
  plist.innerHTML = ""; // Reset content of div

  let i = 0; // Initialize and reset iterator
  let list = `<table id="personlisttable" cellspacing="0px" class="tablebottom">
                <tr>
                  <th colspan="4">Personlist</th>
                </tr>
                <tr>
                  <th height="50">ID</th>
                  <th height="50">Firstname</th>
                  <th height="50">Lastname</th>
                  <th height="50">Delete?</th>
                </tr>`; // Create backbone of personlist table

  personlist.forEach(function (element, i) { // Create content of the persontable
    let entryid = `<td class="cell idcell">${i + 1}</td>`; // Display the ID + 1 in the personlist to be readable
    let firstname = `<td class="cell firstnamecell ">${element.firstname}</td>`;
    let lastname = `<td class="cell lastnamecell">${element.lastname}</td>`;
    let deletebutton = `<td class="cell deletebuttoncell">
                        <button class="delbtn" onclick="deletePersonById(${i})">
                        <i class="far fa-trash-alt">
                        </i></button></td>`;
    list += `<tr id="dnd-element-${i + 1}" draggable="true" ondragstart="drag(event)">${entryid}${firstname}${lastname}${deletebutton}</tr>`; // Create rows of table with entries and add them to list
  });

  list += "</table>"; // Finish personlisttable

  plist.innerHTML = list; // Fill the content of div container with personlisttable
}

// Prints the array to the console
function showPersonArray() {
  console.log(personlist);
}

// Import settings file
function openFile(event) {
  let reader = new FileReader(); // Create a new File Reader
  reader.onload = function () {
    personlist = JSON.parse(reader.result); // Creates the function that gets the contents from the file and fills the personlist with it
    showPersonList();
  };
  let input = event.target; // Takes Information from the HTML that executed this Script, to get the file(s) that were selected in the file selector
  reader.readAsText(input.files[0]); // Reads first File from Array, loads it
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  // Get the data to be transferred
  var data = ev.dataTransfer.getData("text");
  var target = ev.target; // Set the variable for finding the first actually valid target

  // If the actual target is not a valid drop location, search for one on the parent node.
  // Repeat until a valid drop location is found
  while (target.getAttribute("ondrop") != "drop(event)") {
    // Set the parent node as the new target
    target = target.parentNode;
  }

  // Get the element that has to be transferred and append it to the bottom of the list of child elements of the actually valid target
  target.appendChild(document.getElementById(data));
}
