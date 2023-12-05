import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const digitsList = Array.from('0123456789');
  const symbolsList = Array.from(`[$&+,:;=?@#|'<>^*()%!-]/`);

  let schematic = JSON.parse(JSON.stringify(input)).map((line) => Array.from(line));
  let symbolPositions = [];
  let detectedNumbers = [];

  const detectNumber = (position) => {
    let numberDetected = 
      position.y >= 0 &&
      position.y < schematic.length &&
      position.x >= 0 &&
      position.x < schematic[0].length &&
      digitsList.includes(schematic[position.y][position.x]) &&
      schematic[position.y][position.x] !== 'X';

    // if number detected, replace it on the schematic with an X, 
    // to mark it as a previously detected number
    if (numberDetected === true) {
      schematic[position.y][position.x] = 'X';
    }

    return numberDetected;
  };
  
  const detectFullNumber = (startingPosition) => {
    let fullNumber = input[startingPosition.y][startingPosition.x];
  
    // iterate backwards from starting position until reaching invalid position
    let currentPosition = {x: startingPosition.x - 1, y: startingPosition.y};
    while (detectNumber({...currentPosition})) {
      fullNumber = input[currentPosition.y][currentPosition.x] + fullNumber;
      currentPosition.x = currentPosition.x - 1;
    }
  
    // iterate forwards from starting position until reaching invalid position
    currentPosition = {x: startingPosition.x + 1, y: startingPosition.y};
    while (detectNumber({...currentPosition})) {
      fullNumber = fullNumber + input[currentPosition.y][currentPosition.x];
      currentPosition.x = currentPosition.x + 1;
    }
  
    return fullNumber;
  };

  input.forEach((line, lineIndex) => {
    Array.from(line).forEach((symbol, symbolIndex) => {
      if (symbolsList.includes(symbol)) {
        symbolPositions.push({
          symbol: symbol,
          x: symbolIndex,
          y: lineIndex
        });
      }
    });
  });

  symbolPositions.forEach((symbolPosition, index) => {
    // Top Left
    let currentPosition = {x: symbolPosition.x - 1, y: symbolPosition.y - 1};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
    }
    
    // Top Middle
    currentPosition = {x: symbolPosition.x, y: symbolPosition.y - 1};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);;
    }

    // Top Right
    currentPosition = {x: symbolPosition.x + 1, y: symbolPosition.y - 1};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
    }

    // Direct Left
    currentPosition = {x: symbolPosition.x - 1, y: symbolPosition.y};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
    }

    // Direct Right
    currentPosition = {x: symbolPosition.x + 1, y: symbolPosition.y};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
    }

    // Bottom Left
    currentPosition = {x: symbolPosition.x - 1, y: symbolPosition.y + 1};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
    }

    // Bottom Middle
    currentPosition = {x: symbolPosition.x, y: symbolPosition.y + 1};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
    }

    // Bottom Right
    currentPosition = {x: symbolPosition.x + 1, y: symbolPosition.y + 1};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
    }
  });
  
  // all numbers should be detected - sum and return result
  return detectedNumbers.reduce(
    (partialSum, fullNumber) => partialSum + parseInt(fullNumber), 
    0
  );
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const digitsList = Array.from('0123456789');
  const symbolsList = Array.from(`[$&+,:;=?@#|'<>^*()%!-]/`);

  let schematic = JSON.parse(JSON.stringify(input)).map((line) => Array.from(line));
  let symbolPositions = [];
  let detectedNumbers = [];

  const detectNumber = (position) => {
    let numberDetected = 
      position.y >= 0 &&
      position.y < schematic.length &&
      position.x >= 0 &&
      position.x < schematic[0].length &&
      digitsList.includes(schematic[position.y][position.x]) &&
      schematic[position.y][position.x] !== 'X';

    // if number detected, replace it on the schematic with an X, 
    // to mark it as a previously detected number
    if (numberDetected === true) {
      schematic[position.y][position.x] = 'X';
    }

    return numberDetected;
  };
  
  const detectFullNumber = (startingPosition) => {
    let fullNumber = input[startingPosition.y][startingPosition.x];
  
    // iterate backwards from starting position until reaching invalid position
    let currentPosition = {x: startingPosition.x - 1, y: startingPosition.y};
    while (detectNumber({...currentPosition})) {
      fullNumber = input[currentPosition.y][currentPosition.x] + fullNumber;
      currentPosition.x = currentPosition.x - 1;
    }
  
    // iterate forwards from starting position until reaching invalid position
    currentPosition = {x: startingPosition.x + 1, y: startingPosition.y};
    while (detectNumber({...currentPosition})) {
      fullNumber = fullNumber + input[currentPosition.y][currentPosition.x];
      currentPosition.x = currentPosition.x + 1;
    }
  
    return fullNumber;
  };

  input.forEach((line, lineIndex) => {
    Array.from(line).forEach((symbol, symbolIndex) => {
      if (symbolsList.includes(symbol)) {
        symbolPositions.push({
          symbol: symbol,
          x: symbolIndex,
          y: lineIndex,
          connectedNumbers: []
        });
      }
    });
  });

  symbolPositions.forEach((symbolPosition, index) => {
    // Top Left
    let currentPosition = {x: symbolPosition.x - 1, y: symbolPosition.y - 1};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
      symbolPosition.connectedNumbers.push(fullNumber);
    }
    
    // Top Middle
    currentPosition = {x: symbolPosition.x, y: symbolPosition.y - 1};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
      symbolPosition.connectedNumbers.push(fullNumber);
    }

    // Top Right
    currentPosition = {x: symbolPosition.x + 1, y: symbolPosition.y - 1};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
      symbolPosition.connectedNumbers.push(fullNumber);
    }

    // Direct Left
    currentPosition = {x: symbolPosition.x - 1, y: symbolPosition.y};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
      symbolPosition.connectedNumbers.push(fullNumber);
    }

    // Direct Right
    currentPosition = {x: symbolPosition.x + 1, y: symbolPosition.y};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
      symbolPosition.connectedNumbers.push(fullNumber);
    }

    // Bottom Left
    currentPosition = {x: symbolPosition.x - 1, y: symbolPosition.y + 1};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
      symbolPosition.connectedNumbers.push(fullNumber);
    }

    // Bottom Middle
    currentPosition = {x: symbolPosition.x, y: symbolPosition.y + 1};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
      symbolPosition.connectedNumbers.push(fullNumber);
    }

    // Bottom Right
    currentPosition = {x: symbolPosition.x + 1, y: symbolPosition.y + 1};
    if (detectNumber({...currentPosition})) {
      let fullNumber = detectFullNumber(currentPosition);
      detectedNumbers.push(fullNumber);
      symbolPosition.connectedNumbers.push(fullNumber);
    }
  });

  let gearSymbols = symbolPositions.filter((symbolPosition, index) => {
    return symbolPosition.connectedNumbers.length == 2;
  });
  
  // all numbers should be detected - sum and return result
  let gearRatioSum = 0;
  gearSymbols.forEach((gearSymbol) => {
    gearRatioSum += gearSymbol.connectedNumbers[0] * gearSymbol.connectedNumbers[1];
  });

  return gearRatioSum;
};

run({
  part1: {
    tests: [
      {
        input: `
          467..114..
          ...*......
          ..35..633.
          ......#...
          617*......
          .....+.58.
          ..592.....
          ......755.
          ...$.*....
          .664.598..
        `,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          467..114..
          ...*......
          ..35..633.
          ......#...
          617*......
          .....+.58.
          ..592.....
          ......755.
          ...$.*....
          .664.598..
        `,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
