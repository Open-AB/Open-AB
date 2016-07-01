const dbQry = require('./db/dbQueries');

exports.hearClick = (req, res, next) => {
  res.status(204).send();

  const testId = req.body.testId;

  dbQry.hearClick(testId, (err) => {
    if (err) {
      return next(err);
    }
  });
};
