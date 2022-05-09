import {
  getSongTitleTest,
  getArtistTest,
  getDefaultSongKeyTest,
  getDefaultSongStructureTest,
} from "./BasicInfoTests/BasicInfoTests.js";
import {
  extractAndPrepareInformationFromEditorTest,
  createTextAndChordsTest,
  searchAndGetLyricsPartsTest,
  getStartingPositionOfPartsTest,
  extractPartsTest,
} from "./ProcessingTests/ProcessingTests.js";
import Chord from "../src/DataClasses/Chord.js";

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

  result += "<hr>";

  // Processing Tests
  result += extractAndPrepareInformationFromEditorTest(5, window.song);
  result += createTextAndChordsTest(6);
  result += searchAndGetLyricsPartsTest(7);
  result += getStartingPositionOfPartsTest(8);
  result += extractPartsTest(9);

  result += "<hr>";

  // Chord Object Test
  const a = [];
  a.push(`1: ${new Chord(5, "G", "#", "m", 7, "sus4", "D").getChord() === "G#m7sus4/D"}\n`);
  a.push(`2: ${new Chord(5, "B", "#", "m", 7, "sus2", "").getChord() === "Cm7sus2"}\n`);
  a.push(`3: ${new Chord(5, "F", "b", "m", 7, "dim", "D").getChord() === "Em7dim/D"}\n`);
  a.push(`4: ${new Chord(5, "G", "#", "", 7, "", "D").getChord() === "G#7/D"}\n`);
  a.push(`5: ${new Chord(5, "g", "#", "m", 0, "aug", "D").getChord() === "G#maug/D"}\n`);
  a.push(`6: ${new Chord(5, "g", "", "", 0, "", "").getChord() === "Gm"}\n`);
  a.push(`7: ${new Chord(5, "G#m7sus4/D").getChord() === "G#m7sus4/D"}\n`);
  a.push(`8: ${new Chord(5, "Cm7sus2").getChord() === "Cm7sus2"}\n`);
  a.push(`9: ${new Chord(5, "Em7dim/d").getChord() === "Em7dim/D"}\n`);
  a.push(`10: ${new Chord(5, "g#7/D").getChord() === "G#m7/D"}\n`);
  a.push(`11: ${new Chord(5, "G#maug/D").getChord() === "G#maug/D"}\n`);
  a.push(`12: ${new Chord(5, "Gm").getChord() === "Gm"}\n`);
  a.push(`13: ${new Chord(5, "G#m7sus4/D").transpose(5).getChord() === "C#m7sus4/G"}\n`);
  a.push(`14: ${new Chord(5, "G#m7sus4/D").transpose(-4).getChord() === "Em7sus4/Bb"}\n`);
  a.push(`15: ${new Chord(5, "G#m7sus4/D").transpose(12).getChord() === "G#m7sus4/D"}\n`);
  result += a;

  window.result = result;
};
