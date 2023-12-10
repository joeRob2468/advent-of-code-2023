import { assert } from "console";
import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const ranksInput = 'AKQJT98765432';
  const typesInput = 'Five of a kind,Four of a kind,Full house,Three of a kind,Two pair,One pair,High card'.split(',');

  const ranks = new Map();
  const types = new Map();
  let hands = [];

  for (let i in ranksInput) {
    ranks.set(ranksInput[i], i);
  }

  for (let i in typesInput) {
    types.set(typesInput[i], i);
  }

  const getType = (hand) => {
    const repeatedCharPattern = /(.)\1{1,}/g;
    const handGroups = hand.match(repeatedCharPattern)?.sort((a, b) => b.length - a.length);
    
    // High card
    if (handGroups === undefined) return types.get('High card');

    // Five of a kind
    if (handGroups.length === 1 && handGroups[0].length === 5) return types.get('Five of a kind');

    // Four of a kind
    if (handGroups.length === 1 && handGroups[0].length === 4) return types.get('Four of a kind');

    // Full house
    if (handGroups.length == 2 && handGroups[0].length === 3) return types.get('Full house');

    // Three of a kind
    if (handGroups.length === 1 && handGroups[0].length === 3) return types.get('Three of a kind');

    // Two pair
    if (handGroups.length == 2 && handGroups[0].length === 2) return types.get('Two pair');

    // One pair
    if (handGroups.length === 1 && handGroups[0].length === 2) return types.get('One pair');
  
    assert(false, hand, 'no rank');
  };

  for (let line of input) {
    let bid = parseInt(line.split(' ')[1], 10);
    let hand = line.split(' ')[0];
    let sortedHand = Array.from(hand).sort((a, b) => ranks.get(a) - ranks.get(b)).join('');

    hands.push({
      hand,
      bid,
      type: getType(sortedHand)
    });
  }

  // sort by type
  hands.sort((a, b) => types.get(a.type) - types.get(b.type));
  
  // sort type groups by strongest card
  let handGroups = [];
  for (let i=0; i<types.size; i++) {
    let handGroup = hands.filter((hand) => hand.type === i.toString());
    if (handGroup.length) handGroups.push(handGroup);
  }

  for (let groupIndex in handGroups) {
    let handGroup = handGroups[groupIndex];
    if (handGroup.length === 1) {
      continue;
    }

    handGroup.sort((a, b) => {
      let cardIndex = 0;
      let rank = 0;

      while(rank === 0 && cardIndex < 5) {
        let ranking = ranks.get(a.hand[cardIndex]) - ranks.get(b.hand[cardIndex]);
        if (ranking !== 0) rank = ranking;

        cardIndex += 1;
      }

      assert(rank !== 0, `${a.hand}-${b.hand} not ranked, ${rank}`);
      return rank;
    });
  }

  // recreate hands array with sorted values
  hands = handGroups.flat();
  return hands.reduce((accumulator, hand, index) => accumulator + (hand.bid * (hands.length - index)), 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const ranksInput = 'AKQT98765432J';
  const typesInput = 'Five of a kind,Four of a kind,Full house,Three of a kind,Two pair,One pair,High card'.split(',');

  const ranks = new Map();
  const types = new Map();
  let hands = [];

  for (let i in ranksInput) {
    ranks.set(ranksInput[i], i);
  }

  for (let i in typesInput) {
    types.set(typesInput[i], i);
  }

  const getType = (hand) => {
    const repeatedCharPattern = /(.)\1{1,}/g;
    const jestersPattern = /[J]/g;
    const jesters = hand.match(jestersPattern);
    let handGroups = hand.replace(jestersPattern, '').match(repeatedCharPattern)?.sort((a, b) => b.length - a.length);

    // if hand contains jesters, use jesters to increase strength of hand
    if (jesters) {
      if (handGroups) {
        // check if groups in hand are all equal length
        let groupsEqualLength = false;
        for (let i=1; handGroups.length > 1 && i<handGroups.length; i++) {
          if (handGroups[i].length === handGroups[0].length) {
            groupsEqualLength = true;
          }
        };

        if (groupsEqualLength) {
          // if groups in hand are equal length, add jesters to group with highest card rank
          handGroups.sort((a, b) => ranks.get(a[0]) - ranks.get(b[0]));
          handGroups[0] += handGroups[0][0].repeat(jesters.length);
        } else {
          // if groups in hand are not equal length, add jesters to largest group
          handGroups[0] += handGroups[0][0].repeat(jesters.length);
        }
      } else {
        // if there are no groups in the hand, create group using jesters to copy highest rank card
        let highestCard = hand.split('').sort((a, b) => ranks.get(a) - ranks.get(b)).join('')[0];
        if (highestCard === 'J') {
          handGroups = ['AAAAA'];
        } else {
          handGroups = [highestCard.repeat(jesters.length + 1)];
        }
      }
    }
    
    if (handGroups === undefined) return types.get('High card'); 
    if (handGroups.length === 1 && handGroups[0].length === 5) return types.get('Five of a kind');
    if (handGroups.length === 1 && handGroups[0].length === 4) return types.get('Four of a kind');
    if (handGroups.length == 2 && handGroups[0].length === 3) return types.get('Full house');
    if (handGroups.length === 1 && handGroups[0].length === 3) return types.get('Three of a kind');
    if (handGroups.length == 2 && handGroups[0].length === 2) return types.get('Two pair');
    if (handGroups.length === 1 && handGroups[0].length === 2) return types.get('One pair');
  
    assert(false, hand, 'unranked');
  };

  for (let line of input) {
    let bid = parseInt(line.split(' ')[1], 10);
    let hand = line.split(' ')[0];
    let sortedHand = Array.from(hand).sort((a, b) => ranks.get(a) - ranks.get(b)).join('');

    hands.push({
      hand,
      bid,
      type: getType(sortedHand)
    });
  }

  // sort by type
  hands.sort((a, b) => types.get(a.type) - types.get(b.type));
  
  // sort type groups by strongest card
  let handGroups = [];
  for (let i=0; i<types.size; i++) {
    let handGroup = hands.filter((hand) => hand.type === i.toString());
    if (handGroup.length) handGroups.push(handGroup);
  }

  for (let groupIndex in handGroups) {
    let handGroup = handGroups[groupIndex];
    if (handGroup.length === 1) {
      continue;
    }

    handGroup.sort((a, b) => {
      let cardIndex = 0;
      let rank = 0;

      while(rank === 0 && cardIndex < 5) {
        let ranking = ranks.get(a.hand[cardIndex]) - ranks.get(b.hand[cardIndex]);
        if (ranking !== 0) rank = ranking;

        cardIndex += 1;
      }

      assert(rank !== 0, `${a.hand}-${b.hand} not ranked, ${rank}`);
      return rank;
    });
  }
  hands = handGroups.flat(); // recreate hands array with sorted values

  return hands.reduce((accumulator, hand, index) => accumulator + (hand.bid * (hands.length - index)), 0);
};

run({
  part1: {
    tests: [
      {
        input: `
          32T3K 765
          T55J5 684
          KK677 28
          KTJJT 220
          QQQJA 483
        `,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          32T3K 765
          T55J5 684
          KK677 28
          KTJJT 220
          QQQJA 483
        `,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
