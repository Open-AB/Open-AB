const maxClickDelay = 10000; // maximum amount of time after visit to wait to make a click
const faker = require('faker');

exports.defaultParamsForAllTests = defaultParamsForAllTests = [
  {
    testName: 'Buy Now Button Test', // B wins
    testId: '3874E76',
    testDetails: {
      startTime: 1450896596001, // Wed Dec 23 2015 10:49:56 GMT-0800 (PST). To convert milliseconds to human-readable date: const date = new Date (1459996596001);
      aClickRate: 0.1,
      aTotalVisits: 4567,
      bClickRate: 0.2,
      bTotalVisits: 4603,
      timeframe: 2592000000, // ~30 days: days * hours * minutes * seconds * milliseconds = 30 * 24 * 60 * 60 * 1000
    },
  },
  {
    testName: 'Try Now Button Test', // A wins
    testId: 'hgU9084K',
    testDetails: {
      startTime: 1455896596001, // Fri Feb 19 2016 07:43:16 GMT-0800 (PST)
      aClickRate: 0.5,
      aTotalVisits: 2890,
      bClickRate: 0.3,
      bTotalVisits: 2921,
      timeframe: 864000000, // ~10 days
    },
  },
  {
    testName: 'Subscribe Now Button Test', // Usually inconclusive (with the occasional false positive either way)
    testId: 'sd37489',
    testDetails: {
      startTime: 1457896596001, // Sun Mar 13 2016 12:16:36 GMT-0700 (PDT)
      aClickRate: 0.2,
      aTotalVisits: 3876,
      bClickRate: 0.2,
      bTotalVisits: 3843,
      timeframe: 964000000, // ~11 days
    },
  },
  {
    testName: 'Act Now Button Test', // Not yet enough visits to declare a winner
    testId: 'asdas5489',
    testDetails: {
      startTime: 1458896596001, // Fri Mar 25 2016 02:03:16 GMT-0700 (PDT)
      aClickRate: 0.1,
      aTotalVisits: 2590,
      bClickRate: 0.3,
      bTotalVisits: 2580,
      timeframe: 764000000, // ~9 days
    },
  },
  {
    testName: 'Signup Now Button Test', // Hasn't run long enough to declare a winner
    testId: 'kjhghj876H',
    testDetails: {
      startTime: 1459996596001, // Wed Apr 06 2016 19:36:36 GMT-0700 (PDT)
      aClickRate: 0.2,
      aTotalVisits: 3876,
      bClickRate: 0.4,
      bTotalVisits: 3843,
      timeframe: 86400000, // ~1 day
    },
  },
];

const generateNumString = length => {
  const range = Math.pow(10, length);
  const num = Math.floor((range / 10) + Math.random() * (range - range / 10));
  return String(num);
};

const sortEvents = events => events.sort((eventA, eventB) => (eventA.time - eventB.time));

const generateVersionData = (startTime, clickRate, totalVisits, timeframe) => {
  let visitsData = [];
  let clicksData = [];
  for (let i = 0; i < totalVisits; i++) {
    const time = startTime + Math.floor((Math.random() * timeframe));
    const IPAddress = faker.Internet.ip();
    visitsData.push({ time, IPAddress });
    if (Math.random() < clickRate) {
      const clickTime = time + Math.floor((Math.random() * maxClickDelay));
      clicksData.push({ time: clickTime, IPAddress });
    }
  }
  visitsData = sortEvents(visitsData);
  clicksData = sortEvents(clicksData);
  return { visitsData, clicksData };
};

const generateTestData = (startTime, aClickRate, aTotalVisits, bClickRate, bTotalVisits, timeframe) => {
  const aData = generateVersionData(startTime, aClickRate, aTotalVisits, timeframe);
  const bData = generateVersionData(startTime, bClickRate, bTotalVisits, timeframe);
  return {
    aVisitsData: aData.visitsData,
    aClicksData: aData.clicksData,
    bVisitsData: bData.visitsData,
    bClicksData: bData.clicksData,
  };
};

const generateDataForMultipleTests = (paramsForAllTests) => {
  return paramsForAllTests.map(paramsForSingleTest => {
    const { startTime, aClickRate, aTotalVisits, bClickRate, bTotalVisits, timeframe } = paramsForSingleTest.testDetails;
    const data = generateTestData(startTime, aClickRate, aTotalVisits, bClickRate, bTotalVisits, timeframe);
    return {
      testName: paramsForSingleTest.testName,
      testId: paramsForSingleTest.testId,
      data,
    };
  });
};

// generateDataForMultipleTestsWithDefaultParams produces data of the form:
// [
//   {
//     testName: 'buyNowButtonTest',
//     testId: '3874E76',
//     data: {
//       aVisitsData: [~, ~, ...],
//       aClicksData: [~, ~, ...],
//       bVisitsData: [~, ~, ...],
//       bClicksData: [~, ~, ...],
//     },
//   },
//   {...},
//   {...},
//   ...
// ]

// where ~ = {
//   IPAddress: 173.247.199.46
//   time: 1466896596001
// }

exports.generateDataForMultipleTestsWithDefaultParams = generateDataForMultipleTestsWithDefaultParams = () => {
  return generateDataForMultipleTests(defaultParamsForAllTests);
};

// generateTimesForMultipleTestsWithDefaultParams produces data of the form:
// [
//   {
//     testName: 'buyNowButtonTest',
//     testId: '3874E76',
//     data: {
//       aVisits: [1466896596001, ..., ...],
//       aClicks: [1466896544352, ..., ...],
//       bVisits: [1466896435522, ..., ...],
//       bClicks: [1466896435233, ..., ...],
//     },
//   },
//   {...},
//   {...},
//   ...
// ]

exports.generateTimesForMultipleTestsWithDefaultParams = () => {
  const tests = generateDataForMultipleTestsWithDefaultParams();
  return tests.map(test => {
    const timesByVersionAndType = {};
    const data = test.data;
    for (const versionAndType in data) {
      const mappedTestData = data[versionAndType].map(event => event.time);
      timesByVersionAndType[versionAndType.slice(0, -4)] = mappedTestData;
    }
    return {
      testName: test.testName,
      testId: test.testId,
      data: timesByVersionAndType,
    };
  });
};
