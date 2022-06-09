import { searchAndGetLyricsParts } from "./SongPartSeparation.js";
import { getSongWithTransformedChords } from "./ChordTransformation.js";
import { getSongFromParsedText } from "./ObjectifySongArray.js";
import Song from "../DataClasses/Song.js";

/**
 * Converts a textfile to an array with every line as an element in the array. New lines, carriage return characters and empty lines are removed
 * @param {String} completeSongText String of the whole songtext - plus additional information - from a textfile
 * @returns An Array with all lines of the text file
 */
const convertTextToArray = (completeSongText) => {
  const arr = (completeSongText.replace(/\r/g, "")).split("\n"); // Also delete all the Carriage Return Characters in the File to be able to see the Linebreaks

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "") {
      arr.splice(i, 1);
      i -= 1; // Repeat same line in case of repeating empty lines
    }
  }

  return arr;
};

const parseSongFromText = (completeSongText) => {
  const songLinesArray = convertTextToArray(completeSongText);
  const songDividedInDifferentParts = searchAndGetLyricsParts(songLinesArray); // Gets the different Parts of a Song
  const songWithTransformedChordsAsArray = getSongWithTransformedChords(songDividedInDifferentParts);
  const song = new Song(getSongFromParsedText(songWithTransformedChordsAsArray));

  return song;
};

export { parseSongFromText };
