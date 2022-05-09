import Chord from "./Chord.js";

class Song {
  constructor(song) {
    this.noteNumber = 0;
    // declarations only to avoid errors. To be deleted
    this.parts = `${song}`;
    this.lines = "";
    this.chords = "";
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
