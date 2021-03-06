// ====================================
// ============== Tests ===============
// ====================================

function getSongTitleTest() {
  let testdata = ["", "", "testtitle", "", " "];
  let expected = "testtitle";
  let given = getSongTitle(testdata, testdata.length);

  // Add delimiter line before first song info test
  result += "<hr>";
  given == expected ? testPassInfo(6, "Songtext") : testFailInfo(6, "Songtext");
}

function getArtistTest() {
  let testdata = ["asd", "", " ", "Artist: artistname", " ", "", "dsasd"];
  let expected = "artistname";
  let given = getArtist(testdata, testdata.length);

  given == expected ? testPassInfo(7, "Artist") : testFailInfo(7, "Artist");
}

function getDefaultSongKeyTest() {
  let testdata = ["asd", "", " ", "Key: G#", " ", "", "dsasd"];
  let expected = "G#";
  let given = getDefaultSongKey(testdata, testdata.length);



  given == expected ? testPassInfo(8, "Key") : testFailInfo(8, "Key");
}

function getDefaultSongStructureTest() {
  let testdata_complete = ["[Vers1]\n", "[Chorus]", "[Vers2]", "[Vers3]", "[Bridge]", "[Info]"];
  let expected = "";
  let given = getDefaultSongStructure(testdata_complete);

  expected == given ? testPassInfo(9, Songstructure) : testFailInfo(9, "Songstructure");
}