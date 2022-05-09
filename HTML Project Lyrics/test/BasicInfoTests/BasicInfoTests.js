import {
  testPass,
  testFail,
  testSkip,
} from "../BasicTestingFunctions.js";
import {
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
} from "../../src/BasicInfoFunctions.js";

// ====================================
// ============== Tests ===============
// ====================================

function getSongTitleTest(id) {
  const testdata = ["", "", "Title: testtitle", "", " "];
  const expected = "testtitle";
  const given = getSongTitle(testdata, testdata.length);

  return given === expected ? testPass(id, "Songtext") : testFail(id, "Songtext");
}

function getArtistTest(id) {
  const testdata = ["asd", "", " ", "Artist: artistname", " ", "", "dsasd"];
  const expected = "artistname";
  const given = getArtist(testdata, testdata.length);

  return given === expected ? testPass(id, "Artist") : testFail(id, "Artist");
}

function getDefaultSongKeyTest(id) {
  const testdata = ["asd", "", " ", "Key: G#", " ", "", "dsasd"];
  const expected = "G#";
  const given = getDefaultSongKey(testdata, testdata.length);

  return given === expected ? testPass(id, "Key") : testFail(id, "Key");
}

function getDefaultSongStructureTest(id) {
  const testdata = ["ölölä", " ", "", "\n", "Struktur: V1, Ch x 2, V2, Ch x 2, Solo, Br, Ch x 2, Outro x 2", "", " ", "asd"];
  const expected = "V1, Ch x 2, V2, Ch x 2, Solo, Br, Ch x 2, Outro x 2";
  const given = getDefaultSongStructure(testdata);

  return given === expected ? testPass(id, "Songstructure") : testFail(id, "Songstructure");
}

export {
  getSongTitleTest,
  getArtistTest,
  getDefaultSongKeyTest,
  getDefaultSongStructureTest,
};
