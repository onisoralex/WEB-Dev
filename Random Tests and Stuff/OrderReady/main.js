import * as dnd from "./draganddrop.js";

const addNumberToDisplay = (n) => {
  document.getElementById("orderdisplay").innerHTML += `<div id="number${n}" class="drag" draggable="true" ondragstart="drag(event)" ondblclick="deleteThisElement(event)"><label class="ordernumber">${n}</label></div>`;
};

const add = () => {
  const el = document.getElementById("numberinput");
  if ((+el.value < +el.min) || (+el.value > +el.max)) el.value = +el.min;
  addNumberToDisplay(el.value);

  el.value = ((+el.value + 1) > +el.max) ? +el.min : +el.value + 1;
};

const deleteFirstNumber = () => document.getElementById("orderdisplay").firstChild.remove();

const deleteThisElement = (event) => event.target.parentElement.remove();

window.drag = dnd.drag;
window.drop = dnd.drop;
window.allowDrop = dnd.allowDrop;
window.stopBounce = dnd.stopBounce;
window.add = add;
window.deleteFirstNumber = deleteFirstNumber;
window.deleteThisElement = deleteThisElement;
