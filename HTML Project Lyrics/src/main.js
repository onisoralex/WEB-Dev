import * as Utils from "./Utilities/Utils.js";
import { parseSongFromText } from "./LyricsParsing/LyricsParsing.js";
import { createText } from "./Display/Transformer.js";
import { importFromDBFile } from "./ImportExport/DBImport.js";
import { exportToDBFile } from "./ImportExport/DBExport.js";

window.openFile = Utils.openFile;
window.parseSongFromText = parseSongFromText;

window.start = () => {
  const completeSongTextNode = document.getElementById("song-text__input");
  const ouputNode = document.getElementById("song-text__output"); // Gets the Place where the Lyrics should go in the HTML
  const readableChords = false;

  const song = parseSongFromText(completeSongTextNode.innerHTML);
  console.log("Original");
  console.log(song);

  ouputNode.innerHTML = createText(song, readableChords);
};
