// import * as pen from "./pen.module";
// import "./style";

console.clear();

// Global variables
const canvasObj = document.getElementById("myCanvas");
canvasObj.width = 300;
canvasObj.height = 300;
const ctx = canvasObj.getContext("2d");
ctx.strokeStyle = "#000000";

// first make int, for odd screen sizes; then add half of linewidth to positions to go on the pixel (canvas 0;0 seems to be between pixels)

let pen = {
  outerRadius: 0,
  drawOuterCircle: false,
  innerRadiusSameAsOuterRadius: false,
  innerRadius: 0,
  drawInnerCircle: false,
  gons: 0,
  jumpOver: 0,
  dir: 0,
  drawByLineLength: false,
  lineLength: 0,
  lineThickness: 0,
  angle: 0,
  xCenter: 0,
  yCenter: 0,
  x: 0,
  y: 0,
  states: [],
  init: function () { // Initialises the starting values for the pen
    this.outerRadius = getValue("outerRadius");
    this.drawOuterCircle = isChecked("ifOuterCircle");
    this.innerRadiusSameAsOuterRadius = isChecked("toggleInnerRadius");
    this.innerRadius = getValue("innerRadius");
    this.drawInnerCircle = isChecked("ifInnerCircle");
    this.gons = getValue("gons");
    this.exp = getValue("everyXPoints");
    this.dir = getValue("direction"); // Set drawing direction; Default right
    this.drawByLineLength = isChecked("drawByLineLength");
    this.lineLength = getValue("lineLength");
    this.lineThickness = getValue("lineThickness");
    this.angle = 360 / this.gons;
    this.xCenter = Math.floor(canvasObj.width / 2); // Reset X position
    this.yCenter = Math.floor(canvasObj.height / 2); // Reset X position
    this.x = this.xCenter;
    this.y = this.yCenter;
  },
  turnLeft: function (steps) { // Turn left a degrees
    this.dir = (this.dir + (this.angle * steps)) % 360; // + means turning counter clockwise starting with 0° at 3 o'clock
  },
  turnRight: function (steps) { // Turn right b degrees
    this.dir = (this.dir + (360 - (this.angle * steps))) % 360; // Turning counterclockwise to remain in positive number by the complementary angle
  },
  pushState: function () {
    let state = {
      dir: this.dir,
      x: this.x,
      y: this.y
    };
    this.states.push(state);
  },
  popState: function () {
    let state = this.states[this.states.length - 1];

    this.dir = state.dir;
    this.x = state.x;
    this.y = state.y;

    this.move();
    this.states.pop();
  },
  getNextPos: function () {
    this.x = this.xCenter + this.getNextPositionX();
    this.y = this.yCenter - this.getNextPositionY(); // Minus, because screen positions are positive downwards
  },
  degToRad: function () { // DEG to RAD
    return this.dir / 180 * Math.PI;
  },
  getNextPositionX: function () { // Calculate next X Point
    if (this.drawByLineLength) {
      // TODO
    } else {
      return Math.round(this.outerRadius * Math.cos(this.degToRad()));
    }
  },
  getNextPositionY: function () { // Calculate next Y Point
    if (this.drawByLineLength) {
      // TODO
    } else {
      return Math.round(this.outerRadius * Math.sin(this.degToRad()));
    }
  },
  line: function () { // Draw forward
    ctx.lineTo(this.x + hp(), this.y + hp());
  },
  move: function () { // Move forward (without drawing)
    ctx.moveTo(this.x + hp(), this.y + hp());
  }
};

function start() {
  console.clear();
  pen.init();
  ctx.lineWidth = pen.lineThickness;
  const resultField = document.getElementById("result");

  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvasObj.width, canvasObj.height); // Resets the canvas
  ctx.beginPath(); // Resets drawing instructions

  let commonPrimFactor = getCommonPrimFactors(pen.gons, pen.exp);

  if (commonPrimFactor === 1) {
    // Set the pen to the starting position
    pen.getNextPos();
    pen.move();

    for (let i = 0; i < pen.gons; i++) {
      pen.turnRight(pen.exp);
      pen.getNextPos();
      pen.line();
    }
  } else {
    for (let i = 0; i < pen.exp; i++) {
      // Set the pen to the starting position
      pen.getNextPos();
      pen.move();

      pen.pushState();

      let factor = pen.gons / pen.exp;
      console.log(factor);
      for (let j = 0; j < factor; j++) {
        pen.turnRight(pen.exp);
        pen.getNextPos();
        pen.line();
      }

      pen.popState();
      pen.turnRight();
    }
  }

  ctx.stroke();
}

function getCommonPrimFactors(a, b) {
  let h;
  if (a === 0) return Math.abs(b);
  if (b === 0) return Math.abs(a);

  do {
    h = a % b;
    a = b;
    b = h;
  } while (b != 0);

  return Math.abs(a);
}

// Gets the HTML element by it's element ID
function getValue(id) {
  return Number(document.getElementById(id).value.replace(/\s|\(|\)/g, "")); // Eliminate whitespaces, "(" & ")" characters
}

function isChecked(id) {
  return document.getElementById(id).checked;
}

// Function to correct the position of the pixels if the linestrength is odd
function hp() {
  return (ctx.lineWidth / 2) % 1;
}

function toggleHiddenElements(elementClass) {
  let objArr = document.getElementsByClassName(elementClass);
  let isDisabled = objArr.item(0).hasAttribute("hidden");
  if (isDisabled) {
    for (let i = 0; i < objArr.length; i++) {
      objArr.item(i).removeAttribute("hidden");
    }
  } else {
    for (let i = 0; i < objArr.length; i++) {
      objArr.item(i).setAttribute("hidden", "");
    }
  }
  start();
}

start();