import { assert } from "console";
import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const results = [];
  const histories = input.map((line) => {
    return line.split(' ').map((value) => parseInt(value, 10));
  });

  for (let history of histories) {
    let diffs = [history];
    let iterationComplete = false;
    let step = 0;

    while (!iterationComplete) {
      let diffSequence = [];

      for (let i=0; i<diffs[step].length - 1; i++) {
        let diff = diffs[step][i+1] - diffs[step][i];
        diffSequence.push(diff);
      }
      diffs.push(diffSequence);

      if (diffs[diffs.length - 1].filter((value) => value !== 0).length === 0) {
        iterationComplete = true;
      }
      step += 1;
    }

    for (var i=diffs.length - 1; i>=0; i--) {
      if (i === diffs.length - 1) {
        diffs[i].push(0);
      } else {
        let currentValue = diffs[i][diffs[i].length - 1];
        let diff = diffs[i+1][diffs[i+1].length -1];
        diffs[i].push(currentValue + diff);
      }
    }

    results.push(diffs[0][diffs[0].length -1]);
  }

  return results.reduce((accumulator, result) => accumulator + result);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const results = [];
  const histories = input.map((line) => {
    return line.split(' ').map((value) => parseInt(value, 10));
  });

  for (let history of histories) {
    let diffs = [history];
    let iterationComplete = false;
    let step = 0;

    while (!iterationComplete) {
      let diffSequence = [];

      for (let i=0; i<diffs[step].length - 1; i++) {
        let diff = diffs[step][i+1] - diffs[step][i];
        diffSequence.push(diff);
      }
      diffs.push(diffSequence);

      if (diffs[diffs.length - 1].filter((value) => value !== 0).length === 0) {
        iterationComplete = true;
      }
      step += 1;
    }

    for (var i=diffs.length - 1; i>=0; i--) {
      if (i === diffs.length - 1) {
        diffs[i].unshift(0);
      } else {
        let currentValue = diffs[i][0];
        let diff = diffs[i+1][0];
        diffs[i].unshift(currentValue - diff);
      }
    }

    results.push(diffs[0][0]);
  }

  return results.reduce((accumulator, result) => accumulator + result);
};

run({
  part1: {
    tests: [
      {
        input: `
          0 3 6 9 12 15
          1 3 6 10 15 21
          10 13 16 21 30 45
        `,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          0 3 6 9 12 15
          1 3 6 10 15 21
          10 13 16 21 30 45
        `,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
