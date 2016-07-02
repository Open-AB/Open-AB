const cfg = require('../config');
const pg = require('pg');
const pgp = require('pg-promise')();

const clientLink = cfg;

// callback that allows for connection to the database
module.exports.pg = {
  query: (text, cb) => {
    pg.connect(clientLink, (err, client, done) => {
      if (client) {
        client.query(text, (error, result) => {
          done();
          cb(error, result);
        });
      } else {
        err.message = 'Database connection refused';
        cb(err, null);
      }
    });
  },
};

module.exports.pgp = pgp(clientLink);
