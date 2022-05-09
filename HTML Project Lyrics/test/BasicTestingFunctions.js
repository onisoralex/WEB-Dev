// ====================================
// ========= Basic functions ==========
// ====================================

// Styling scripts
const greenstyle = "<span style=\"color: MediumSeaGreen;\"> ";
const redstyle = "<span style=\"background-color: Tomato; color: white;\">";
const bluestyle = "<span style=\"color: DodgerBlue;\"> ";
const closespan = "</span>";
const nextline = "<br>";

function testPass(id) {
  return `${id}${greenstyle}PASS${closespan}${nextline}`;
}

function testFail(id) {
  return `${id}${redstyle}FAIL${closespan}${nextline}`;
}

function testSkip(id) {
  return `${id}${bluestyle}SKIP${closespan}${nextline}`;
}

function testPassInfo(id, info) {
  return `${id} ${greenstyle}PASS${closespan} ${info}${nextline}`;
}

function testFailInfo(id, info) {
  return `${id} ${redstyle}FAIL${closespan} ${info}${nextline}`;
}

function testSkipInfo(id, info) {
  return `${id} ${bluestyle}SKIP${closespan} ${info}${nextline}`;
}

export {
  testPass,
  testFail,
  testSkip,
  testPassInfo,
  testFailInfo,
  testSkipInfo,
};
