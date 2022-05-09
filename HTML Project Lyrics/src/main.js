import * as Utils from "./Utils.js";
import { createTextAndChords } from "./LyricsProcessing.js";

window.openFile = Utils.openFile;
window.createTextAndChords = createTextAndChords;

window.start = () => {
  console.clear();
  const completeSongText = document.getElementById("songtext").innerHTML;
  const convertedStuff = createTextAndChords(completeSongText);

  // window.ouputNode = document.getElementById("output"); // Gets the Place where the Lyrics should go in the HTML
  // window.ouputNode.innerText = convertedStuff; // Displays the Lyrics
  console.log(`Finished text:\n${convertedStuff}`);
};
