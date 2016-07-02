const cfg = require('../config');
const pg = require('pg');

const clientLink = `postgres://${cfg.db.host}:${cfg.db.port}/${cfg.db.dbName}`;

// callback that allows for connection to the database
module.exports = {
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

