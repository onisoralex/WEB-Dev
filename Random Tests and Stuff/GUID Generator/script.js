function a() {
  let h = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
  let k = ["x", "x", "x", "x", "x", "x", "x", "x", "-", "x", "x", "x", "x", "-", "4", "x", "x", "x", "-", "y", "x", "x", "x", "-", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"];
  let u = "";
  let i = 0;
  let rb = Math.random() * 0xffffffff | 0;

  while (i++ < 36) {
    let c = k[i - 1];
    let r = rb & 0xf;
    let v = (c == "x") ? r : (r & 0x3 | 0x8);
    u += (c == "-" || c == "4") ? c : h[v];
    rb = (i % 8 === 0) ? (Math.random() * 0xffffffff | 0) : (rb >> 4);
  }
  return u;
}

function populateArray() {
  console.log("start");
  let guids = [];
  let it = 20;
  let output = document.getElementById("output");

  console.log(output);

  for (let i = 0; i < it; i++) {
    guids.push(a());
    // console.log(guids[i]);
  }

  let h = "";
  for (let i = 0; i < it; i++) {
    h += "<br>" + guids[i];
  }
  output.innerHTML = h;
}
