const db = require('./dbConnection');
const qry = require('./dbQryStrs');


// get all results in DB
exports.hearClick = (testName, pageName, clientEmail, cb) => {
  db.query({
    text: qry.incrementTest,
    values: [testName, pageName, clientEmail],
  },
  cb);
};