const db = require('./dbConnection');
const qry = require('./dbQryStrs');


// get all results in DB
exports.hearClick = (testId, cb) => {
  db.query({
    text: qry.incrementTest,
    values: [testId],
  },
  cb);
};
