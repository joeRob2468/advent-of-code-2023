import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const numberPattern = /[0-9]+/g;

  let cards = [];

  input.forEach((line, index) => {
    let winningNumbers = line.split(':')[1].split('|')[0].match(numberPattern);
    let cardNumbers = line.split(':')[1].split('|')[1].match(numberPattern);

    cards.push({
      points: 0,
      numbers: cardNumbers,
      winningNumbers: winningNumbers
    });
  });

  cards.forEach((card) => {
    let cardWinningNumbers = card.numbers.filter((number) => card.winningNumbers.includes(number));

    if (cardWinningNumbers.length > 0) {
      card.points = 1;

      if (cardWinningNumbers.length > 1) {
        for (var i=0; i<cardWinningNumbers.length - 1; i++) {
          card.points = card.points * 2;
        }
      }
    }
  });

  return cards.reduce((partialSum, card) => partialSum + card.points, 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const numberPattern = /[0-9]+/g;

  let cards = [];

  input.forEach((line, index) => {
    let winningNumbers = line.split(':')[1].split('|')[0].match(numberPattern);
    let cardNumbers = line.split(':')[1].split('|')[1].match(numberPattern);
    
    cards.push({
      numbers: cardNumbers,
      winningNumbers: winningNumbers,
      copies: 1
    });
  });

  cards.forEach((card, index) => {
    let cardWinningNumbers = card.numbers.filter((number) => card.winningNumbers.includes(number));

    if (cardWinningNumbers.length > 0) {
      for (let i=0; i<cardWinningNumbers.length; i++) {
        cards[index + 1 + i].copies += 1 * card.copies;
      }
    }
  });

  return cards.reduce((partialSum, card) => partialSum + card.copies, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
          Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
          Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
          Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
          Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
          Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
          Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
        `,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
          Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
          Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
          Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
          Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
          Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
        `,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
