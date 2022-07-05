import * as Utils from "./Utilities/Utils.js";
import { parseSongFromText } from "./LyricsParsing/LyricsParsing.js";
import { createText } from "./Display/Transformer.js";
import * as Import from "./ImportExport/DBImport.js";
import * as Export from "./ImportExport/DBExport.js";
import * as FileLoader from "./Utilities/FileLoader.js";

window.openAndDisplayFile = Utils.openAndDisplayFile;
window.parseSongFromText = parseSongFromText;
window.songCollection = [];

window.export = () => {
  const downloadLinkID = "download-link";
  Export.exportToDBFile(songCollection, downloadLinkID);
  Utils.showElement(downloadLinkID);
};

// Import has to be done in 2 steps because of how async/await works (await automatically returns the Promise object, making it impossible to return the necessary Object later)
window.import = async (event) => {
  const importedText = await FileLoader.getFileText(event);
  songCollection = Import.transformIntoSongObjectArray(importedText);
};

window.start = () => {};

window.addSong = async (event) => {
  const ouputNode = document.getElementById("song-text__output"); // Gets the Place where the Lyrics should go in the HTML
  const readableChords = false;
  const songText = await FileLoader.getFileText(event);
  const song = parseSongFromText(songText);
  songCollection.push(song);

  ouputNode.innerHTML = createText(song, readableChords);
};
