import { testFunctionToBeExportedUpToTheWindow, create, createReportList } from "./modules/canvas.js";
import randomSquare, {
  name, draw, reportArea, reportPerimeter,
} from "./modules/square.js";

const myCanvas = create("myCanvas", document.body, 480, 320);
const reportList = createReportList(myCanvas.id);

const square1 = draw(myCanvas.ctx, 50, 50, 100, "blue");
reportArea(square1.length, reportList);
reportPerimeter(square1.length, reportList);

window.output = testFunctionToBeExportedUpToTheWindow;

// Use the default
const square2 = randomSquare(myCanvas.ctx);
