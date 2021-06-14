function deepCopy(inObject) {
  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  const outObject = Array.isArray(inObject) ? [] : {};

  for (const key in inObject) {
    const value = inObject[key];
    outObject[key] = deepCopy(value);
  }

  return outObject;
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

function getSongTitle(basicSongInformationArray) {
  const emptyTitle = "Unknown Song";
  const titleKeyWords = ["title", "name", "nume", "titlu"];
  const returnedTitle = getInfoFromLine(basicSongInformationArray, titleKeyWords);

  return returnedTitle === "" ? emptyTitle : returnedTitle;
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
  const tempo = "Unknown Tempo";
  const tempoKeyWords = ["tempo"];
  const returnedTempo = getInfoFromLine(basicSongInformationArray, tempoKeyWords);

  return returnedTempo === "" ? tempo : returnedTempo;
}

function getDefaultSongStructure(infoPart) {
  const emptyStructure = "No structure given";
  const structureKeyWords = ["structure", "struktur", "structura", "structură"];
  const returnedStructure = getInfoFromLine(infoPart, structureKeyWords);

  return returnedStructure === "" ? emptyStructure : returnedStructure;
}
