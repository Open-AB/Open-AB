const dbQry = require('./db/dbQueries');

const getAll = (req, res) => {
  dbQry.getAllResults((result) => {
    res.status(200).send(result.rows);
  });
};

const getForUser = (req, res) => {
  res.send('getForUser');
  return;
};

module.exports = { getAll, getForUser };
