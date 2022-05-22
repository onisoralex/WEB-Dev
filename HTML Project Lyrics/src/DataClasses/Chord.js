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

const regExpr = /(^[A-G]|^[a-g])(#|b)?(m)?([1-9])?(sus2|sus4|sus|dim|aug)?/;
Object.freeze(regExpr);

class Chord {
  constructor(_position, _note, _sharpFlat, _majMin, _extraNoteNumber, _special, _slashNote) {
    if (_sharpFlat === undefined
      && _majMin === undefined
      && _extraNoteNumber === undefined
      && _special === undefined
      && _slashNote === undefined) {
      const chord = _note;
      const [mainChord, slashChord] = chord.split("/").map((e) => e || "");
      const matches = mainChord.match(regExpr);
      // let codedChord;

      if (matches === null || matches === undefined) {
        throw new Error(`Invalid chord found! (${chord}) Delete this chord!`);
      } else {
        matches.shift(); // Remove first element which is the complete match found. We only need the match groups.
        const cleanMatches = matches.map((e) => e || "");
        // codedChord = new Chord(matches[0], matches[1], matches[2], matches[3], matches[4], slashChord, _position);

        this.position = _position; // Position in the text
        this.noteNumber = Chord.noteToNumber(cleanMatches[0].toUpperCase() + cleanMatches[1]);
        this.majMin = Chord.majorOrMinor(cleanMatches[0], cleanMatches[2]); // duh...
        this.extraNoteNumber = cleanMatches[3]; // The 7 in a G7
        this.special = cleanMatches[4]; // The "sus" in Gsus, "sus2" in a Gsus2, "sus4" in Gsus4, "dim" in Gdim or "dim7" in Gdim7
        this.slashNoteNumber = (slashChord === undefined) ? 0 : Chord.noteToNumber(slashChord.toUpperCase()); // The F# in a D/F#
      }
    } else {
      this.position = _position; // Position in the text
      this.noteNumber = Chord.noteToNumber(_note.toUpperCase() + _sharpFlat);
      this.majMin = Chord.majorOrMinor(_note, _majMin); // duh...
      this.extraNoteNumber = _extraNoteNumber; // The 7 in a G7
      this.special = _special; // The "sus" in Gsus, "sus2" in a Gsus2, "sus4" in Gsus4, "dim" in Gdim or "dim7" in Gdim7
      this.slashNoteNumber = (_slashNote === "") ? 0 : Chord.noteToNumber(_slashNote.toUpperCase()); // The F# in a D/F#
    }
  }

  // Destructive transpose
  transpose(ammount) {
    this.noteNumber = (this.noteNumber + ammount) % 12;
    this.noteNumber += (this.noteNumber <= 0) ? 12 : 0;

    this.slashNoteNumber = (this.slashNoteNumber + ammount) % 12;
    this.slashNoteNumber += (this.slashNoteNumber <= 0) ? 12 : 0;
    return this;
  }

  // Am = min, am = min, a = min, A = maj
  static majorOrMinor(note, majMin) {
    if (majMin === "m") return majMin;
    return (note.toLowerCase() === note) ? "m" : "";
  }

  static noteToNumber(note) {
    return typeof note === "undefined" ? "" : NUMBERS[note];
  }

  // Getters/Setters
  getPosition() {
    return this.position;
  }

  getNoteNumber() {
    return this.noteNumber;
  }

  getMajMin() {
    return this.majMin;
  }

  getExtraNoteNumber() {
    return this.extraNoteNumber;
  }

  getSpecial() {
    return this.special;
  }

  getSlashNoteNumber() {
    return this.slashNoteNumber;
  }

  setPosition(position) {
    this.position = position;
  }

  setNoteNumber(noteNumber) {
    this.noteNumber = noteNumber;
  }

  setMajMin(majMin) {
    this.majMin = majMin;
  }

  setExtraNoteNumber(extraNoteNumber) {
    this.extraNoteNumber = extraNoteNumber;
  }

  setSpecial(special) {
    this.special = special;
  }

  setSlashNoteNumber(slashNoteNumber) {
    this.slashNoteNumber = slashNoteNumber;
  }

  // Special Getters/Setters
  getChordAsText() {
    const extraNoteNumber = this.extraNoteNumber === 0 ? "" : this.extraNoteNumber;
    const slashNoteNumberString = ((this.slashNoteNumber === 0) ? "" : "/") + NOTES[this.slashNoteNumber];
    return `${NOTES[this.noteNumber]}${this.majMin}${extraNoteNumber}${this.special}${slashNoteNumberString}`;
  }
}

export { Chord as default };
