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

function getBasicInfo(keyWords, emptyInfo, basicSongInformationArray) {
  const basicInfo = getInfoFromLine(basicSongInformationArray, keyWords);

  return basicInfo === "" ? emptyInfo : basicInfo;
}

export {
  getIndexOfPart,
  getInfoFromLine,
  getBasicInfo,
};
