import * as Utils from "./Utilities/Utils.js";
import { createTextAndChords } from "./LyricsProcessing/LyricsProcessing.js";

window.openFile = Utils.openFile;
window.createTextAndChords = createTextAndChords;

window.start = () => {
  const completeSongText = document.getElementById("songtext").innerHTML;
  const convertedStuff = createTextAndChords(completeSongText);

  // window.ouputNode = document.getElementById("output"); // Gets the Place where the Lyrics should go in the HTML
  // window.ouputNode.innerText = convertedStuff; // Displays the Lyrics
  console.log(convertedStuff);
  const a = JSON.stringify(convertedStuff);
  const b = JSON.parse(a);
  console.log(b === convertedStuff);
};
