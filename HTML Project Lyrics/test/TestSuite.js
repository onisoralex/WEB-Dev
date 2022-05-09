import {
  getSongTitleTest,
  getArtistTest,
  getDefaultSongKeyTest,
  getDefaultSongStructureTest,
} from "./BasicTests/BasicTest.js";

window.init = () => {
  window.result = "";
  window.resultfield = document.getElementById("result");
  window.song = document.getElementById("songtext").innerHTML;
};

window.setResult = () => {
  window.resultfield.innerHTML = window.result;
};

window.execTests = (res) => {
  let result = res;

  result += "<hr>";

  // Basic Tests
  result += getSongTitleTest(1);
  result += getArtistTest(2);
  result += getDefaultSongKeyTest(3);
  result += getDefaultSongStructureTest(4);

  // Processing Tests
  // result += extractAndPrepareInformationFromEditorTest(5);
  // result += createTextAndChordsTest(6);
  // result += searchAndGetLyricsPartsTest(7);
  // result += getStartingPositionOfPartsTest(8);
  // result += extractPartsTest(9);

  window.result = result;
};
