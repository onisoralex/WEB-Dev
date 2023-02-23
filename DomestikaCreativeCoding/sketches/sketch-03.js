import * as math from "../../MyLibraries/math.js";
import * as random from "../../MyLibraries/random.js";
import Dot from "./sketch-03-classes/Dot.js";

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const animate = () => {
  console.log("domestika");
  requestAnimationFrame(animate); // Every time the browser is ready to animate a frame it will call this function.
};
// animate();

const sketch = ({ context, width, height }) => {
  // One executed part
  const dots = [];
  const boundary = "wrap";
  const maxDistance = 200;

  // Create an array of dots
  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    dots.push(new Dot(x, y));
  }

  return ({ context, width, height }) => {
    // Repeatingly executed part (c. 60fps)
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    dots.forEach((dot, i) => {
      for (let j = i + 1; j < dots.length; j++) {
        const other = dots[j];
        const dist = dot.pos.getDistance(other.pos);

        if (dist < maxDistance) {
          context.lineWidth = math.mapRange(dist, 0, maxDistance, 8, 0.01);

          context.beginPath();
          context.moveTo(dot.pos.x, dot.pos.y);
          context.lineTo(other.pos.x, other.pos.y);
          context.stroke();
        }
      }
    });

    dots.forEach((dot) => {
      dot.update();
      dot.draw(context);
      if (boundary === "wrap") dot.wrap(width, height);
      if (boundary === "bounce") dot.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);
