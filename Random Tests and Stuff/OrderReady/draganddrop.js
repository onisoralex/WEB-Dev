const drag = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
};

const allowDrop = (ev) => {
  document.getElementById("trashbinicon").classList.add("fa-beat");
  ev.preventDefault();
};

const stopBounce = () => {
  document.getElementById("trashbinicon").classList.remove("fa-beat");
};

const drop = (ev) => {
  document.getElementById("trashbinicon").classList.remove("fa-beat");
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  let { target } = ev;

  while (target.getAttribute("ondrop") !== "dnd.drop(event)") {
    target = target.parentNode;
  }

  document.getElementById(data).remove();
};

export {
  drag,
  drop,
  allowDrop,
  stopBounce,
};
