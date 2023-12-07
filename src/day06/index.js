import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const numberPattern = /[0-9]+/g;
  let races = [];
  let times = input[0].match(numberPattern);
  let distances = input[1].match(numberPattern);
  let successRanges = [];

  // create array of races
  for (let i=0; i<times.length; i++) {
    races.push({
      time: times[i],
      distance: distances[i]
    });
  }

  // for each race, calculate minimum possible speed, maximum possible speed, and number of solutions
  for (let i = 0; i < races.length; i++) {
    let time = races[i].time;
    let distance = races[i].distance;
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

  return successRanges.reduce((accumulator, range) => accumulator * range.solutions, 1);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const numberPattern = /[0-9]+/g;
  let races = [];
  let successRanges = [];

  // create array of races
  races.push({
    time: parseInt(input[0].match(numberPattern).reduce((accumulator, value) => accumulator + value, ''), 10),
    distance: parseInt(input[1].match(numberPattern).reduce((accumulator, value) => accumulator + value, ''), 10),
  });

  // for each race, calculate minimum possible speed, maximum possible speed, and number of solutions
  for (let i = 0; i < races.length; i++) {
    let time = races[i].time;
    let distance = races[i].distance;
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

  return successRanges.reduce((accumulator, range) => accumulator * range.solutions, 1);
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
