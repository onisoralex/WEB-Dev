import Song from "../DataClasses/Song.js";

// Promise goes together with the async/await in the main.js import script
const loadFile = (eventNode) => new Promise((resolve, reject) => {
  const input = eventNode.target; // Takes Information from the HTML element that executed this Script
  const fileReader = new FileReader(); // Create a new File Reader
  fileReader.readAsText(input.files.item(0)); // Reads first File from Array
  // Add an event listener which executes when the file has been loaded - Reads the file and returns the content
  fileReader.onload = () => { resolve(fileReader.result); };
  fileReader.onError = () => { reject(new Error("ERROR READING THE IMPORT FILE!")); };
});

const importFromDBFile = (eventNode) => {
  const fileText = loadFile(eventNode); // Causes a promise object to be returned
  // console.log(fileText); // The fileText variable contains at this point still the Promise object
  return fileText; // Defines the actual content of the returned promise
};

const transformIntoSongObjectArray = (importedText) => {
  console.log(JSON.parse(importedText));
};

export {
  importFromDBFile,
  transformIntoSongObjectArray,
};
