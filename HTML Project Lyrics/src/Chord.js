const NUMBERS = {
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
Object.freeze(NUMBERS);

const NOTES = {
  0: "",
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
Object.freeze(NOTES);

class Chord {
  constructor(_note, _sharpFlat, _majMin, _extraNoteNumber, _special, _slashNote, _position) {
    this.noteNumber = Chord.noteToNumber(_note.toUpperCase() + _sharpFlat);
    this.majMin = Chord.majorOrMinor(_note, _majMin); // duh...
    this.extraNoteNumber = _extraNoteNumber; // The 7 in a G7
    this.special = _special; // The "sus" in Gsus, "sus2" in a Gsus2, "sus4" in Gsus4, "dim" in Gdim or "dim7" in Gdim7
    this.slashNoteNumber = (_slashNote === "") ? 0 : Chord.noteToNumber(_slashNote.toUpperCase()); // The F# in a D/F#
    this.position = _position; // Position in the text
  }

  constructor(_chord, _position) {
    const chord = chordsOfLine[j];
      const [mainChord, slashChord] = chord.split("/").map((e) => e || "");
      let matches = mainChord.match(re);
      let codedChord;

      if (matches === null || matches === undefined) {
        throw new Error(`Invalid chord found! (${chord}) Delete this chord!`);
      } else {
        matches.shift(); // Remove first element which is the complete match found. We only need the match groups.
        matches = matches.map((e) => e || "");
        codedChord = new Chord(matches[0], matches[1], matches[2], matches[3], matches[4], slashChord, chordPositionsOfPartArray[i][j]);
      }

      codedChordsOfLine.push(codedChord);
  }

  transpose(ammount) {
    const transposedNoteNummber = (this.noteNumber + ammount) % 12;
    this.noteNumber = transposedNoteNummber === 0 ? 12 : transposedNoteNummber;

    const transposedSlashNumber = (this.slashNoteNumber + ammount) % 12;
    this.slashNoteNumber = transposedSlashNumber === 0 ? 12 : transposedSlashNumber;
  }

  // Am = min, am = min, a = min, A = maj
  static majorOrMinor(note, majMin) {
    if (majMin === "m") return majMin;
    return (note.toLowerCase() === note) ? "m" : "";
  }

  static noteToNumber(note) {
    return typeof note === "undefined" ? "" : NUMBERS[note];
  }

  getChord() {
    const extraNoteNumber = this.extraNoteNumber === 0 ? "" : this.extraNoteNumber;
    const slashNoteNumberString = ((this.slashNoteNumber === 0) ? "" : "/") + NOTES[this.slashNoteNumber];
    return `${NOTES[this.noteNumber]}${this.majMin}${extraNoteNumber}${this.special}${slashNoteNumberString}`;
  }
}
