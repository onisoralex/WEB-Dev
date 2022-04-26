// ====================================
// ============== Tests ===============
// ====================================

function getSongTitleTest() {
  const testdata = ["", "", "Title: testtitle", "", " "];
  const expected = "testtitle";
  const given = getSongTitle(testdata, testdata.length);

  // Add delimiter line before first song info test
  result += "<hr>";
  return given === expected ? testPassInfo(6, "Songtext") : testFailInfo(6, "Songtext");
}

function getArtistTest() {
  const testdata = ["asd", "", " ", "Artist: artistname", " ", "", "dsasd"];
  const expected = "artistname";
  const given = getArtist(testdata, testdata.length);

  return given === expected ? testPassInfo(7, "Artist") : testFailInfo(7, "Artist");
}

function getDefaultSongKeyTest() {
  const testdata = ["asd", "", " ", "Key: G#", " ", "", "dsasd"];
  const expected = "G#";
  const given = getDefaultSongKey(testdata, testdata.length);

  return given === expected ? testPassInfo(8, "Key") : testFailInfo(8, "Key");
}

function getDefaultSongStructureTest() {
  const testdata = ["ölölä", " ", "", "\n", "Struktur: V1, Ch x 2, V2, Ch x 2, Solo, Br, Ch x 2, Outro x 2", "", " ", "asd"];
  const expected = "V1, Ch x 2, V2, Ch x 2, Solo, Br, Ch x 2, Outro x 2";
  const given = getDefaultSongStructure(testdata);

  return given === expected ? testPassInfo(9, "Songstructure") : testFailInfo(9, "Songstructure");
}
