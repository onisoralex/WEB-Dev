function generateUID() {
  const hexValuesArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
  const uidCharacterArray = ["x", "x", "x", "x", "x", "x", "x", "x", "-", "x", "x", "x", "x", "-", "4", "x", "x", "x", "-", "y", "x", "x", "x", "-", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]; // xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
  let uidString = "";
  let index = 0;
  let rb = Math.random() * 0xffffffff | 0; // Generate new random number

  while (index++ < 36) {
    const uidCharacter = uidCharacterArray[index - 1];
    const r = rb & 0xf;
    const hexValueIndex = (uidCharacter == "x") ? r : (r & 0x3 | 0x8); // If the character should be a random HEX
    uidString += (uidCharacter == "-" || uidCharacter == "4") ? uidCharacter : hexValuesArray[hexValueIndex];
    rb = (index % 8 === 0) ? (Math.random() * 0xffffffff | 0) : (rb >> 4);
  }
  return uidString;
}

function populateArray() {
  const guids = [];
  const it = 20;
  const output = document.getElementById("output");

  for (let i = 0; i < it; i++) {
    guids.push(generateUID());
    // console.log(guids[i]);
  }

  let h = "";
  for (let i = 0; i < it; i++) {
    h += `<br>${guids[i]}`;
  }
  output.innerHTML = h;
}
