const dbQry = require('./db/dbQueries');
const generateEvents = require('./stats/generateEvents.js');
const chiSquareAnalysis = require('./stats/chiSquareAnalysis.js');

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
      next(error);
    }
    const toSend = {
      testId: (result.rows[0].id).toString(),
    };
    return res.status(201).send(toSend);
  });
};

dbQry.getAllResults = (cb) => {   // dummy version
  const tests = generateEvents.generateTimesForMultipleTests();
  const result = {};
  result.rows = tests;
  cb(null, result);
};

exports.getAllStats = (req, res, next) => { // use dbQry as an arg for testing purposes?
  dbQry.getAllResults((error, result) => {
    if (error) {
      return next(error);
    }
    const testResults = result.rows;
    console.log(testResults);
    const testStats = chiSquareAnalysis.computeStatsForTests(testResults);
    console.log(testStats);
    res.status(200).json(testStats);
  });
};
