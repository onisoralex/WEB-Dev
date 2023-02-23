// im port * as math from "https://onisor_alex.github.io/math.js"  or something klike this it should be
import { mapRange, degToRad } from "../../MyLibraries/math.js";

const canvasSketch = require("canvas-sketch");
const Tweakpane = require("tweakpane");

const randomRange = (min, max) => Math.random() * (max - min) + min;

const getRandomRangeArray = (n, min, max) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(randomRange(min, max));
  }
  return arr;
};

const animate = () => {
  console.log("domestika");
  requestAnimationFrame(animate); // Every time the browser is ready to animate a frame it willl call this function.
};
// animate();

const params = {
  exercise2: false,
  animate: true,
  background: "#000000",
  dialColor: "#ffffff",
  arcColor: "#ffffff",
  lineCap: "butt",
  posx: 0.5,
  posy: 0.5,
  radius: 0.3,
  radiusFactorMin: 1,
  radiusFactorMax: 1,
  dials: 40,
  dialWidthFactor: 1,
  maxNumOfElements: 100,
};

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({
  width, height, update, togglePlay,
}) => {
  // window.addEventListener("click", () => update(settings));

  const w = width * 0.01;
  const h = height * 0.1;
  const radiusArrMin = 0.7;
  const radiusArrMax = 1.3;

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
    folder.addInput(params, "exercise2").on("change", () => update());
    folder.addInput(params, "animate").on("change", () => togglePlay());
    folder.addInput(params, "lineCap", { options: { butt: "butt", round: "round", square: "square" } }).on("change", () => update());
    folder.addInput(params, "background").on("change", () => update());

    folder = pane.addFolder({ title: "Art" });
    folder.addInput(params, "dialColor").on("change", () => update());
    folder.addInput(params, "arcColor").on("change", () => update());
    folder.addInput(params, "posx", { min: 0, max: 1, step: 0.01 }).on("change", () => update());
    folder.addInput(params, "posy", { min: 0, max: 1, step: 0.01 }).on("change", () => update());
    folder.addInput(params, "radius", { min: 0, max: 1, step: 0.01 }).on("change", () => update());
    folder.addInput(params, "radiusFactorMin", { min: 0, max: 1, step: 0.01 }).on("change", () => update());
    folder.addInput(params, "radiusFactorMax", { min: 1, max: 2, step: 0.01 }).on("change", () => update());
    folder.addInput(params, "dials", { min: 0, max: params.maxNumOfElements, step: 1 }).on("change", () => update());
    folder.addInput(params, "dialWidthFactor", { min: 0, max: 3, step: 0.01 }).on("change", () => update());
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
    const newradiusrange = radiusArr.map((e) => mapRange(e, radiusArrMin, radiusArrMax, radiusArrMin * params.radiusFactorMin, radiusArrMax * params.radiusFactorMax));

    for (let i = 0; i < num; i++) {
      const slice = degToRad(360 / num);
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
