import {
  testPass,
  testFail,
  testSkip,
} from "../BasicTestingFunctions.js";
import { getStartingPositionsOfParts } from "../../src/LyricsProcessing.js";

// ====================================
// ============== Tests ===============
// ====================================

const info = "test";

function extractAndPrepareInformationFromEditorTest(id, song) {
  const regex = "Where Would I Be Without You";
  const expected = true;
  const given = (song.match(regex).index !== 0); // Check if the regex value exists

  return expected === given ? testPass(id, info) : testFail(id, info);
}

// Not yet tested - maybe not testable, since it's a function that uses many other not yet tested functions
function createTextAndChordsTest(id) {
  // TODO
  return testSkip(id, info);
}

// Not yet tested - maybe not testable, since it's a function that uses many other not yet tested functions
function searchAndGetLyricsPartsTest(id) {
  // TODO
  return testSkip(id, info);
}

function getStartingPositionOfPartsTest(id) {
  const testdata = "\r\n\r\n[Chor]\r\ntestchor\r\n\r\n[Vers]\r\nteststrophe\r\n\r\n asdasd";
  const cleanedTestdata = (testdata.replace(/\r/g, "")).split("\n"); // Delete all the Carriage Return Characters
  const expected = JSON.stringify([2, 5]);
  const given = JSON.stringify(getStartingPositionsOfParts(cleanedTestdata));

  return expected == given ? testPass(id, info) : testFail(id, info);
}

// Not yet tested - maybe not testable, since it's a function that uses many other not yet tested functions
function extractPartsTest(id) {
  return testSkip(id, info);
}

export {
  extractAndPrepareInformationFromEditorTest,
  createTextAndChordsTest,
  searchAndGetLyricsPartsTest,
  getStartingPositionOfPartsTest,
  extractPartsTest,
};
