const db = require('../db/connection');
const tests = require('../db/queries/Tests');

const getAll = (req, res) => {
  db.query(tests.getAllResults(), (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).send(result.rows);
  });
};

const getForUser = (req, res) => {
  res.send('getForUser');
  return;
};

module.exports = { getAll, getForUser };
