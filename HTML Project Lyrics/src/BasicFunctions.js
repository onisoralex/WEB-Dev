function deepCopy(inputObject) {
  if (typeof inputObject !== "object" || inputObject === null) {
    return inputObject; // Return the value if input is not an object
  }

  const outputObject = Array.isArray(inputObject) ? [] : {};

  for (const key in inputObject) {
    const value = inputObject[key];
    outputObject[key] = deepCopy(value);
  }

  return outputObject;
}

function openFile(event, fileTarget) {
  const input = event.target; // Takes Information from the HTML that executed this Script
  const reader = new FileReader(); // Create a new File Reader
  const node = fileTarget;

  reader.onload = () => {
    node.innerText = reader.result; // Reads the Lyrics from the Object and display them
  };

  reader.readAsText(input.files[0]); // Reads first File from Array
}

function getIndexInArrayStartingFrom(needle, haystack, n) {
  return haystack.indexOf(needle, n);
}

function getIndexInArray(needle, haystack) {
  return haystack.indexOf(needle);
}

function isInArray(needle, haystack) {
  return (getIndexInArray(needle, haystack) > -1);
}

function getIndexOfPart(parts, keyWord) {
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].name === keyWord) {
      return i;
    }
  }

  return -1;
}

function getInfoFromLine(basicSongInformationArray, keyWords) {
  let info = "";

  for (let i = 0; i < basicSongInformationArray.length; i++) {
    const oneLineArray = basicSongInformationArray[i].split(/:(.+)/);
    if (isInArray(oneLineArray[0].toLowerCase(), keyWords)) {
      info = oneLineArray[1].trim();
    }
  }

  return info;
}

// Should replace the below info methods later to make it more cleaner
/* const titleInfoObj = { emptyInfo: "Unknown Song", keyWords: ["title", "name", "nume", "titlu"] };
function getGeneralInfo(infoType, basicSongInformationArray) {
  const result = getInfoFromLine(basicSongInformationArray, infoType.keyWords);

  return result === "" ? infoType.emptyInfo : result;
}
*/

// Separate functions until the geneal function is working
function getSongTitle(basicSongInformationArray) {
  const empty = "Unknown Song";
  const keyWords = ["title", "name", "nume", "titlu"];
  const result = getInfoFromLine(basicSongInformationArray, keyWords);

  return result === "" ? empty : result;
}

function getArtist(basicSongInformationArray) {
  const emptyArtist = "Unknown Artist";
  const artistKeyWords = ["artist", "interpret"];
  const returnedArtist = getInfoFromLine(basicSongInformationArray, artistKeyWords);

  return returnedArtist === "" ? emptyArtist : returnedArtist;
}

function getDefaultSongKey(basicSongInformationArray) {
  const emptyKey = "Unknown Key";
  const keyKeyWords = ["key", "gama", "gamă"];
  const returnedKey = getInfoFromLine(basicSongInformationArray, keyKeyWords);

  return returnedKey === "" ? emptyKey : returnedKey;
}

function getTempo(basicSongInformationArray) {
  const emptyTempo = "Unknown Tempo";
  const tempoKeyWords = ["tempo"];
  const returnedTempo = getInfoFromLine(basicSongInformationArray, tempoKeyWords);

  return returnedTempo === "" ? emptyTempo : returnedTempo;
}

function getDefaultSongStructure(basicSongInformationArray) {
  const emptyStructure = "No structure given";
  const structureKeyWords = ["structure", "struktur", "structura", "structură"];
  const returnedStructure = getInfoFromLine(basicSongInformationArray, structureKeyWords);

  return returnedStructure === "" ? emptyStructure : returnedStructure;
}

export {
  deepCopy,
  openFile,
  getIndexInArrayStartingFrom,
  getIndexInArray,
  isInArray,
  getIndexOfPart,
  getInfoFromLine,
  getSongTitle,
  getArtist,
  getDefaultSongKey,
  getTempo,
  getDefaultSongStructure,
};
