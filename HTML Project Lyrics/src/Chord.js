class Chord {
  constructor(_note, _sharpflat, _minmaj, _sus, _slash, _position) {
    this.noteNumber = noteToNumber(_note, _sharpflat);
    this.minmaj = _minmaj;
    this.sus = _sus;
    this.slashNumber = noteToNumber(_slash, "");
    this.position = _position;
  }

  transpose(ammount) {
    const transposedNoteNummber = (this.noteNumber + ammount) % 12;
    this.noteNumber = transposedNoteNummber === 0 ? 12 : transposedNoteNummber;

    const transposedSlashNumber = (this.slashNumber + ammount) % 12;
    this.slashNumber = transposedSlashNumber === 0 ? 12 : transposedSlashNumber;
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
