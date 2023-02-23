const m = document.getElementById("life").getContext("2d");
// let init=()=>{
//   m = document.getElementById("life").getContext("2d");
// }

const drawParticle = (posX, posY, color, radius) => {
  m.beginPath();
  m.fillStyle = color;
  m.arc(posX, posY, radius / 2, 0, 2 * Math.PI, false);
  m.fill();
};

const particles = [];
const particle = (x, y, c) => ({
  x, y, vx: 0, vy: 0, color: c,
});

const random = () => Math.random() * 400 + 50;

const create = (number, color) => {
  const group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), color));
    particles.push(group[i]);
  }
  return group;
};

const rule = (particles1, particles2, g) => {
  for (let i = 0; i < particles1.length; i++) {
    let fx = 0;
    let fy = 0;
    let a;
    let b;
    for (let j = 0; j < particles2.length; j++) {
      a = particles1[i];
      b = particles2[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      // Makes the attraction only valid for close distances
      if (d > 0 && d < 80) {
        const F = g / d;
        fx += F * dx;
        fy += F * dy;
      }
    }
    // Acceleration of attraction, modified by some mystery value that stabilizes the whole movement
    a.vx = (a.vx + fx) * 0.5;
    a.vy = (a.vy + fy) * 0.5;

    // Updating position
    a.x += a.vx;
    a.y += a.vy;

    // Bouncing at screen boundary
    if (a.x <= 0 || a.x >= 500) a.vx *= -1;
    if (a.y <= 0 || a.y >= 500) a.vy *= -1;
  }
};

const yellow = create(200, "yellow");
const red = create(200, "red");
const green = create(200, "green");

const update = () => {
  rule(green, green, -0.32);
  rule(green, red, -0.17);
  rule(green, yellow, 0.34);
  rule(red, red, -0.1);
  rule(red, green, -0.34);
  rule(yellow, yellow, 0.15);
  rule(yellow, green, -0.2);
  m.clearRect(0, 0, 500, 500);
  for (let i = 0; i < particles.length; i++) {
    drawParticle(particles[i].x, particles[i].y, particles[i].color, 5);
  }
  requestAnimationFrame(update);
};

update();
