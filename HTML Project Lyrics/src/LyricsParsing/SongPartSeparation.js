import * as Utils from "../Utilities/Utils.js";
import * as Base from "./BasicInfoFunctions.js";

const startOfNewPart = (line) => line.charAt(0) === "["; // New Parts always beginn with a "["

const getStartingPositionsOfParts = (completeSongLineByLineArray) => {
  const startingPositionsOfParts = [];

  for (let i = 0; i < completeSongLineByLineArray.length; i++) {
    if (startOfNewPart(completeSongLineByLineArray[i])) {
      startingPositionsOfParts.push(i);
    }
  }

  return startingPositionsOfParts;
};

const splitCompleteSongIntoParts = (completeSongEveryLineArray, StartingPositionsOfParts) => {
  const partsArray = [];
  const extendedStartingPositionsOfParts = Utils.deepCopy(StartingPositionsOfParts);
  extendedStartingPositionsOfParts.push(completeSongEveryLineArray.length); // Add Ending as last Entry

  for (let i = 0; i < extendedStartingPositionsOfParts.length - 1; i++) {
    const part = [];
    part.name = completeSongEveryLineArray[extendedStartingPositionsOfParts[i]]; // Extract the name of a specific part
    part.name = part.name.substring(1, part.name.length - 1); // Remove brackets

    for (let j = extendedStartingPositionsOfParts[i] + 1; j < extendedStartingPositionsOfParts[i + 1]; j++) { // Start with the first line of a part (line after the Part Tag)
      part.push(completeSongEveryLineArray[j]); // Push every line from the new part into an array
    }

    partsArray.push(part);
    if (part.name === "[Info]") {
      break; // If the last added Part is the Info part, break off
    }
  }

  return partsArray;
};

const removeInfoPartFromPartsArray = (parts) => {
  const partIndex = Base.getIndexOfPart(parts, "Info");
  const reducedParts = Utils.deepCopy(parts);
  reducedParts.splice(partIndex, 1);

  return reducedParts;
};

const extractParts = (completeSongLineByLineArray, startingPositionsOfParts) => {
  let parts = [];

  parts = splitCompleteSongIntoParts(completeSongLineByLineArray, startingPositionsOfParts);
  const basicSongInformationPart = completeSongLineByLineArray.slice(0, startingPositionsOfParts[0]);

  parts.title = Base.getBasicInfo(["title", "name", "nume", "titlu"], "Unknown Song Title", basicSongInformationPart);
  parts.artist = Base.getBasicInfo(["artist", "interpret"], "Unknown Artist", basicSongInformationPart);
  parts.defaultKey = Base.getBasicInfo(["key", "gama", "gamă"], "Unknown Key", basicSongInformationPart);
  parts.tempo = Base.getBasicInfo(["tempo", "speed", "geschw.", "geschw", "geschwindigkeit"], "Unknown Tempo", basicSongInformationPart);
  parts.defaultStructure = Base.getBasicInfo(["structure", "struktur", "structura", "structură"], "No structure given", parts[parts.length - 1]);

  parts = removeInfoPartFromPartsArray(parts);

  return parts;
};

const separateLyricsFromChords = (_parts) => {
  const namesOfPartsWithNoLyrics = ["Intro", "Solo", "Instrumental", "Outro"];
  const parts = Utils.deepCopy(_parts);

  for (let i = 0; i < parts.length; i++) {
    const newpart = [];
    const part = parts[i];
    newpart.name = Utils.deepCopy(part.name);

    if (Utils.isInArray(part.name, namesOfPartsWithNoLyrics)) { // Check if parts are of name X can also be done by   parts.some(e => e.name === "[Intro]");
      newpart.chords = part.filter((e) => Utils.deepCopy(e));
      newpart.lyrics = undefined;
    } else {
      newpart.chords = [];
      newpart.lyrics = [];
      for (let j = 0; j < part.length; j++) {
        if (j % 2 === 0) { // Check if index is even
          newpart.chords.push(Utils.deepCopy(part[j]));
        } else {
          newpart.lyrics.push(Utils.deepCopy(part[j]));
        }
      }
    }

    parts[i] = newpart;
  }

  return parts;
};

const searchAndGetLyricsParts = (songLinesArray) => {
  const startingPositionsOfParts = getStartingPositionsOfParts(songLinesArray);
  const parts = extractParts(songLinesArray, startingPositionsOfParts);
  const extendedParts = separateLyricsFromChords(parts);

  return extendedParts;
};

export { searchAndGetLyricsParts };
export const SongPartSeparation = { getStartingPositionsOfParts };
