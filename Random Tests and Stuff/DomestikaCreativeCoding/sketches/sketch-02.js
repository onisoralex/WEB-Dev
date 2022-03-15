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
  animate: true,
  background: "#000000",
  fontColor: "#ffffff",
  lineCap: "butt",
  posx: 0.5,
  posy: 0.5,
  radius: 0.3,
  dials: 40,
  lineDial: false,
};

const animate = () => {
  console.log("domestika");
  requestAnimationFrame(animate); // Every time the browser is ready to animate a frame it willl call this function.
};
// animate();

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const degToRad = (degrees) => (degrees / 180) * Math.PI;

const randomRange = (min, max) => Math.random() * (max - min) + min;

const sketch = ({ update, togglePlay }) => {
  // window.addEventListener("click", () => update(settings));

  (createPane = () => {
    const pane = new Tweakpane.Pane();
    let folder;

    folder = pane.addFolder({ title: "General" });
    folder.addInput(params, "exercise2").on("change", () => update());
    folder.addInput(params, "animate").on("change", () => togglePlay());
    folder.addInput(params, "background").on("change", () => update());
    folder.addInput(params, "lineCap", { options: { butt: "butt", round: "round", square: "square" } }).on("change", () => update());

    folder = pane.addFolder({ title: "Art" });
    folder.addInput(params, "fontColor").on("change", () => update());
    folder.addInput(params, "posx", { min: 0, max: 1, step: 0.01 }).on("change", () => update());
    folder.addInput(params, "posy", { min: 0, max: 1, step: 0.01 }).on("change", () => update());
    folder.addInput(params, "radius", { min: 0, max: 1, step: 0.01 }).on("change", () => update());
    folder.addInput(params, "dials", { min: 0, max: 100, step: 1 }).on("change", () => update());
    folder.addInput(params, "lineDial").on("change", () => update());
  })();

  return ({ context, width, height }) => {
    context.fillStyle = params.background;
    context.fillRect(0, 0, width, height);

    context.fillStyle = params.fontColor;

    const cx = width * (params.exercise2 ? 0 : params.posx);
    const cy = height * (params.exercise2 ? 0 : params.posy);

    let x; let y;

    const w = width * 0.01;
    const h = height * 0.1;

    const num = params.dials;
    const radius = width * (params.exercise2 ? 0.7 : params.radius);

    context.lineCap = params.lineCap;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      const wi = 500;
      const he = 500;
      context.lineWidth = 1;
      context.strokeStyle = params.fontColor;
      context.save();
      context.translate(wi, he);
      context.beginPath();
      context.moveTo(0, -he);
      context.lineTo(0, 1080 - he);
      context.stroke();
      context.beginPath();
      context.moveTo(-wi, 0);
      context.lineTo(1080 - wi, 0);
      context.stroke();
      context.restore();
      context.save();
      context.translate(wi + w, he + h);
      context.beginPath();
      context.moveTo(0, -he - h);
      context.lineTo(0, 1080 - he - h);
      context.stroke();
      context.beginPath();
      context.moveTo(-wi - h, 0);
      context.lineTo(1080 - wi - w, 0);
      context.stroke();
      context.restore();
      context.save();
      context.translate(wi, he);

      context.beginPath();
      context.rect(-w * 0.5, -random.range(0, h * 0.5), w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      if (params.lineDial) {
        // context.rotate(math.degToRad(90));
        const xFactor = random.range(0.1, 2);
        const yFactor = random.range(0.2, 0.5);
        context.lineWidth = 5;
        context.strokeStyle = params.fontColor;
        context.beginPath();
        context.moveTo(0, random.range(0, -h * 0.5));
        context.lineTo(w, h);
        context.stroke();
      } else {
        // context.scale(random.range(0.1, 2), random.range(0.2, 0.5));
        context.beginPath();
        context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
        context.fill();
      }
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);
      context.lineWidth = random.range(5, 20);
      context.strokeStyle = params.fontColor;
      context.beginPath();
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);