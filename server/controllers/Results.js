const tests = require('../db/queries/Tests');

const getAll = (req, res) => {
  tests.getAllResults((result) => {
    res.status(200).send(result.rows);
  });
};

const getForUser = (req, res) => {
  res.send('getForUser');
  return;
};

module.exports = { getAll, getForUser };
