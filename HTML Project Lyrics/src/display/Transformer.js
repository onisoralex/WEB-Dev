// Replace the space (and eventuall multiple trailing spaces) with a nonbreaking space
// It's the only solution to create fixed spaces. Will cause nonbreaking points in text.
// Could eventually be fixed with usage of CSS Grid-View
const removeTrailingSpacesAddNBSP = (text) => `${text.trimEnd()}&nbsp;`;

const removeLeadingSpacesAddNBSP = (text) => `&nbsp;${text.trimStart()}`;

const isLastElement = (i, e) => (i + 1) === e.length;

const makeLine = (chordsLine, lyricsLine) => {
  let text = "";

  for (let i = 0; i < chordsLine.length; i++) {
    const a = chordsLine[i].getChordAsText();

    const chordStart = chordsLine[i].getPosition();
    const chordEnd = (isLastElement(i, chordsLine)) ? lyricsLine.length : chordsLine[i + 1].getPosition();
    let preChord = "";
    const postChord = "&nbsp;";
    let b = lyricsLine.substring(chordStart, chordEnd);
    console.log(i, b);
    // If a block ends with a space remove trailing spaces and replace it with a non-breaking space
    if (b.at(b.length - 1) === " ") b = removeTrailingSpacesAddNBSP(b);
    if (b.at(0) === " ") b = removeLeadingSpacesAddNBSP(b);
    if (b === "") {
      b = "&nbsp;";
      preChord = (chordStart === 0) ? "&nbsp;" : "&nbsp;&nbsp;&nbsp;";
    }
    text += `<c-b t="${preChord}${a}${postChord}">${b}</c-b>`;
  }
  text += "<br>";
  console.log(text);

  return text;
};

const makeText = (parts) => {
  let text = "";
  for (let i = 0; i < 2; i++) {
    const part = parts[i];
    const { codedChords, lyrics } = part;

    text += `<div class="js-song__part-container">`;
    text += `<div class="js-song__part-name--visible"><strong>${part.name}</strong><br></div>`;
    for (let j = 0; j < codedChords.length; j++) {
      const chordsLine = codedChords[j];
      const lyricsLine = (typeof lyrics === "undefined") ? "" : lyrics[j];
      text += makeLine(chordsLine, lyricsLine);
    }
    text += `</div>`;
  }

  return text;
};

const createText = (song) => {
  let display = "";

  display += `<div id="js-song__title"><h2>${song.getTitle()}</h2></div>`;
  display += `<div id="js-song__artist"><strong>Artist:</strong> ${song.getArtist()}</div>`;
  display += `<div id="js-song__defaultKey"><strong>Default Key:</strong> ${song.getDefaultKey()}</div>`;
  display += `<div id="js-song__currentKey"><strong>Current Key:</strong> ${song.getKey()}</div>`;
  display += `<div id="js-song__tempo"><strong>Tempo:</strong> ${song.getTempo()}</div>`;
  display += `<div id="js-song__text"><br>${makeText(song.songParts)}<br></div>`;
  display += `<div id="js-song__defaultStructure"><strong>Default Structure:</strong> ${song.getDefaultStructure()}<strong></div>`;

  return display;
};

export { createText };
