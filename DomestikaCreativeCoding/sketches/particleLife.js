const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = ({ context, width, height }) => {
  // Once executed script
  const a = width;

  return ({ context, width, height }) => {
    // Repeatedly executed script
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
