Building up the axiom
  Exchanges all letters by the defined rules, except the 4 stated above
  +   Turn left by selected angle
  -, −   Turn right by selected angle
  |   Turn by 180 degrees / turn back
  [   Save state (direction and position) on the stack
  ]   Load state (direction and position) from the stack

Drawing
  A, B, F, G, 0, 1   Draw a line forward (in the actual direction by the actual linelength)


TODO:
  - Fix the simple tree
  - Line thickness changes
  - Line length changes
  - Angle changes
  - Angle randomization
  - Small letters only move forward
  - Have a field where entered letters will have special behaviour
    - Field for drawing letters
    - Field for moving letters
    - Build the newer iterations always on top of the older ones (let the dragon always face the same direction of expansion, and thus spiral while building up)
      - Changing of meaning of + and - with & symbol needed for this to alternate between +F--F& and -F++F& for drawing the Dragon