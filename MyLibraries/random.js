const range = (min, max) => Math.random() * (max - min) + min;

// This is also inclusive max number
const rangeInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1) + min);

const getRandomRangeArray = (n, min, max) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(range(min, max));
  }
  return arr;
};

export {
  range,
  rangeInt,
  getRandomRangeArray,
};
