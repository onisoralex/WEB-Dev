// Save the data of that element
const drag = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
};

// Make an element ready for drop
const allowDrop = (ev) => {
  ev.preventDefault();
};

// Execute the drop
const drop = (ev) => {
  ev.preventDefault();
  // Get the data to be transferred
  const data = ev.dataTransfer.getData("text");
  let { target } = ev; // Set the variable for finding the first actually valid target

  // If the actual target is not a valid drop location, search for one on the parent node.
  // Repeat until a valid drop location is found
  while (target.getAttribute("ondrop") !== "drop(event)") {
    // Set the parent node as the new target
    target = target.parentNode;
  }

  document.getElementById(data).remove();
};

export { drag, drop, allowDrop };
