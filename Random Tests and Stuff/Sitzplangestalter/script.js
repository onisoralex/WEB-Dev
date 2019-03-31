let personlist = [{ firstname: "Alexander", lastname: "Onisor" }
  , { firstname: "Alexandra", lastname: "Onisor" }
  , { firstname: "Nelu", lastname: "Onisor" }
  , { firstname: "Lucia", lastname: "Onisor" }
  , { firstname: "Raul", lastname: "Onisor" }
  , { firstname: "Lavi", lastname: "Onisor" }
  , { firstname: "Elisa", lastname: "Onisor" }
  , { firstname: "Michi", lastname: "Pesel" }
  , { firstname: "Lucia", lastname: "Toader" }
  , { firstname: "Flaviu", lastname: "Toader" }
  , { firstname: "Jenny", lastname: "Toader" }
  , { firstname: "Olivia", lastname: "Toader" }
  , { firstname: "Markus", lastname: "Tarau" }
  , { firstname: "Laura", lastname: "Tarau" }
  , { firstname: "Sergiu", lastname: "Salcau" }];
let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let plist = document.getElementById("personlisttable");

//Person Object Constructor
let Person = function (firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}


//========================
//========= Code =========
//========================

// Adds a new person to the list of persons
function addNewPerson() {
  var f = firstname.value;
  var l = lastname.value;

  if (f == "" || l == "") {
    document.getElementById("notsavedlabel").innerHTML = `<span style="background-color: Tomato; color: white;">NOT SAVED!</span>`;
  } else {
    document.getElementById("notsavedlabel").innerHTML = "";

    personlist.push(new Person(f, l));
    firstname.value = "";
    lastname.value = "";
  }
  showPersonList();
}

// Deletes a person from the personlist based on the entrfy in the deletion id textfield
function deletePerson() {
  let persontodeletefield = document.getElementById("personid");
  let personToDelete = persontodeletefield.value - 1; // Subtract one, since the IDs internally start at 0

  if (personToDelete == "" || personToDelete >= personlist.length) { } else {
    deletePersonById(personToDelete);
  }

  persontodeletefield.value = "";
}

// Deletes a person from the personlist by the id in the table
function deletePersonById(id) {
  personlist.splice(id, 1);

  showPersonList();
}

//TODO
// Edit person in personlist
function editPerson() {

}

// Clicking on the button creates a link which can be clicked to download the file with all the settings
function saveAs() {
  let filename = document.getElementById("filename").value;
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
  let list = "";
  plist.innerHTML = "";
  let i = 0;

  personlist.forEach(function (element, i) {
    let entryid = `<td>${i + 1}</td>`;
    let firstname = `<td>${element.firstname}</td>`;
    let lastname = `<td>${element.lastname}</td>`;
    let deletebutton = `<td><input type="button" onclick="deletePersonById(${i})" value="Delete"></td>`;
    list += `<tr style="border: 1px solid black">${entryid}${firstname}${lastname}${deletebutton}</tr>`;
  });

  plist.innerHTML = list;
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
