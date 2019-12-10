import { Person } from "./Person.js";
import { p } from "./mockdata.js";
let personlist = p;
import { allowDrop, drag, drop } from "./DragNDrop.js";
window.allowDrop = allowDrop;
window.drag = drag;
window.drop = drop;

let tablelist = [];
let firstname = "";
let lastname;
let plist;

window.init = () => {
  firstname = document.getElementById("firstname");
  lastname = document.getElementById("lastname");
  plist = document.getElementById("personlistcontainer");
}


//========================
//========= Code =========
//========================

// Adds a new person to the list of persons
window.addNewPerson = () => {
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
window.deletePerson = () => {
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
window.deletePersonById = (id) => {
  (personlist[id].table) ? {} : personlist.splice(id, 1); // Delete person only if it has no table assigned

  showPersonList();
}

//TODO
// Edit person in personlist
function editPerson() {

}

// Clicking on the button creates a link which can be clicked to download the file with all the settings
window.saveAs = (filename) => {
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
window.showPersonList = () => {
  plist.innerHTML = ""; // Reset content of div

  let i = 0; // Initialize and reset iterator
  let list = `<table id="personlisttable" cellspacing="0px" class="tablebottom">
                <tr>
                  <td class="tablenamecell" colspan="4"><h3>Personlist</h3></td>
                </tr>
                <tr>
                  <th>ID</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Delete?</th>
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

function addNewTable() {

}

function showTableList() {
  plist.innerHTML = ""; // Reset content of div

  let i = 0; // Initialize and reset iterator
  let list = `<table id="personlisttable" cellspacing="0px" class="tablebottom">
                <tr>
                  <td class="tablenamecell" colspan="4"><h3>Personlist</h3></td>
                </tr>
                <tr>
                  <th>ID</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Delete?</th>
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

// Import settings file
window.openFile = (event) => {
  let reader = new FileReader(); // Create a new File Reader
  reader.onload = function () {
    personlist = JSON.parse(reader.result); // Creates the function that gets the contents from the file and fills the personlist with it
    showPersonList();
  };
  let input = event.target; // Takes Information from the HTML that executed this Script, to get the file(s) that were selected in the file selector
  reader.readAsText(input.files[0]); // Reads first File from Array, loads it
}