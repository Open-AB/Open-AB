const db = require('./dbConnection');
const qry = require('./dbQryStrs');

// check if client exists
exports.checkEmail = (clientEmail, cb) => {
  db.query({
    text: qry.checkEmail,
    values: [clientEmail],
  }, cb);
};

// get all results in DB
exports.createClient = (clientEmail, password, cb) => {
  exports.checkEmail(clientEmail, (emailExists) => {
    if (emailExists) {
      cb(false);
    } else {
      // insert expensive operation to salt + hash password
      db.query({
        text: qry.createClient,
        values: [clientEmail, password],
      }, cb);
    }
  });
};

// check if attempted password matches DB password
exports.signIn = (clientEmail, password, cb) => {
  exports.checkEmail(clientEmail, (error, emailExists) => {
    if (!emailExists.rows[0].exists) {
      cb(null, false);
    } else {
      db.query({
        text: qry.getClientPass,
        values: [clientEmail],
      },
     cb);
    }
  });
};
