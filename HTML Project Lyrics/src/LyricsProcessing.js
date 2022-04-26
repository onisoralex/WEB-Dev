// import * as base from "./BasicFunctions";

function createTextAndChords(completeSongText) {
  const songLinesArray = convertTextToArray(completeSongText);
  const songDividedInDifferentParts = searchAndGetLyricsParts(songLinesArray); // Gets the different Parts of a Song
  const separatedAndProcessedSongArray = processSong(songDividedInDifferentParts); // Divides the Parts in separateAarrays, extracts Informations and splits the relevant parts in Chords an Text
  const songWithTransformedChords = getSongWithTransformedChords(separatedAndProcessedSongArray);

  return songWithTransformedChords;
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
  parts.title = getSongTitle(completeSongLineByLineArray.slice(0, startingPositionsOfParts[0]));
  parts.artist = getArtist(completeSongLineByLineArray.slice(0, startingPositionsOfParts[0]));
  parts.defaultKey = getDefaultSongKey(completeSongLineByLineArray.slice(0, startingPositionsOfParts[0]));
  parts.defaultStructure = getDefaultSongStructure(parts[parts.length - 1]);
  parts.tempo = getTempo(parts[parts.length - 1]);

  parts = removeInfoPartFromPartsArray(parts);

  return parts;
}

function splitCompleteSongIntoParts(completeSongEveryLineArray, StartingPositionsOfParts) {
  const partsArray = [];
  const extendedStartingPositionsOfParts = deepCopy(StartingPositionsOfParts);
  extendedStartingPositionsOfParts.push(completeSongEveryLineArray.length - 1);

  for (let i = 0; i < extendedStartingPositionsOfParts.length - 1; i++) {
    const part = [];
    part.name = completeSongEveryLineArray[extendedStartingPositionsOfParts[i]]; // Extract the name of a specific part

    for (let j = extendedStartingPositionsOfParts[i] + 1; j < extendedStartingPositionsOfParts[i + 1]; j++) { // Start with the first line of a part (line after the Part Tag)
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
  const partIndex = getIndexOfPart(parts, "Info");
  const reducedParts = deepCopy(parts);
  reducedParts.splice(partIndex, 1);

  return reducedParts;
}

function extendPartsWithInfoAboutLyrics(parts) {
  const namesOfPartsWithNoLyrics = ["[Intro]", "[Solo]", "[Instrumental]", "[Outro]"];
  const partsArray = deepCopy(parts);

  for (let i = 0; i < partsArray.length; i++) {
    if (isInArray(partsArray[i].name, namesOfPartsWithNoLyrics)) { // Check if parts are of name X can also be done by   parts.some(e => e.name === "[Intro]");
      partsArray[i].hasLyrics = false;
    } else {
      partsArray[i].hasLyrics = true;
    }
  }

  return partsArray;
}

function processSong(parts) {
  const partsArray = deepCopy(parts);
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
  newpart.name = deepCopy(part.name);
  newpart.chords = part.hasLyrics === false ? part.filter((e) => deepCopy(e)) : [];
  newpart.lyrics = part.hasLyrics === false ? undefined : [];

  if (part.hasLyrics === true) {
    for (let i = 0; i < part.length; i++) {
      if (i % 2 === 0) { // Check if index is even
        newpart.chords.push(deepCopy(part[i]));
      } else {
        newpart.lyrics.push(deepCopy(part[i]));
      }
    }
  }

  return newpart;
}

function getSongWithTransformedChords(separatedAndProcessedSongArray) {
  const parts = deepCopy(separatedAndProcessedSongArray);

  for (let i = 0; i < parts.length; i++) {
    parts[i].transformedChords = transformChordsOfPart(parts[i].chords); // Send selected Parts to Transformation and replace the chords in the previous Part with the new chords
  }

  return parts;
}

function transformChordsOfPart(chordsOfPartArray) {
  const transformedChords = [];
  transformedChords.singleChords = getSingleChords(chordsOfPartArray);
  transformedChords.chordPositions = searchChordPositionsOfPartArray(chordsOfPartArray, transformedChords.singleChords);
  transformedChords.codedChords = transformChordsIntoCoding(transformedChords.singleChords, transformedChords.chordPositions);

  return transformedChords;
}

function getSingleChords(chordsToTransformArray) {
  const chords = [];

  for (let i = 0; i < chordsToTransformArray.length; i++) {
    chords.push(chordsToTransformArray[i].split(" ").filter((e) => e));
  }

  return chords;
}

function searchChordPositionsOfPartArray(chordsArray, singleChordsArray) {
  if (chordsArray.length !== singleChordsArray.length) {
    throw new Error(`Length of ${chordsArray} and ${singleChordsArray} is not the same!`);
  }

  const chordPositionsOfPart = [];

  for (let i = 0; i < singleChordsArray.length; i++) { // Line by line
    let start = 0;
    const chordPositionArray = [];

    for (let j = 0; j < singleChordsArray[i].length; j++) { // Chord by chord
      start = getIndexInArrayStartingFrom(singleChordsArray[i][j], chordsArray[i], start);
      chordPositionArray.push(start);
    }

    chordPositionsOfPart.push(chordPositionArray);
  }

  return chordPositionsOfPart;
}

function transformChordsIntoCoding(singleChordsOfPartArray, chordPositionsOfPartArray) {
  const codedChordsOfPart = [];

  for (let i = 0; i < singleChordsOfPartArray.length; i++) {
    const chordsOfLine = singleChordsOfPartArray[i];
    const codedChordsOfLine = [];

    for (let j = 0; j < chordsOfLine.length; j++) {
      codedChordsOfLine.push(new Chord(chordPositionsOfPartArray[i][j], chordsOfLine[j]));
    }

    codedChordsOfPart.push(codedChordsOfLine);
  }

  return codedChordsOfPart;
}
