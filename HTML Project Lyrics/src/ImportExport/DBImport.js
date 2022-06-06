import Song from "../DataClasses/Song.js";

let fileText = "dd";

const openAndReadFile = (eventNode) => {
  const input = eventNode.target; // Takes Information from the HTML element that executed this Script
  const fileReader = new FileReader(); // Create a new File Reader

  // Add an event listener which executes when the file has been loaded
  fileReader.onload = () => { fileText = fileReader.result; }; // Reads the file and returns the content

  fileReader.readAsText(input.files[0]); // Reads first File from Array
};

const importFromDBFile = (eventNode) => {
  openAndReadFile(eventNode);
  return fileText;
};

export { importFromDBFile };
