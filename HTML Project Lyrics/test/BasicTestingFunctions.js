// ====================================
// ========= Basic functions ==========
// ====================================

// Styling scripts
const greenstyle = "<span style=\"color: MediumSeaGreen;\"> ";
const redstyle = "<span style=\"background-color: Tomato; color: white;\">";
const bluestyle = "<span style=\"color: DodgerBlue;\"> ";
const closespan = "</span>";
const nextline = "<br>";

function testPass(id, info) {
  return `${id} ${greenstyle}PASS${closespan} ${typeof (info) === "undefined" ? "" : info}${nextline}`;
}

function testFail(id, info) {
  return `${id} ${redstyle}FAIL${closespan} ${typeof (info) === "undefined" ? "" : info}${nextline}`;
}

function testSkip(id, info) {
  return `${id} ${bluestyle}SKIP${closespan} ${typeof (info) === "undefined" ? "" : info}${nextline}`;
}

export {
  testPass,
  testFail,
  testSkip,
};
