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
  constructor(_note, _sharpFlat, _majMin, _number, _sus, _slash, _position) {
    this.noteNumber = this.noteToNumber(_note.toUpperCase() + _sharpFlat);
    this.majmin = _majMin;
    this.majorOrMinor(_note);
    this.number = _number;
    this.sus = _sus;
    this.slashNumber = this.noteToNumber(_slash);
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
    return NOTES[note];
  }

  getNote() {
    return NUMBERS[this.noteNumber];
  }
}

/* Variation with String note information before reducing it to only numberic notes
class Chord {
  constructor(_note, _sharpflat, _minmaj, _sus, _slash, _position) {
    this.baseNote = _note;
    this.sharpFlat = _sharpflat;
    this.noteNumber = noteToNumber(this.baseNote, this.sharpFlat);
    this.minmaj = _minmaj;
    this.sus = _sus;
    this.slash = _slash;
    this.slashNumber = noteToNumber(_slash, "");
    this.position = _position;
  }

  transpose(ammount) {
    const transposedNoteNummber = (this.noteNumber + ammount) % 12;
    this.noteNumber = transposedNoteNummber === 0 ? transposedNoteNummber + 12 : transposedNoteNummber;
    const newNote = numberToNote(this.noteNumber);
    [this.baseNote, this.sharpFlat] = newNote.split("");
    if (this.sharpFlat === undefined) this.sharpFlat = "";

    const transposedSlashNumber = (this.slashNumber + ammount) % 12;
    this.slashNumber = transposedSlashNumber === 0 ? transposedSlashNumber + 12 : transposedSlashNumber;
    this.slash = numberToNote(this.slashNumber);
  }
}
*/
