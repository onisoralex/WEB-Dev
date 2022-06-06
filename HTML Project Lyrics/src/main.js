import * as Utils from "./Utilities/Utils.js";
import { parseSongFromText } from "./LyricsParsing/LyricsParsing.js";
import { createText } from "./Display/Transformer.js";
import * as Import from "./ImportExport/DBImport.js";
import * as Export from "./ImportExport/DBExport.js";

window.openAndDisplayFile = Utils.openAndDisplayFile;
window.parseSongFromText = parseSongFromText;
const songCollection = [];

window.export = () => {
  const elementID = "exportlink";
  Export.exportToDBFile(songCollection, elementID);
};

window.import = (event) => {
  console.log(Import.importFromDBFile(event));
  window.sson = songCollection;
};

window.start = () => {
  const completeSongTextNode = document.getElementById("song-text__input");
  const ouputNode = document.getElementById("song-text__output"); // Gets the Place where the Lyrics should go in the HTML
  const readableChords = false;

  const song = parseSongFromText(completeSongTextNode.innerHTML);
  songCollection.push(song);
  songCollection.push(song);
  songCollection.push(song);
  window.son = songCollection;
  // console.log("Original");
  // console.log(song);
  // console.log("Exported and imported Song");
  // console.log(JSON.stringify(song));

  ouputNode.innerHTML = createText(song, readableChords);
};
