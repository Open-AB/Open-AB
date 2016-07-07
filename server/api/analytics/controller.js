const dbQry = require('./db/dbQueries');
const chiSquareAnalysis = require('./stats/chiSquareAnalysis.js');
const chartAnalysis = require('./stats/count');
const dashAnalysis = require('./stats/dashAnalysis');
const mapAnalysis = require('./stats/mapAnalysis');

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
  const clientEmail = req.user.email;
  // not looged in nor authenticated
  if (req.user.email === 'DEMO') {
    res.cookie('snippet', JSON.stringify(req.body), { signed: true });
    return res.json({ demo: true });
  }

  if (req.signedCookies.snippet) {
    req.body = JSON.parse(req.signedCookies.snippet);
  }

  dbQry.createTest(req.body, clientEmail, (error, result) => {
    if (error) {
      return next(error);
    }
    const toSend = {
      testId: (result[0][0].id).toString(),
      loggedIn: true,
    };
    res.clearCookie('snippet');
    return res.status(201).send(toSend);
  });
};

exports.getAllStats = (req, res, next) => { // use dbQry as an arg for testing purposes?
  console.log(req.user, '************ this is req.user trying to getAllStats');
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

exports.getmapResults = (req, res, next) => {
  dbQry.getAllResults(req.user.email, (error, result) => {
    if (error) {
      return next(error);
    }
    const ipAddresses = mapAnalysis.getAllIpAddresses(result);
    const countryIds = mapAnalysis.getAllCountryIds(ipAddresses);
    const ipCountryCount = mapAnalysis.countAllCountriesByName(countryIds);
    res.status(200).json(ipCountryCount);
  });
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

exports.getVersions = (req, res, next) => {
  // set testId to 0 if it is invalid
  const testId = parseInt(req.query.testid, 10) > 0 ? req.query.testid : 1;
  dbQry.getTestVersions(testId, (error, result) => {
    if (error) {
      console.error(error);
      return next(error);
    } else {
      const rawData = result.rows;
      if (rawData.length > 0) {
        const abFormat = (ab) => {
          const refObj = rawData[0].ab === ab ? rawData[0] : rawData[1];
          const retObj = {};
          retObj.url = refObj.url;
          retObj.DOMLocation = refObj.domlocation;
          retObj.versionId = refObj.id;
          return retObj;
        };
        const abData = {};
        abData.a = abFormat('a');
        abData.b = abFormat('b');
        res.status(200).json(abData);
      } else {
        next();
      }
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
