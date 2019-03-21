// ===============================
// Basic functions
// ===============================

let result = "";

function testPass(id) {
  result = result + id + " PASS\n";
}

function testFail(id) {
  result = result + id + " FAIL\n";
}

function setResult() {
  document.getElementById("result").innerHTML = result;
}

// =======================================
// Tests
// =======================================

function extractAndPrepareInformationFromEditorTest() {
  let song = document.getElementById("songtext").innerHTML;
  let regex = "Where Would I Be Without You";
  if (song.match(regex).index != 0 ? testPass(1) : testFail(1));
}

// Not yet tested
function createTextAndChordsTest() {
}