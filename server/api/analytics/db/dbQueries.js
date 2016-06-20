const db = require('./dbConnection');
const qry = require('./dbQryStrs');

module.exports = {
  // get all results in DB
  getAllResults: (cb) => {
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
  },
};
