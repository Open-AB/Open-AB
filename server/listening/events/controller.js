const dbQry = require('./db/dbQueries');
const requestIp = require('request-ip');

exports.hearVisit = (req, res, next) => {
  res.status(204).send();
  const visitData = {};
  visitData.versionId = req.body.versionId;
  visitData.IPAddress = requestIp.getClientIp(req);
  visitData.time = req.body.time;
  dbQry.hearVisit(visitData, (err) => {
    if (err) {
      return next(err);
    }
  });
};

exports.hearClick = (req, res, next) => {
  res.status(204).send();
  const clickData = {};
  clickData.versionId = req.body.versionId;
  clickData.IPAddress = requestIp.getClientIp(req);
  clickData.time = req.body.time;
  dbQry.hearClick(clickData, (err) => {
    if (err) {
      return next(err);
    }
  });
};
