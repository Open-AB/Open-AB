const dbQry = require('./db/dbQueries');

exports.hearClick = (req, res) => {
  res.status(204).send();

  const testId = req.body.testId;

  dbQry.hearClick(testId, () => {});
};
