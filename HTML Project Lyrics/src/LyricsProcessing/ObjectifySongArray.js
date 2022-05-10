import * as Utils from "../Utilities/Utils.js";
import * as Base from "./BasicInfoFunctions.js";

const objectifySong = (songArray) => {
  const o = {};
  o.artist = songArray.artist;
  o.defaultKey = songArray.defaultKey;
  o.defaultStructure = songArray.defaultStructure;
  o.tempo = songArray.tempo;
  o.title = songArray.title;
  o.songparts = [];
  for (let i = 0; i < songArray.length; i++) {
    o.songparts.push(songArray[i]);
  }

  console.log(o);
  console.log(JSON.stringify(o));
  return songArray;
};

export { objectifySong };
