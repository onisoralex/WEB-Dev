/*
const lerp = (min, max, v) => (max - min) * v + min;

const invLerp = (a, b, v) => (v - min) / (max - min);

const mapRange = (v, iMin, iMax, oMin, oMax) => {
  // const t = invLerp(iMin, iMax, v);
  // return lerp(oMin, oMax, t);
};
*/

function lerp(min, max, t) {
  return min * (1 - t) + max * t;
}

function invLerp(min, max, t) {
  if (Math.abs(min - max) < Math.EPSILON) return 0;
  return (t - min) / (max - min);
}

function mapRange(value, iMin, iMax, oMin, oMax, clamp) {
  // Reference:
  // https://openframeworks.cc/documentation/math/ofMath/
  if (Math.abs(iMin - iMax) < Math.EPSILON) {
    return oMin;
  }
  let outVal = ((value - iMin) / (iMax - iMin) * (oMax - oMin) + oMin);
  if (clamp) {
    if (oMax < oMin) {
      if (outVal < oMax) outVal = oMax;
      else if (outVal > oMin) outVal = oMin;
    } else if (outVal > oMax) outVal = oMax;
    else if (outVal < oMin) outVal = oMin;
  }
  return outVal;
}

const numToHex = (n) => (n <= 15 ? "0" : "") + n.toString(16);

const hexToRgb = (hex) => {
  const rr = parseInt(hex.slice(1, 3), 10);
  const gg = parseInt(hex.slice(3, 5), 10);
  const bb = parseInt(hex.slice(5, 7), 10);
  return { r: rr, g: gg, b: bb };
};

const rgbToHex = (rgb) => `#${numToHex(rgb.r)}${numToHex(rgb.g)}${numToHex(rgb.b)}`;
// const rgbToHex = (rgb) => `#${((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)}`;

const degToRad = (degrees) => (degrees / 180) * Math.PI;

export {
  lerp,
  invLerp,
  mapRange,
  numToHex,
  hexToRgb,
  rgbToHex,
  degToRad,
};
