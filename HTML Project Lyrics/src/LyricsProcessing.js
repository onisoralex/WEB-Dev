// Advanced functions

import * as base from "./BasicInfo";

function extractAndPrepareInformationFromEditor() {
  const completeSongText = document.getElementById("songtext").innerHTML;
  createTextAndChords(completeSongText);

  // let node = document.getElementById('output');  // Gets the Place where the Lyrics should go in the HTML
  // node.innerText = lyrics;  // Displays the Lyrics
}

// TODO after subfunctions are done
function createTextAndChords(completeSongText) {
  const songLinesArray = convertTextToArray(completeSongText);
  const songDividedInDifferentParts = searchAndGetLyricsParts(songLinesArray); // Gets the different Parts of a Song
  const separatedAndProcessedSongArray = processSong(songDividedInDifferentParts); // Divides the Parts in separateAarrays, extracts Informations and splits the relevant parts in Chords an Text
  const songWithTransformedChords = getSongWithTransformedChords(separatedAndProcessedSongArray);

  // console.log("----- Whole Array with transformed chords (when it works):");
  // console.log(songWithTransormedChords);
}

function convertTextToArray(completeSongText) {
  const arr = (completeSongText.replace(/\r/g, "")).split("\n"); // Also delete all the Carriage Return Characters in the File to be able to see the Linebreaks

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "") {
      arr.splice(i, 1);
      i -= 1; // Repeat same line in case of repeating empty lines
    }
  }

  return arr;
}

function searchAndGetLyricsParts(songLinesArray) {
  const startingPositionsOfParts = getStartingPositionsOfParts(songLinesArray);
  const parts = extractParts(songLinesArray, startingPositionsOfParts);
  const extendedParts = extendPartsWithInfoAboutLyrics(parts);

  return extendedParts;
}

function startOfNewPart(line) {
  return line.charAt(0) === "["; // New Parts always beginn with a "["
}

function getStartingPositionsOfParts(completeSongLineByLineArray) {
  const startingPositionsOfParts = [];

  for (let i = 0; i < completeSongLineByLineArray.length; i++) {
    if (startOfNewPart(completeSongLineByLineArray[i])) {
      startingPositionsOfParts.push(i);
    }
  }

  return startingPositionsOfParts;
}

function extractParts(completeSongLineByLineArray, startingPositionsOfParts) {
  let parts = [];

  parts = splitCompleteSongIntoParts(completeSongLineByLineArray, startingPositionsOfParts);
  parts.title = base.getSongTitle(completeSongLineByLineArray.slice(0, startingPositionsOfParts[0]));
  parts.artist = base.getArtist(completeSongLineByLineArray.slice(0, startingPositionsOfParts[0]));
  parts.defaultKey = base.getDefaultSongKey(completeSongLineByLineArray.slice(0, startingPositionsOfParts[0]));
  parts.defaultStructure = base.getDefaultSongStructure(parts[parts.length - 1]);

  parts = removeInfoPartFromPartsArray(parts);

  return parts;
}

function extendPartsWithInfoAboutLyrics(parts) {
  const namesOfPartsWithNoLyrics = ["[Intro]", "[Solo]", "[Outro]"];
  const partsArray = parts;

  for (let i = 0; i < partsArray.length; i++) {
    if (base.isInArray(partsArray[i].name, namesOfPartsWithNoLyrics)) { // Check if parts are of name X can also be done by   parts.some(e => e.name === "[Intro]");
      partsArray[i].hasLyrics = false;
    } else {
      partsArray[i].hasLyrics = true;
    }
  }

  return partsArray;
}

function splitCompleteSongIntoParts(completeSongEveryLineArray, startingPositionsOfParts) {
  const partsArray = [];
  startingPositionsOfParts.push(completeSongEveryLineArray.length - 1);

  for (let i = 0; i < startingPositionsOfParts.length - 1; i++) {
    const part = [];
    part.name = completeSongEveryLineArray[startingPositionsOfParts[i]]; // Extract the name of a specific part

    for (let j = startingPositionsOfParts[i] + 1; j < startingPositionsOfParts[i + 1]; j++) { // Start with the first line of a part (line after the Part Tag)
      part.push(completeSongEveryLineArray[j]); // Push every line from the new part into an array
    }

    partsArray.push(part);
    if (part.name === "[Info]") {
      break; // If the last added Part is the Info part, break off
    }
  }

  return partsArray;
}

function removeInfoPartFromPartsArray(parts) {
  const partIndex = base.getIndexOfPart(parts, "Info");
  parts.splice(partIndex, 1);

  return parts;
}

function processSong(parts) {
  const partsArray = parts;
  for (let i = 0; i < partsArray.length; i++) {
    if (partsArray[i].hasLyrics === true) { // Check if parts are of name X can also be done by   parts.some(e => e.name === "[Intro]");
      partsArray[i] = separateLyricsFromChords(partsArray[i]); // Transform mormally because it has lyrics
    } else {
      partsArray[i] = separateLyricsFromChords(partsArray[i]); // Transform differently because no lyrics
    }
  }

  return partsArray;
}

function separateLyricsFromChords(part) {
  const newpart = [];
  newpart.name = part.name;
  newpart.chords = part.hasLyrics === false ? part.filter((e) => e) : [];
  newpart.lyrics = part.hasLyrics === false ? undefined : [];

  if (part.hasLyrics === true) {
    for (let i = 0; i < part.length; i++) {
      if (i % 2 === 0) { // Check if index is even
        newpart.chords.push(part[i]);
      } else {
        newpart.lyrics.push(part[i]);
      }
    }
  }

  return newpart;
}

function getSongWithTransformedChords(separatedAndProcessedSongArray) {
  const parts = separatedAndProcessedSongArray;
  for (let i = 0; i < parts.length; i++) {
    parts[i].transformedChords = transformChords(parts[i].chords); // Send selected Parts to Transformation and replace the chords in the previous Part with the new chords
  }

  return parts;
}

// TODO
function transformChords(chords) {
  const step1 = getChordsAsStrings(chords);
  const step2 = searchChordsPositionsInChordsString(chords, step1);
  const step3 = transformChordsAndMakeAnArray(step1, step2);

  return step3;
}

function getChordsAsStrings(chordsToTransform) {
  const chords = chordsToTransform;
  for (let i = 0; i < chords.length; i++) {
    const help = chords[i].split(" ");
    const newchords = []; // Declare a new Array with only the Chords

    for (let j = 0; j < help.length; j++) {
      if (help[j] !== "") {
        newchords.push(help[j]);
      }
    }

    chords[i] = newchords;
  }

  return chords;
}

// TODO
function searchChordsPositionsInChordsString(chords4, singleChords) {
  // console.log("----- Chordsstring to be transformed:");
  // console.log(chords4);
  // console.log("----- Single separaed cCords to get the positions from:");
  // console.log(singleChords);
}

// TODO
function transformChordsAndMakeAnArray(step1, singleChordPositions) {

}
