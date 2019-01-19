function start() {
  let a = [1, 2, 3, 4, 5];
  console.log("5: " + a);
  a = f1(a);
  console.log("6: " + a);
  a = f2(a);
  console.log("7: " + a);
}

function f1(a) {
  a.push(6);
  console.log("6: " + a);
  return a;
}

function f2(a) {
  a.push(7);
  console.log("7: " + a);
  return a;
}