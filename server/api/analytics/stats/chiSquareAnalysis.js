const chiSquareTest = require('./chiSquareTest');

const sampleSize = 2587;
const extraClickTime = 10000; // number of milliseconds after visit to wait for last click;

// const sampleSize = 2587 b/c we assume that:
//
// -the proportion of visitors converting on the less successful version is 0.1
// -the proportion converting on the more successful version is 0.125
// -p < 0.05
// -power = 0.8
//
// According to this calculator (http://biomath.info/power/chsq.htm), that means we need 2587 people to visit each version of the page

const countEventsToConsider = (data, cutoffTime) => {
  return Object.keys(data).reduce((statsAccumulator, eventName) => {
    const eventTimes = data[eventName];
    for (let i = 0; i < eventTimes.length; i++) {
      if (eventTimes[i] > cutoffTime) {
        statsAccumulator[`${eventName}Considered`] = i;
        return statsAccumulator;
      }
    }
    statsAccumulator[`${eventName}Considered`] = data[eventName].length;
    return statsAccumulator;
  }, {});
};

const computeStatsForCompleteTest = (data) => {
  const visitsCutoffTime = Math.max(data.aVisits[sampleSize - 1], data.aVisits[sampleSize - 1]);
  const cutoffTime = visitsCutoffTime + extraClickTime;
  const stats = countEventsToConsider(data, cutoffTime);
  stats.p = chiSquareTest(stats.aVisitsConsidered, stats.aClicksConsidered, stats.bVisitsConsidered, stats.bClicksConsidered);
  return stats;
};

exports.computeStatsForTest = computeStatsForTest = test => {
  const { testName, testId, data } = test;
  const sufficientTime = (data.aVisits[data.aVisits.length - 1] - data.aVisits[0]) > 604800000; // is there data across a span of at least 7 days?
  const sufficientVisits = (data.aVisits.length >= sampleSize) && (data.bVisits.length >= sampleSize);
  let testResults;
  if (sufficientVisits) {
    testResults = computeStatsForCompleteTest(data);
  } else {
    testResults = Object.keys(data).reduce((statsAccumulator, eventName) => {
      statsAccumulator[`${eventName}Considered`] = data[eventName].length;
      return statsAccumulator;
    }, {});
  }
  const stats = { sufficientTime, sufficientVisits, testResults };
  return { testName, testId, stats };
};

// computeStatsForTests returns data of the form: [{
//     testName: ‘buyNowButtonTest’,
//     testId: ‘a3D5L97’,
//     stats: {
//       sufficientTime: true,
//       sufficientVisits: true,
//       testResults: {
//         aVisitsConsidered: 2587,
//         aClicksConsidered: 400,
//         bVisitsConsidered: 2600,
//         bClicksConsidered: 300,
//         p: 0.04,
//       },
//     }
//   },
//   {...},
// ]

exports.computeStatsForTests = tests => tests.map(test => computeStatsForTest(test));

// const dbQry = {};

// dbQry.getAllResults = (cb) => {   // dummy version
//   const tests = generateEvents.generateTimesForMultipleTests();
//   const result = {};
//   result.rows = tests;
//   cb(null, result);
// };

// exports.computeStatsOnQuery = computeStats = (req, res, next) => { //use dbQry as an arg for testing purposes?
//   dbQry.getAllResults((error, result) => {
//     if (error) {
//       return next(error);
//     }
//     const testResults = result.rows;
//     const testStats = testResults.map(test => computeStatsForTest(test));
//     console.log(testStats);
//   });
// };
