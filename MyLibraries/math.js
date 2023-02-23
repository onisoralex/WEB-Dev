/*
const lerp = (t, min, max) => (max - min) * t + min;

const invLerp = (min, max, t) => (t - min) / (max - min);

const mapRange = (t, iMin, iMax, oMin, oMax) => {
  const t = invLerp(iMin, iMax, t);
  return lerp(t, oMin, oMax);
};

const mapRange = (t, iMin, iMax, oMin, oMax) => {
  return ((t - iMin) / (iMax - iMin) * (oMax - oMin) + oMin)
};
*/

function lerp(t, min, max) {
  return min * (1 - t) + max * t;
}

function invLerp(min, max, t) {
  if (Math.abs(min - max) < Number.EPSILON) return 0;
  return (t - min) / (max - min);
}

function mapRange(value, iMin, iMax, oMin, oMax, clamp) {
  // Reference:
  // https://openframeworks.cc/documentation/math/ofMath/
  if (Math.abs(iMin - iMax) < Number.EPSILON) return oMin;
  const outVal = ((value - iMin) / (iMax - iMin) * (oMax - oMin) + oMin);
  if (clamp) {
    if (oMax < oMin) {
      if (outVal < oMax) return oMax;
      if (outVal > oMin) return oMin;
    }
    if (outVal > oMax) return oMax;
    if (outVal < oMin) return oMin;
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

const degToRad = (degrees) => (degrees * Math.PI) / 180;

const radToDeg = (radians) => (radians * 180) / Math.PI;

export {
  lerp,
  invLerp,
  mapRange,
  numToHex,
  hexToRgb,
  rgbToHex,
  degToRad,
  radToDeg,
};
