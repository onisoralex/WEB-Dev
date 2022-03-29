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

const params = {
  animate: true,
  lineCap: "butt",
  background: "#000000",
  scaleColor: "#ffffff",
  graphColor: "#ffffff",
  posx: 0.5,
  posy: 0.8,
};

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({
  width, height, update, togglePlay,
}) => {
  const xAxisLength = width * 0.8;
  const yAxiyLength = height * 0.8;

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
    folder.addInput(params, "animate").on("change", () => togglePlay());
    folder.addInput(params, "lineCap", { options: { butt: "butt", round: "round", square: "square" } }).on("change", () => update());
    folder.addInput(params, "background").on("change", () => update());

    folder = pane.addFolder({ title: "Art" });
    folder.addInput(params, "scaleColor").on("change", () => update());
    folder.addInput(params, "graphColor").on("change", () => update());
    folder.addInput(params, "posx", { min: 0, max: 1, step: 0.01 }).on("change", () => update());
    folder.addInput(params, "posy", { min: 0, max: 1, step: 0.01 }).on("change", () => update());
  })();

  return ({ context, width, height }) => {
    context.fillStyle = params.background;
    context.fillRect(0, 0, width, height);

    context.lineCap = params.lineCap;
    context.fillStyle = params.scaleColor;
    context.strokeStyle = params.scaleColor;

    // Origin point
    const ox = width * params.posx;
    const oy = height * params.posy;

    const graphWidth = 4;

    context.save();
    context.translate(ox, oy);
    context.beginPath();
    context.lineWidth = graphWidth;
    context.moveTo(-xAxisLength * 0.5, 0);
    context.lineTo(xAxisLength * 0.5, 0);
    context.stroke();
    context.moveTo(0, -yAxiyLength * 0.9);
    context.lineTo(0, yAxiyLength * 0.1);
    context.stroke();
    context.restore();
  };
};

canvasSketch(sketch, settings);
