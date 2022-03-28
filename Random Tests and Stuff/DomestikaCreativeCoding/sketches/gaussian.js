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
  const xAxisLength = width * 0.5;
  const yAxiyLength = height * 0.5;

  // Create all random values so they aren't created anew every frame
  const scaleXArr = getRandomRangeArray(params.maxNumOfElements, 0.1, 2);
  const scaleYArr = getRandomRangeArray(params.maxNumOfElements, 0.2, 0.5);
  const ycoordArr = getRandomRangeArray(params.maxNumOfElements, 0, -h * 0.5);
  const arcLineWidth = getRandomRangeArray(params.maxNumOfElements, 5, 20);
  const radiusArr = getRandomRangeArray(params.maxNumOfElements, radiusArrMin, radiusArrMax);
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
    

    // Default settings for repeatedly used settings to improve performance
    context.fillStyle = params.dialColor;
    context.strokeStyle = params.arcColor;
    context.lineCap = params.lineCap;

    // Center of circle
    const cx = width * (params.exercise2 ? 0 : params.posx);
    const cy = height * (params.exercise2 ? 0 : params.posy);

    const num = params.dials;
    const dialWidth = w * params.dialWidthFactor;
    const radius = width * (params.exercise2 ? 0.7 : params.radius);
    const newradiusrange = radiusArr.map((e) => math.mapRange(e, radiusArrMin, radiusArrMax, radiusArrMin * params.radiusFactorMin, radiusArrMax * params.radiusFactorMax));

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      const x = cx + radius * Math.sin(angle);
      const y = cy + radius * Math.cos(angle);

      const ycoord = ycoordArr[i];

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(scaleXArr[i], scaleYArr[i]);
      context.beginPath();
      if (params.lineCap === "butt") {
        context.rect(-dialWidth * 0.5, ycoord, dialWidth, h);
        context.fill();
      } else {
        context.lineWidth = dialWidth;
        context.strokeStyle = params.dialColor;
        context.moveTo(0, ycoord);
        context.lineTo(0, ycoord + h);
        context.stroke();
      }
      context.restore();

      context.save();
      context.lineWidth = arcLineWidth[i];
      context.translate(cx, cy);
      context.rotate(-angle);
      context.beginPath();
      context.arc(0, 0, radius * newradiusrange[i], slice * sliceFrom[i], slice * sliceTo[i]);
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
