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

const isIterateable = (o) => o.toString().match(/[0-9]+/) !== null;

const isLastElement = (i, e) => i === e.length - 1;

const openAndDisplayFile = (eventNode, fileTarget) => {
  const input = eventNode.target; // Takes Information from the HTML element that executed this Script
  const fileReader = new FileReader(); // Create a new File Reader
  const targetNode = fileTarget;

  fileReader.onload = () => {
    targetNode.innerText = fileReader.result; // Reads the Lyrics from the Object and display them
  };

  fileReader.readAsText(input.files[0]); // Reads first File from Array
};
const createFileDownloadLink = (obj, filename, element) => {
  const mimeType = "text/plain";
  const downloadlinkElement = element;
  const content = JSON.stringify(obj);
  const theFile = new Blob([content], { type: mimeType });

  downloadlinkElement.href = URL.createObjectURL(theFile);
  downloadlinkElement.download = filename;
};

const getIndexInArrayStartingFrom = (needle, haystack, n) => haystack.indexOf(needle, n);

const getIndexInArray = (needle, haystack) => haystack.indexOf(needle);

const isInArray = (needle, haystack) => (getIndexInArray(needle, haystack) > -1);

export {
  deepCopy,
  isIterateable,
  isLastElement,
  openAndDisplayFile,
  createFileDownloadLink,
  getIndexInArrayStartingFrom,
  getIndexInArray,
  isInArray,
};
