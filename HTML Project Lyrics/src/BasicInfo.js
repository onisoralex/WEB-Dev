function isInArray(needle, haystack) {
  return (haystack.indexOf(needle) > -1);
}

export function getIndexInArray(needle, haystack) {
  return haystack.indexOf(needle);
}

export function getIndexOfPart(parts, keyWord) {
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].name === keyWord) {
      return i;
    }
  }

  return -1;
}

export function getInfoFromLine(basicSongInformationArray, keyWords) {
  let info = "";

  for (let i = 0; i < basicSongInformationArray.length; i++) {
    const oneLineArray = basicSongInformationArray[i].split(/:(.+)/);
    if (isInArray(oneLineArray[0].toLowerCase(), keyWords)) {
      info = oneLineArray[1].trim();
    }
  }

  return info;
}

export function getSongTitle(basicSongInformationArray) {
  const title = "Unknown Song";
  const titleKeyWords = ["title", "name"];
  const returnedTitle = getInfoFromLine(basicSongInformationArray, titleKeyWords);

  return returnedTitle === "" ? title : returnedTitle;
}

export function getArtist(basicSongInformationArray) {
  const artist = "Unknown Artist";
  const artistKeyWords = ["artist", "interpret"];
  const returnedArtist = getInfoFromLine(basicSongInformationArray, artistKeyWords);

  return returnedArtist === "" ? artist : returnedArtist;
}

export function getDefaultSongKey(basicSongInformationArray) {
  const key = "Unknown Key";
  const keyKeyWords = ["key", "gama", "gamă"];
  const returnedKey = getInfoFromLine(basicSongInformationArray, keyKeyWords);

  return returnedKey === "" ? key : returnedKey;
}

export function getDefaultSongStructure(infoPart) {
  const structure = "No structure given";
  const structureKeyWords = ["structure", "struktur", "structura", "structură"];
  const returnedStructure = getInfoFromLine(infoPart, structureKeyWords);

  return returnedStructure === "" ? structure : returnedStructure;
}
