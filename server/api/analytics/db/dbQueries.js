const db = require('./dbConnection').pg;
const dbpgp = require('./dbConnection').pgp;
const qry = require('./dbQryStrs');
const uuid = require('uuid');

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

exports.createTest = (testData, clientEmail, cb) => {
  const { testName, pageId, a, b } = testData;
  const uniqueId = uuid.v4();
  dbpgp.tx(t => {
    const addTest = t.query(qry.createTest, [testName, pageId, clientEmail, uniqueId]);
    const addVersionA = t.query(qry.insertVersion, ['a', a.url, a.DOMLocation, uniqueId]);
    const addVersionB = t.query(qry.insertVersion, ['b', b.url, b.DOMLocation, uniqueId]);
    return t.batch([addTest, addVersionA, addVersionB]);
  })
  .then(result => {
    cb(null, result);
  })
  .catch(err => {
    cb(err, null);
  });
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
