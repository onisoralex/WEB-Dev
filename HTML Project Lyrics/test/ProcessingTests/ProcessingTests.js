// ====================================
// ========= Basic functions ==========
// ====================================

let result = "";
let resultfield = null;
let song = null;
// Styling scripts
let greenstyle = "<span style=\"color: MediumSeaGreen;\"> ";
let redstyle = "<span style=\"background-color: Tomato; color: white;\">";
let bluestyle = "<span style=\"color: DodgerBlue;\"> ";
let closespannextline = "</span><br>";
let closespan = "</span>";
let nextline = "<br>";

function testPass(id) {
  result += `${id}${greenstyle}PASS${closespannextline}`;
}

function testFail(id) {
  result += `${id}${redstyle}FAIL${closespannextline}`;
}

function testSkip(id) {
  result += `${id}${bluestyle}SKIP${closespannextline}`;
}

function testPassInfo(id, info) {
  result += `${id} ${greenstyle}PASS${closespan} ${info}${nextline}`;
}

function testFailInfo(id, info) {
  result += `${id} ${redstyle}FAIL${closespan} ${info}${nextline}`;
}

function testSkipInfo(id, info) {
  result += `${id} ${bluestyle}SKIP${closespan} ${info}${nextline}`;
}

function preparations() {
  resultfield = document.getElementById("result");
  song = document.getElementById("songtext").innerHTML;
}

function setResult() {
  resultfield.innerHTML = result;
}

// ====================================
// ============== Tests ===============
// ====================================

function extractAndPrepareInformationFromEditorTest() {
  let regex = "Where Would I Be Without You";
  // Add a line bevore the first test as delimiter
  result += "<hr>";
  let expected = true;
  let given = (song.match(regex).index != 0); // Check if the regex value exists

  expected == given ? testPass(1) : testFail(1);
}

// Not yet tested - maybe not testable, since it's a function that uses many other not yet tested functions
function createTextAndChordsTest() {
  //TODO
  testSkip(2);
}

// Not yet tested - maybe not testable, since it's a function that uses many other not yet tested functions
function searchAndGetLyricsPartsTest() {
  //TODO
  testSkip(3);
}

function getStartingPositionOfPartsTest() {
  let testdata = "\r\n\r\n[Chor]\r\ntestchor\r\n\r\n[Vers]\r\nteststrophe\r\n\r\n asdasd";
  let cleaned_testdata = (testdata.replace(/\r/g, "")).split("\n");	//Delete all the Carriage Return Characters 
  let expected = JSON.stringify([2, 5]);
  let given = JSON.stringify(getStartingPositionOfParts(cleaned_testdata));

  expected == given ? testPass(4) : testFail(4);
}

// Not yet tested - maybe not testable, since it's a function that uses many other not yet tested functions
function extractPartsTest() {
  testSkip(5);
}