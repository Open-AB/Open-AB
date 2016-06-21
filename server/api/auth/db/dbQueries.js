const db = require('./dbConnection');
const qry = require('./dbQryStrs');

// check if client exists
exports.checkEmail = (clientEmail, cb) => {
  db.query({
    text: qry.checkEmail,
    values: [clientEmail],
  },
  (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    if (cb) {
      cb(result.rows[0].exists);
    }
  });
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
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        if (cb) {
          cb(result.rows[0].id.toString());
        }
      });
    }
  });
};

// check if attempted password matches DB password
exports.signIn = (clientEmail, password, cb) => {
  exports.checkEmail(clientEmail, (emailExists) => {
    if (!emailExists) {
      cb(false);
    } else {
      db.query({
        text: qry.getClientPass,
        values: [clientEmail],
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        if (cb) {
          // insert expensive operation to check attempted password and  db password
          cb(password === result.rows[0].password);
        }
      });
    }
  });
};
