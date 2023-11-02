import { drag, drop, allowDrop } from "./draganddrop.js";

const addNumberToDisplay = (n) => {
  const divElement = document.createElement("div");
  divElement.id = `number${n}`;
  divElement.setAttribute("class", "drag");
  divElement.setAttribute("draggable", "true");
  divElement.setAttribute("ondragstart", "drag(event)");

  const labelElement = document.createElement("label");
  labelElement.setAttribute("class", "ordernumberblock");
  labelElement.innerHTML = n;

  document.getElementById("orderdisplay").appendChild(divElement);
  divElement.appendChild(labelElement);
};

const add = () => {
  const el = document.getElementById("numberinput");

  addNumberToDisplay(el.value);

  el.value = +el.value + 1;
};

const validateNumber = (event) => {
  const ev = event;
  const n = +ev.target.value;
  const lo = +ev.target.min;
  const hi = +ev.target.max;

  if (n <= lo) {
    ev.target.value = lo;
  } else if (n >= hi) {
    ev.target.value = hi;
  }
};

window.drag = drag;
window.drop = drop;
window.allowDrop = allowDrop;
window.add = add;
window.validateNumber = validateNumber;
