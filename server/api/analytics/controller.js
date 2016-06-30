const dbQry = require('./db/dbQueries');
const generateEvents = require('./stats/generateEvents.js');
const chiSquareAnalysis = require('./stats/chiSquareAnalysis.js');

const convertDataFormatToTimeFormatForResults = (DataFormattedResults) => {
  return DataFormattedResults.map(test => {
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

exports.getAll = (req, res, next) => {
  dbQry.getAllResults((error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send(result.rows);
  });
};

exports.createTest = (req, res, next) => {
  // hardcoded test vars
  const testName = req.body.testName || 'testname';
  const pageName = 'page1';
  const clientEmail = 'abcd@abcd.com';
  // end hardcoded test vars

  dbQry.createTest(testName, pageName, clientEmail, (error, result) => {
    if (error) {
      return next(error);
    }
    const toSend = {
      testId: (result.rows[0].id).toString(),
    };
    return res.status(201).send(toSend);
  });
};

exports.getAllStats = (req, res, next) => { // use dbQry as an arg for testing purposes?
  dbQry.getAllResults((error, results) => {
    if (error) {
      return next(error);
    }
    const formattedResults = convertDataFormatToTimeFormatForResults(results);
    const testStats = chiSquareAnalysis.computeStatsForAllTests(formattedResults);
    res.status(200).json(testStats);
  });
};

// test controller func for LineChart
const count = require('./stats/count');
exports.getChartData = (req, res, next) => {
  res.status(200).send(count.results);
};

exports.getMapClicks = (req, res, next) => {
  // TO DO: write query
  // dbQry.getMapClicks((error, result) => {
  //   if (error) {
  //     return next(error);
  //   }
  //   const mapClicks = result;
  //   res.status(200).json(mapClicks);
  // });
};
