const db = require('./dbConnection');
const qry = require('./seedQryStrs');

module.exports = {
  // add new client to DB
  insertClient: (email, password, cb) => {
    db.query({
      text: qry.insertClient,
      values: [email, password],
    },
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

  // insert a new page for a client
  insertPage: (pageName, clientEmail, cb) => {
    db.query({
      text: qry.insertPage,
      values: [pageName, clientEmail],
    },
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

  // increment result_a of a test
  addFilledTest: (testName, a, b, pageName, clientEmail, cb) => {
    db.query({
      text: qry.addFilledTest,
      values: [testName, a, b, pageName, clientEmail],
    }, (error, result) => {
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
