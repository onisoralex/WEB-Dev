const NOTES = {
  "B#": 1,
  C: 1,
  "C#": 2,
  Db: 2,
  D: 3,
  "D#": 4,
  Eb: 4,
  E: 5,
  Fb: 5,
  "E#": 6,
  F: 6,
  "F#": 7,
  Gb: 7,
  G: 8,
  "G#": 9,
  Ab: 9,
  A: 10,
  "A#": 11,
  Bb: 11,
  B: 12,
  Cb: 12,
};
Object.freeze(NOTES);

const NUMBERS = {
  1: "C",
  2: "C#",
  3: "D",
  4: "D#",
  5: "E",
  6: "F",
  7: "F#",
  8: "G",
  9: "G#",
  10: "A",
  11: "Bb",
  12: "B",
};
Object.freeze(NUMBERS);

class Chord {
  constructor(_note, _sharpFlat, _majMin, _number, _special, _slash, _position) {
    this.noteNumber = Chord.noteToNumber(_note.toUpperCase() + _sharpFlat);
    this.majmin = _majMin;
    this.majorOrMinor(_note);
    this.number = _number;
    this.special = _special;
    this.slashNumber = Chord.noteToNumber(_slash);
    this.position = _position;
  }

  transpose(ammount) {
    const transposedNoteNummber = (this.noteNumber + ammount) % 12;
    this.noteNumber = transposedNoteNummber === 0 ? 12 : transposedNoteNummber;

    const transposedSlashNumber = (this.slashNumber + ammount) % 12;
    this.slashNumber = transposedSlashNumber === 0 ? 12 : transposedSlashNumber;
  }

  majorOrMinor(note) {
    if (note.toLowerCase() === note) {
      this.majmin = "m";
    }
  }

  static noteToNumber(note) {
    return typeof note === "undefined" ? "" : NOTES[note];
  }

  getNote() {
    return NUMBERS[this.noteNumber];
  }
}
