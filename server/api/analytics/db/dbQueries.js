const db = require('./dbConnection');
const qry = require('./dbQryStrs');

// get all results in DB
exports.getAllResults = (cb) => {
  db.query(qry.getAllResults, cb);
};

exports.createTest = (testName, pageName, clientEmail, cb) => {
  db.query({
    text: qry.createTest,
    values: [testName, pageName, clientEmail],
  }, cb);
};

exports.getResultForTestID = (testID, cb) => {
  db.query({
    text: qry.getResultForTestID,
    values: [testID],
  }, cb);
};
