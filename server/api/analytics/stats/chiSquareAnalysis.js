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
  return Object.keys(data).reduce((eventsConsidered, eventName) => {
    const eventTimes = data[eventName];
    for (let i = 0; i < eventTimes.length; i++) {
      if (eventTimes[i] > cutoffTime) {
        eventsConsidered[`${eventName}Considered`] = i;
        return eventsConsidered;
      }
    }
    eventsConsidered[`${eventName}Considered`] = data[eventName].length;
    return eventsConsidered;
  }, {});
};

const getEventsConsideredForCompletedTest = (data) => {
  const visitsCutoffTime = Math.max(data.aVisits[sampleSize - 1], data.bVisits[sampleSize - 1]);
  const cutoffTime = visitsCutoffTime + extraClickTime;
  const eventsConsidered = countEventsToConsider(data, cutoffTime);
  return eventsConsidered;
};

exports.computeStatsForSingleTest = computeStatsForSingleTest = test => {
  const { testName, testId, data } = test;
  const sufficientTime = (data.aVisits[data.aVisits.length - 1] - data.aVisits[0]) > 604800000; // is there data across a span of at least 7 days?
  const sufficientVisits = (data.aVisits.length >= sampleSize) && (data.bVisits.length >= sampleSize);
  let eventsConsidered;
  let p;
  if (sufficientVisits) {
    eventsConsidered = getEventsConsideredForCompletedTest(data);
    p = chiSquareTest(eventsConsidered.aVisitsConsidered, eventsConsidered.aClicksConsidered, eventsConsidered.bVisitsConsidered, eventsConsidered.bClicksConsidered);
  } else {
    eventsConsidered = Object.keys(data).reduce((statsAccumulator, eventName) => {
      statsAccumulator[`${eventName}Considered`] = data[eventName].length;
      return statsAccumulator;
    }, {});
  }
  const analysisResults = { sufficientTime, sufficientVisits, eventsConsidered, p };
  return { testName, testId, analysisResults };
};

// computeStatsForAllTests returns data of the form: [{
//     testName: ‘buyNowButtonTest’,
//     testId: ‘a3D5L97’,
//     analysisResults: {
//       sufficientTime: true,
//       sufficientVisits: true,
//       p: 0.04,
//       eventsConsidered: {
//         aVisitsConsidered: 2587,
//         aClicksConsidered: 400,
//         bVisitsConsidered: 2600,
//         bClicksConsidered: 300,
//       },
//     }
//   },
//   {...},
// ]

exports.computeStatsForAllTests = tests => tests.map(test => computeStatsForSingleTest(test));
