window.openAndDisplayFile = (eventNode, fileTarget) => {
  const input = eventNode.target; // Takes Information from the HTML element that executed this Script
  const fileReader = new FileReader(); // Create a new File Reader
  const targetNode = fileTarget;

  fileReader.onload = () => {
    targetNode.innerHTML = "<pre>".concat(fileReader.result, "</pre>"); // Reads the Lyrics from the Object and display them
  };

  fileReader.readAsText(input.files[0]); // Reads first File from Array
};