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
