import * as Utils from "../Utilities/Utils.js";
import Chord from "./Chord.js";

class Song {
  constructor(song) {
    this.artist = song.artist;
    this.defaultKey = song.defaultKey;
    this.defaultStructure = song.defaultStructure;
    this.tempo = song.tempo;
    this.title = song.title;
    this.songParts = song.songParts;
  }

  transpose(ammount) {
    // Can be simplified a bit, but is currently necessary, because deepCopy of the whole song doesn't copy Chord objects
    const newSong = Utils.deepCopy(this);

    for (let i = 0; i < this.songParts.length; i++) {
      const originalSongPart = this.songParts[i];
      const newSongPart = newSong.songParts[i];
      for (let j = 0; j < originalSongPart.codedChords.length; j++) {
        const originalChordsLine = originalSongPart.codedChords[j];
        const newChordsLine = newSongPart.codedChords[j];
        for (let k = 0; k < originalChordsLine.length; k++) {
          const originalChord = originalChordsLine[k];
          const newChord = new Chord(originalChord.position, originalChord.getChordAsText()).transpose(ammount);
          newChordsLine[k] = newChord;
        }
      }
    }

    return new Song(newSong);
  }

  getArtist() {
    return this.artist;
  }

  getDefaultKey() {
    return this.defaultKey;
  }

  getDefaultStructure() {
    return this.defaultStructure;
  }

  getTempo() {
    return this.tempo;
  }

  getTitle() {
    return this.title;
  }

  getSongParts() {
    return this.songParts;
  }

  getChord(songPart, chordLine, chord) {
    return this.songParts[songPart].codedChords[chordLine][chord];
  }

  setArtist(artist) {
    this.artist = artist;
  }

  setDefaultKey(key) {
    this.defaultKey = key;
  }

  setDefaultStructure(defaultStructure) {
    this.defaultStructure = defaultStructure;
  }

  setTempo(tempo) {
    this.tempo = tempo;
  }

  setTitle(title) {
    this.title = title;
  }

  setSongParts(songParts) {
    this.songParts = songParts;
  }

  setChordWithNewPosition(songPart, chordLine, chord, position, newChord) {
    this.songParts[songPart].codedChords[chordLine][chord] = new Chord(position, newChord.getChordAsText());
  }

  setChordWithOldPosition(songPart, chordLine, chord, newChord) {
    const c = this.songParts[songPart].codedChords[chordLine][chord];
    this.setChordWithNewPosition(songPart, chordLine, chord, c.getPosition(), newChord);
  }
}

export { Song as default };
