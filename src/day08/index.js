import { assert } from "console";
import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const letterPattern = /[A-Z]+/g;
  const maxSteps = 20000;
  const instructions = input[0].split('');
  const nodes = new Map();
  const nodeIndexes = [];

  for (let i in input) {
    if (i < 2) continue;

    let lineParts = input[i].match(letterPattern);
    nodes.set(lineParts[0], [lineParts[1], lineParts[2]]);
    nodeIndexes.push(lineParts[0]);
  }

  let coordinate = 'AAA';
  let targetCoordinate = 'ZZZ';
  let instructionsIndex = 0;
  let steps = 0;

  while (coordinate !== targetCoordinate && steps < maxSteps) {
    let elements = nodes.get(coordinate);
    let instruction = instructions[instructionsIndex];
    let nextCoord = (instruction === 'L') ? elements[0] : elements[1];
    //console.log(`step ${steps.toString().padStart(5, '0')}, instruction ${instructionsIndex} ${instruction]} | coordinate ${nextCoord}: [${elements[0]}, ${elements[1]}]`);
    coordinate = nextCoord;
    
    steps += 1;
    instructionsIndex += 1;

    if (instructionsIndex >= instructions.length) {
      instructionsIndex = 0;
    }
  }

  assert(steps !== maxSteps, `${steps} iterations reached`);
  return steps;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const instructions = input[0].split('');
  const nodes = new Map();
  const nodeIndexes = [];

  // Utility function to calculate greatest common denominator of 2 numbers
  const gcd = (a, b) => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };

  // Utility function to calculate least common multiple of an array of integers
  const lcm = (values) => {
      // Handle invalid cases
      if (!Array.isArray(values) || values.length === 0) {
        return undefined;
      }

      // Base case for array with 2 elements
      if (values.length === 2) {
        return (values[0] * values[1]) / gcd(values[0], values[1]);
      }

      // Recursive case
      return lcm([values[0], lcm(values.slice(1))]);
  };

  // store each node location group in a map, and each node's position key in an array
  for (let i in input) {
    if (i < 2) continue;

    let lineParts = input[i].match(/[0-9A-Z]+/g);
    nodes.set(lineParts[0], [lineParts[1], lineParts[2]]);
    nodeIndexes.push(lineParts[0]);
  }

  // create an array representing starting coordinates for each path
  // will be updated every step to represent current coordinates for each path
  let paths = nodeIndexes.filter((node) => node[node.length - 1] === 'A').map((node) => {
    return {
      coordinate: node,
      steps: 0
    }
  });
  let instructionsIndex = 0;

  // for each path, find how many steps it takes to reach end coordinate and store result
  for (let i in paths) {
    while (paths[i].coordinate[paths[i].coordinate.length - 1] !== 'Z') {
      let elements = nodes.get(paths[i].coordinate);
      let instruction = instructions[instructionsIndex];
      let nextCoord = (instruction === 'L') ? elements[0] : elements[1];
      paths[i].coordinate = nextCoord;
      paths[i].steps += 1;
      instructionsIndex += 1;

      if (instructionsIndex >= instructions.length) {
        instructionsIndex = 0;
      }
    }
  }
  
  // paths are cyclical and will loop if stepping continues once target destination is found, 
  // so we can calculate the number of steps for each path, then find the lowest common multiple of those steps
  // to find the fewest steps it takes to reach the target destination concurrently
  let steps = paths.map((path) => path.steps);
  return lcm(steps);
};

run({
  part1: {
    tests: [
      {
        input: `
          LLR

          AAA = (BBB, BBB)
          BBB = (AAA, ZZZ)
          ZZZ = (ZZZ, ZZZ)
        `,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          LR

          11A = (11B, XXX)
          11B = (XXX, 11Z)
          11Z = (11B, XXX)
          22A = (22B, XXX)
          22B = (22C, 22C)
          22C = (22Z, 22Z)
          22Z = (22B, 22B)
          XXX = (XXX, XXX)
        `,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
