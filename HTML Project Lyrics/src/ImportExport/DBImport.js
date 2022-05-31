import Song from "../DataClasses/Song.js";

const openDBImportFile = () => console.log("import");
const importFromDBFile = (eventNode, fileTarget) => {
  const input = eventNode.target; // Takes Information from the HTML element that executed this Script
  const fileReader = new FileReader(); // Create a new File Reader
  const targetNode = fileTarget;

  fileReader.onload = () => {
    targetNode.innerText = fileReader.result; // Reads the Lyrics from the Object and display them
  };

  fileReader.readAsText(input.files[0]); // Reads first File from Array
};

export {
  importFromDBFile,
  openDBImportFile,
};
