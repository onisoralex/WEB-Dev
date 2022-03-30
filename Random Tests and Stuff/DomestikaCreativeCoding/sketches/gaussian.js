const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const Tweakpane = require("tweakpane");

const randomRange = (min, max) => Math.random() * (max - min) + min;

const getRandomRangeArray = (n, min, max) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(randomRange(min, max));
  }
  return arr;
};

const drawLine = (c, tx, ty, bx, by, ex, ey, lw) => {
  const context = c;
  context.save();
  context.translate(tx, ty);
  context.beginPath();
  context.lineWidth = lw;
  context.moveTo(bx, by);
  context.lineTo(ex, ey);
  context.stroke();
  context.restore();
};

const fx = (x) => x * x * x;

const params = {
  gaussian: false,
  animate: true,
  lineCap: "butt",
  background: "#000000",
  graphColor: "#ffffff",
  plotColor: "#ffffff",
  xOffset: 0.5,
  yOffset: 0.5,
  xGraphAxisMarkingsAmmount: 10,
  yGraphAxisMarkingsAmmount: 10,
  markingLength: 0.01,
  precision: 1,
};

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({
  update, togglePlay,
}) => {
  // Create all random values so they aren't created anew every frame
  const scaleXArr = getRandomRangeArray(params.maxNumOfElements, 0.1, 2);
  const scaleYArr = getRandomRangeArray(params.maxNumOfElements, 0.2, 0.5);
  // const ycoordArr = getRandomRangeArray(params.maxNumOfElements, 0, -h * 0.5);
  const arcLineWidth = getRandomRangeArray(params.maxNumOfElements, 5, 20);
  // const radiusArr = getRandomRangeArray(params.maxNumOfElements, radiusArrMin, radiusArrMax);
  const sliceFrom = getRandomRangeArray(params.maxNumOfElements, 1, -8);
  const sliceTo = getRandomRangeArray(params.maxNumOfElements, 1, 5);

  // Configure and initialize the pane
  (createPane = () => {
    const pane = new Tweakpane.Pane();
    let folder;

    folder = pane.addFolder({ title: "General" });
    folder.addInput(params, "gaussian").on("change", () => update());
    folder.addInput(params, "animate").on("change", () => togglePlay());
    folder.addInput(params, "lineCap", { options: { butt: "butt", round: "round", square: "square" } }).on("change", () => update());
    folder.addInput(params, "background").on("change", () => update());

    folder = pane.addFolder({ title: "Graph" });
    folder.addInput(params, "graphColor").on("change", () => update());
    folder.addInput(params, "xOffset", { min: 0, max: 1, step: 0.01 }).on("change", () => update());
    folder.addInput(params, "yOffset", { min: 0, max: 1, step: 0.01 }).on("change", () => update());

    folder = pane.addFolder({ title: "Plot" });
    folder.addInput(params, "plotColor").on("change", () => update());
    folder.addInput(params, "markingLength", { min: 0, max: 0.02, step: 0.001 }).on("change", () => update());
    folder.addInput(params, "xGraphAxisMarkingsAmmount", { min: 0, max: 30, step: 0.01 }).on("change", () => update());
    folder.addInput(params, "yGraphAxisMarkingsAmmount", { min: 0, max: 30, step: 0.01 }).on("change", () => update());
    folder.addInput(params, "precision", { min: 1, max: 10, step: 1 }).on("change", () => update());
  })();

  return ({ context, width, height }) => {
    const graphAxisLength = width * 0.8;
    const { xGraphAxisMarkingsAmmount } = params;
    const { yGraphAxisMarkingsAmmount } = params;
    const markingsLength = graphAxisLength * params.markingLength;
    const graphMarkingsDistanceX = (graphAxisLength / xGraphAxisMarkingsAmmount) * 0.5;
    const graphMarkingsDistanceY = (graphAxisLength / yGraphAxisMarkingsAmmount) * 0.5;
    const ox = width * params.xOffset; // Origin x
    const oy = height * (params.gaussian ? params.yOffset + 0.15 : params.yOffset); // Origin y
    const graphLineWidth = 1;
    const plotLineWidth = 2;
    const graphLengthReduction = 1;
    const xStart = -params.xGraphAxisMarkingsAmmount * graphLengthReduction;
    const xEnd = params.xGraphAxisMarkingsAmmount * graphLengthReduction;
    const { precision } = params;
    const invPrecision = 1 / precision;

    const c = context;
    c.fillStyle = params.background;
    c.fillRect(0, 0, width, height);

    c.lineCap = params.lineCap;
    c.fillStyle = params.graphColor;
    c.strokeStyle = params.graphColor;

    // Move to Origin
    c.save();
    c.translate(ox, oy);

    // Draw Graph
    drawLine(c, 0, 0, -graphAxisLength * 0.5, 0, graphAxisLength * 0.5, 0, graphLineWidth);
    drawLine(c, 0, 0, 0, -graphAxisLength * 0.5, 0, graphAxisLength * 0.1, graphLineWidth);
    for (let i = 1; i <= xGraphAxisMarkingsAmmount; i++) {
      drawLine(c, graphMarkingsDistanceX * i, 0, 0, -markingsLength, 0, markingsLength, graphLineWidth);
      drawLine(c, -graphMarkingsDistanceX * i, 0, 0, -markingsLength, 0, markingsLength, graphLineWidth);
    }
    for (let i = 1; i <= yGraphAxisMarkingsAmmount; i++) {
      drawLine(c, 0, graphMarkingsDistanceY * i, -markingsLength, 0, markingsLength, 0, graphLineWidth);
      drawLine(c, 0, -graphMarkingsDistanceY * i, -markingsLength, 0, markingsLength, 0, graphLineWidth);
    }

    // Draw plot
    c.fillStyle = params.plotColor;
    c.strokeStyle = params.plotColor;
    for (let i = xStart * precision; i < xEnd * precision; i++) {
      const yValueStart = -fx(i * invPrecision); // Negative, because drawing direction is inversed compared to mathematics
      const yValueEnd = -fx((i + 1) * invPrecision);
      // drawLine(c, 0, 0, i * plotZoomX, yValueStart * plotZoomY, (i + 1) * plotZoomX, yValueEnd * plotZoomY, plotLineWidth);
      drawLine(c, 0, 0, i * graphMarkingsDistanceX * invPrecision, yValueStart * graphMarkingsDistanceY, (i + 1) * graphMarkingsDistanceX * invPrecision, yValueEnd * graphMarkingsDistanceY, plotLineWidth);
    }

    c.restore();
  };
};

canvasSketch(sketch, settings);
