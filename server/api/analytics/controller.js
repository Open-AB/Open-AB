const dbQry = require('./db/dbQueries');
const chiSquareAnalysis = require('./stats/chiSquareAnalysis.js');
const chartAnalysis = require('./stats/count');
const dashAnalysis = require('./stats/dashAnalysis');

exports.getAllResults = (req, res, next) => {
  dbQry.getAllResults((error, result) => {
    if (error) {
      return next(error);
    }
    const timeArrayData = dashAnalysis.convertResultsToTimeArrayFormat(result);
    const chartData = chartAnalysis.processAllTestsDataIntoResults(timeArrayData);
    const statData = chiSquareAnalysis.computeStatsForAllTests(timeArrayData);
    const dashStats = dashAnalysis.combineDashData(statData, chartData);
    return res.status(200).send(dashStats);
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
