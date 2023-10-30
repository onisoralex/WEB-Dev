window.openAndDisplayFile = async (eventNode, fileTarget) => {
  await alert("testtext"); // Alert wird angezeigt, aber nichts passiert, bis man auf "OK" heklickt hat.
  await readfile(eventNode, fileTarget); // Readfile is executed but aparently the code still continues with the next alert
  alert("finished"); // This alert is executed and ONLY AFTER closing it the text will be displayed
};


const readfile = (_eventNode, fileTarget) => {
  const input = _eventNode.target; // Takes Information from the HTML element that executed this Script
  const fileReader = new FileReader(); // Create a new File Reader
  const targetNode = fileTarget;

  fileReader.onload = () => {
    targetNode.innerHTML = "<pre>".concat(fileReader.result, "</pre>"); // Reads the Lyrics from the Object and display them
  };

  fileReader.readAsText(input.files[0]); // Reads first File from Array
};