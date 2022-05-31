import * as Utils from "./Utilities/Utils.js";
import { parseSongFromText } from "./LyricsParsing/LyricsParsing.js";
import { createText } from "./Display/Transformer.js";
import * as Import from "./ImportExport/DBImport.js";
import * as Export from "./ImportExport/DBExport.js";

window.Import = Import;
window.Export = Export;
window.openAndDisplayFile = Utils.openAndDisplayFile;
window.parseSongFromText = parseSongFromText;
const songCollection = [];

window.start = () => {
  const completeSongTextNode = document.getElementById("song-text__input");
  const ouputNode = document.getElementById("song-text__output"); // Gets the Place where the Lyrics should go in the HTML
  const readableChords = false;

  const song = parseSongFromText(completeSongTextNode.innerHTML);
  console.log("Original");
  console.log(song);
  console.log("Exported and imported Song");
  console.log(song);

  ouputNode.innerHTML = createText(song, readableChords);
};
