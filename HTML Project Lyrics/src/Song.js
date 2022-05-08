import Chord from "./Chord";

class Song {
  constructor(song) {
    this.noteNumber = 0;
  }

  static transposeSong(ammount) {
    for (let i = 0; i <= parts.length; i++) {
      for (let j = 0; j <= lines.length; j++) {
        for (let k = 0; k <= chords.length; k++) {
          Chord.transpose(ammount);
        }
      }
    }
  }
}

export { Song as default };
