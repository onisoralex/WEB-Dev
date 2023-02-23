const lerp = (a, b, t) => (b - a) * t + a;
const invLerp = (a, b, v) => (v - a) / (b - a);
const mapRange = (v, iMin, iMax, oMin, oMax) => {
  const t = invLerp(iMin, iMax, v);
  return lerp(oMin, oMax, t);
};

export { lerp, invLerp, mapRange };
