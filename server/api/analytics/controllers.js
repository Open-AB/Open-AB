const dbQry = require('./db/dbQueries');

exports.getAll = (req, res) => {
  dbQry.getAllResults((error, result) => {
    res.status(200).send(result.rows);
  });
};

exports.createTest = (req, res) => {
  // hardcoded test vars
  const testName = req.body.testName || 'testname';
  const pageName = 'page1';
  const clientEmail = 'abcd@abcd.com';
  // end hardcoded test vars

  dbQry.createTest(testName, pageName, clientEmail, (error, result) => {
    const toSend = {
      testId: (result.rows[0].id).toString(),
    };
    res.status(201).send(toSend);
  });
};
