const db = require('./dbConnection');
const qry = require('./dbQryStrs');

// get all results in DB
exports.getAllResults = (cb) => {
  db.query(qry.getAllResults,
  (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    if (cb) {
      cb(result);
    }
  });
};

exports.createTest = (testName, pageName, clientEmail, cb) => {
  db.query({
    text: qry.createTest,
    values: [testName, pageName, clientEmail],
  }, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    if (cb) {
      cb(result);
    }
  });
};
