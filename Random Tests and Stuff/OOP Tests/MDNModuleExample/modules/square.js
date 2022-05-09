const name = "square";

function draw(ctx, length, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);

  return {
    length,
    x,
    y,
    color,
  };
}

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function reportArea(length, listId) {
  const listItem = document.createElement("li");
  listItem.textContent = `${name} area is ${length * length}px squared.`;

  const list = document.getElementById(listId);
  list.appendChild(listItem);
}

function reportPerimeter(length, listId) {
  const listItem = document.createElement("li");
  listItem.textContent = `${name} perimeter is ${length * 4}px.`;

  const list = document.getElementById(listId);
  list.appendChild(listItem);
}

function randomSquare(ctx) {
  const color1 = random(0, 255);
  const color2 = random(0, 255);
  const color3 = random(0, 255);
  const color = `rgb(${color1},${color2},${color3})`;
  ctx.fillStyle = color;

  const x = random(0, 480);
  const y = random(0, 320);
  const length = random(10, 100);
  ctx.fillRect(x, y, length, length);

  return {
    length,
    x,
    y,
    color,
  };
}

export {
  name, draw, reportArea, reportPerimeter,
};
export default randomSquare;
