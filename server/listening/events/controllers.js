const dbQry = require('./db/dbQueries');

exports.hearClick = (req, res) => {
  res.status(204).send();

  // hardcoded test vars
  const testName = 'testname';
  const pageName = 'page1';
  const clientEmail = 'abcd@abcd.com';
  // end hardcoded test vars

  dbQry.hearClick(testName, pageName, clientEmail, (error, result) => {
    return;
  });
};
