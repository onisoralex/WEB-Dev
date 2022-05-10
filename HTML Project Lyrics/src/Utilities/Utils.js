const deepCopy = (inputObject) => {
  if (typeof inputObject !== "object" || inputObject === null) {
    return inputObject; // Return the value if input is not an object
  }

  const outputObject = Array.isArray(inputObject) ? [] : {};

  for (const key in inputObject) {
    const value = inputObject[key];
    outputObject[key] = deepCopy(value);
  }

  return outputObject;
};

const openFile = (event, fileTarget) => {
  const input = event.target; // Takes Information from the HTML that executed this Script
  const reader = new FileReader(); // Create a new File Reader
  const node = fileTarget;

  reader.onload = () => {
    node.innerText = reader.result; // Reads the Lyrics from the Object and display them
  };

  reader.readAsText(input.files[0]); // Reads first File from Array
};

const getIndexInArrayStartingFrom = (needle, haystack, n) => haystack.indexOf(needle, n);

const getIndexInArray = (needle, haystack) => haystack.indexOf(needle);

const isInArray = (needle, haystack) => (getIndexInArray(needle, haystack) > -1);

export {
  deepCopy,
  openFile,
  getIndexInArrayStartingFrom,
  getIndexInArray,
  isInArray,
};
