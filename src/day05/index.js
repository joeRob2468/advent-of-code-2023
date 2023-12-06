import { match } from "assert";
import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split('\n\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const numberPattern = /[0-9]+/g;

  let almanac = [];
  let seeds = [];
  let seedResults = [];

  // Convert input into almanac pages with sets of category ranges
  input.forEach((pageInput, pageIndex) => {
    let pages = pageInput.split('\n');
    
    let almanacPage = {
      title: '',
      categoryRanges: []
    };

    pages.forEach((pageLine, index) => {
      if (pageIndex === 0 && pageLine.includes('seeds: ')) {
        seeds.push(...pageLine.match(numberPattern).map((number) => parseInt(number, 10)));
      } else if (pageLine.includes(' map:')) {
        almanacPage.title = pageLine.replace(' map:', '');

      } else if (pageIndex !== 0 && numberPattern.test(pageLine)) {
        let rawRange = pageLine.match(numberPattern).map((number) => parseInt(number, 10));
        let categoryRange = {
          dest: rawRange[0],
          source: rawRange[1],
          length: rawRange[2]
        };
        almanacPage.categoryRanges.push(categoryRange);
      }
    });

    if (pageIndex !== 0) almanac.push(almanacPage);
  });
  
  // For each seed, iterate through category ranges, completing each page and using the result
  // as input for the next iteration
  seeds.forEach((seed) => {
    let locationNumber;
    let currentSource = seed;

    almanac.forEach((page) => {
      let isSourceMapped = false;

      page.categoryRanges.forEach((range) => {
        if (isSourceMapped) return;
        
        let sourceStart = range.source;
        let destStart = range.dest;
        let length = range.length;

        // if source is within a mapped source range, calculate destination number
        if (!isSourceMapped && currentSource >= sourceStart && currentSource <= sourceStart + length) {
          let destIndex = currentSource - sourceStart;
          let destValue = destStart + destIndex;
          currentSource = destValue;
          isSourceMapped = true;
        }
      });

    });

    // source has been mapped to a location number, save result
    seedResults.push(currentSource);
  });

  seedResults.sort((a, b) => a-b);
  return seedResults[0];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const numberPattern = /[0-9]+/g;

  let almanac = [];
  let seeds = [];
  let lowestResult = -1;

  // Convert input into almanac pages with sets of category ranges
  input.forEach((pageInput, pageIndex) => {
    let pages = pageInput.split('\n');
    
    let almanacPage = {
      title: '',
      categoryRanges: []
    };

    pages.forEach((pageLine, index) => {
      if (pageIndex === 0 && pageLine.includes('seeds: ')) {
        let seedNumbers = pageLine.match(numberPattern).map((number) => parseInt(number, 10))
        for (var i=0; i<seedNumbers.length - 1; i += 2) {
          seeds.push({ start: seedNumbers[i], length: seedNumbers[i + 1]});
        }

      } else if (pageLine.includes(' map:')) {
        almanacPage.title = pageLine.replace(' map:', '');

      } else if (pageIndex !== 0 && numberPattern.test(pageLine)) {
        let rawRange = pageLine.match(numberPattern).map((number) => parseInt(number, 10));
        let categoryRange = {
          dest: rawRange[0],
          source: rawRange[1],
          length: rawRange[2]
        };
        almanacPage.categoryRanges.push(categoryRange);
      }
    });

    if (pageIndex !== 0) almanac.push(almanacPage);
  });
  
  // For each seed, iterate through category ranges, completing each page and using the result
  // as input for the next iteration
  seeds.forEach((seed) => {
    for (let i = 0; i < seed.length; i++) {
      let currentSource = seed.start + i;

      for (let pageIndex = 0; pageIndex < almanac.length; pageIndex++) {
        let page = almanac[pageIndex];

        for (let rangeIndex = 0; rangeIndex < page.categoryRanges.length; rangeIndex++) {
          let range = page.categoryRanges[rangeIndex];
          
          // if source is within a mapped source range, calculate destination number
          if (currentSource >= range.source && currentSource <= range.source + range.length) {
            let destIndex = currentSource - range.source;
            currentSource = range.dest + destIndex;
            break;
          }
        }
      }
      
      // source has been mapped to a location number.
      // for performance, only update result with location if lower than existing one.
      if (lowestResult === -1 || currentSource < lowestResult) {
        lowestResult = currentSource;
      }
    }
  });

  return lowestResult;
};

run({
  part1: {
    tests: [
      {
        input: `
          seeds: 79 14 55 13

          seed-to-soil map:
          50 98 2
          52 50 48
          
          soil-to-fertilizer map:
          0 15 37
          37 52 2
          39 0 15
          
          fertilizer-to-water map:
          49 53 8
          0 11 42
          42 0 7
          57 7 4
          
          water-to-light map:
          88 18 7
          18 25 70
          
          light-to-temperature map:
          45 77 23
          81 45 19
          68 64 13
          
          temperature-to-humidity map:
          0 69 1
          1 0 69
          
          humidity-to-location map:
          60 56 37
          56 93 4
        `,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          seeds: 79 14 55 13

          seed-to-soil map:
          50 98 2
          52 50 48
          
          soil-to-fertilizer map:
          0 15 37
          37 52 2
          39 0 15
          
          fertilizer-to-water map:
          49 53 8
          0 11 42
          42 0 7
          57 7 4
          
          water-to-light map:
          88 18 7
          18 25 70
          
          light-to-temperature map:
          45 77 23
          81 45 19
          68 64 13
          
          temperature-to-humidity map:
          0 69 1
          1 0 69
          
          humidity-to-location map:
          60 56 37
          56 93 4
        `,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
