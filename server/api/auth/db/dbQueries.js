const db = require('./dbConnection');
const qry = require('./dbQryStrs');
const bcrypt = require('bcrypt-nodejs');

const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// check if client exists
exports.checkEmail = (clientEmail, cb) => {
  db.query({
    text: qry.checkEmail,
    values: [clientEmail],
  }, cb);
};

// get all results in DB
exports.createClient = (clientEmail, password, cb) => {
  exports.checkEmail(clientEmail, (err, response) => {
    const emailExists = response.rows[0].exists;
    if (emailExists) {
      cb(null, false);
    } else {
      const hashedPassword = generateHash(password);
      db.query({
        text: qry.createClient,
        values: [clientEmail, hashedPassword],
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
        text: qry.getClient,
        values: [clientEmail],
      },
     cb);
    }
  });
};
