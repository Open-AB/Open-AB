const db = require('./dbConnection');
const qry = require('./dbQryStrs');

// get all results in DB
exports.getAllResults = (cb) => {
  db.query(qry.getAllResults, cb);
};

exports.createPage = (pageName, clientEmail, cb) => {
  db.query({
    text: qry.createPage,
    values: [pageName, clientEmail],
  }, cb);
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

exports.getPageTests = (pageName, clientEmail, cb) => {
  db.query({
    text: qry.getPageTests,
    values: [pageName, clientEmail],
  }, cb);
};

exports.getClientTests = (clientEmail, cb) => {
  db.query({
    text: qry.getClientTests,
    values: [clientEmail],
  }, cb);
};

exports.getClientPages = (clientEmail, cb) => {
  db.query({
    text: qry.getClientPages,
    values: [clientEmail],
  }, cb);
};
