const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const Tweakpane = require("tweakpane");

const hexToRgb = (hex) => {
  const rr = parseInt(hex.slice(1, 3), 10);
  const gg = parseInt(hex.slice(3, 5), 10);
  const bb = parseInt(hex.slice(5, 7), 10);
  return { r: rr, g: gg, b: bb };
};

const numToHex = (n) => (n <= 15 ? "0" : "") + n.toString(16);

const rgbToHex = (rgb) => `#${numToHex(rgb.r)}${numToHex(rgb.g)}${numToHex(rgb.b)}`;
// const rgbToHex = (rgb) => `#${((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)}`;

const params = {
  exercise2: false,
  animate: false,
  background: { r: 0, g: 0, b: 0 },
  fontColor: {
    r: 255, g: 255, b: 255, a: 1,
  },
  posx: 0.5,
  posy: 0.5,
  radius: 0.3,
};

const settings = {
  dimensions: [1080, 1080],
  animate: params.animate,
};

const degToRad = (degrees) => (degrees / 180) * Math.PI;

const randomRange = (min, max) => Math.random() * (max - min) + min;

const sketch = () => ({ context, width, height }) => {
  context.fillStyle = rgbToHex(params.background);
  context.fillRect(0, 0, width, height);

  context.fillStyle = rgbToHex(params.fontColor);

  const cx = width * (params.exercise2 ? 0 : params.posx);
  const cy = height * (params.exercise2 ? 0 : params.posy);

  let x; let y;

  const w = width * 0.01;
  const h = height * 0.1;

  const num = 40;
  const radius = width * (params.exercise2 ? 0.7 : params.radius);

  for (let i = 0; i < num; i++) {
    const slice = math.degToRad(360 / num);
    const angle = slice * i;

    x = cx + radius * Math.sin(angle);
    y = cy + radius * Math.cos(angle);

    context.save();
    context.translate(x, y);
    context.rotate(-angle);
    context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

    context.beginPath();
    context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
    context.fill();
    context.restore();

    context.save();
    context.translate(cx, cy);
    context.rotate(-angle);

    context.lineWidth = random.range(5, 20);
    context.strokeStyle = rgbToHex(params.fontColor);

    context.beginPath();
    context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));
    context.stroke();
    context.restore();
  }
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: "General" });
  folder.addInput(params, "exercise2");
  folder.addInput(params, "animate");
  folder.addInput(params, "background");
  // folder.addInput(params, "lineCap", { options: { butt: "butt", round: "round", square: "square" } });

  folder = pane.addFolder({ title: "Art" });
  folder.addInput(params, "fontColor");
  folder.addInput(params, "posx", { min: 0, max: 1, step: 0.01 });
  folder.addInput(params, "posy", { min: 0, max: 1, step: 0.01 });
};

createPane();
canvasSketch(sketch, settings);
