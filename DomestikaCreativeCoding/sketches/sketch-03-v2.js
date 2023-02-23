import * as math from "../../../MyLibraries/math.js";
import * as random from "../../../MyLibraries/random.js";
import Agent from "./sketch-03-classes/Agent.js";

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const animate = () => {
  console.log("domestika");
  requestAnimationFrame(animate); // Every time the browser is ready to animate a frame it willl call this function.
};
// animate();

const sketch = ({ context, width, height }) => {
  // One executed part
  const agents = [];

  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    // Repeatingly executed part (c. 60fps)
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > 200) continue; // Skip to the next iteration if true

        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.wrap(width, height);
    });
  };
};

canvasSketch(sketch, settings);
