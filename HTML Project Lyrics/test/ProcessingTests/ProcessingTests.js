import {
  testPass,
  testFail,
  testSkip,
  testPassInfo,
  testFailInfo,
  testSkipInfo,
} from "../BasicTestingFunctions.js";

// ====================================
// ============== Tests ===============
// ====================================

function extractAndPrepareInformationFromEditorTest(id) {
  const regex = "Where Would I Be Without You";
  // Add a line bevore the first test as delimiter
  result += "<hr>";
  const expected = true;
  const given = (song.match(regex).index !== 0); // Check if the regex value exists

  return expected === given ? testPass(id) : testFail(id);
}

// Not yet tested - maybe not testable, since it's a function that uses many other not yet tested functions
function createTextAndChordsTest(id) {
  // TODO
  testSkip(id);
}

// Not yet tested - maybe not testable, since it's a function that uses many other not yet tested functions
function searchAndGetLyricsPartsTest(id) {
  // TODO
  testSkip(id);
}

function getStartingPositionOfPartsTest(id) {
  testSkip(id);
  /* let testdata = "\r\n\r\n[Chor]\r\ntestchor\r\n\r\n[Vers]\r\nteststrophe\r\n\r\n asdasd";
  let cleaned_testdata = (testdata.replace(/\r/g, "")).split("\n");	//Delete all the Carriage Return Characters
  let expected = JSON.stringify([2, 5]);
  let given = JSON.stringify(getStartingPositionOfParts(cleaned_testdata));

  expected == given ? testPass(4) : testFail(4);
  */
}

// Not yet tested - maybe not testable, since it's a function that uses many other not yet tested functions
function extractPartsTest(id) {
  testSkip(id);
}
