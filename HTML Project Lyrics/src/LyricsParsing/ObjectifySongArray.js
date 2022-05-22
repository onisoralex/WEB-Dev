import Chord from "../DataClasses/Chord.js";

const copyChordsOfPart = (chordLines) => {
  const chords = [];

  for (let i = 0; i < chordLines.length; i++) {
    const chordLine = chordLines[i];
    const newChordLine = [];

    for (let j = 0; j < chordLine.length; j++) {
      const chord = chordLine[j];
      newChordLine.push(new Chord(chord.getPosition(), chord.getChordAsText()));
    }

    chords.push(newChordLine);
  }

  return chords;
};

const getSongPart = (songArrayPart) => {
  const o = {};

  o.name = songArrayPart.name;
  o.lyrics = songArrayPart.lyrics;
  o.codedChords = copyChordsOfPart(songArrayPart.transformedChords.codedChords);

  return o;
};

const getSongFromParsedText = (songArray) => {
  const o = {};
  o.artist = songArray.artist;
  o.defaultKey = songArray.defaultKey;
  o.defaultStructure = songArray.defaultStructure;
  o.tempo = songArray.tempo;
  o.title = songArray.title;
  o.songParts = [];

  for (let i = 0; i < songArray.length; i++) {
    o.songParts.push(getSongPart(songArray[i]));
  }

  return o;
};

export { getSongFromParsedText };
