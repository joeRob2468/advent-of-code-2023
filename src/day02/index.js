import run from "aocrunner";

const parseInput = (rawInput) => {
  const inputLines = rawInput.trim().split('\n');
  let games = [];

  inputLines.forEach((line, index) => {
    const cubeGroups = line.split(':')[1].split(';');
    let gameData = {
      id: index + 1,
      rawGameInput: line,
      maxCubes: {
        "red": 0,
        "green": 0,
        "blue": 0
      },
      revealedCubeGroups: []
    };

    cubeGroups.forEach((group, index) => {
      const numberPattern = /\d+/g;
      let cubesInGroup = {
        "red": 0,
        "green": 0,
        "blue": 0
      };

      group.split(',').forEach((cube) => {
        let cubeTotal = parseInt(cube.match(numberPattern)[0], 10);

        if (cube.indexOf(' red') !== -1) {
          cubesInGroup['red'] = cubeTotal;
          if (gameData.maxCubes['red'] < cubeTotal) {
            gameData.maxCubes['red'] = cubeTotal;
          }
        }
  
        if (cube.indexOf(' green') !== -1) {
          cubesInGroup['green'] = cubeTotal;
          if (gameData.maxCubes['green'] < cubeTotal) {
            gameData.maxCubes['green'] = cubeTotal;
          }
        }
  
        if (cube.indexOf(' blue') !== -1) {
          cubesInGroup['blue'] = cubeTotal;
          if (gameData.maxCubes['blue'] < cubeTotal) {
            gameData.maxCubes['blue'] = cubeTotal;
          }
        }
      });

      gameData.revealedCubeGroups.push({...cubesInGroup});
    });

    games.push(gameData);
  });

  return games;
};

const part1 = (rawInput) => {
  const games = parseInput(rawInput);
  const totalCubes = {
    "red": 12,
    "green": 13,
    "blue": 14
  };
  
  const possibleGames = games.filter((game) => {
    return totalCubes['red'] >= game.maxCubes['red'] && totalCubes['green'] >= game.maxCubes['green'] && totalCubes['blue'] >= game.maxCubes['blue']
  });

  return possibleGames.reduce((accumulator, currentGame) => accumulator + currentGame.id, 0);
};

const part2 = (rawInput) => {
  const games = parseInput(rawInput);
  let summedGamePow = 0;

  games.forEach((game) => {
    let gamePow = game.maxCubes['red'] * game.maxCubes['green'] * game.maxCubes['blue'];
    summedGamePow += gamePow;
  });

  return summedGamePow;
};

run({
  part1: {
    tests: [
      {
        input: `
          Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
          Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
          Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
          Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
          Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
          Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
          Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
          Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
          Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
