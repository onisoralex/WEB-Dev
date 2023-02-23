const canvas = document.querySelector("#canv");
const c = canvas.getContext("2d");
c.fillStyle = "blue";
// c.fillRect(100, 100, 400, 400);

c.lineWidth = 4;
c.beginPath();
c.rect(100, 100, 400, 400);
// c.stroke();

c.beginPath();
c.arc(300, 300, 100, 0, Math.PI * 2);
// c.stroke();

const width = 60;
const height = 60;
const gap = 20;
let x; let y;

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    x = 100 + (width + gap) * i;
    y = 100 + (height + gap) * j;

    c.beginPath();
    c.rect(x, y, width, height);
    c.stroke();
    if (Math.random() > 0.5) {
      c.beginPath();
      c.rect(x + 8, y + 8, width - 16, height - 16);
      c.stroke();
    }
  }
}
