import * as Utils from "./Utilities/Utils.js";
import { parseSongFromText } from "./LyricsParsing/LyricsParsing.js";
import { createText } from "./Display/Transformer.js";
import * as Import from "./ImportExport/DBImport.js";
import * as Export from "./ImportExport/DBExport.js";

window.openAndDisplayFile = Utils.openAndDisplayFile;
window.parseSongFromText = parseSongFromText;
let importedText = "";
let songCollection = [];

window.export = () => {
  const elementID = "exportlink";
  Export.exportToDBFile(songCollection, elementID);
};

// Import has to be done in 2 steps because of how async/await works (await automatically returns the Promise object, making it impossible to return the necessary Object later)
window.import = async (event) => {
  importedText = await Import.importFromDBFile(event);
  songCollection = Import.transformIntoSongObjectArray(importedText);
};

window.start = () => {
  const completeSongTextNode = document.getElementById("song-text__input");
  const ouputNode = document.getElementById("song-text__output"); // Gets the Place where the Lyrics should go in the HTML
  const readableChords = false;

  const song = parseSongFromText(completeSongTextNode.innerHTML);

  ouputNode.innerHTML = createText(song, readableChords);
};
