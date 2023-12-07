import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const numberPattern = /[0-9]+/g;
  let races = [];
  let times = input[0].match(numberPattern);
  let distances = input[1].match(numberPattern);
  let successRanges = [];

  for (let i=0; i<times.length; i++) {
    races.push({
      time: times[i],
      distance: distances[i]
    });
  }

  for (let raceIndex = 0; raceIndex < times.length; raceIndex++) {
    let time = races[raceIndex].time;
    let distance = races[raceIndex].distance;
    let minSpeed, maxSpeed;

    for (let currentSpeed=1; currentSpeed<=time; currentSpeed++) {
      let holdTime = currentSpeed;
      let distanceTravelled = currentSpeed * (time - holdTime);

      if (distanceTravelled > distance) {
        minSpeed = currentSpeed;
        break;
      }
    }
    maxSpeed = time - minSpeed;

    successRanges.push({
      solutions: maxSpeed - minSpeed + 1,
      min: minSpeed,
      max: maxSpeed
    });
  }

  let result = successRanges.reduce((accumulator, range) => accumulator * range.solutions, 1);
  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const numberPattern = /[0-9]+/g;
  let races = [];
  let times = input[0].match(numberPattern);
  let distances = input[1].match(numberPattern);
  let successRanges = [];

  races.push({
    time: parseInt(times.reduce((accumulator, value) => accumulator + value, ''), 10),
    distance: parseInt(distances.reduce((accumulator, value) => accumulator + value, ''), 10),
  });

  for (let raceIndex = 0; raceIndex < races.length; raceIndex++) {
    let time = races[raceIndex].time;
    let distance = races[raceIndex].distance;
    let minSpeed, maxSpeed;

    for (let currentSpeed=1; currentSpeed<=time; currentSpeed++) {
      let holdTime = currentSpeed;
      let distanceTravelled = currentSpeed * (time - holdTime);

      if (distanceTravelled > distance) {
        minSpeed = currentSpeed;
        break;
      }
    }

    maxSpeed = time - minSpeed;

    successRanges.push({
      solutions: maxSpeed - minSpeed + 1,
      min: minSpeed,
      max: maxSpeed
    });
  }

  let result = successRanges.reduce((accumulator, range) => accumulator * range.solutions, 1);
  return result;
};

run({
  part1: {
    tests: [
      {
        input: `
          Time:      7  15   30
          Distance:  9  40  200
        `,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          Time:      7  15   30
          Distance:  9  40  200
        `,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
