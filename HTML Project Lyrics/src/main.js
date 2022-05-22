import * as Utils from "./Utilities/Utils.js";
import { parseSongFromText } from "./LyricsParsing/LyricsParsing.js";
import { createText } from "./display/Transformer.js";

window.openFile = Utils.openFile;
window.parseSongFromText = parseSongFromText;

window.start = () => {
  const completeSongTextNode = document.getElementById("song-text__input");
  const ouputNode = document.getElementById("song-text__output"); // Gets the Place where the Lyrics should go in the HTML

  const song = parseSongFromText(completeSongTextNode.innerHTML);
  console.log("Original");
  console.log(song);

  ouputNode.innerHTML = createText(song);
};
