import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split("\n");

const part1 = (rawInput) => {
  const lines = parseInput(rawInput);

  let summedValues = 0;
  let numberPattern = /\d/g;

  lines.forEach((line) => {
    let lineNumbers = line.match(numberPattern);
    if (lineNumbers.length) {
      let summedNumbers = `${lineNumbers[0]}${lineNumbers[lineNumbers.length - 1]}`;
      summedValues += parseInt(summedNumbers, 10);
    }
  });

  return summedValues;
};

const part2 = (rawInput) => {
  const lines = parseInput(rawInput);
  let summedValues = 0;
  let numberPattern = /\d|one|two|three|four|five|six|seven|eight|nine/g;
  let numberMap = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
  };

  lines.forEach((line) => {
    let matches, lineNumbers = [];
    while (matches = numberPattern.exec(line)) {
      lineNumbers.push(matches[0]);
      numberPattern.lastIndex = matches.index + 1;
    }

    let convertedLineNumbers = lineNumbers.map((number) => number.length > 1 ? numberMap[number] : number);
    if (convertedLineNumbers.length) {
      let summedNumbers = `${convertedLineNumbers[0]}${convertedLineNumbers[convertedLineNumbers.length - 1]}`;
      summedValues += parseInt(summedNumbers, 10);
    }
  });

  return summedValues;
};

run({
  part1: {
    tests: [
      {
        input: `
          1abc2
          pqr3stu8vwx
          a1b2c3d4e5f
          treb7uchet
        `,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          two1nine
          eightwothree
          abcone2threexyz
          xtwone3four
          4nineeightseven2
          zoneight234
          7pqrstsixteen
        `,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
