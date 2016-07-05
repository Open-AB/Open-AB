const dbQry = require('./db/dbQueries');
const chiSquareAnalysis = require('./stats/chiSquareAnalysis.js');
const chartAnalysis = require('./stats/count');
const dashAnalysis = require('./stats/dashAnalysis');

exports.getAllResults = (req, res, next) => {
  dbQry.getAllResults(req.user.email, (error, result) => {
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

exports.getAll = (req, res, next) => {
  dbQry.getAllResults(req.user.email, (error, result) => {
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
  const clientEmail = req.user.email;
  console.log(req.user, '<<<<< req user in createTest controller');
  console.log(req.body, '>>>>>> req body in createTest controller');
  // end hardcoded test vars

  dbQry.createTest(req.body, clientEmail, (error, result) => {
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
  console.log(req.user, '************ this is req.user trying to getAllStats')
  dbQry.getAllResults(req.user.email, (error, results) => {
    if (error) {
      console.log('stats error');
      console.error(error);
      return next(error);
    } else {
      const formattedResults = convertResultsToTimeArrayFormat(results);
      const testStats = chiSquareAnalysis.computeStatsForAllTests(formattedResults);
      res.status(200).json(testStats);
    }
  });
};

exports.getChartData = (req, res, next) => {
  dbQry.getAllResults(req.user.email, (error, results) => {
    if (error) {
      console.error(error);
      return next(error);
    } else {
      const formattedResults = convertResultsToTimeArrayFormat(results);
      const count = formatChartData.processAllTestsDataIntoResults(formattedResults);
      res.status(200).json(count);
    }
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

exports.getClientTests = (req, res, next) => {
  dbQry.getClientTests(req.user.email, (err, results) => {
    if (err) {
      console.error('analytics/controller.getClientTests: ', err);
      next(err);
    } else {
      res.status(200).json(results.rows);
    }
  });
};

exports.getAllClientClicks = (req, res, next) => {
  dbQry.getAllClientClicks(req.user.email, (err, result) => {
    if (err) {
      console.error('analytics/controller.getAllClientClicks: ', err);
      next(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
};

exports.getAllClientVisits = (req, res, next) => {
  dbQry.getAllClientVisits(req.user.email, (err, result) => {
    if (err) {
      console.error('analytics/controller.getAllClientVisits: ', err);
      next(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
};
