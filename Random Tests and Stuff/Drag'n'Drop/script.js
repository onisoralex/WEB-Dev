function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  console.log("event:", ev);

  if (ev.target.classList.contains("nondrop")) {
    ev.target.insertAdjacentHTML(document.getElementById(data));
  } else {
    ev.target.appendChild(document.getElementById(data));
  }
}
