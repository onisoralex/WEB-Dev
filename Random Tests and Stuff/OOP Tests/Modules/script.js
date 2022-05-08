import * as c from "./calc.js";
import * as numbs from "./number.js";

window.start = () => {
  console.log(numbs.b.num); // The numbers were changed before this was called, so the "updated" values are shown
  console.log(`primitiveCopy = ${c.a}; objectNumThroughReference = ${c.b.num}; objectNum = ${c.bNum}`);
};
