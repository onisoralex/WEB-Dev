import Chord from "./Chord.js";

class Song {
  constructor(_partsArray) {
    this.parts = this.splitParts(_partsArray);

    // declarations only to avoid errors. To be deleted
    this.parts = `${song}`;
    this.lines = "";
    this.chords = "";
  }

  // TODO
  static splitParts(partsArray) {
    for (let i = 0; i < partsArray.length; i++) {

    }
  }

  static transposeSong(ammount) {
    for (let i = 0; i <= this.parts.length; i++) {
      for (let j = 0; j <= this.lines.length; j++) {
        for (let k = 0; k <= this.chords.length; k++) {
          Chord.transpose(ammount);
        }
      }
    }
  }
}

export { Song as default };
