/*
Horse Problem
There are 25 Horses. You don't have a timer, but have to find the 3 fastest horses with as little races as possible.
A maximum of 5 horses can race each other at the same time.
*/

// Results of a run where the fastest were sorted to the right
const sortedHorses = [
  [21, 58, 69, 70, 100],
  [26, 72, 76, 85, 97],
  [25, 34, 63, 78, 96],
  [25, 52, 55, 64, 94],
  [20, 20, 35, 42, 47]];
const result = [97, 96, 85, 70, 69];

// Initialization
const horses = [];

// Put 25 horses in groups of 5 horses that will race each other
for (let j = 0; j < 5; j++) {
  const hg = [];
  for (let i = 0; i < 5; i++) {
    hg.push(Math.floor(Math.random() * 90 + 11)); // Create random speeds for the horses
  }
  horses.push(hg);
}

// First 5 Races: Find the fastest horses of every group.
// Sort the group by speed of the horse with the faster horses to the left (first position)
for (let i = 0; i < 5; i++) {
  horses[i].sort((a, b) => b - a);
}

// Sixth race: Race the fastest horses of every group against each other and sort the groups by the fastest horse of that group with the fastest to the top (first position)
horses.sort((a, b) => b[0] - a[0]);

// Seventh race: Race the 5 remaining fastest horses (6 fastest of the matrix minus the overall fastest) to determine the second and third fastest horse
const seventhRun = [horses[0][1], horses[0][2], horses[1][0], horses[1][1], horses[2][0]];
seventhRun.sort((a, b) => b - a);

// Create an array with the fastest 3 horses
const fastestHorses = [horses[0][0], seventhRun[0], seventhRun[1]];

console.log(fastestHorses);
