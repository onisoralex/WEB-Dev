import * as Utils from "../Utilities/Utils.js";

const getIndexOfPart = (parts, keyWord) => {
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].name === keyWord) {
      return i;
    }
  }

  return -1;
};

const getInfoFromLine = (basicSongInformationArray, keyWords) => {
  let info = "";

  for (let i = 0; i < basicSongInformationArray.length; i++) {
    const oneLineArray = basicSongInformationArray[i].split(/:(.+)/);
    if (Utils.isInArray(oneLineArray[0].toLowerCase(), keyWords)) {
      info = oneLineArray[1].trim();
    }
  }

  return info;
};

// Should replace the below info methods later to make it more cleaner
/* const titleInfoObj = { emptyInfo: "Unknown Song", keyWords: ["title", "name", "nume", "titlu"] };
function getGeneralInfo(infoObj, basicSongInformationArray) {
  const result = getInfoFromLine(basicSongInformationArray, infoObj.keyWords);

  return result === "" ? infoObj.emptyInfo : result;
}
*/

// Separate functions until the aforementioned geneal function is working
const getSongTitle = (basicSongInformationArray) => {
  const empty = "Unknown Song";
  const keyWords = ["title", "name", "nume", "titlu"];
  const result = getInfoFromLine(basicSongInformationArray, keyWords);

  return result === "" ? empty : result;
};

const getArtist = (basicSongInformationArray) => {
  const emptyArtist = "Unknown Artist";
  const artistKeyWords = ["artist", "interpret"];
  const returnedArtist = getInfoFromLine(basicSongInformationArray, artistKeyWords);

  return returnedArtist === "" ? emptyArtist : returnedArtist;
};

const getDefaultSongKey = (basicSongInformationArray) => {
  const emptyKey = "Unknown Key";
  const keyKeyWords = ["key", "gama", "gamă"];
  const returnedKey = getInfoFromLine(basicSongInformationArray, keyKeyWords);

  return returnedKey === "" ? emptyKey : returnedKey;
};

const getTempo = (basicSongInformationArray) => {
  const emptyTempo = "Unknown Tempo";
  const tempoKeyWords = ["tempo"];
  const returnedTempo = getInfoFromLine(basicSongInformationArray, tempoKeyWords);

  return returnedTempo === "" ? emptyTempo : returnedTempo;
};

const getDefaultSongStructure = (basicSongInformationArray) => {
  const emptyStructure = "No structure given";
  const structureKeyWords = ["structure", "struktur", "structura", "structură"];
  const returnedStructure = getInfoFromLine(basicSongInformationArray, structureKeyWords);

  return returnedStructure === "" ? emptyStructure : returnedStructure;
};

export {
  getIndexOfPart,
  getInfoFromLine,
  getSongTitle,
  getArtist,
  getDefaultSongKey,
  getTempo,
  getDefaultSongStructure,
};
